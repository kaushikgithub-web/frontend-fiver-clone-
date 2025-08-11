import { Link } from 'react-router-dom';
import { Search, Users, Shield, Star, ArrowRight, CheckCircle, Zap, Globe } from 'lucide-react';
import GigCard from '../components/common/GigCard';
import SearchBar from '../components/common/SearchBar';
import { gigs, categories } from '../data/dummyData';

const Home = () => {
  const featuredGigs = gigs.slice(0, 6);

  const handleSearch = (searchTerm) => {
    // Navigate to gigs page with search term
    console.log('Search term:', searchTerm);
  };

  const features = [
    {
      icon: Search,
      title: 'Find Perfect Services',
      description: 'Browse thousands of services or search for exactly what you need.',
      color: 'bg-primary-500'
    },
    {
      icon: Users,
      title: 'Hire Top Talent',
      description: 'Connect with skilled professionals and get your projects done.',
      color: 'bg-secondary-500'
    },
    {
      icon: Shield,
      title: 'Secure Payments',
      description: 'Your payments are protected with our secure payment system.',
      color: 'bg-accent-500'
    },
    {
      icon: Star,
      title: 'Quality Guaranteed',
      description: 'All freelancers are vetted and rated by our community.',
      color: 'bg-primary-600'
    }
  ];

  const stats = [
    { number: '50K+', label: 'Active Freelancers' },
    { number: '100K+', label: 'Projects Completed' },
    { number: '25K+', label: 'Happy Clients' },
    { number: '99%', label: 'Satisfaction Rate' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-section relative overflow-hidden">
        <div className="absolute inset-0 pattern-dots opacity-20"></div>
        <div className="max-w-7xl mx-auto container-padding relative z-10">
          <div className="text-center">
            <h1 className="text-responsive-xl font-bold mb-6 animate-fade-in">
              Find the perfect{' '}
              <span className="text-accent-300">freelance</span>{' '}
              services for your business
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100 max-w-3xl mx-auto animate-slide-up">
              Connect with skilled professionals and get your projects done with quality and speed
            </p>
            <div className="max-w-2xl mx-auto mb-8 animate-slide-up">
              <SearchBar onSearch={handleSearch} placeholder="Search for any service..." />
            </div>
            <div className="flex flex-wrap justify-center gap-4 animate-slide-up">
              <span className="text-primary-200 text-sm">Popular searches:</span>
              {['Web Design', 'Logo Design', 'Content Writing', 'SEO'].map((term) => (
                <button
                  key={term}
                  className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm text-white hover:bg-white/20 transition-all duration-200 hover:scale-105"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary-500 mb-2">
                  {stat.number}
                </div>
                <div className="text-text-secondary font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="text-center mb-12">
            <h2 className="text-responsive-lg font-bold mb-4">Popular Services</h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Explore our most in-demand categories and find the perfect service for your needs
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.slice(0, 8).map((category) => (
              <Link
                key={category.id}
                to={`/gigs?category=${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="feature-card hover-lift group"
              >
                <div className="text-4xl mb-4 group-hover:animate-bounce-gentle">{category.icon}</div>
                <h3 className="font-semibold text-text-primary group-hover:text-primary-500 transition-colors">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Gigs */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="text-center mb-12">
            <h2 className="text-responsive-lg font-bold mb-4">Featured Services</h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Discover high-quality services from our top-rated freelancers
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredGigs.map((gig) => (
              <GigCard key={gig.id} gig={gig} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/gigs" className="btn-primary inline-flex items-center space-x-2 text-lg px-8 py-4">
              <span>View All Services</span>
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="text-center mb-16">
            <h2 className="text-responsive-lg font-bold mb-4">How It Works</h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Get started in just a few simple steps
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="feature-card group">
                <div className={`${feature.color} rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="text-white" size={28} />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-text-primary">
                  {index + 1}. {feature.title}
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-responsive-lg font-bold mb-6">
                Why Choose <span className="text-gradient-primary">FreelanceHub</span>?
              </h2>
              <div className="space-y-6">
                {[
                  {
                    icon: CheckCircle,
                    title: 'Verified Professionals',
                    description: 'All freelancers go through a rigorous verification process'
                  },
                  {
                    icon: Zap,
                    title: 'Fast Delivery',
                    description: 'Get your projects completed quickly with guaranteed delivery times'
                  },
                  {
                    icon: Globe,
                    title: 'Global Talent Pool',
                    description: 'Access skilled professionals from around the world'
                  },
                  {
                    icon: Shield,
                    title: '100% Secure',
                    description: 'Your payments and data are protected with enterprise-grade security'
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="bg-primary-100 rounded-xl p-3 flex-shrink-0">
                      <item.icon className="text-primary-500" size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-text-primary mb-2">{item.title}</h4>
                      <p className="text-text-secondary">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-primary-500 to-secondary-500 rounded-3xl p-8 text-white">
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">98%</div>
                  <div className="text-primary-100 mb-6">Customer Satisfaction</div>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold">24/7</div>
                      <div className="text-sm text-primary-100">Support</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">5★</div>
                      <div className="text-sm text-primary-100">Average Rating</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent-500 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-secondary-500 rounded-full opacity-20 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="text-center">
            <h2 className="text-responsive-lg font-bold mb-6">Ready to get started?</h2>
            <p className="text-xl mb-8 text-primary-100 max-w-2xl mx-auto">
              Join thousands of satisfied customers and freelancers on our platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register" className="bg-white text-primary-500 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-100 transition-all duration-200 hover:scale-105 shadow-medium">
                Start as a Client
              </Link>
              <Link to="/register" className="btn-outline-primary border-white text-white hover:bg-white hover:text-primary-500 px-8 py-4">
                Become a Freelancer
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;