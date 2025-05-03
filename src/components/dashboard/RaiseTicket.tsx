
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useDB } from '@/lib/db';
import { useAuth } from '@/contexts/AuthContext';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const quickTicketSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters.' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters.' }),
  category: z.string().min(1, { message: 'Please select a category.' }),
  priority: z.string().min(1, { message: 'Please select a priority level.' }),
});

type QuickTicketFormValues = z.infer<typeof quickTicketSchema>;

const categories = [
  { value: 'technical', label: 'Technical Issue' },
  { value: 'billing', label: 'Billing Inquiry' },
  { value: 'installation', label: 'Installation' },
  { value: 'maintenance', label: 'Maintenance Request' },
  { value: 'general', label: 'General Inquiry' },
];

const priorities = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'urgent', label: 'Urgent' },
];

const RaiseTicket: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { user } = useAuth();
  const { addTicket } = useDB();
  
  const form = useForm<QuickTicketFormValues>({
    resolver: zodResolver(quickTicketSchema),
    defaultValues: {
      title: '',
      description: '',
      category: '',
      priority: 'medium',
    },
  });
  
  const onSubmit = async (values: QuickTicketFormValues) => {
    if (!user) {
      toast.error('You must be logged in to submit a ticket.');
      return;
    }
    
    setIsSubmitting(true);
    setIsSuccess(false);
    
    try {
      const newTicket = addTicket({
        title: values.title,
        description: values.description,
        status: 'open',
        priority: values.priority as any,
        userId: user.id,
        category: values.category,
      });
      
      setIsSuccess(true);
      toast.success('Ticket submitted successfully!');
      form.reset();
      
      // Reset success state after a delay
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    } catch (error) {
      console.error('Error submitting ticket:', error);
      toast.error('Failed to submit ticket. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Card className="shadow-md animate-fade-in">
      <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50">
        <CardTitle className="text-xl flex items-center">
          <AlertCircle className="mr-2 h-5 w-5 text-yellow-500" />
          Raise Support Ticket
        </CardTitle>
        <CardDescription>Need help? Submit a ticket and our support team will respond shortly.</CardDescription>
      </CardHeader>
      
      <CardContent className="pt-6">
        {isSuccess ? (
          <div className="flex flex-col items-center py-8">
            <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Ticket Submitted Successfully!</h3>
            <p className="text-gray-600 text-center mb-4">
              Our support team has been notified and will address your issue shortly.
              You can track the status of your ticket in the support section.
            </p>
            <Button 
              variant="outline" 
              onClick={() => setIsSuccess(false)}
              className="mt-2"
            >
              Submit Another Ticket
            </Button>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Issue Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Brief description of your issue" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.value} value={category.value}>
                              {category.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Priority</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select priority level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {priorities.map((priority) => (
                            <SelectItem key={priority.value} value={priority.value}>
                              {priority.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Detailed Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Please provide as much detail as possible about your issue"
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex items-center space-x-2 pt-2">
                <Button 
                  type="submit" 
                  className="bg-solar-primary hover:bg-opacity-90"
                  disabled={isSubmitting}
                >
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isSubmitting ? 'Submitting...' : 'Submit Ticket'}
                </Button>
                <Button type="button" variant="outline" onClick={() => form.reset()}>
                  Reset Form
                </Button>
              </div>
            </form>
          </Form>
        )}
      </CardContent>
      
      <CardFooter className="bg-gray-50 text-sm text-gray-600 flex justify-between">
        <span>Average Response Time: 24 minutes</span>
        <span className="text-blue-600 hover:underline cursor-pointer">View My Tickets</span>
      </CardFooter>
    </Card>
  );
};

export default RaiseTicket;
