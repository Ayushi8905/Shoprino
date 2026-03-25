
import React, { useState } from 'react';
import { 
  ShoppingCart, 
  X, 
  Trash2, 
  Undo, 
  RefreshCw,
  Tag,
  CheckCircle 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { CartItem } from '@/components/CartItem';
import { useCart } from '@/context/CartContext';
import { formatCurrency } from '@/lib/utils';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

export function CartSidebar() {
  const { 
    state, 
    clearCart, 
    undoAction, 
    applyCoupon, 
    appliedCoupon,
    subtotal,
    discount,
    gst,
    total
  } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) {
      toast.error('Please login to continue with checkout');
      setIsOpen(false);
      navigate('/login');
      return;
    }
    
    if (state.items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    
    setIsOpen(false);
    navigate('/checkout');
  };

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      toast.error('Please enter a coupon code');
      return;
    }
    applyCoupon(couponCode.trim());
    setCouponCode('');
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative rounded-full"
          aria-label="Cart"
        >
          <ShoppingCart className="h-5 w-5" />
          {state.items.length > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
              {state.items.reduce((acc, item) => acc + item.quantity, 0)}
            </span>
          )}
        </Button>
      </SheetTrigger>
      
      <SheetContent className="flex flex-col h-full w-full sm:max-w-md">
        <SheetHeader className="flex flex-row items-center justify-between">
          <SheetTitle className="flex items-center">
            <ShoppingCart className="mr-2 h-5 w-5" />
            Your Cart ({state.items.reduce((acc, item) => acc + item.quantity, 0)} items)
          </SheetTitle>
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={undoAction}
              disabled={!state.previousState}
              aria-label="Undo last action"
            >
              <Undo className="h-5 w-5" />
            </Button>
            {state.items.length > 0 && (
              <Button
                variant="ghost"
                size="icon"
                onClick={clearCart}
                className="text-destructive"
                aria-label="Clear cart"
              >
                <Trash2 className="h-5 w-5" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              aria-label="Close cart"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </SheetHeader>
        
        <Separator className="my-4" />
        
        {state.items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-center">
            <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold">Your cart is empty</h3>
            <p className="text-muted-foreground mt-2">Start shopping to add items to your cart</p>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-grow pr-4">
              <div className="space-y-1">
                {state.items.map((item) => (
                  <CartItem
                    key={item.product.id}
                    product={item.product}
                    quantity={item.quantity}
                  />
                ))}
              </div>
            </ScrollArea>
            
            <div className="mt-4">
              <div className="flex items-center mb-3">
                <Tag className="h-4 w-4 mr-2 text-muted-foreground" />
                <p className="text-sm">Apply Coupon</p>
              </div>
              
              <div className="flex space-x-2 mb-4">
                <Input
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  placeholder="Enter coupon code"
                  className="w-full"
                />
                <Button onClick={handleApplyCoupon}>Apply</Button>
              </div>
              
              {appliedCoupon && (
                <div className="flex items-center bg-muted p-2 rounded-md mb-4">
                  <CheckCircle className="h-4 w-4 text-primary mr-2" />
                  <span className="text-sm">
                    Coupon <strong>{appliedCoupon.code}</strong> applied ({appliedCoupon.discount * 100}% off)
                  </span>
                </div>
              )}
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-primary">
                    <span>Discount</span>
                    <span>-{formatCurrency(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>GST (18%)</span>
                  <span>{formatCurrency(gst)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>{formatCurrency(total)}</span>
                </div>
              </div>
              
              <Button className="w-full mt-4" size="lg" onClick={handleCheckout}>
                Proceed to Checkout
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
