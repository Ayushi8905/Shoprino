
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/context/CartContext';
import { CustomerInfoForm, CustomerFormValues } from '@/components/checkout/CustomerInfoForm';
import { OrderSummary } from '@/components/checkout/OrderSummary';
import { OrderCompleted } from '@/components/checkout/OrderCompleted';
import { generateInvoice } from '@/utils/InvoiceGenerator';
import { toast } from 'sonner';

export function CheckoutPage() {
  const { state, subtotal, discount, gst, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [customerInfo, setCustomerInfo] = useState<CustomerFormValues | null>(null);

  const onSubmit = async (values: CustomerFormValues) => {
    setIsProcessing(true);
    setCustomerInfo(values);
    
    try {
      // Generate invoice immediately
      const success = await generateInvoice({
        customerInfo: values,
        items: state.items,
        subtotal,
        discount,
        gst,
        total
      });
      
      if (success) {
        // Set completed state after successful generation
        setIsCompleted(true);
        toast.success('Invoice generated and downloaded successfully!');
        
        // Clear cart after a short delay to allow seeing the success screen
        setTimeout(() => {
          clearCart();
        }, 2000);
      } else {
        toast.error('Failed to generate invoice. Please try again.');
        setIsProcessing(false);
      }
    } catch (error) {
      console.error("Error in checkout process:", error);
      toast.error('Something went wrong. Please try again.');
      setIsProcessing(false);
    }
  };

  // Redirect if cart is empty
  if (state.items.length === 0 && !isCompleted) {
    navigate('/shop');
    return null;
  }

  if (isCompleted) {
    return <OrderCompleted />;
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <CustomerInfoForm 
                onSubmit={onSubmit} 
                isProcessing={isProcessing} 
                hasCustomerInfo={customerInfo !== null} 
              />
            </CardContent>
          </Card>
        </div>
        
        <div>
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}
