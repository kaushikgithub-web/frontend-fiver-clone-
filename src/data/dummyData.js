// Dummy data for the marketplace
export const categories = [
  { id: 1, name: 'Web Development', icon: '💻' },
  { id: 2, name: 'Graphic Design', icon: '🎨' },
  { id: 3, name: 'Digital Marketing', icon: '📱' },
  { id: 4, name: 'Writing & Translation', icon: '✍️' },
  { id: 5, name: 'Video & Animation', icon: '🎥' },
  { id: 6, name: 'Music & Audio', icon: '🎵' },
  { id: 7, name: 'Programming', icon: '⚡' },
  { id: 8, name: 'Business', icon: '💼' },
];

export const gigs = [
  {
    id: 1,
    title: 'I will create a modern React website for your business',
    category: 'Web Development',
    price: 150,
    deliveryTime: '5 days',
    rating: 4.9,
    reviews: 127,
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
    seller: {
      id: 1,
      name: 'John Smith',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
      level: 'Level 2',
      responseTime: '1 hour'
    },
    description: 'I will create a stunning, responsive React website that will help your business stand out online. With over 5 years of experience in web development, I deliver high-quality work that exceeds expectations.',
    features: [
      'Responsive design for all devices',
      'Modern React components',
      'SEO optimization',
      'Fast loading speed',
      'Cross-browser compatibility'
    ],
    packages: [
      { name: 'Basic', price: 150, deliveryTime: '5 days', features: ['Homepage', 'Contact page', 'Mobile responsive'] },
      { name: 'Standard', price: 300, deliveryTime: '10 days', features: ['Up to 5 pages', 'Contact form', 'SEO optimization'] },
      { name: 'Premium', price: 500, deliveryTime: '15 days', features: ['Unlimited pages', 'Admin panel', 'Advanced features'] }
    ]
  },
  {
    id: 2,
    title: 'I will design a professional logo for your brand',
    category: 'Graphic Design',
    price: 75,
    deliveryTime: '3 days',
    rating: 4.8,
    reviews: 89,
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
    seller: {
      id: 2,
      name: 'Sarah Johnson',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
      level: 'Top Rated',
      responseTime: '30 minutes'
    },
    description: 'Professional logo design services with unlimited revisions until you are 100% satisfied.',
    features: [
      'Custom logo design',
      'High-resolution files',
      'Vector formats included',
      'Commercial license',
      'Unlimited revisions'
    ],
    packages: [
      { name: 'Basic', price: 75, deliveryTime: '3 days', features: ['Logo design', 'High-res files', '3 revisions'] },
      { name: 'Standard', price: 150, deliveryTime: '5 days', features: ['Logo + variations', 'Brand guidelines', 'Unlimited revisions'] },
      { name: 'Premium', price: 300, deliveryTime: '7 days', features: ['Complete brand identity', 'Stationery design', 'Social media kit'] }
    ]
  },
  {
    id: 3,
    title: 'I will write engaging content for your website',
    category: 'Writing & Translation',
    price: 50,
    deliveryTime: '2 days',
    rating: 4.7,
    reviews: 156,
    image: 'https://images.pexels.com/photos/261763/pexels-photo-261763.jpeg?auto=compress&cs=tinysrgb&w=800',
    seller: {
      id: 3,
      name: 'Michael Brown',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150',
      level: 'Level 1',
      responseTime: '2 hours'
    },
    description: 'Professional content writing services for websites, blogs, and marketing materials.',
    features: [
      'SEO-optimized content',
      'Plagiarism-free writing',
      'Research included',
      'Fast delivery',
      'Unlimited revisions'
    ],
    packages: [
      { name: 'Basic', price: 50, deliveryTime: '2 days', features: ['Up to 500 words', 'SEO optimization', '2 revisions'] },
      { name: 'Standard', price: 100, deliveryTime: '4 days', features: ['Up to 1000 words', 'Research included', 'Unlimited revisions'] },
      { name: 'Premium', price: 200, deliveryTime: '7 days', features: ['Up to 2000 words', 'Multiple articles', 'Content strategy'] }
    ]
  }
];

export const orders = [
  {
    id: 1,
    gigId: 1,
    gigTitle: 'Modern React website development',
    buyerId: 4,
    buyerName: 'Alice Cooper',
    sellerId: 1,
    sellerName: 'John Smith',
    price: 150,
    status: 'In Progress',
    orderDate: '2024-01-15',
    deliveryDate: '2024-01-20',
    description: 'Need a modern React website for my consulting business',
    requirements: 'Homepage, about page, contact form, mobile responsive'
  },
  {
    id: 2,
    gigId: 2,
    gigTitle: 'Professional logo design',
    buyerId: 5,
    buyerName: 'David Wilson',
    sellerId: 2,
    sellerName: 'Sarah Johnson',
    price: 75,
    status: 'Delivered',
    orderDate: '2024-01-10',
    deliveryDate: '2024-01-13',
    description: 'Logo design for my tech startup',
    requirements: 'Modern, clean design with tech feel'
  },
  {
    id: 3,
    gigId: 3,
    gigTitle: 'Website content writing',
    buyerId: 4,
    buyerName: 'Alice Cooper',
    sellerId: 3,
    sellerName: 'Michael Brown',
    price: 100,
    status: 'Completed',
    orderDate: '2024-01-05',
    deliveryDate: '2024-01-09',
    description: 'Content for homepage and about page',
    requirements: 'Professional tone, SEO optimized'
  }
];

export const reviews = [
  {
    id: 1,
    gigId: 1,
    orderId: 3,
    reviewerId: 4,
    reviewerName: 'Alice Cooper',
    rating: 5,
    comment: 'Excellent work! The website looks amazing and was delivered on time.',
    date: '2024-01-10'
  },
  {
    id: 2,
    gigId: 2,
    orderId: 2,
    reviewerId: 5,
    reviewerName: 'David Wilson',
    rating: 5,
    comment: 'Perfect logo design! Sarah understood exactly what I needed.',
    date: '2024-01-14'
  }
];

export const users = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john@example.com',
    role: 'freelancer',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    level: 'Level 2',
    responseTime: '1 hour',
    completedOrders: 127,
    rating: 4.9,
    joinDate: '2023-06-15',
    skills: ['React', 'Node.js', 'JavaScript', 'HTML/CSS']
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    role: 'freelancer',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
    level: 'Top Rated',
    responseTime: '30 minutes',
    completedOrders: 89,
    rating: 4.8,
    joinDate: '2023-03-20',
    skills: ['Logo Design', 'Brand Identity', 'Graphic Design', 'Illustrator']
  },
  {
    id: 3,
    name: 'Michael Brown',
    email: 'michael@example.com',
    role: 'freelancer',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150',
    level: 'Level 1',
    responseTime: '2 hours',
    completedOrders: 156,
    rating: 4.7,
    joinDate: '2023-08-10',
    skills: ['Content Writing', 'SEO', 'Copywriting', 'Blog Writing']
  },
  {
    id: 4,
    name: 'Alice Cooper',
    email: 'alice@example.com',
    role: 'client',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    joinDate: '2023-12-01',
    ordersPlaced: 5
  },
  {
    id: 5,
    name: 'David Wilson',
    email: 'david@example.com',
    role: 'client',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150',
    joinDate: '2023-11-15',
    ordersPlaced: 3
  }
];

export const messages = [
  {
    id: 1,
    orderId: 1,
    senderId: 4,
    senderName: 'Alice Cooper',
    receiverId: 1,
    receiverName: 'John Smith',
    message: 'Hi John, I just placed an order for the React website. When can we start?',
    timestamp: '2024-01-15 10:30:00',
    read: true
  },
  {
    id: 2,
    orderId: 1,
    senderId: 1,
    senderName: 'John Smith',
    receiverId: 4,
    receiverName: 'Alice Cooper',
    message: 'Hello Alice! Thanks for the order. I can start working on it today. Could you please share more details about your business?',
    timestamp: '2024-01-15 11:15:00',
    read: true
  },
  {
    id: 3,
    orderId: 1,
    senderId: 4,
    senderName: 'Alice Cooper',
    receiverId: 1,
    receiverName: 'John Smith',
    message: 'Sure! I run a consulting business focused on digital transformation. I need a clean, professional website that showcases our services.',
    timestamp: '2024-01-15 14:20:00',
    read: false
  }
];