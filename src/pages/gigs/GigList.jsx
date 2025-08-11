import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, Grid, List, SlidersHorizontal } from 'lucide-react';
import axios from 'axios';

import GigCard from '../../components/common/GigCard';
import SearchBar from '../../components/common/SearchBar';
import { categories } from '../../data/dummyData'; // keep if categories are static

const GigList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [allGigs, setAllGigs] = useState([]);
  const [filteredGigs, setFilteredGigs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    minPrice: '',
    maxPrice: '',
    deliveryTime: '',
    rating: ''
  });

  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('relevance');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchGigs = async () => {
      try {
        setLoading(true);
        const res = await axios.get('https://server-fever-clone.onrender.com/api/gigs');
        console.log('Fetched gigs:', res.data);
        setAllGigs(res.data);
        setFilteredGigs(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch gigs:', err);
        setLoading(false);
      }
    };

    fetchGigs();
  }, []);
  useEffect(() => {
  setFilteredGigs(allGigs);
}, [allGigs]);

  const applyFilters = () => {
    let filtered = [...allGigs];

    filtered = filtered.filter(gig =>
  gig.category?.toLowerCase().replace(/\s+/g, '-') === filters.category?.toLowerCase()
);
    if (filters.minPrice) {
      filtered = filtered.filter(gig => gig.price >= parseInt(filters.minPrice));
    }

    if (filters.maxPrice) {
      filtered = filtered.filter(gig => gig.price <= parseInt(filters.maxPrice));
    }

    if (filters.deliveryTime) {
      filtered = filtered.filter(gig => {
        const days = parseInt(gig.deliveryTime);
        const filterDays = parseInt(filters.deliveryTime);
        return days <= filterDays;
      });
    }

    if (filters.rating) {
      filtered = filtered.filter(gig => gig.rating >= parseFloat(filters.rating));
    }

    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      default:
        break;
    }

    setFilteredGigs(filtered);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSearch = (searchTerm) => {
    if (searchTerm) {
      const filtered = allGigs.filter(gig =>
        gig.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        gig.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredGigs(filtered);
    } else {
      applyFilters();
    }
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      minPrice: '',
      maxPrice: '',
      deliveryTime: '',
      rating: ''
    });
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Browse Services</h1>
          <SearchBar onSearch={handleSearch} />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow p-6 sticky top-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Filters</h2>
                <button onClick={() => setShowFilters(!showFilters)} className="lg:hidden">
                  <SlidersHorizontal size={20} />
                </button>
              </div>

              <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={filters.category}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="">All Categories</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.name.toLowerCase().replace(/\s+/g, '-')}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.minPrice}
                      onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.maxPrice}
                      onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Time</label>
                  <select
                    value={filters.deliveryTime}
                    onChange={(e) => handleFilterChange('deliveryTime', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Any time</option>
                    <option value="1">1 day</option>
                    <option value="3">Up to 3 days</option>
                    <option value="7">Up to 7 days</option>
                    <option value="14">Up to 14 days</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Rating</label>
                  <select
                    value={filters.rating}
                    onChange={(e) => handleFilterChange('rating', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Any rating</option>
                    <option value="4">4+ stars</option>
                    <option value="4.5">4.5+ stars</option>
                    <option value="4.8">4.8+ stars</option>
                  </select>
                </div>

                <button onClick={clearFilters} className="w-full btn-secondary text-sm">
                  Clear All Filters
                </button>
              </div>
            </div>
          </div>

          {/* Main Results */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-gray-600">
                    {filteredGigs.length} services found
                  </span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded ${viewMode === 'grid' ? 'bg-primary text-white' : 'text-gray-600'}`}
                    >
                      <Grid size={18} />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded ${viewMode === 'list' ? 'bg-primary text-white' : 'text-gray-600'}`}
                    >
                      <List size={18} />
                    </button>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="relevance">Relevance</option>
                    <option value="rating">Highest Rated</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="newest">Newest</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Gigs Display */}
            {loading ? (
              <p className="text-center text-gray-500 py-12">Loading gigs...</p>
            ) : filteredGigs.length > 0 ? (
              <div className={`grid gap-6 ${
                viewMode === 'grid'
                  ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
                  : 'grid-cols-1'
              }`}>
                {filteredGigs.map((gig) => (
                  <GigCard key={gig._id} gig={gig} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Filter size={48} className="text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No services found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your filters or search terms</p>
                <button onClick={clearFilters} className="btn-primary">Clear Filters</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GigList;
