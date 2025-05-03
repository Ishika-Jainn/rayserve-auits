
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { useDB } from '@/lib/db';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { 
  ShoppingCart, Star, Plus, Minus, Package2, Battery, Zap, Puzzle 
} from 'lucide-react';

const Shop = () => {
  const { products, getProducts, addToCart, getCart } = useDB();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  
  const { count: cartCount } = getCart();
  
  const getFilteredProducts = (category?: string) => {
    if (category === "all") return getProducts();
    return getProducts(category);
  };
  
  const handleAddToCart = (productId: string) => {
    addToCart(productId, 1);
    toast.success("Added to cart");
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
  
  const productVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hover: { scale: 1.03, transition: { duration: 0.2 } }
  };
  
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'panel': return <Package2 className="h-4 w-4 mr-1" />;
      case 'battery': return <Battery className="h-4 w-4 mr-1" />;
      case 'inverter': return <Zap className="h-4 w-4 mr-1" />;
      case 'accessory': return <Puzzle className="h-4 w-4 mr-1" />;
      default: return null;
    }
  };

  return (
    <MainLayout>
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2 animate-fade-in">Solar Products Shop</h1>
          <p className="text-gray-600 mb-4">
            Browse our selection of high-quality solar products to power your home sustainably
          </p>
        </div>
        
        <Button 
          variant="outline" 
          className="hover:bg-solar-primary hover:text-white transition-colors" 
          onClick={() => navigate('/cart')}
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Cart
          {cartCount > 0 && (
            <Badge variant="destructive" className="ml-2">{cartCount}</Badge>
          )}
        </Button>
      </div>

      <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory}>
        <TabsList className="mb-6 bg-gray-100">
          <TabsTrigger value="all">All Products</TabsTrigger>
          <TabsTrigger value="panel">Solar Panels</TabsTrigger>
          <TabsTrigger value="battery">Batteries</TabsTrigger>
          <TabsTrigger value="inverter">Inverters</TabsTrigger>
          <TabsTrigger value="accessory">Accessories</TabsTrigger>
        </TabsList>
        
        {["all", "panel", "battery", "inverter", "accessory"].map((category) => (
          <TabsContent key={category} value={category} className="focus-visible:outline-none focus-visible:ring-0 border-0">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {getFilteredProducts(category === "all" ? undefined : category).map((product) => (
                <motion.div
                  key={product.id}
                  className="bg-white rounded-lg overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-shadow"
                  variants={productVariants}
                  whileHover="hover"
                  layout
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                    />
                    {product.discountPrice && (
                      <Badge className="absolute top-2 right-2 bg-red-500">SALE</Badge>
                    )}
                    <Badge className="absolute top-2 left-2 flex items-center bg-yellow-500 text-dark">
                      {getCategoryIcon(product.category)}
                      {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                    </Badge>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-1 line-clamp-1">{product.name}</h3>
                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                        />
                      ))}
                      <span className="text-xs text-gray-600 ml-1">({product.rating})</span>
                    </div>
                    
                    <p className="text-gray-600 text-sm line-clamp-2 mb-3">{product.description}</p>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        {product.discountPrice ? (
                          <>
                            <span className="text-xl font-bold text-solar-primary">₹{(product.discountPrice / 100).toFixed(2)}</span>
                            <span className="text-gray-500 line-through text-sm ml-2">
                              ₹{(product.price / 100).toFixed(2)}
                            </span>
                          </>
                        ) : (
                          <span className="text-xl font-bold text-solar-primary">₹{(product.price / 100).toFixed(2)}</span>
                        )}
                      </div>
                      
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => navigate(`/products/${product.id}`)}
                          variant="outline"
                          className="hover:bg-gray-100"
                        >
                          Details
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleAddToCart(product.id)}
                          className="bg-solar-primary hover:bg-opacity-90 hover:scale-105"
                        >
                          <ShoppingCart className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
        ))}
      </Tabs>
    </MainLayout>
  );
};

export default Shop;
