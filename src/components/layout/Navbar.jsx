import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  User,
  LogOut,
  Settings,
  MessageCircle,
  ShoppingBag,
  PlusCircle,
  Menu,
  X,
  Bell
} from 'lucide-react';

const ProfileAvatar = ({ user }) => {
  return (
    <div className="w-8 h-8 rounded-full overflow-hidden">
      <img
        src={user?.avatar || '/default-avatar.jpg'}
        alt={user?.name}
        className="w-full h-full object-cover ring-2 ring-primary-100"
      />
    </div>
  );
};

const Navbar = () => {
  const { user, logout, isAuthenticated, isFreelancer } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsProfileOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <nav className="bg-white shadow-soft sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-gradient-primary hover:scale-105 transition-transform duration-200">
              FreelanceHub
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/gigs" className="nav-link">
              Browse Services
            </Link>
            {isAuthenticated && (
              <>
                <Link to="/orders" className="nav-link">
                  Orders
                </Link>
                <Link to="/messages" className="nav-link relative">
                  Messages
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-error-500 rounded-full"></span>
                </Link>
                {isFreelancer && (
                  <Link to="/create-gig" className="nav-link">
                    Create Service
                  </Link>
                )}
              </>
            )}
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <button className="relative p-2 text-text-secondary hover:text-primary-500 transition-colors rounded-full hover:bg-gray-100">
                  <Bell size={20} />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-error-500 rounded-full"></span>
                </button>
                
                <div className="relative">
                  <button
                    onClick={toggleProfile}
                    className="flex items-center space-x-3 text-text-secondary hover:text-primary-500 transition-colors p-2 rounded-2xl hover:bg-gray-50"
                  >
                    <ProfileAvatar user={user} />
                    <span className="font-medium">{user?.name}</span>
                  </button>
                  
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-medium py-2 z-50 border border-gray-100">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="font-medium text-text-primary">{user?.name}</p>
                        <p className="text-sm text-text-secondary">{user?.email}</p>
                      </div>
                      <Link
                        to="/dashboard"
                        className="flex items-center px-4 py-3 text-sm text-text-secondary hover:bg-gray-50 hover:text-primary-500 transition-colors"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <User className="mr-3 h-4 w-4" />
                        Dashboard
                      </Link>
                      <Link
                        to="/profile"
                        className="flex items-center px-4 py-3 text-sm text-text-secondary hover:bg-gray-50 hover:text-primary-500 transition-colors"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <Settings className="mr-3 h-4 w-4" />
                        Profile Settings
                      </Link>
                      <hr className="my-2 border-gray-100" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-3 text-sm text-error-500 hover:bg-error-50 transition-colors"
                      >
                        <LogOut className="mr-3 h-4 w-4" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="nav-link">
                  Sign In
                </Link>
                <Link to="/register" className="btn-primary">
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-text-secondary hover:text-primary-500 transition-colors p-2 rounded-lg hover:bg-gray-100"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-soft">
          <div className="container-padding py-4 space-y-2">
            <Link
              to="/gigs"
              className="block px-4 py-3 text-text-secondary hover:text-primary-500 hover:bg-gray-50 rounded-xl transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Browse Services
            </Link>
            {isAuthenticated && (
              <>
                <Link
                  to="/orders"
                  className="block px-4 py-3 text-text-secondary hover:text-primary-500 hover:bg-gray-50 rounded-xl transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Orders
                </Link>
                <Link
                  to="/messages"
                  className="block px-4 py-3 text-text-secondary hover:text-primary-500 hover:bg-gray-50 rounded-xl transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Messages
                </Link>
                {isFreelancer && (
                  <Link
                    to="/create-gig"
                    className="block px-4 py-3 text-text-secondary hover:text-primary-500 hover:bg-gray-50 rounded-xl transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Create Service
                  </Link>
                )}
                <Link
                  to="/dashboard"
                  className="block px-4 py-3 text-text-secondary hover:text-primary-500 hover:bg-gray-50 rounded-xl transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-3 text-error-500 hover:bg-error-50 rounded-xl transition-colors"
                >
                  Sign Out
                </button>
              </>
            )}
            {!isAuthenticated && (
              <div className="pt-4 space-y-2">
                <Link
                  to="/login"
                  className="block px-4 py-3 text-text-secondary hover:text-primary-500 hover:bg-gray-50 rounded-xl transition-colors text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="block btn-primary text-center mx-4"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;