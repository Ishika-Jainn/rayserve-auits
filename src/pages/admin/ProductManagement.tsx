
import React, { useState } from 'react';
import { useDB } from '@/lib/db';
import AdminLayout from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Package2, Plus, Edit, Trash2, Check, X } from 'lucide-react';
import { motion } from 'framer-motion';

const ProductManagement = () => {
  const { products } = useDB();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string | undefined>(undefined);
  
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !categoryFilter || product.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const handleEdit = (productId: string) => {
    // In a real app, this would open a form to edit the product
    toast.info(`Editing product ${productId}`);
  };
  
  const handleDelete = (productId: string) => {
    // In a real app, this would prompt confirmation and delete the product
    toast.error(`Product ${productId} would be deleted`);
  };
  
  const handleAddProduct = () => {
    // In a real app, this would add a new product
    toast.success("New product would be added");
  };

  return (
    <AdminLayout>
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Product Management</h1>
          <p className="text-gray-600">
            Manage your solar product inventory
          </p>
        </div>
        
        <Button 
          onClick={handleAddProduct}
          className="mt-4 md:mt-0 bg-solar-primary hover:bg-opacity-90"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </div>
      
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="col-span-2">
              <Input 
                placeholder="Search products..." 
                value={searchTerm} 
                onChange={handleSearchChange}
                className="w-full"
              />
            </div>
            <div>
              <Select onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Categories</SelectItem>
                  <SelectItem value="panel">Solar Panels</SelectItem>
                  <SelectItem value="battery">Batteries</SelectItem>
                  <SelectItem value="inverter">Inverters</SelectItem>
                  <SelectItem value="accessory">Accessories</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Featured</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      <Package2 className="w-10 h-10 mx-auto text-gray-400 mb-2" />
                      <p>No products found</p>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProducts.map((product) => (
                    <TableRow key={product.id} className="hover:bg-gray-50">
                      <TableCell>
                        <div className="w-12 h-12 rounded-md overflow-hidden bg-gray-100">
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-full h-full object-contain" 
                          />
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        {product.name}
                        {product.discountPrice && (
                          <span className="ml-2 text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                            Sale
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="capitalize">{product.category}</TableCell>
                      <TableCell>
                        {product.discountPrice ? (
                          <div>
                            <span className="font-bold">₹{(product.discountPrice / 100).toFixed(2)}</span>
                            <span className="text-gray-500 text-xs line-through ml-2">
                              ₹{(product.price / 100).toFixed(2)}
                            </span>
                          </div>
                        ) : (
                          <span className="font-bold">₹{(product.price / 100).toFixed(2)}</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {product.inStock ? (
                          <div className="flex items-center">
                            <Check className="w-4 h-4 text-green-600 mr-1" />
                            <span>In Stock</span>
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <X className="w-4 h-4 text-red-600 mr-1" />
                            <span>Out of Stock</span>
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <Switch checked={product.featured} />
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            onClick={() => handleEdit(product.id)}
                            className="h-8 w-8 p-0"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            onClick={() => handleDelete(product.id)}
                            className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </AdminLayout>
  );
};

export default ProductManagement;
