
import React, { createContext, useContext, useReducer, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Product, coupons } from '@/lib/data';

// Add SHOPRINO10 coupon to the available coupons
const additionalCoupons = [
  { code: "SHOPRINO10", discount: 0.1, description: "10% off on your order" }
];

export type CartItem = {
  product: Product;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  previousState: CartItem[] | null;
};

type CartAction =
  | { type: 'ADD_ITEM'; payload: { product: Product; quantity: number } }
  | { type: 'REMOVE_ITEM'; payload: { productId: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'UNDO' };

type CartContextType = {
  state: CartState;
  addItem: (product: Product, quantity: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  undoAction: () => void;
  applyCoupon: (code: string) => void;
  appliedCoupon: { code: string; discount: number } | null;
  subtotal: number;
  discount: number;
  gst: number;
  total: number;
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(
        (item) => item.product.id === action.payload.product.id
      );

      let newItems;
      if (existingItemIndex >= 0) {
        newItems = [...state.items];
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newItems[existingItemIndex].quantity + action.payload.quantity,
        };
      } else {
        newItems = [
          ...state.items,
          { product: action.payload.product, quantity: action.payload.quantity },
        ];
      }

      return {
        previousState: [...state.items],
        items: newItems,
      };
    }

    case 'REMOVE_ITEM':
      return {
        previousState: [...state.items],
        items: state.items.filter((item) => item.product.id !== action.payload.productId),
      };

    case 'UPDATE_QUANTITY': {
      const newItems = state.items.map((item) =>
        item.product.id === action.payload.productId
          ? { ...item, quantity: action.payload.quantity }
          : item
      );

      return {
        previousState: [...state.items],
        items: newItems,
      };
    }

    case 'CLEAR_CART':
      return {
        previousState: [...state.items],
        items: [],
      };

    case 'UNDO':
      if (!state.previousState) return state;
      return {
        previousState: null,
        items: state.previousState,
      };

    default:
      return state;
  }
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [], previousState: null });
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null);

  const addItem = (product: Product, quantity: number) => {
    dispatch({ type: 'ADD_ITEM', payload: { product, quantity } });
    toast.success(`Added ${quantity} ${product.name} to cart`);
  };

  const removeItem = (productId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { productId } });
    toast.info('Item removed from cart');
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(productId);
      return;
    }
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
    toast.info('Cart updated');
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
    setAppliedCoupon(null);
    toast.info('Cart cleared');
  };

  const undoAction = () => {
    if (state.previousState) {
      dispatch({ type: 'UNDO' });
      toast.success('Last action undone');
    } else {
      toast.error('Nothing to undo');
    }
  };

  const applyCoupon = (code: string) => {
    // Check in both the original coupons and our additional coupons
    const allCoupons = [...coupons, ...additionalCoupons];
    const coupon = allCoupons.find((c) => c.code === code);
    
    if (coupon) {
      setAppliedCoupon({ code: coupon.code, discount: coupon.discount });
      toast.success(`Coupon ${coupon.code} applied: ${coupon.description}`);
    } else {
      toast.error('Invalid coupon code');
    }
  };

  // Calculate totals
  const subtotal = state.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  
  const discount = appliedCoupon ? subtotal * appliedCoupon.discount : 0;
  const gst = (subtotal - discount) * 0.05; // Changed from 18% to 5% GST
  const total = subtotal - discount + gst;

  // Persist cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(state.items));
      if (appliedCoupon) {
        localStorage.setItem('coupon', JSON.stringify(appliedCoupon));
      } else {
        localStorage.removeItem('coupon');
      }
    } catch (error) {
      console.error('Failed to save cart to localStorage:', error);
    }
  }, [state.items, appliedCoupon]);

  // Load cart from localStorage on initial render
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        const items = JSON.parse(savedCart);
        items.forEach((item: CartItem) => {
          dispatch({ type: 'ADD_ITEM', payload: { product: item.product, quantity: item.quantity } });
        });
      }
      
      const savedCoupon = localStorage.getItem('coupon');
      if (savedCoupon) {
        setAppliedCoupon(JSON.parse(savedCoupon));
      }
    } catch (error) {
      console.error('Failed to load cart from localStorage:', error);
    }
  }, []);

  return (
    <CartContext.Provider
      value={{
        state,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        undoAction,
        applyCoupon,
        appliedCoupon,
        subtotal,
        discount,
        gst,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
