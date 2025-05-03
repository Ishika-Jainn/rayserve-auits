
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowRight, ShoppingBag, Home, Truck, Calendar, Package } from 'lucide-react';
import { motion } from 'framer-motion';
import { useDB } from '@/lib/db';
import { toast } from 'sonner';
import { Order } from '@/lib/db';

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { getOrders, getProduct } = useDB();
  const orderId = location.state?.orderId;
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  
  // If no order ID is provided, redirect to shop
  useEffect(() => {
    if (!orderId) {
      navigate('/shop');
      return;
    }
    
    // Fetch the order data
    const fetchOrder = () => {
      setLoading(true);
      try {
        const orders = getOrders();
        const foundOrder = orders.find(o => o.id === orderId);
        
        if (foundOrder) {
          setOrder(foundOrder);
          toast.success("Order information retrieved successfully");
        } else {
          toast.error("Order not found");
          navigate('/shop');
        }
      } catch (error) {
        console.error("Error fetching order:", error);
        toast.error("Failed to retrieve order information");
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrder();
  }, [orderId, navigate, getOrders]);
  
  if (loading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-solar-primary"></div>
        </div>
      </MainLayout>
    );
  }
  
  if (!order) return null;
  
  const getEstimatedDeliveryDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 7); // 7 days from now
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };
  
  // Calculate total items
  const totalItems = order.items.reduce((sum, item) => sum + item.quantity, 0);
  
  return (
    <MainLayout>
      <motion.div 
        className="max-w-3xl mx-auto text-center py-12"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-6">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto"
          >
            <CheckCircle className="text-green-600 w-10 h-10" />
          </motion.div>
        </div>
        
        <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
        
        <p className="text-gray-600 mb-6">
          Your order has been placed successfully. We've sent a confirmation email with all the details.
        </p>
        
        <div className="bg-gray-100 rounded-lg p-4 mb-8">
          <p className="text-sm text-gray-600">Order ID</p>
          <p className="text-xl font-medium">{order.id}</p>
          <p className="text-sm text-gray-600 mt-1">
            Placed on {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>
        
        <div className="space-y-4 mb-8 text-left">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
              <span className="font-bold text-blue-600">1</span>
            </div>
            <div>
              <h3 className="font-medium">Order Processing</h3>
              <p className="text-sm text-gray-600">We're preparing your {totalItems} item(s) for shipping</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3">
              <span className="font-bold text-gray-600">2</span>
            </div>
            <div>
              <h3 className="font-medium">Shipping</h3>
              <p className="text-sm text-gray-600">Your order will be shipped by {new Date(new Date().setDate(new Date().getDate() + 2)).toLocaleDateString()}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3">
              <span className="font-bold text-gray-600">3</span>
            </div>
            <div>
              <h3 className="font-medium">Delivery</h3>
              <p className="text-sm text-gray-600">Estimated delivery: {getEstimatedDeliveryDate()}</p>
            </div>
          </div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white border border-gray-200 rounded-lg p-4 mb-8"
        >
          <h3 className="font-bold text-lg mb-4 text-left">Order Summary</h3>
          <div className="space-y-4">
            {order.items.map((item, index) => {
              const product = getProduct(item.productId);
              if (!product) return null;
              
              return (
                <div key={index} className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-100 rounded-md overflow-hidden mr-3">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-contain" 
                      />
                    </div>
                    <div className="text-left">
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <div className="font-medium">
                    ₹{((product.discountPrice || product.price) * item.quantity / 100).toFixed(2)}
                  </div>
                </div>
              );
            })}
            
            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>₹{(order.totalAmount / 100).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm my-1">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax</span>
                <span>₹{(order.totalAmount * 0.18 / 100).toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold mt-2 pt-2 border-t">
                <span>Total</span>
                <span>₹{((order.totalAmount + order.totalAmount * 0.18) / 100).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-white border border-gray-200 rounded-lg p-4 mb-8"
        >
          <h3 className="font-bold text-lg mb-4 text-left">Delivery Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            <div>
              <h4 className="text-sm text-gray-600">Shipping Address</h4>
              <p className="font-medium">{order.shippingAddress}</p>
            </div>
            <div>
              <h4 className="text-sm text-gray-600">Payment Method</h4>
              <p className="font-medium">{order.paymentMethod}</p>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t flex gap-3 items-center">
            <Truck className="text-solar-primary" />
            <div className="text-left">
              <p className="text-sm text-gray-600">Free shipping with tracking</p>
              <p className="text-solar-primary font-medium">Tracking information will be provided soon</p>
            </div>
          </div>
        </motion.div>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button 
            onClick={() => navigate('/shop')} 
            className="bg-solar-primary hover:bg-opacity-90"
          >
            <ShoppingBag className="w-4 h-4 mr-2" />
            Continue Shopping
          </Button>
          
          <Button 
            variant="outline" 
            onClick={() => navigate('/dashboard')}
          >
            <Home className="w-4 h-4 mr-2" />
            Go to Dashboard
          </Button>
        </div>
      </motion.div>
    </MainLayout>
  );
};

export default OrderConfirmation;
