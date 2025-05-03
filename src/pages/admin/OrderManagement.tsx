
import React, { useState } from 'react';
import { useDB } from '@/lib/db';
import AdminLayout from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  ShoppingBag, Search, FileDown, ChevronDown, ChevronUp, Package2
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

const OrderManagement = () => {
  const { orders, getOrders, updateOrderStatus, users } = useDB();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined);
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
  
  const handleStatusChange = (orderId: string, status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled') => {
    updateOrderStatus(orderId, status);
    toast.success(`Order status updated to ${status}`);
  };
  
  const toggleOrderExpand = (orderId: string) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  const getUserInfo = (userId: string) => {
    return users.find(user => user.id === userId);
  };
  
  return (
    <AdminLayout>
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Order Management</h1>
          <p className="text-gray-600">
            Track and manage customer orders
          </p>
        </div>
        
        <Button 
          variant="outline" 
          className="mt-4 md:mt-0"
        >
          <FileDown className="w-4 h-4 mr-2" />
          Export Orders
        </Button>
      </div>
      
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Search by order ID..." 
                  value={searchTerm} 
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Select onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
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
                  <TableHead></TableHead>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      <ShoppingBag className="w-10 h-10 mx-auto text-gray-400 mb-2" />
                      <p>No orders found</p>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredOrders.map((order) => {
                    const user = getUserInfo(order.userId);
                    
                    return (
                      <React.Fragment key={order.id}>
                        <TableRow className="hover:bg-gray-50 cursor-pointer">
                          <TableCell onClick={() => toggleOrderExpand(order.id)}>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              {expandedOrderId === order.id ? (
                                <ChevronUp className="h-4 w-4" />
                              ) : (
                                <ChevronDown className="h-4 w-4" />
                              )}
                            </Button>
                          </TableCell>
                          <TableCell className="font-medium" onClick={() => toggleOrderExpand(order.id)}>
                            {order.id}
                          </TableCell>
                          <TableCell onClick={() => toggleOrderExpand(order.id)}>
                            {formatDate(order.createdAt)}
                          </TableCell>
                          <TableCell onClick={() => toggleOrderExpand(order.id)}>
                            {user?.name || 'Unknown'}
                          </TableCell>
                          <TableCell onClick={() => toggleOrderExpand(order.id)}>
                            ₹{(order.totalAmount / 100).toFixed(2)}
                          </TableCell>
                          <TableCell onClick={() => toggleOrderExpand(order.id)}>
                            <Badge className={`${getStatusColor(order.status)} capitalize`}>
                              {order.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  Change Status
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuLabel>Update Order Status</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => handleStatusChange(order.id, 'pending')}>
                                  Pending
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleStatusChange(order.id, 'processing')}>
                                  Processing
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleStatusChange(order.id, 'shipped')}>
                                  Shipped
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleStatusChange(order.id, 'delivered')}>
                                  Delivered
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem 
                                  onClick={() => handleStatusChange(order.id, 'cancelled')}
                                  className="text-red-500"
                                >
                                  Cancel Order
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                        
                        {expandedOrderId === order.id && (
                          <TableRow>
                            <TableCell colSpan={7} className="bg-gray-50 p-4">
                              <div className="space-y-4">
                                <div>
                                  <h4 className="font-semibold mb-2">Order Items</h4>
                                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {order.items.map(item => {
                                      const product = useDB.getState().getProduct(item.productId);
                                      if (!product) return null;
                                      
                                      return (
                                        <div key={item.productId} className="flex bg-white p-3 rounded-lg shadow-sm">
                                          <div className="w-12 h-12 bg-gray-100 rounded-md overflow-hidden mr-3">
                                            <img 
                                              src={product.image} 
                                              alt={product.name} 
                                              className="w-full h-full object-contain" 
                                            />
                                          </div>
                                          <div>
                                            <p className="font-medium text-sm">{product.name}</p>
                                            <div className="flex justify-between text-sm text-gray-600">
                                              <span>Qty: {item.quantity}</span>
                                              <span className="ml-4">
                                                ₹{((product.discountPrice || product.price) / 100).toFixed(2)} each
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <h4 className="font-semibold mb-2">Customer Details</h4>
                                    <div className="bg-white p-3 rounded-lg shadow-sm">
                                      <p><strong>Name:</strong> {user?.name}</p>
                                      <p><strong>Email:</strong> {user?.email}</p>
                                      <p><strong>Phone:</strong> {user?.phone || 'N/A'}</p>
                                    </div>
                                  </div>
                                  
                                  <div>
                                    <h4 className="font-semibold mb-2">Shipping Details</h4>
                                    <div className="bg-white p-3 rounded-lg shadow-sm">
                                      <p><strong>Address:</strong> {order.shippingAddress}</p>
                                      <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                          </TableRow>
                        )}
                      </React.Fragment>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </AdminLayout>
  );
};

export default OrderManagement;
