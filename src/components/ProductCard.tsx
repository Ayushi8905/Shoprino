
import { useState } from 'react';
import { Plus, Minus, ShoppingCart } from 'lucide-react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Product } from '@/lib/data';
import { useCart } from '@/context/CartContext';
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addItem(product, quantity);
    setQuantity(1);
  };

  const increaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  return (
    <Card className="overflow-hidden h-full flex flex-col card-hover">
      <div className="relative h-48 bg-primary/10 flex items-center justify-center">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = '/placeholder.svg';
          }}
        />
        <Badge className="absolute top-2 right-2 bg-primary">{product.category}</Badge>
      </div>
      <CardContent className="p-4 flex-grow">
        <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
        <p className="text-2xl font-bold text-primary mb-2">
          {formatCurrency(product.price)}
        </p>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{product.description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex flex-col space-y-2">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={decreaseQuantity}
              disabled={quantity <= 1}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-8 text-center">{quantity}</span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={increaseQuantity}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          <Button onClick={handleAddToCart} className="flex items-center space-x-1">
            <ShoppingCart className="h-4 w-4 mr-1" />
            <span>Add</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
