// Mock database - in a real application, this would be connected to a real backend
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// User Types
export type UserRole = 'admin' | 'customer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  address?: string;
  plan?: string;
  createdAt: string;
  lastLogin?: string;
}

// Ticket Types
export type TicketStatus = 'open' | 'in-progress' | 'resolved' | 'closed';
export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  createdAt: string;
  updatedAt: string;
  userId: string;
  assignedTo?: string;
  category: string;
  attachments?: string[];
  comments?: TicketComment[];
}

export interface TicketComment {
  id: string;
  ticketId: string;
  userId: string;
  content: string;
  createdAt: string;
  isAdmin: boolean;
}

// Energy Production Data
export interface EnergyData {
  date: string;
  value: number;
}

// Payment Types
export interface Payment {
  id: string;
  userId: string;
  amount: number;
  description: string;
  status: 'pending' | 'completed' | 'failed';
  date: string;
  orderId?: string;
  method: string;
  transactionId?: string;
}

// Referral Types
export interface Referral {
  id: string;
  referrerId: string;
  referredEmail: string;
  status: 'pending' | 'signed-up' | 'converted';
  date: string;
  reward?: number;
  convertedOn?: string;
}

// Chat Message Types
export interface ChatMessage {
  id: string;
  userId: string;
  content: string;
  timestamp: string;
  isBot: boolean;
  read: boolean;
}

// E-commerce Types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  category: 'panel' | 'battery' | 'inverter' | 'accessory';
  image: string;
  rating: number;
  inStock: boolean;
  featured: boolean;
  specs?: Record<string, string>;
  stock: number;
  sku: string;
  sold: number;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface OrderItem extends CartItem {
  price: number;
  name: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  shippingAddress: string;
  paymentMethod: string;
  trackingNumber?: string;
  estimatedDelivery?: string;
  notes?: string;
}

// Track shipping and delivery
export interface Tracking {
  orderId: string;
  trackingNumber: string;
  carrier: string;
  status: 'in-transit' | 'delivered' | 'exception' | 'out-for-delivery';
  estimatedDelivery: string;
  updates: TrackingUpdate[];
}

export interface TrackingUpdate {
  date: string;
  status: string;
  location: string;
  description: string;
}

// Database Store Type
interface DBState {
  users: User[];
  tickets: Ticket[];
  energyData: Record<string, EnergyData[]>;
  payments: Payment[];
  referrals: Referral[];
  chatMessages: Record<string, ChatMessage[]>;
  currentUser: User | null;
  products: Product[];
  cart: CartItem[];
  orders: Order[];
  tracking: Tracking[];
  
  // Authentication
  login: (email: string, password: string, role: UserRole) => User | null;
  logout: () => void;
  
  // User Management
  getUser: (userId: string) => User | null;
  updateUser: (userId: string, userData: Partial<User>) => User | null;
  
  // Tickets
  addTicket: (ticket: Omit<Ticket, 'id' | 'createdAt' | 'updatedAt'>) => Ticket;
  updateTicket: (id: string, updates: Partial<Ticket>) => Ticket | null;
  getTickets: (userId?: string) => Ticket[];
  addTicketComment: (ticketId: string, userId: string, content: string, isAdmin: boolean) => TicketComment | null;
  
  // Chat
  addMessage: (userId: string, content: string, isBot: boolean) => void;
  getMessages: (userId: string) => ChatMessage[];
  markChatAsRead: (userId: string) => void;
  
  // E-commerce
  getProducts: (category?: string, featured?: boolean) => Product[];
  getProduct: (id: string) => Product | null;
  updateProduct: (id: string, productData: Partial<Product>) => Product | null;
  addProduct: (product: Omit<Product, 'id' | 'sold'>) => Product;
  deleteProduct: (id: string) => boolean;
  addToCart: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartItem: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCart: () => { items: CartItem[]; total: number; count: number };
  placeOrder: (shippingAddress: string, paymentMethod: string) => Order | null;
  getOrders: (userId?: string) => Order[];
  getOrder: (orderId: string) => Order | null;
  updateOrderStatus: (orderId: string, status: OrderStatus, notes?: string) => Order | null;
  addTracking: (orderId: string, trackingInfo: Omit<Tracking, 'updates'>) => Tracking;
  getTracking: (orderId: string) => Tracking | null;
  updateTracking: (orderId: string, update: TrackingUpdate) => Tracking | null;
  
  // Analytics
  getSalesAnalytics: () => { date: string; revenue: number }[];
  getProductPerformance: () => { productId: string; name: string; sold: number; revenue: number }[];
  getOrderStatistics: () => { status: OrderStatus; count: number }[];
}

// Mock Data
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Ishika',
    email: 'admin@solar.com',
    role: 'admin',
    createdAt: '2025-01-15T08:00:00Z',
    lastLogin: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Ishaan',
    email: 'customer@solar.com',
    role: 'customer',
    phone: '+1 (555) 123-4567',
    address: '123 Solar St, Sunny City',
    plan: 'Premium Solar',
    createdAt: '2025-02-10T10:30:00Z',
    lastLogin: new Date().toISOString()
  }
];

const mockTickets: Ticket[] = [
  {
    id: '101',
    title: 'Solar Panel Maintenance Required',
    description: 'My solar panels appear to be accumulating debris and need cleaning.',
    status: 'open',
    priority: 'medium',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    userId: '2',
    category: 'Maintenance',
  },
  {
    id: '102',
    title: 'Energy Production Lower Than Expected',
    description: 'My system is producing about 30% less energy than projected.',
    status: 'in-progress',
    priority: 'high',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    userId: '2',
    assignedTo: '1',
    category: 'Performance',
  },
  {
    id: '103',
    title: 'Billing Question',
    description: 'I need clarification on my recent invoice - there appear to be unexpected charges.',
    status: 'resolved',
    priority: 'medium',
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    userId: '2',
    assignedTo: '1',
    category: 'Billing',
  },
  {
    id: '104',
    title: 'App Connection Issues',
    description: 'Having trouble connecting to the monitoring app - shows offline even though system is running.',
    status: 'open',
    priority: 'urgent',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    userId: '2',
    category: 'Technical',
  },
  {
    id: '105',
    title: 'System Upgrade Inquiry',
    description: 'Interested in adding battery storage to my existing solar setup. Need consultation.',
    status: 'open',
    priority: 'low',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    userId: '2',
    category: 'Sales',
  }
];

const mockEnergyData: Record<string, EnergyData[]> = {
  '2': [
    { date: 'Jan', value: 130 },
    { date: 'Feb', value: 150 },
    { date: 'Mar', value: 195 },
    { date: 'Apr', value: 180 },
    { date: 'May', value: 190 },
    { date: 'Jun', value: 245 },
    { date: 'Jul', value: 240 }
  ]
};

const mockPayments: Payment[] = [
  {
    id: '201',
    userId: '2',
    amount: 12500,
    description: 'Initial solar panel installation payment',
    status: 'completed',
    date: '2025-02-01',
  },
  {
    id: '202',
    userId: '2',
    amount: 1200,
    description: 'Monthly maintenance plan - Q1',
    status: 'completed',
    date: '2025-03-15',
  },
  {
    id: '203',
    userId: '2',
    amount: 850,
    description: 'System monitoring subscription - Annual',
    status: 'pending',
    date: '2025-04-01',
  }
];

// Mock e-commerce products
const mockProducts: Product[] = [
  {
    id: 'p1',
    name: 'Solar Panel 450W Mono',
    description: 'High efficiency monocrystalline solar panel with 450W output. Perfect for residential installations.',
    price: 24999,
    discountPrice: 22999,
    category: 'panel',
    image: '/lovable-uploads/3e83bb9c-547a-40b0-8412-168f7db31ffd.png',
    rating: 4.7,
    inStock: true,
    featured: true,
    stock: 45,
    sku: 'SP-450M-001',
    sold: 23,
    specs: {
      'Power Output': '450W',
      'Efficiency': '21.3%',
      'Dimensions': '1755 x 1038 x 35mm',
      'Weight': '20.3kg',
      'Warranty': '25 years'
    }
  },
  {
    id: 'p2',
    name: 'Home Battery Storage 10kWh',
    description: 'Efficient home battery storage system to store excess solar energy for use during peak hours or outages.',
    price: 699999,
    category: 'battery',
    image: '/lovable-uploads/4634f387-6359-4e33-a8aa-1124783d8b87.png',
    rating: 4.9,
    inStock: true,
    featured: true,
    stock: 15,
    sku: 'HB-10KW-001',
    sold: 8,
    specs: {
      'Capacity': '10kWh',
      'Peak Power': '7kW',
      'Dimensions': '115 x 75 x 14cm',
      'Weight': '114kg',
      'Warranty': '10 years'
    }
  },
  {
    id: 'p3',
    name: 'Solar Inverter 6kW',
    description: 'High-efficiency grid-tied inverter for residential solar installations.',
    price: 129999,
    discountPrice: 119999,
    category: 'inverter',
    image: '/lovable-uploads/857df6ef-e217-4d4a-8d47-35634c2def3f.png',
    rating: 4.6,
    inStock: true,
    featured: false,
    stock: 30,
    sku: 'INV-6KW-001',
    sold: 17,
    specs: {
      'Output': '6kW',
      'Efficiency': '98.3%',
      'Dimensions': '73 x 50 x 23cm',
      'Weight': '28kg',
      'Warranty': '12 years'
    }
  },
  {
    id: 'p4',
    name: 'Solar Panel Mounting Kit',
    description: 'Complete mounting kit for roof installation of residential solar panels.',
    price: 14999,
    category: 'accessory',
    image: '/lovable-uploads/ce67e294-dd8e-4f62-82ad-4d3bb61fde7a.png',
    rating: 4.3,
    inStock: true,
    featured: false,
    stock: 60,
    sku: 'MNT-KIT-001',
    sold: 32,
    specs: {
      'Material': 'Aluminum',
      'Compatible Panels': 'Up to 20 panels',
      'Warranty': '10 years'
    }
  },
  {
    id: 'p5',
    name: 'Solar Panel 320W Poly',
    description: 'Cost-effective polycrystalline solar panel for residential use.',
    price: 17999,
    discountPrice: 15999,
    category: 'panel',
    image: '/lovable-uploads/e1ed72f7-1c39-455a-b5a2-d41feb4914e3.png',
    rating: 4.2,
    inStock: true,
    featured: false,
    stock: 40,
    sku: 'SP-320P-001',
    sold: 25,
    specs: {
      'Power Output': '320W',
      'Efficiency': '17.6%',
      'Dimensions': '1640 x 992 x 35mm',
      'Weight': '18.5kg',
      'Warranty': '20 years'
    }
  }
];

// Mock orders with enhanced data
const mockOrders = [
  {
    id: 'ord_1652345',
    userId: '2',
    items: [
      { productId: 'p1', quantity: 10 },
      { productId: 'p4', quantity: 2 }
    ],
    totalAmount: 259990,
    status: 'delivered' as OrderStatus,
    createdAt: '2025-04-15T14:30:00Z',
    updatedAt: '2025-04-20T09:15:00Z',
    shippingAddress: '123 Solar St, Sunny City, SC 12345',
    paymentMethod: 'Credit Card',
    trackingNumber: 'TRK123456789',
    estimatedDelivery: '2025-04-25',
    notes: 'Customer requested installation support.'
  },
  {
    id: 'ord_1652346',
    userId: '2',
    items: [
      { productId: 'p2', quantity: 1 }
    ],
    totalAmount: 699999,
    status: 'shipped' as OrderStatus,
    createdAt: '2025-04-28T16:45:00Z',
    updatedAt: '2025-04-29T11:30:00Z',
    shippingAddress: '123 Solar St, Sunny City, SC 12345',
    paymentMethod: 'Bank Transfer',
    trackingNumber: 'TRK987654321',
    estimatedDelivery: '2025-05-05'
  },
  {
    id: 'ord_1652347',
    userId: '2',
    items: [
      { productId: 'p3', quantity: 1 },
      { productId: 'p5', quantity: 15 }
    ],
    totalAmount: 359984,
    status: 'processing' as OrderStatus,
    createdAt: '2025-05-01T10:15:00Z',
    updatedAt: '2025-05-01T13:45:00Z',
    shippingAddress: '123 Solar St, Sunny City, SC 12345',
    paymentMethod: 'Credit Card'
  }
];

// Mock tracking data
const mockTracking: Tracking[] = [
  {
    orderId: 'ord_1652345',
    trackingNumber: 'TRK123456789',
    carrier: 'Solar Express',
    status: 'delivered',
    estimatedDelivery: '2025-04-25',
    updates: [
      {
        date: '2025-04-16T09:00:00Z',
        status: 'picked-up',
        location: 'Solar Warehouse, Mumbai',
        description: 'Package picked up by carrier'
      },
      {
        date: '2025-04-18T14:30:00Z',
        status: 'in-transit',
        location: 'Regional Hub, Delhi',
        description: 'Package in transit to destination'
      },
      {
        date: '2025-04-20T08:45:00Z',
        status: 'delivered',
        location: 'Sunny City, SC 12345',
        description: 'Package delivered'
      }
    ]
  },
  {
    orderId: 'ord_1652346',
    trackingNumber: 'TRK987654321',
    carrier: 'Solar Express',
    status: 'in-transit',
    estimatedDelivery: '2025-05-05',
    updates: [
      {
        date: '2025-04-29T10:15:00Z',
        status: 'picked-up',
        location: 'Solar Warehouse, Mumbai',
        description: 'Package picked up by carrier'
      },
      {
        date: '2025-04-30T16:20:00Z',
        status: 'in-transit',
        location: 'Regional Hub, Delhi',
        description: 'Package in transit to destination'
      }
    ]
  }
];

// Create store
export const useDB = create<DBState>()(
  persist(
    (set, get) => ({
      users: mockUsers,
      tickets: mockTickets, // Now using pre-populated tickets
      energyData: mockEnergyData,
      payments: mockPayments, // Added mock payments
      referrals: [],
      chatMessages: {},
      currentUser: null,
      products: mockProducts,
      cart: [],
      orders: mockOrders,
      tracking: mockTracking,
      
      login: (email, password, role) => {
        const user = get().users.find(u => u.email === email && u.role === role);
        if (user) {
          const updatedUser = { 
            ...user, 
            lastLogin: new Date().toISOString() 
          };
          
          set(state => ({
            currentUser: updatedUser,
            users: state.users.map(u => u.id === user.id ? updatedUser : u)
          }));
          return updatedUser;
        }
        return null;
      },
      
      logout: () => {
        set({ currentUser: null });
      },
      
      getUser: (userId) => {
        return get().users.find(user => user.id === userId) || null;
      },
      
      updateUser: (userId, userData) => {
        let updatedUser: User | null = null;
        
        set(state => {
          const users = state.users.map(user => {
            if (user.id === userId) {
              updatedUser = { ...user, ...userData };
              return updatedUser;
            }
            return user;
          });
          
          return { users };
        });
        
        return updatedUser;
      },
      
      addTicket: (ticket) => {
        const newTicket: Ticket = {
          ...ticket,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        set(state => ({ tickets: [...state.tickets, newTicket] }));
        return newTicket;
      },
      
      updateTicket: (id, updates) => {
        let updatedTicket: Ticket | null = null;
        set(state => {
          const tickets = state.tickets.map(ticket => {
            if (ticket.id === id) {
              updatedTicket = { ...ticket, ...updates, updatedAt: new Date().toISOString() };
              return updatedTicket;
            }
            return ticket;
          });
          return { tickets };
        });
        return updatedTicket;
      },
      
      getTickets: (userId) => {
        const tickets = get().tickets;
        if (userId) {
          return tickets.filter(t => t.userId === userId);
        }
        return tickets;
      },
      
      addTicketComment: (ticketId, userId, content, isAdmin) => {
        const newComment: TicketComment = {
          id: Date.now().toString(),
          ticketId,
          userId,
          content,
          createdAt: new Date().toISOString(),
          isAdmin
        };
        
        let ticketWithComment: Ticket | null = null;
        
        set(state => {
          const tickets = state.tickets.map(ticket => {
            if (ticket.id === ticketId) {
              const comments = ticket.comments || [];
              ticketWithComment = {
                ...ticket,
                comments: [...comments, newComment],
                updatedAt: new Date().toISOString()
              };
              return ticketWithComment;
            }
            return ticket;
          });
          
          return { tickets };
        });
        
        return newComment;
      },
      
      addMessage: (userId, content, isBot) => {
        const newMessage: ChatMessage = {
          id: Date.now().toString(),
          userId,
          content,
          timestamp: new Date().toISOString(),
          isBot,
          read: false
        };
        
        set(state => {
          const userMessages = state.chatMessages[userId] || [];
          return {
            chatMessages: {
              ...state.chatMessages,
              [userId]: [...userMessages, newMessage]
            }
          };
        });
      },
      
      getMessages: (userId) => {
        return get().chatMessages[userId] || [];
      },
      
      markChatAsRead: (userId) => {
        set(state => {
          const messages = state.chatMessages[userId] || [];
          const updatedMessages = messages.map(msg => ({
            ...msg,
            read: true
          }));
          
          return {
            chatMessages: {
              ...state.chatMessages,
              [userId]: updatedMessages
            }
          };
        });
      },
      
      // E-commerce methods
      getProducts: (category, featured) => {
        let products = get().products;
        if (category) {
          products = products.filter(p => p.category === category);
        }
        if (featured !== undefined) {
          products = products.filter(p => p.featured === featured);
        }
        return products;
      },
      
      getProduct: (id) => {
        return get().products.find(p => p.id === id) || null;
      },
      
      updateProduct: (id, productData) => {
        let updatedProduct: Product | null = null;
        
        set(state => {
          const products = state.products.map(product => {
            if (product.id === id) {
              updatedProduct = { ...product, ...productData };
              return updatedProduct;
            }
            return product;
          });
          
          return { products };
        });
        
        return updatedProduct;
      },
      
      addProduct: (product) => {
        const newProduct: Product = {
          ...product,
          id: `p${Date.now()}`,
          sold: 0
        };
        
        set(state => ({
          products: [...state.products, newProduct]
        }));
        
        return newProduct;
      },
      
      deleteProduct: (id) => {
        const productExists = get().products.some(p => p.id === id);
        
        if (productExists) {
          set(state => ({
            products: state.products.filter(p => p.id !== id)
          }));
          return true;
        }
        
        return false;
      },
      
      addToCart: (productId, quantity) => {
        const product = get().getProduct(productId);
        
        if (!product || !product.inStock || product.stock < quantity) {
          return;
        }
        
        set(state => {
          const existingItem = state.cart.find(item => item.productId === productId);
          if (existingItem) {
            // Check if we have enough stock
            const newQuantity = existingItem.quantity + quantity;
            if (product.stock < newQuantity) {
              return state; // Not enough stock
            }
            
            return {
              cart: state.cart.map(item => 
                item.productId === productId 
                  ? { ...item, quantity: newQuantity }
                  : item
              )
            };
          } else {
            return {
              cart: [...state.cart, { productId, quantity }]
            };
          }
        });
      },
      
      removeFromCart: (productId) => {
        set(state => ({
          cart: state.cart.filter(item => item.productId !== productId)
        }));
      },
      
      updateCartItem: (productId, quantity) => {
        const product = get().getProduct(productId);
        
        if (!product || quantity > product.stock) {
          return; // Not enough stock
        }
        
        set(state => ({
          cart: state.cart.map(item => 
            item.productId === productId ? { ...item, quantity } : item
          )
        }));
      },
      
      clearCart: () => {
        set({ cart: [] });
      },
      
      getCart: () => {
        const state = get();
        const cartItems = state.cart;
        let total = 0;
        let count = 0;
        
        cartItems.forEach(item => {
          const product = state.products.find(p => p.id === item.productId);
          if (product) {
            const price = product.discountPrice || product.price;
            total += price * item.quantity;
            count += item.quantity;
          }
        });
        
        return { items: cartItems, total, count };
      },
      
      placeOrder: (shippingAddress, paymentMethod) => {
        const state = get();
        const { currentUser, cart } = state;
        
        if (!currentUser || cart.length === 0) return null;
        
        const { total } = state.getCart();
        
        // Update product stock
        cart.forEach(item => {
          const product = state.getProduct(item.productId);
          if (product) {
            state.updateProduct(item.productId, {
              stock: product.stock - item.quantity,
              sold: product.sold + item.quantity,
              inStock: (product.stock - item.quantity) > 0
            });
          }
        });
        
        // Create payment record
        const payment: Payment = {
          id: `pay_${Date.now()}`,
          userId: currentUser.id,
          amount: total,
          description: `Payment for order ${cart.length} items`,
          status: 'completed',
          date: new Date().toISOString(),
          method: paymentMethod
        };
        
        const newOrder: Order = {
          id: `ord_${Math.floor(1000000 + Math.random() * 9000000)}`,
          userId: currentUser.id,
          items: [...cart],
          totalAmount: total,
          status: 'pending',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          shippingAddress,
          paymentMethod,
          estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        };
        
        // Update the payment with the order ID
        payment.orderId = newOrder.id;
        
        set(state => ({
          orders: [...state.orders, newOrder],
          payments: [...state.payments, payment],
          cart: [] // Clear cart after order is placed
        }));
        
        return newOrder;
      },
      
      getOrders: (userId) => {
        const orders = get().orders;
        if (userId) {
          return orders.filter(order => order.userId === userId);
        }
        return orders;
      },
      
      getOrder: (orderId) => {
        return get().orders.find(order => order.id === orderId) || null;
      },
      
      updateOrderStatus: (orderId, status, notes) => {
        let updatedOrder: Order | null = null;
        
        set(state => {
          const orders = state.orders.map(order => {
            if (order.id === orderId) {
              updatedOrder = { 
                ...order, 
                status,
                updatedAt: new Date().toISOString(),
                notes: notes ? (order.notes ? `${order.notes}\n${notes}` : notes) : order.notes
              };
              return updatedOrder;
            }
            return order;
          });
          
          return { orders };
        });
        
        return updatedOrder;
      },
      
      addTracking: (orderId, trackingInfo) => {
        const newTracking: Tracking = {
          ...trackingInfo,
          orderId,
          updates: [{
            date: new Date().toISOString(),
            status: 'picked-up',
            location: 'Solar Warehouse, Mumbai',
            description: 'Package picked up by carrier'
          }]
        };
        
        // Update order with tracking number
        get().updateOrderStatus(
          orderId, 
          'shipped', 
          `Shipped with ${trackingInfo.carrier}. Tracking number: ${trackingInfo.trackingNumber}`
        );
        
        set(state => ({
          tracking: [...state.tracking, newTracking]
        }));
        
        return newTracking;
      },
      
      getTracking: (orderId) => {
        return get().tracking.find(t => t.orderId === orderId) || null;
      },
      
      updateTracking: (orderId, update) => {
        let updatedTracking: Tracking | null = null;
        
        set(state => {
          const tracking = state.tracking.map(t => {
            if (t.orderId === orderId) {
              updatedTracking = {
                ...t,
                updates: [...t.updates, update],
                status: update.status as 'in-transit' | 'delivered' | 'exception' | 'out-for-delivery'
              };
              return updatedTracking;
            }
            return t;
          });
          
          return { tracking };
        });
        
        return updatedTracking;
      },
      
      getSalesAnalytics: () => {
        const orders = get().orders;
        const analytics: { [key: string]: number } = {};
        
        orders.forEach(order => {
          const date = new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
          analytics[date] = (analytics[date] || 0) + order.totalAmount;
        });
        
        return Object.entries(analytics).map(([date, revenue]) => ({
          date,
          revenue
        }));
      },
      
      getProductPerformance: () => {
        const products = get().products;
        return products.map(product => ({
          productId: product.id,
          name: product.name,
          sold: product.sold,
          revenue: product.sold * (product.discountPrice || product.price)
        }));
      },
      
      getOrderStatistics: () => {
        const orders = get().orders;
        const stats: { [key in OrderStatus]: number } = {
          'pending': 0,
          'processing': 0,
          'shipped': 0,
          'delivered': 0,
          'cancelled': 0
        };
        
        orders.forEach(order => {
          stats[order.status] += 1;
        });
        
        return Object.entries(stats).map(([status, count]) => ({
          status: status as OrderStatus,
          count
        }));
      }
    }),
    {
      name: 'solar-database'
    }
  )
);
