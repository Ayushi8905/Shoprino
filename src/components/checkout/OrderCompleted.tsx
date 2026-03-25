
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { CheckCircle, FileDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function OrderCompleted() {
  const navigate = useNavigate();
  
  return (
    <div className="container max-w-md py-12">
      <Card className="w-full">
        <CardContent className="pt-6 text-center">
          <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4 animate-fade-in" />
          <CardTitle className="text-2xl mb-4">Order Confirmed!</CardTitle>
          <p className="mb-6">
            Your order has been placed successfully!
          </p>
          <div className="flex flex-col gap-2">
            <Button onClick={() => navigate('/profile')} className="w-full">
              View Your Orders
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
