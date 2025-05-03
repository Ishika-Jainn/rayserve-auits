
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { useDB } from '@/lib/db';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { 
  ShoppingCart, Trash2, Plus, Minus, ArrowRight, ShoppingBag, ArrowLeft
} from 'lucide-react';

const Cart = () => {
  const navigate = useNavigate();
  const { getCart, removeFromCart, updateCartItem, getProduct, clearCart } = useDB();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  
  const { items, total, count } = getCart();
  
  const handleRemove = (productId: string) => {
    removeFromCart(productId);
    toast.success("Item removed from cart");
  };
  
  const handleQuantityChange = (productId: string, quantity: number) => {
    if (quantity > 0) {
      updateCartItem(productId, quantity);
    }
  };
  
  const handleCheckout = () => {
    if (count === 0) {
      toast.error("Your cart is empty");
      return;
    }
    
    setIsCheckingOut(true);
    setTimeout(() => {
      navigate('/checkout');
      setIsCheckingOut(false);
    }, 1000);
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold animate-fade-in">Your Cart</h1>
        <p className="text-gray-600">
          {count === 0 
            ? "Your cart is empty" 
            : `You have ${count} item${count !== 1 ? 's' : ''} in your cart`}
        </p>
      </div>
      
      {count === 0 ? (
        <div className="text-center py-16">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <ShoppingCart className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any solar products to your cart yet.
            </p>
            <Button 
              onClick={() => navigate('/shop')}
              className="bg-solar-primary hover:bg-opacity-90"
            >
              <ShoppingBag className="w-4 h-4 mr-2" />
              Browse Products
            </Button>
          </motion.div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div 
            className="lg:col-span-2"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {items.map((item) => {
              const product = getProduct(item.productId);
              if (!product) return null;
              
              return (
                <motion.div 
                  key={product.id}
                  className="bg-white rounded-lg shadow-sm mb-4 overflow-hidden hover:shadow-md transition-shadow"
                  variants={itemVariants}
                >
                  <div className="flex flex-col sm:flex-row items-center p-4">
                    <div className="w-24 h-24 flex-shrink-0 mb-4 sm:mb-0">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    
                    <div className="flex-grow px-4">
                      <h3 className="font-semibold text-lg">{product.name}</h3>
                      <p className="text-gray-600 text-sm line-clamp-1">{product.description}</p>
                      <div className="mt-1">
                        <span className="text-solar-primary font-bold">
                          ₹{((product.discountPrice || product.price) / 100).toFixed(2)}
                        </span>
                        {product.discountPrice && (
                          <span className="text-gray-500 text-sm line-through ml-2">
                            ₹{(product.price / 100).toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-center mt-4 sm:mt-0">
                      <div className="flex items-center border rounded-md">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleQuantityChange(product.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="h-8 w-8"
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleQuantityChange(product.id, item.quantity + 1)}
                          className="h-8 w-8"
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemove(product.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 ml-0 sm:ml-4 mt-2 sm:mt-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
            
            <div className="flex justify-between mt-6">
              <Button 
                variant="outline" 
                onClick={() => navigate('/shop')}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Continue Shopping
              </Button>
              
              <Button 
                variant="ghost" 
                onClick={() => {
                  clearCart();
                  toast.success("Cart cleared");
                }}
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear Cart
              </Button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-1"
          >
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Order Summary</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>₹{(total / 100).toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span>₹{(total * 0.18 / 100).toFixed(2)}</span>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex justify-between text-lg font-bold mb-6">
                  <span>Total</span>
                  <span className="text-solar-primary">₹{((total + (total * 0.18)) / 100).toFixed(2)}</span>
                </div>
                
                <Button 
                  className="w-full bg-solar-primary hover:bg-opacity-90"
                  onClick={handleCheckout}
                  disabled={isCheckingOut || count === 0}
                >
                  {isCheckingOut ? (
                    <span className="animate-pulse">Processing...</span>
                  ) : (
                    <>
                      Checkout
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
                
                <div className="mt-4 text-xs text-center text-gray-500">
                  Secure Checkout | Multiple Payment Options
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      )}
    </MainLayout>
  );
};

export default Cart;
