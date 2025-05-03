
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { useDB } from '@/lib/db';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { 
  ShoppingCart, Star, ArrowLeft, Plus, Minus, TruckIcon, CheckCircle, ShieldCheckIcon 
} from 'lucide-react';

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { getProduct, addToCart } = useDB();
  const [quantity, setQuantity] = useState(1);
  
  const product = getProduct(productId || '');
  
  if (!product) {
    return (
      <MainLayout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold">Product not found</h2>
          <Button onClick={() => navigate('/shop')} className="mt-4">
            Back to Shop
          </Button>
        </div>
      </MainLayout>
    );
  }
  
  const handleAddToCart = () => {
    addToCart(product.id, quantity);
    toast.success(`${quantity} x ${product.name} added to cart`);
  };
  
  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  return (
    <MainLayout>
      <Button 
        variant="ghost" 
        onClick={() => navigate('/shop')} 
        className="mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Shop
      </Button>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg overflow-hidden"
        >
          <div className="relative aspect-square overflow-hidden">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
            />
            {product.discountPrice && (
              <Badge className="absolute top-4 right-4 text-lg bg-red-500 px-3 py-1">
                SALE
              </Badge>
            )}
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Badge className="mb-2">
            {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
          </Badge>
          
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          
          <div className="flex items-center mb-4">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i}
                className={`w-5 h-5 ${
                  i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                }`} 
              />
            ))}
            <span className="text-sm text-gray-600 ml-2">({product.rating})</span>
          </div>
          
          <div className="flex items-baseline mb-6">
            {product.discountPrice ? (
              <>
                <span className="text-3xl font-bold text-solar-primary">
                  ₹{(product.discountPrice / 100).toFixed(2)}
                </span>
                <span className="text-xl text-gray-500 line-through ml-3">
                  ₹{(product.price / 100).toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-3xl font-bold text-solar-primary">
                ₹{(product.price / 100).toFixed(2)}
              </span>
            )}
          </div>
          
          <p className="text-gray-700 mb-6">{product.description}</p>
          
          <div className="flex items-center mb-6 space-x-4">
            <div className="flex items-center border rounded-md">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={decrementQuantity}
                disabled={quantity <= 1}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="w-12 text-center">{quantity}</span>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={incrementQuantity}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            
            <Button 
              onClick={handleAddToCart}
              className="bg-solar-primary text-white px-6 py-2 hover:bg-opacity-90 transition-colors animate-pulse"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add to Cart
            </Button>
          </div>
          
          <Separator className="my-6" />
          
          <div className="space-y-4">
            <div className="flex items-center text-sm text-gray-700">
              <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
              <span>In Stock</span>
            </div>
            <div className="flex items-center text-sm text-gray-700">
              <TruckIcon className="w-5 h-5 mr-2 text-solar-primary" />
              <span>Free Shipping</span>
            </div>
            <div className="flex items-center text-sm text-gray-700">
              <ShieldCheckIcon className="w-5 h-5 mr-2 text-solar-primary" />
              <span>Warranty Included</span>
            </div>
          </div>
        </motion.div>
      </div>
      
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Specifications</h2>
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.specs && Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="flex justify-between border-b pb-2">
                  <span className="font-medium">{key}</span>
                  <span className="text-gray-700">{value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-12 mb-8">
        <h2 className="text-2xl font-bold mb-6">Related Products</h2>
        <p className="text-gray-600">Check other products in our solar solution catalog</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          <Button 
            variant="outline" 
            className="h-auto py-8 flex flex-col items-center justify-center hover:bg-gray-100 hover:border-solar-primary transition-all"
            onClick={() => navigate('/shop')}
          >
            <ShoppingCart className="w-10 h-10 mb-4 text-solar-primary" />
            <span>Browse All Products</span>
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProductDetail;
