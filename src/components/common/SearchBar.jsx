import { useState } from 'react';
import { Search, Filter } from 'lucide-react';

const SearchBar = ({ onSearch, placeholder = "Search for services..." }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-text-secondary" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-12 pr-32 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white shadow-soft text-lg placeholder-text-secondary"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-2">
          <button
            type="button"
            className="p-2 text-text-secondary hover:text-primary-500 transition-colors rounded-xl hover:bg-gray-100 mr-2"
          >
            <Filter size={20} />
          </button>
          <button
            type="submit"
            className="btn-primary px-6 py-2 text-sm font-medium"
          >
            Search
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;