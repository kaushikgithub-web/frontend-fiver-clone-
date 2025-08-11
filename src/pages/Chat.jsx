import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Send, Phone, Video, MoreVertical, Paperclip } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../utils/axiosInstance';

const Chat = () => {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const [newMessage, setNewMessage] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(searchParams.get('order') || null);
  const [messages, setMessages] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        const ordersRes = await axiosInstance.get('/orders/my');
        setOrders(ordersRes.data);
        
        // Fetch users
        const usersRes = await axiosInstance.get('/users');
        setUsers(usersRes.data);
        
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch data', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Fetch messages when selectedOrder changes
  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedOrder) return;
      try {
        const res = await axiosInstance.get(`/api/messages/${selectedOrder}`);
        setMessages(res.data);
      } catch (error) {
        console.error('Failed to load messages', error);
      }
    };

    fetchMessages();
  }, [selectedOrder]);

  const userOrders = orders.filter(order => 
    order.buyerId === user.id || order.sellerId === user.id
  );

  const currentOrder = selectedOrder 
    ? orders.find(order => order.id === parseInt(selectedOrder))
    : null;

  const otherParty = currentOrder ? (
    user.id === currentOrder.buyerId 
      ? users.find(u => u.id === currentOrder.sellerId)
      : users.find(u => u.id === currentOrder.buyerId)
  ) : null;

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() && selectedOrder) {
      try {
        const res = await axiosInstance.post('/api/messages', {
          orderId: selectedOrder,
          message: newMessage.trim(),
        });
        setMessages((prev) => [...prev, res.data]);
        setNewMessage('');
      } catch (err) {
        console.error('Failed to send message', err);
      }
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading messages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 h-[600px]">
            {/* Chat List */}
            <div className="border-r border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Messages</h2>
              </div>
              <div className="overflow-y-auto h-full">
                {userOrders.length > 0 ? (
                  userOrders.map((order) => {
                    const otherUser = user.id === order.buyerId 
                      ? users.find(u => u.id === order.sellerId)
                      : users.find(u => u.id === order.buyerId);
                    
                    return (
                      <button
                        key={order.id}
                        onClick={() => setSelectedOrder(order.id.toString())}
                        className={`w-full p-4 text-left hover:bg-gray-50 border-b border-gray-100 ${
                          selectedOrder === order.id.toString() ? 'bg-blue-50' : ''
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <img
                            src={otherUser?.avatar || '/default-avatar.jpg'}
                            alt={otherUser?.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-gray-900 truncate">
                              {otherUser?.name || 'Unknown User'}
                            </h3>
                            <p className="text-sm text-gray-600 truncate">
                              {order.gigTitle}
                            </p>
                          </div>
                        </div>
                      </button>
                    );
                  })
                ) : (
                  <div className="p-4 text-center text-gray-500">
                    No active conversations
                  </div>
                )}
              </div>
            </div>

            <div className="col-span-2 flex flex-col">
              {selectedOrder && otherParty ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-gray-200 bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <img
                          src={otherParty.avatar || '/default-avatar.jpg'}
                          alt={otherParty.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {otherParty.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {currentOrder.gigTitle}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-400 hover:text-gray-600">
                          <Phone size={18} />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600">
                          <Video size={18} />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600">
                          <MoreVertical size={18} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.length > 0 ? (
                      messages.map((message) => (
                        <div
                          key={message._id}
                          className={`flex ${
                            message.senderId === user.id ? 'justify-end' : 'justify-start'
                          }`}
                        >
                          <div
                            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                              message.senderId === user.id
                                ? 'bg-primary text-white'
                                : 'bg-gray-200 text-gray-900'
                            }`}
                          >
                            <p className="text-sm">{message.message}</p>
                            <p className={`text-xs mt-1 ${
                              message.senderId === user.id
                                ? 'text-blue-100'
                                : 'text-gray-500'
                            }`}>
                              {formatTime(message.timestamp)}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center text-gray-500">
                        No messages yet. Start the conversation!
                      </div>
                    )}
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t border-gray-200">
                    <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                      <button
                        type="button"
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <Paperclip size={20} />
                      </button>
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                      <button
                        type="submit"
                        disabled={!newMessage.trim()}
                        className="btn-primary px-4 py-2 disabled:opacity-50"
                      >
                        <Send size={16} />
                      </button>
                    </form>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-gray-400 mb-4">
                      <Send size={48} className="mx-auto" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      {userOrders.length > 0 ? 'Select a conversation' : 'No conversations yet'}
                    </h3>
                    <p className="text-gray-600">
                      {userOrders.length > 0 
                        ? 'Choose an order from the list to start messaging'
                        : 'You currently have no active orders to chat about'}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;