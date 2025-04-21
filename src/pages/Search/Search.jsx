import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiSliders, FiFilter, FiTag, FiMapPin, FiStar, FiCreditCard, FiShield, FiLock, FiWifi, FiClock, FiX, FiChevronRight, FiChevronDown, FiRefresh } from 'react-icons/fi';
import { MdAttachMoney, MdDirectionsCar, MdOutlineLocalParking } from 'react-icons/md';
import { BsFilterLeft, BsShieldFillCheck, BsFacebook, BsTwitter, BsInstagram, BsLinkedin, BsHeartFill } from 'react-icons/bs';
import { BiSolidCarWash, BiSolidCctv } from 'react-icons/bi';
import { FiSearchLocation, FiChevronLeft } from 'react-icons/fi';
import { AppContext } from '../../context/AppContext';
import { convertUSDtoINR } from '../../utils/currency';
import './Search.css';

// SearchFallback component shown when there's an error
const SearchFallback = () => (
  <div className="search-fallback animate-fadeIn">
    <div className="fallback-icon animate-pulse">
      <FiX />
    </div>
    <h2 className="fallback-title animate-slideUp">Oops, something went wrong!</h2>
    <p className="fallback-text animate-slideUp" style={{ '--delay': '0.1s' }}>
      We're having trouble loading the search results. Please try again later.
    </p>
    <Link to="/" className="fallback-button animate-slideUp" style={{ '--delay': '0.2s' }}>
      Back to Home
    </Link>
  </div>
);

const Search = () => {
  // Get parking spot data from context
  const { parkingSpots, isLoading: contextLoading, error: contextError } = useContext(AppContext);
  
  // State variables
  const [filters, setFilters] = useState({
    priceRange: 'all',
    availability: 'all',
    distance: 'all',
    features: {
      covered: false,
      security: false,
      electric: false,
      handicap: false,
      overnight: false
    },
    rating: 0
  });
  
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState('recommended');
  const [filteredSpots, setFilteredSpots] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [animatedItems, setAnimatedItems] = useState({});
  
  // References
  const searchInputRef = useRef(null);
  
  // Initialize loading and set filtered spots when spots are available
  useEffect(() => {
    if (contextError) {
      setError(contextError);
      setIsLoading(false);
      return;
    }
    
    if (parkingSpots) {
      setIsLoading(false);
      filterSpots();
    }
  }, [parkingSpots, contextError]);
  
  // Animation effects for search results
  useEffect(() => {
    if (!isLoading && filteredSpots.length > 0) {
      const animationTimers = {};
      
      filteredSpots.forEach((spot, index) => {
        animationTimers[spot.id] = setTimeout(() => {
          setAnimatedItems(prev => ({
            ...prev,
            [spot.id]: true
          }));
        }, index * 150); // 150ms staggered delay between items
      });
      
      return () => {
        // Cleanup timers on unmount
        Object.values(animationTimers).forEach(timer => clearTimeout(timer));
      };
    }
  }, [isLoading, filteredSpots]);
  
  // Auto-focus search input on component mount
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);
  
  const handleFilterChange = (filterType, value) => {
    if (filterType === 'features') {
      // For features, toggle the boolean value
      setFilters({
        ...filters,
        features: {
          ...filters.features,
          [value]: !filters.features[value]
        }
      });
    } else {
      // For other filters, just set the value
      setFilters({
        ...filters,
        [filterType]: value
      });
    }
  };
  
  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };
  
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    filterSpots();
  };
  
  const resetFilters = () => {
    setFilters({
      priceRange: 'all',
      availability: 'all',
      distance: 'all',
      features: {
        covered: false,
        security: false,
        electric: false,
        handicap: false,
        overnight: false
      },
      rating: 0
    });
    setQuery('');
    setSortBy('recommended');
    
    // Reset animation state
    setAnimatedItems({});
    
    // Trigger animation effect
    setTimeout(() => {
      filterSpots();
    }, 10);
  };
  
  const toggleMobileFilters = () => {
    setShowMobileFilters(!showMobileFilters);
  };
  
  const filterSpots = () => {
    if (!parkingSpots) return;
    
    let spots = [...parkingSpots];
    
    // Apply search query filter
    if (query.trim() !== '') {
      const lowercaseQuery = query.toLowerCase();
      spots = spots.filter(spot => 
        spot.name.toLowerCase().includes(lowercaseQuery) || 
        spot.address.toLowerCase().includes(lowercaseQuery)
      );
    }
    
    // Apply price range filter
    if (filters.priceRange !== 'all') {
      spots = spots.filter(spot => {
        if (filters.priceRange === 'low') {
          return spot.price < 5;
        } else if (filters.priceRange === 'medium') {
          return spot.price >= 5 && spot.price <= 10;
        } else if (filters.priceRange === 'high') {
          return spot.price > 10;
        }
        return true;
      });
    }
    
    // Apply availability filter
    if (filters.availability !== 'all') {
      spots = spots.filter(spot => {
        if (filters.availability === 'available') {
          return spot.available_spots > 0;
        } else if (filters.availability === 'full') {
          return spot.available_spots === 0;
        }
        return true;
      });
    }
    
    // Apply features filter
    const activeFeatures = Object.entries(filters.features)
      .filter(([_, isActive]) => isActive)
      .map(([feature, _]) => feature);
    
    if (activeFeatures.length > 0) {
      spots = spots.filter(spot => 
        activeFeatures.every(feature => spot.features.includes(feature))
      );
    }
    
    // Apply distance filter
    if (filters.distance !== 'all') {
      spots = spots.filter(spot => {
        if (filters.distance === 'near') {
          return spot.distance < 1;
        } else if (filters.distance === 'medium') {
          return spot.distance < 5;
        } else if (filters.distance === 'far') {
          return spot.distance < 10;
        }
        return true;
      });
    }
    
    // Apply rating filter
    if (filters.rating > 0) {
      spots = spots.filter(spot => spot.rating >= filters.rating);
    }
    
    // Apply sorting
    if (sortBy === 'price_low') {
      spots.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price_high') {
      spots.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      spots.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'distance') {
      spots.sort((a, b) => a.distance - b.distance);
    } else if (sortBy === 'availability') {
      spots.sort((a, b) => b.available_spots - a.available_spots);
    }
    
    // Reset animation state for new results
    setAnimatedItems({});
    
    // Update state with filtered spots
    setFilteredSpots(spots);
  };
  
  // Apply filters whenever they change
  useEffect(() => {
    filterSpots();
  }, [filters, sortBy, parkingSpots]);
  
  // If there's an error, show fallback component
  if (error) {
    return <SearchFallback />;
  }
  
  // Feature icon mapping
  const featureIcons = {
    covered: <MdDirectionsCar />,
    security: <FiShield />,
    electric: <FiLock />,
    handicap: <FiWifi />,
    overnight: <FiClock />
  };
  
  return (
    <div className="search-page">
      {/* Header Section */}
      <header className="search-header">
        <div className="search-container">
          <h1 className="search-title">Find Your Perfect Parking Spot</h1>
          <p className="search-subtitle">Search from thousands of parking spots near you</p>
          <form onSubmit={handleSearchSubmit} className="search-form">
            <div className="search-input-container">
              <div className="icon-search">
                <FiSearch size={20} />
              </div>
              <input
                type="text"
                placeholder="Enter a location or address"
                value={query}
                onChange={handleSearchChange}
                className="search-input"
              />
            </div>
            <button type="submit" className="search-button">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon-search">
                <circle cx="11" cy="11" r="8" stroke="white" strokeWidth="2" />
                <line x1="19.4142" y1="19.4142" x2="16.5" y2="16.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
              SEARCH
            </button>
          </form>
          <button 
            onClick={toggleMobileFilters} 
            className="filter-toggle-button"
          >
            <FiFilter size={18} />
            Show Filters
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="search-container">
        {/* Filters and Results */}
        <div className="search-main">
          <div className="map-results-container">
            {/* Filters Section */}
            <div className={`filters-container ${showMobileFilters ? 'show-mobile' : ''}`}>
              <div className="filters-title">
                <h2>Filters</h2>
                <button onClick={resetFilters} className="reset-button">
                  <FiRefresh size={18} />
                  Reset
                </button>
              </div>
              {/* Price Range Filter */}
              <div className="filter-group">
                <h3 className="filter-group-title">Price Range</h3>
                <div className="filter-select-container">
                  <select 
                    className="filter-select" 
                    value={filters.priceRange}
                    name="priceRange"
                    onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                  >
                    <option value="all">All Prices</option>
                    <option value="low">Low (Less than ₹400)</option>
                    <option value="medium">Medium (₹400 - ₹800)</option>
                    <option value="high">High (More than ₹800)</option>
                  </select>
                  <div className="select-arrow">
                    <FiChevronDown size={20} />
                  </div>
                </div>
              </div>
              
              {/* Availability Filter */}
              <div className="filter-group">
                <h3 className="filter-group-title">Availability</h3>
                <div className="filter-options">
                  <label className="filter-checkbox">
                    <input 
                      type="checkbox" 
                      name="availability" 
                      value="available"
                      checked={filters.availability === 'available'}
                      onChange={(e) => handleFilterChange('availability', e.target.value)}
                    />
                    <span className="checkbox-text">Available Now</span>
                  </label>
                  <label className="filter-checkbox">
                    <input 
                      type="checkbox" 
                      name="availability" 
                      value="all"
                      checked={filters.availability === 'all'}
                      onChange={(e) => handleFilterChange('availability', e.target.value)}
                    />
                    <span className="checkbox-text">Show All</span>
                  </label>
                </div>
              </div>
              
              {/* Distance Filter */}
              <div className="filter-group">
                <h3 className="filter-group-title">Distance</h3>
                <div className="filter-select-container">
                  <select 
                    className="filter-select" 
                    value={filters.distance}
                    name="distance"
                    onChange={(e) => handleFilterChange('distance', e.target.value)}
                  >
                    <option value="all">Any Distance</option>
                    <option value="1">Less than 1 km</option>
                    <option value="2">Less than 2 km</option>
                    <option value="5">Less than 5 km</option>
                    <option value="10">Less than 10 km</option>
                  </select>
                  <div className="select-arrow">
                    <FiChevronDown size={20} />
                  </div>
                </div>
              </div>
              
              {/* Features Filter */}
              <div className="filter-group">
                <h3 className="filter-group-title">Features</h3>
                <div className="filter-options">
                  {Object.entries(featureIcons).map(([key, icon]) => (
                    <label key={key} className="filter-checkbox">
                      <input 
                        type="checkbox" 
                        name="features" 
                        value={key}
                        checked={filters.features[key]}
                        onChange={(e) => handleFilterChange('features', key)}
                      />
                      <span className="checkbox-text">{icon} {key.charAt(0).toUpperCase() + key.slice(1)}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Rating Filter */}
              <div className="filter-group">
                <h3 className="filter-group-title">Rating</h3>
                <div className="filter-select-container">
                  <select 
                    className="filter-select" 
                    value={filters.rating}
                    name="rating"
                    onChange={(e) => handleFilterChange('rating', Number(e.target.value))}
                  >
                    <option value="0">Any Rating</option>
                    <option value="3">3+ Stars</option>
                    <option value="4">4+ Stars</option>
                    <option value="4.5">4.5+ Stars</option>
                  </select>
                  <div className="select-arrow">
                    <FiChevronDown size={20} />
                  </div>
                </div>
              </div>
              
              {/* Payment Method Filter */}
              <div className="filter-group">
                <h3 className="filter-group-title">Payment Method</h3>
                <div className="filter-options">
                  <label className="filter-checkbox">
                    <input 
                      type="checkbox" 
                      name="paymentMethod" 
                      value="cash"
                      checked={filters.paymentMethod.includes('cash')}
                      onChange={(e) => handleFilterChange('paymentMethod', e.target.value)}
                    />
                    <span className="checkbox-text">Cash</span>
                  </label>
                  <label className="filter-checkbox">
                    <input 
                      type="checkbox" 
                      name="paymentMethod" 
                      value="card"
                      checked={filters.paymentMethod.includes('card')}
                      onChange={(e) => handleFilterChange('paymentMethod', e.target.value)}
                    />
                    <span className="checkbox-text">Card</span>
                  </label>
                  <label className="filter-checkbox">
                    <input 
                      type="checkbox" 
                      name="paymentMethod" 
                      value="upi"
                      checked={filters.paymentMethod.includes('upi')}
                      onChange={(e) => handleFilterChange('paymentMethod', e.target.value)}
                    />
                    <span className="checkbox-text">UPI</span>
                  </label>
                </div>
              </div>
            </div>
            
            {/* Results Container */}
            <div className="results-container">
              <div className="results-header">
                <div className="results-count">
                  {filteredSpots ? `${filteredSpots.length} parking spots found` : 'Loading spots...'}
                </div>
                <div className="sorting-container">
                  <label className="sorting-label">Sort by:</label>
                  <div className="filter-select-container">
                    <select 
                      className="sorting-select" 
                      value={sortBy}
                      name="sortBy"
                      onChange={(e) => setSortBy(e.target.value)}
                    >
                      <option value="relevance">Relevance</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="rating">Rating</option>
                      <option value="distance">Distance</option>
                    </select>
                    <div className="select-arrow">
                      <FiChevronDown size={20} />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="results-section">
                {isLoading ? (
                  <div className="loader-container">
                    <div className="loader"></div>
                    <p>Loading parking spots...</p>
                  </div>
                ) : error ? (
                  <SearchFallback message={error} />
                ) : filteredSpots && filteredSpots.length > 0 ? (
                  <div className="results-grid">
                    {filteredSpots.slice(0, 6).map((spot) => (
                      <div key={spot.id} className="result-card">
                        <div className="result-image-container">
                          <img 
                            src={spot.image_url || 'https://via.placeholder.com/400x200?text=Parking+Spot'} 
                            alt={spot.name} 
                            className="result-image" 
                          />
                          <div className={`result-status ${spot.available_spots > 0 ? 'badge-available' : 'badge-full'}`}>
                            {spot.available_spots > 0 ? 'Available' : 'Full'}
                          </div>
                        </div>
                        <div className="result-content">
                          <h3 className="result-title">{spot.name}</h3>
                          <div className="result-location">
                            <FiMapPin className="location-icon" /> {spot.address}
                          </div>
                          <div className="result-price">
                            <span className="price-amount">₹{convertUSDtoINR(spot.price)}</span>/hour
                          </div>
                          <div className="result-rating">
                            <FiStar className="star-icon" /> 
                            <span>{spot.rating.toFixed(1)}</span> ({spot.reviewCount} reviews)
                          </div>
                          <div className="result-features">
                            {spot.features.slice(0, 3).map((feature) => (
                              <span key={feature} className="feature-badge">
                                {featureIcons[feature]} {feature.charAt(0).toUpperCase() + feature.slice(1)}
                              </span>
                            ))}
                          </div>
                          <Link to={`/details/${spot.id}`} className="result-button">
                            View Details
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="no-results">
                    <FiSearchLocation size={48} className="no-results-icon" />
                    <h3>No parking spots found</h3>
                    <p>Try adjusting your filters or search for a different location.</p>
                  </div>
                )}
                
                {filteredSpots && filteredSpots.length > 0 && (
                  <div className="pagination">
                    <button className="pagination-button" disabled={true}>
                      <FiChevronLeft /> Previous
                    </button>
                    <div className="pagination-pages">
                      <button className="pagination-page active">1</button>
                      <button className="pagination-page">2</button>
                      <button className="pagination-page">3</button>
                    </div>
                    <button className="pagination-button">
                      Next <FiChevronRight />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer Section with Blue Background */}
      <div className="blue-background">
        <div className="footer-content">
          <div className="footer-grid">
            <div className="footer-links-column animate-slideInLeft">
              <h3>Quick Links</h3>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/search">Find Parking</Link></li>
                <li><Link to="/bookings">My Bookings</Link></li>
                <li><Link to="/about">About Us</Link></li>
              </ul>
            </div>
            
            <div className="footer-links-column animate-slideInRight">
              <h3>Support</h3>
              <ul>
                <li><Link to="/faqs">FAQs</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="footer-bottom animate-fadeIn">
            <div className="copyright">
              <p>© {new Date().getFullYear()} Parking Spot Finder. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search; 