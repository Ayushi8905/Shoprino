
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, MessageCircle } from 'lucide-react';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog';

const formSchema = z.object({
  fullName: z.string().min(3, 'Full name is required'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  address: z.string().min(10, 'Please enter your complete address'),
  city: z.string().min(2, 'City is required'),
  pincode: z.string().min(6, 'Please enter a valid pincode'),
  telegramChatId: z.string().optional(),
});

export type CustomerFormValues = z.infer<typeof formSchema>;

interface CustomerInfoFormProps {
  onSubmit: (values: CustomerFormValues) => void;
  isProcessing: boolean;
  hasCustomerInfo: boolean;
}

export function CustomerInfoForm({ onSubmit, isProcessing, hasCustomerInfo }: CustomerInfoFormProps) {
  const form = useForm<CustomerFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      pincode: '',
      telegramChatId: '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your full name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your phone number" {...field} />
                </FormControl>
                <FormMessage />
                <p className="text-xs text-muted-foreground mt-1">
                  We'll try to send your invoice to Telegram linked with this phone
                </p>
              </FormItem>
            )}
          />
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-4">Billing Address</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your full address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your city" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pincode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>PIN Code</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your PIN code" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        
        <div className="border border-muted rounded-md p-4 bg-muted/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Invoice Delivery</h3>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="text-xs">
                  <MessageCircle className="mr-1 h-3 w-3" />
                  What's this?
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Telegram Invoice Delivery</DialogTitle>
                  <DialogDescription>
                    <p className="mt-2">
                      Your invoice will be delivered to your Telegram account using one of these methods:
                    </p>
                    <div className="mt-4 space-y-2">
                      <p className="text-sm font-medium">Option 1: Chat ID (most reliable)</p>
                      <ol className="list-decimal ml-4 text-sm">
                        <li>Start a chat with @Shoprino_bot on Telegram</li>
                        <li>Send any message to the bot</li>
                        <li>The bot will reply with your Chat ID</li>
                        <li>Enter that ID in the Telegram Chat ID field</li>
                      </ol>
                      
                      <p className="text-sm font-medium mt-4">Option 2: Phone Number</p>
                      <p className="text-sm ml-4">
                        We'll try to send your invoice to the Telegram account linked with your phone number,
                        but this method is less reliable due to Telegram's API limitations.
                      </p>
                    </div>
                  </DialogDescription>
                </DialogHeader>
                <DialogClose asChild>
                  <Button className="mt-4">Got it</Button>
                </DialogClose>
              </DialogContent>
            </Dialog>
          </div>
          
          <FormField
            control={form.control}
            name="telegramChatId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Telegram Chat ID <span className="text-muted-foreground text-xs">(Optional but recommended)</span>
                </FormLabel>
                <div className="flex items-center gap-2">
                  <FormControl>
                    <Input placeholder="Enter your Telegram Chat ID" {...field} />
                  </FormControl>
                </div>
                <FormMessage />
                <p className="text-xs text-muted-foreground mt-1">
                  For guaranteed delivery, provide your Chat ID (overrides phone delivery)
                </p>
              </FormItem>
            )}
          />
        </div>
        
        <Button type="submit" className="w-full" disabled={isProcessing}>
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            'Generate Invoice'
          )}
        </Button>
      </form>
    </Form>
  );
}
