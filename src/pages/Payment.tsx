
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from 'sonner';
import MainLayout from '@/components/layout/MainLayout';
import { Loader2, CreditCard } from 'lucide-react';

const paymentSchema = z.object({
  cardName: z.string().min(3, { message: 'Cardholder name is required' }),
  cardNumber: z.string().min(16, { message: 'Valid card number required' }).max(19),
  expiryDate: z.string().min(4, { message: 'Valid expiry date required (MM/YY)' }),
  cvv: z.string().min(3, { message: 'Valid CVV required' }).max(4),
});

type PaymentFormValues = z.infer<typeof paymentSchema>;

const Payment = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      cardName: '',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
    },
  });
  
  const onSubmit = async (values: PaymentFormValues) => {
    setIsSubmitting(true);
    
    // Simulate payment processing
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success('Payment processed successfully!');
      form.reset();
    } catch (error) {
      toast.error('Payment failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-8">Secure Payment Gateway</h1>
      
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader className="bg-solar-primary text-white rounded-t-lg">
            <CardTitle className="flex items-center">
              <CreditCard className="mr-2 h-6 w-6" />
              Payment Details
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="cardName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Card Holder Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Name on card" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="cardNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Card Number</FormLabel>
                      <FormControl>
                        <Input placeholder="1234 5678 9012 3456" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="expiryDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Expiry Date</FormLabel>
                        <FormControl>
                          <Input placeholder="MM/YY" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="cvv"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CVV</FormLabel>
                        <FormControl>
                          <Input placeholder="123" type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="bg-gray-100 p-4 rounded-lg space-y-2">
                  <div className="flex justify-between">
                    <span>Solar Panel Installation</span>
                    <span>₹8,499.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>₹679.92</span>
                  </div>
                  <div className="flex justify-between font-bold pt-2 border-t">
                    <span>Total</span>
                    <span>₹9,178.92</span>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-solar-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isSubmitting ? 'Processing...' : 'Pay Now'}
                </Button>
                
                <div className="flex items-center justify-center space-x-2 pt-4">
                  <img src="/lovable-uploads/26729d80-833c-4803-8bd4-c04824020c9e.png" alt="Visa" className="h-6" />
                  <img src="/lovable-uploads/fd45ffd1-3d37-4c4a-b4da-59aa7e2f72dd.png" alt="Mastercard" className="h-6" />
                  <span className="text-sm text-gray-500">Secure Payment</span>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Payment;
