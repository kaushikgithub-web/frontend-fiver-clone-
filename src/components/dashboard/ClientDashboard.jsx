import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingBag, 
  MessageCircle, 
  Star, 
  Search,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { orders, gigs } from '../../data/dummyData';

const ClientDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // Get client's data
  const clientOrders = orders.filter(order => order.buyerId === user.id);
  
  const stats = {
    totalOrders: clientOrders.length,
    activeOrders: clientOrders.filter(order => order.status === 'In Progress').length,
    completedOrders: clientOrders.filter(order => order.status === 'Completed').length,
    totalSpent: clientOrders.reduce((sum, order) => sum + order.price, 0)
  };

  const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center">
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon size={24} className="text-white" />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Orders"
          value={stats.totalOrders}
          icon={ShoppingBag}
          color="bg-blue-500"
        />
        <StatCard
          title="Active Orders"
          value={stats.activeOrders}
          icon={Clock}
          color="bg-yellow-500"
        />
        <StatCard
          title="Completed Orders"
          value={stats.completedOrders}
          icon={CheckCircle}
          color="bg-green-500"
        />
        <StatCard
          title="Total Spent"
          value={`$${stats.totalSpent}`}
          icon={Star}
          color="bg-purple-500"
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/gigs"
            className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Search className="text-primary" size={20} />
            <span className="font-medium">Browse Services</span>
          </Link>
          <Link
            to="/orders"
            className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <ShoppingBag className="text-primary" size={20} />
            <span className="font-medium">View Orders</span>
          </Link>
          <Link
            to="/messages"
            className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <MessageCircle className="text-primary" size={20} />
            <span className="font-medium">Messages</span>
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'orders'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              My Orders
            </button>
            <button
              onClick={() => setActiveTab('favorites')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'favorites'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Favorites
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
                  <div className="space-y-4">
                    {clientOrders.slice(0, 3).map((order) => (
                      <div key={order.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                        <div className={`w-3 h-3 rounded-full ${
                          order.status === 'Completed' ? 'bg-green-500' :
                          order.status === 'In Progress' ? 'bg-blue-500' :
                          order.status === 'Delivered' ? 'bg-yellow-500' : 'bg-gray-500'
                        }`}></div>
                        <div className="flex-1">
                          <p className="font-medium">{order.gigTitle}</p>
                          <p className="text-sm text-gray-600">{order.sellerName}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-medium text-primary">${order.price}</span>
                          <p className="text-xs text-gray-500">{order.status}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-4">Recommended Services</h3>
                  <div className="space-y-4">
                    {gigs.slice(0, 3).map((gig) => (
                      <div key={gig.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                        <img
                          src={gig.image}
                          alt={gig.title}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-sm">{gig.title}</p>
                          <div className="flex items-center space-x-2 text-xs text-gray-600">
                            <Star size={12} className="text-yellow-400 fill-current" />
                            <span>{gig.rating}</span>
                            <span>({gig.reviews})</span>
                          </div>
                        </div>
                        <span className="text-sm font-medium text-primary">${gig.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">My Orders</h3>
              <div className="space-y-4">
                {clientOrders.map((order) => (
                  <div key={order.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{order.gigTitle}</h4>
                      <span className={`badge ${
                        order.status === 'Completed' ? 'badge-success' :
                        order.status === 'In Progress' ? 'badge-info' :
                        order.status === 'Delivered' ? 'badge-warning' : 'badge-error'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>Seller: {order.sellerName}</span>
                      <span className="font-medium text-primary">${order.price}</span>
                    </div>
                    <div className="mt-2 text-sm text-gray-600">
                      <p>Order Date: {new Date(order.orderDate).toLocaleDateString()}</p>
                      <p>Delivery Date: {new Date(order.deliveryDate).toLocaleDateString()}</p>
                    </div>
                    <div className="mt-3 flex space-x-2">
                      <Link
                        to={`/order/${order.id}`}
                        className="text-primary hover:text-blue-600 text-sm font-medium"
                      >
                        View Details
                      </Link>
                      <Link
                        to={`/messages?order=${order.id}`}
                        className="text-primary hover:text-blue-600 text-sm font-medium"
                      >
                        Message Seller
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'favorites' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Favorite Services</h3>
              <div className="text-center py-8">
                <p className="text-gray-600">You haven't saved any services yet.</p>
                <Link to="/gigs" className="btn-primary mt-4">
                  Browse Services
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;