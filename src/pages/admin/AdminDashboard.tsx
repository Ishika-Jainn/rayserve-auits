
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { useDB, Ticket } from '@/lib/db';
import MainLayout from '@/components/layout/MainLayout';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, 
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Legend
} from 'recharts';
import { 
  Users, 
  Ticket as TicketIcon, 
  Clock, 
  Star, 
  CreditCard, 
  Package, 
  TrendingUp, 
  BarChart2, 
  DollarSign,
  Search,
  Plus,
  Download,
  RefreshCw
} from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { tickets, getTickets, updateTicket } = useDB();
  const [filter, setFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  
  if (!user || user.role !== 'admin') {
    // Redirect to login if not authenticated or not admin
    navigate('/login');
    return null;
  }
  
  const allTickets = getTickets();

  const filteredTickets = filter === 'all' 
    ? allTickets 
    : allTickets.filter(ticket => ticket.status === filter);
  
  // Search functionality
  const searchedTickets = searchTerm 
    ? filteredTickets.filter(ticket => 
        ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : filteredTickets;

  const handleStatusChange = (ticketId: string, newStatus: string) => {
    updateTicket(ticketId, { status: newStatus as any });
    toast.success(`Ticket status updated to ${newStatus}`);
  };
  
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'open': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-blue-100 text-blue-800';
      case 'high': return 'bg-yellow-100 text-yellow-800';
      case 'urgent': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Data for analytics charts
  const ticketStatusData = [
    { name: 'Open', value: allTickets.filter(t => t.status === 'open').length, color: '#3b82f6' },
    { name: 'In Progress', value: allTickets.filter(t => t.status === 'in-progress').length, color: '#eab308' },
    { name: 'Resolved', value: allTickets.filter(t => t.status === 'resolved').length, color: '#22c55e' },
    { name: 'Closed', value: allTickets.filter(t => t.status === 'closed').length, color: '#64748b' },
  ];

  const monthlyInstallations = [
    { month: 'Jan', count: 3, revenue: 32000 },
    { month: 'Feb', count: 4, revenue: 40000 },
    { month: 'Mar', count: 5, revenue: 52000 },
    { month: 'Apr', count: 7, revenue: 68000 },
    { month: 'May', count: 9, revenue: 92000 },
    { month: 'Jun', count: 12, revenue: 120000 },
  ];

  const weeklyResponseTime = [
    { day: 'Mon', time: 26 },
    { day: 'Tue', time: 22 },
    { day: 'Wed', time: 28 },
    { day: 'Thu', time: 20 },
    { day: 'Fri', time: 25 },
  ];

  const customerSatisfaction = [
    { month: 'Jan', score: 4.2 },
    { month: 'Feb', score: 4.5 },
    { month: 'Mar', score: 4.3 },
    { month: 'Apr', score: 4.6 },
    { month: 'May', score: 4.7 },
    { month: 'Jun', score: 4.8 },
  ];

  const ticketCategories = [
    { name: 'Technical', value: 35, color: '#8884d8' },
    { name: 'Billing', value: 25, color: '#e367ff' },
    { name: 'Installation', value: 20, color: '#32cafe' },
    { name: 'General', value: 20, color: '#ff8042' },
  ];

  const topAgents = [
    { name: 'Priya Sharma', tickets: 145, rating: 4.8 },
    { name: 'Rahul Verma', tickets: 132, rating: 4.7 },
    { name: 'Anjali Patel', tickets: 128, rating: 4.7 },
    { name: 'Vikram Singh', tickets: 117, rating: 4.6 },
    { name: 'Mira Kapoor', tickets: 106, rating: 4.5 },
  ];

  const customers = [
    { id: 1, name: 'Rajesh Kumar', email: 'rajesh@example.com', date: '2025-02-15', status: 'Active' },
    { id: 2, name: 'Meera Singh', email: 'meera@example.com', date: '2025-03-20', status: 'Pending' },
    { id: 3, name: 'Arjun Malhotra', email: 'arjun@example.com', date: '2025-01-10', status: 'Active' },
    { id: 4, name: 'Priya Reddy', email: 'priya@example.com', date: '2025-04-05', status: 'Installation' },
    { id: 5, name: 'Sunil Gupta', email: 'sunil@example.com', date: '2025-02-28', status: 'Active' },
  ];

  const installations = [
    { id: 101, customer: 'Rajesh Kumar', address: '123 Solar St', date: '2025-02-15', panels: 12, status: 'Completed' },
    { id: 102, customer: 'Meera Singh', address: '456 Energy Ave', date: '2025-03-20', panels: 8, status: 'Scheduled' },
    { id: 103, customer: 'Arjun Malhotra', address: '789 Power Blvd', date: '2025-01-10', panels: 15, status: 'Completed' },
    { id: 104, customer: 'Priya Reddy', address: '321 Sun Lane', date: '2025-04-05', panels: 10, status: 'In Progress' },
    { id: 105, customer: 'Sunil Gupta', address: '567 Green St', date: '2025-02-28', panels: 6, status: 'Completed' },
  ];

  const payments = [
    { id: 201, customer: 'Rajesh Kumar', amount: '₹12500', date: '2025-02-01', status: 'Paid' },
    { id: 202, customer: 'Meera Singh', amount: '₹8600', date: '2025-03-15', status: 'Pending' },
    { id: 203, customer: 'Arjun Malhotra', amount: '₹15200', date: '2025-01-05', status: 'Paid' },
    { id: 204, customer: 'Priya Reddy', amount: '₹10800', date: '2025-04-01', status: 'Pending' },
    { id: 205, customer: 'Sunil Gupta', amount: '₹7500', date: '2025-02-20', status: 'Paid' },
  ];

  const regionalData = [
    { name: 'Delhi', value: 35 },
    { name: 'Mumbai', value: 28 },
    { name: 'Bangalore', value: 22 },
    { name: 'Hyderabad', value: 15 },
    { name: 'Chennai', value: 12 },
    { name: 'Kolkata', value: 8 },
  ];

  const refreshData = () => {
    toast.success('Data refreshed successfully');
  };
  
  return (
    <MainLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="flex items-center gap-3">
          <Button variant="ghost" onClick={refreshData} className="flex items-center">
            <RefreshCw className="h-4 w-4 mr-2" /> Refresh Data
          </Button>
          <div className="text-sm text-gray-500">
            Welcome, <span className="font-medium">{user.name}</span>
          </div>
        </div>
      </div>
      
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-0 animate-fade-in">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">Total Customers</p>
                <h3 className="text-3xl font-bold">45</h3>
              </div>
              <div className="h-12 w-12 bg-blue-500 rounded-full flex items-center justify-center text-white">
                <Users className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-4 text-sm">
              <span className="text-green-600 font-medium">+12%</span> from last month
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-0 animate-fade-in" style={{animationDelay: "0.1s"}}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">Open Tickets</p>
                <h3 className="text-3xl font-bold">{allTickets.filter(t => t.status === 'open').length}</h3>
              </div>
              <div className="h-12 w-12 bg-yellow-500 rounded-full flex items-center justify-center text-white">
                <TicketIcon className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-4 text-sm">
              <span className="text-yellow-600 font-medium">3 urgent</span> tickets
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-0 animate-fade-in" style={{animationDelay: "0.2s"}}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">Total Revenue</p>
                <h3 className="text-3xl font-bold">₹2.3M</h3>
              </div>
              <div className="h-12 w-12 bg-green-500 rounded-full flex items-center justify-center text-white">
                <DollarSign className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-4 text-sm">
              <span className="text-green-600 font-medium">+18%</span> from last month
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-0 animate-fade-in" style={{animationDelay: "0.3s"}}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">Total Installations</p>
                <h3 className="text-3xl font-bold">38</h3>
              </div>
              <div className="h-12 w-12 bg-purple-500 rounded-full flex items-center justify-center text-white">
                <Package className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-4 text-sm">
              <span className="text-green-600 font-medium">5 new</span> this month
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6 bg-gray-100 p-1 w-full max-w-4xl mx-auto">
          <TabsTrigger value="overview" className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm">
            Overview
          </TabsTrigger>
          <TabsTrigger value="customers" className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm">
            Customers
          </TabsTrigger>
          <TabsTrigger value="installations" className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm">
            Installations
          </TabsTrigger>
          <TabsTrigger value="payments" className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm">
            Payments
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm">
            Analytics
          </TabsTrigger>
        </TabsList>

        {/* OVERVIEW TAB */}
        <TabsContent value="overview" className="space-y-6 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6 flex flex-col items-center justify-center">
                <div className="bg-purple-100 p-3 rounded-full mb-3">
                  <TicketIcon className="h-6 w-6 text-purple-600" />
                </div>
                <h4 className="text-lg font-semibold text-center">Active Tickets</h4>
                <p className="text-3xl font-bold text-purple-600 mt-1">48</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 flex flex-col items-center justify-center">
                <div className="bg-blue-100 p-3 rounded-full mb-3">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
                <h4 className="text-lg font-semibold text-center">Avg Response Time</h4>
                <p className="text-3xl font-bold text-blue-600 mt-1">24m</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 flex flex-col items-center justify-center">
                <div className="bg-green-100 p-3 rounded-full mb-3">
                  <Star className="h-6 w-6 text-green-600" />
                </div>
                <h4 className="text-lg font-semibold text-center">CSAT Score</h4>
                <p className="text-3xl font-bold text-green-600 mt-1">4.6</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 flex flex-col items-center justify-center">
                <div className="bg-orange-100 p-3 rounded-full mb-3">
                  <Users className="h-6 w-6 text-orange-600" />
                </div>
                <h4 className="text-lg font-semibold text-center">Active Users</h4>
                <p className="text-3xl font-bold text-orange-600 mt-1">142</p>
              </CardContent>
            </Card>
          </div>
          
          {/* Analytics Charts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="md:col-span-2 shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart2 className="h-5 w-5 mr-2 text-blue-500" />
                  Monthly Installations
                </CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyInstallations}>
                    <defs>
                      <linearGradient id="installationGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="count" 
                      stroke="#4f46e5" 
                      fillOpacity={1} 
                      fill="url(#installationGradient)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card className="shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TicketIcon className="h-5 w-5 mr-2 text-purple-500" />
                  Ticket Status
                </CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={ticketStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      innerRadius={40}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {ticketStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value, name) => [`${value} tickets`, name]} />
                    <Legend verticalAlign="bottom" />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-green-500" />
                  Customer Satisfaction
                </CardTitle>
              </CardHeader>
              <CardContent className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={customerSatisfaction}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                    <XAxis dataKey="month" />
                    <YAxis domain={[3.5, 5]} />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="score" 
                      stroke="#ef6c00" 
                      strokeWidth={3}
                      dot={{ fill: '#ef6c00', strokeWidth: 2, r: 6 }}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card className="shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TicketIcon className="h-5 w-5 mr-2 text-indigo-500" />
                  Tickets by Category
                </CardTitle>
              </CardHeader>
              <CardContent className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={ticketCategories}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}`}
                    >
                      {ticketCategories.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          
          {/* Top Performing Agents */}
          <Card className="shadow">
            <CardHeader>
              <CardTitle>Top Performing Agents</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead className="text-right">Tickets Resolved</TableHead>
                    <TableHead className="text-right">Rating</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topAgents.map((agent, index) => (
                    <TableRow key={index} className="hover:bg-gray-50">
                      <TableCell className="font-medium">{agent.name}</TableCell>
                      <TableCell className="text-right">{agent.tickets}</TableCell>
                      <TableCell className="text-right">
                        <span className="flex items-center justify-end">
                          {agent.rating}
                          <Star className="h-4 w-4 text-yellow-500 ml-1" fill="#eab308" />
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* CUSTOMERS TAB */}
        <TabsContent value="customers" className="animate-fade-in">
          <Card className="shadow">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Customer Management</CardTitle>
              <Button className="bg-yellow-400 text-solar-primary hover:bg-yellow-500">
                <Plus className="h-4 w-4 mr-2" /> Add New Customer
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between mb-4">
                <div className="relative w-full max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input 
                    type="text" 
                    placeholder="Search customers..." 
                    className="pl-10 pr-4 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" /> Export
                  </Button>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="installation">Installation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Install Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customers.map((customer) => (
                    <TableRow key={customer.id} className="hover:bg-gray-50">
                      <TableCell>{customer.id}</TableCell>
                      <TableCell className="font-medium">{customer.name}</TableCell>
                      <TableCell>{customer.email}</TableCell>
                      <TableCell>{customer.date}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={
                          customer.status === 'Active' ? 'bg-green-100 text-green-800' :
                          customer.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }>
                          {customer.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="link" className="h-8 px-2 text-blue-600">View</Button>
                          <Button variant="link" className="h-8 px-2 text-green-600">Edit</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              <div className="flex justify-center mt-4">
                <Button variant="outline" size="sm" className="mx-auto">
                  View All Customers
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* INSTALLATIONS TAB */}
        <TabsContent value="installations" className="animate-fade-in">
          <Card className="shadow">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Installation Management</CardTitle>
              <Button className="bg-yellow-400 text-solar-primary hover:bg-yellow-500">
                <Plus className="h-4 w-4 mr-2" /> Schedule Installation
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between mb-4">
                <div className="relative w-full max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input 
                    type="text" 
                    placeholder="Search installations..." 
                    className="pl-10 pr-4 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" /> Export
                  </Button>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Panels</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {installations.map((installation) => (
                    <TableRow key={installation.id} className="hover:bg-gray-50">
                      <TableCell>{installation.id}</TableCell>
                      <TableCell className="font-medium">{installation.customer}</TableCell>
                      <TableCell>{installation.address}</TableCell>
                      <TableCell>{installation.date}</TableCell>
                      <TableCell>{installation.panels}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={
                          installation.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          installation.status === 'Scheduled' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }>
                          {installation.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="link" className="h-8 px-2 text-blue-600">Details</Button>
                          <Button variant="link" className="h-8 px-2 text-green-600">Update</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              <div className="flex justify-center mt-4">
                <Button variant="outline" size="sm" className="mx-auto">
                  View All Installations
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* PAYMENTS TAB */}
        <TabsContent value="payments" className="animate-fade-in">
          <Card className="shadow">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Payment Records</CardTitle>
              <Button className="bg-yellow-400 text-solar-primary hover:bg-yellow-500">
                <Plus className="h-4 w-4 mr-2" /> Record Payment
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between mb-4">
                <div className="relative w-full max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input 
                    type="text" 
                    placeholder="Search payments..." 
                    className="pl-10 pr-4 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" /> Export
                  </Button>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.map((payment) => (
                    <TableRow key={payment.id} className="hover:bg-gray-50">
                      <TableCell>{payment.id}</TableCell>
                      <TableCell className="font-medium">{payment.customer}</TableCell>
                      <TableCell>{payment.amount}</TableCell>
                      <TableCell>{payment.date}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={
                          payment.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }>
                          {payment.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="link" className="h-8 px-2 text-blue-600">Receipt</Button>
                          <Button variant="link" className="h-8 px-2 text-green-600">Edit</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              <div className="flex justify-center mt-4">
                <Button variant="outline" size="sm" className="mx-auto">
                  View Payment History
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* ANALYTICS TAB */}
        <TabsContent value="analytics" className="space-y-6 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-purple-600" />
                  Installation Growth
                </CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyInstallations}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#7c3aed" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" name="Installations" fill="url(#colorRevenue)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card className="shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="h-5 w-5 mr-2 text-green-600" />
                  Revenue Growth
                </CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyInstallations}>
                    <defs>
                      <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#16a34a" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#16a34a" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`₹${value}`, 'Revenue']} />
                    <Area 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#16a34a" 
                      fillOpacity={1} 
                      fill="url(#colorCount)" 
                      name="Revenue"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          
          <Card className="shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart2 className="h-5 w-5 mr-2 text-blue-600" />
                Regional Distribution
              </CardTitle>
            </CardHeader>
            <CardContent className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={regionalData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={100} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" name="Installations" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Tickets Table */}
      <Card className="mb-8 shadow">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <TicketIcon className="h-5 w-5 mr-2 text-solar-primary" />
              Support Tickets
            </CardTitle>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input 
                  type="text"
                  placeholder="Search tickets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tickets</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {searchedTickets.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No tickets to display
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {searchedTickets.map((ticket) => (
                    <TableRow key={ticket.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">{ticket.id.substring(0, 6)}</TableCell>
                      <TableCell>{ticket.title}</TableCell>
                      <TableCell>{ticket.category}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getStatusColor(ticket.status)}>
                          {ticket.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getPriorityColor(ticket.priority)}>
                          {ticket.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(ticket.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Select 
                          value={ticket.status} 
                          onValueChange={(value) => handleStatusChange(ticket.id, value)}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue placeholder="Change Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="open">Open</SelectItem>
                            <SelectItem value="in-progress">In Progress</SelectItem>
                            <SelectItem value="resolved">Resolved</SelectItem>
                            <SelectItem value="closed">Closed</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </MainLayout>
  );
};

export default AdminDashboard;
