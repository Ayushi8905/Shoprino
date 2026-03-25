
import React from 'react';
import { X, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { formatCurrency } from '@/lib/utils';
import { Product } from '@/lib/data';

interface CartItemProps {
  product: Product;
  quantity: number;
}

export function CartItem({ product, quantity }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();

  const handleIncrease = () => {
    updateQuantity(product.id, quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    } else {
      removeItem(product.id);
    }
  };

  return (
    <div className="flex items-center py-3 border-b last:border-b-0">
      <div className="w-16 h-16 bg-muted rounded overflow-hidden flex-shrink-0">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="ml-4 flex-grow">
        <h3 className="text-sm font-medium">{product.name}</h3>
        <p className="text-xs text-muted-foreground">{product.category}</p>
        <p className="text-sm font-bold mt-1">{formatCurrency(product.price)}</p>
      </div>
      
      <div className="flex items-center space-x-2">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleDecrease}>
            <Minus className="h-3 w-3" />
          </Button>
          <span className="w-8 text-center">{quantity}</span>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleIncrease}>
            <Plus className="h-3 w-3" />
          </Button>
        </div>
        
        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => removeItem(product.id)}>
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
