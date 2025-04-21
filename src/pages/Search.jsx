// pages/Search.jsx
import React, { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ParkingContext } from "../context/ParkingContext";
import Loader from "../components/common/Loader";
import { FaMapMarkerAlt, FaCar, FaParking, FaSearch, FaFilter, FaStar, FaArrowRight, FaSort, FaDollarSign, FaRegClock, FaCheck } from "react-icons/fa";
import "./Search/Search.css";

// Fallback component in case of rendering errors
const SearchFallback = () => (
  <div style={{
    padding: "2rem", 
    textAlign: "center", 
    minHeight: "60vh", 
    display: "flex", 
    flexDirection: "column", 
    alignItems: "center", 
    justifyContent: "center"
  }}>
    <h1 style={{ marginBottom: "1rem", color: "#3b82f6" }}>Find Parking</h1>
    <p style={{ marginBottom: "2rem" }}>Loading parking spots... Please wait.</p>
    <div style={{ 
      width: "48px", 
      height: "48px", 
      border: "5px solid #dbeafe", 
      borderBottomColor: "#3b82f6", 
      borderRadius: "50%", 
      display: "inline-block", 
      boxSizing: "border-box", 
      animation: "rotation 1s linear infinite" 
    }}></div>
  </div>
);

const Search = () => {
  try {
    const navigate = useNavigate();
    const { parkingSpots, loading, error } = useContext(ParkingContext);
    const [filter, setFilter] = useState({
      price: "all",
      availability: "all",
      distance: "all",
      features: []
    });
    const [query, setQuery] = useState("");
    const [sortBy, setSortBy] = useState("distance");
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    const [initialLoad, setInitialLoad] = useState(true);
    const [componentError, setComponentError] = useState(null);
    
    // Set initial load to false after component mounts
    useEffect(() => {
      const timer = setTimeout(() => {
        setInitialLoad(false);
      }, 100);
      
      return () => clearTimeout(timer);
    }, []);
  
    // Safety wrapper for rendering
    useEffect(() => {
      try {
        // Just a test to make sure everything is working
        if (!Array.isArray(parkingSpots) && parkingSpots !== null && parkingSpots !== undefined) {
          console.error("parkingSpots is not an array:", parkingSpots);
          setComponentError("Invalid data format. Please try again later.");
        }
      } catch (err) {
        console.error("Error in Search component:", err);
        setComponentError(err.message || "An error occurred. Please try again later.");
      }
    }, [parkingSpots]);
    
    // Filter logic - make sure to handle empty parkingSpots gracefully
    const filteredSpots = React.useMemo(() => {
      try {
        if (!Array.isArray(parkingSpots)) return [];
        
        return parkingSpots.filter(spot => {
          // Search query filter
          if (query && !spot.name.toLowerCase().includes(query.toLowerCase()) && 
              !spot.address.toLowerCase().includes(query.toLowerCase())) {
            return false;
          }
          
          // Other filters
          if (filter.availability === "available" && !spot.available) return false;
          if (filter.price === "low" && spot.price > 5) return false;
          if (filter.price === "mid" && (spot.price < 5 || spot.price > 10)) return false;
          if (filter.price === "high" && spot.price < 10) return false;
          if (filter.distance === "close" && parseFloat(spot.distance) > 1) return false;
          if (filter.distance === "medium" && (parseFloat(spot.distance) < 1 || parseFloat(spot.distance) > 3)) return false;
          if (filter.distance === "far" && parseFloat(spot.distance) < 3) return false;
          
          // Feature filters - if any features are selected, check if spot has them
          if (filter.features.length > 0) {
            // Assuming each spot has a features array
            const spotFeatures = spot.features || [];
            if (!filter.features.every(feature => spotFeatures.includes(feature))) {
              return false;
            }
          }
          
          return true;
        }).sort((a, b) => {
          if (sortBy === "distance") {
            return parseFloat(a.distance) - parseFloat(b.distance);
          } else if (sortBy === "price") {
            return a.price - b.price;
          } else if (sortBy === "price-desc") {
            return b.price - a.price;
          }
          return 0;
        });
      } catch (err) {
        console.error("Error filtering spots:", err);
        setComponentError(err.message || "An error occurred while filtering spots.");
        return [];
      }
    }, [parkingSpots, query, filter, sortBy]);
    
    const handleFilterChange = (e) => {
      const { name, value } = e.target;
      setFilter(prev => ({ ...prev, [name]: value }));
    };
  
    const handleFeatureToggle = (feature) => {
      setFilter(prev => {
        const features = [...prev.features];
        if (features.includes(feature)) {
          return { ...prev, features: features.filter(f => f !== feature) };
        } else {
          return { ...prev, features: [...features, feature] };
        }
      });
    };
  
    const resetFilters = () => {
      setFilter({
        price: "all",
        availability: "all",
        distance: "all",
        features: []
      });
      setQuery("");
    };
    
    const toggleMobileFilters = () => {
      setShowMobileFilters(!showMobileFilters);
    };
    
    if (error || componentError) {
      return (
        <div className="container py-12">
          <div className="alert alert-danger">
            <h2 className="text-xl font-bold mb-2">Error</h2>
            <p className="mb-4">{error || componentError}</p>
            <button
              onClick={() => navigate("/")}
              className="btn btn-primary"
            >
              Back to Home
            </button>
          </div>
        </div>
      );
    }
  
    // Don't render anything during the very initial load to prevent flashing
    if (initialLoad) {
      return <div className="full-page-loader"><Loader /></div>;
    }
  
    return (
      <div className="search-page">
        {/* Search Header with Search Bar */}
        <section className="search-header">
          <div className="container">
            <div className="search-header-content">
              <h1 className="search-title">Find Your Perfect Parking Spot</h1>
              <p className="search-subtitle">Compare prices, check availability and book parking in advance</p>
              
              <div className="search-form">
                <div className="search-input-group">
                  <div className="search-input-wrapper">
                    <FaSearch />
                    <input 
                      type="text" 
                      className="search-input" 
                      placeholder="Enter location, address or spot name..."
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                    />
                  </div>
                  
                  <button 
                    className="search-button"
                    onClick={() => {/* Perform search */}}
                  >
                    <FaSearch /> Search
                  </button>
                </div>
                
                <button 
                  className="filter-toggle-button d-md-none"
                  onClick={toggleMobileFilters}
                >
                  <FaFilter /> {showMobileFilters ? 'Hide Filters' : 'Show Filters'}
                </button>
              </div>
            </div>
          </div>
        </section>
        
        <div className="search-container">
          <div className="container">
            <div className="search-main">
              {/* Map and Results Container */}
              <div className="map-results-container">
                {/* Filters - Desktop (always visible) and Mobile (toggleable) */}
                <div className={`filters-container ${showMobileFilters ? 'show-mobile' : ''}`}>
                  <div className="filters-title">
                    <h2>Filters</h2>
                    <button onClick={resetFilters}>Reset All</button>
                  </div>
                  
                  <div className="filter-group">
                    <h3 className="filter-group-title">Price Range</h3>
                    <div className="select-wrapper">
                      <select
                        name="price"
                        className="filter-select"
                        value={filter.price}
                        onChange={handleFilterChange}
                      >
                        <option value="all">All Prices</option>
                        <option value="low">Budget ($0-$5)</option>
                        <option value="mid">Standard ($5-$10)</option>
                        <option value="high">Premium ($10+)</option>
                      </select>
                      <div className="select-arrow"></div>
                    </div>
                  </div>
                  
                  <div className="filter-group">
                    <h3 className="filter-group-title">Availability</h3>
                    <div className="select-wrapper">
                      <select
                        name="availability"
                        className="filter-select"
                        value={filter.availability}
                        onChange={handleFilterChange}
                      >
                        <option value="all">All Spots</option>
                        <option value="available">Available Only</option>
                      </select>
                      <div className="select-arrow"></div>
                    </div>
                  </div>
                  
                  <div className="filter-group">
                    <h3 className="filter-group-title">Distance</h3>
                    <div className="select-wrapper">
                      <select
                        name="distance"
                        className="filter-select"
                        value={filter.distance}
                        onChange={handleFilterChange}
                      >
                        <option value="all">All Distances</option>
                        <option value="close">Close (less than 1 km)</option>
                        <option value="medium">Medium (1-3 km)</option>
                        <option value="far">Far (3+ km)</option>
                      </select>
                      <div className="select-arrow"></div>
                    </div>
                  </div>
                  
                  <div className="filter-group">
                    <h3 className="filter-group-title">Features</h3>
                    <div className="filter-options">
                      {['24/7 Access', 'Security Camera', 'Covered', 'EV Charging', 'Disabled Access'].map(feature => (
                        <div className="filter-checkbox" key={feature}>
                          <input 
                            type="checkbox" 
                            id={`feature-${feature}`} 
                            checked={filter.features.includes(feature)}
                            onChange={() => handleFeatureToggle(feature)}
                          />
                          <label htmlFor={`feature-${feature}`}>{feature}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Results Section */}
                <div className="results-container">
                  {/* Map */}
                  <div className="map-container">
                    <div className="map-placeholder">
                      <FaMapMarkerAlt />
                      <p>Interactive map would be shown here</p>
                    </div>
                  </div>
                  
                  {/* Results List */}
                  <div className="results-list">
                    {loading ? (
                      <div className="loader-container">
                        <Loader />
                      </div>
                    ) : (
                      <>
                        <div className="results-header">
                          <div className="results-count">
                            <h2>{filteredSpots.length} Parking {filteredSpots.length === 1 ? 'Spot' : 'Spots'} Found</h2>
                          </div>
                          <div className="results-sorting">
                            <label>Sort by:</label>
                            <div className="select-wrapper">
                              <select 
                                value={sortBy} 
                                onChange={(e) => setSortBy(e.target.value)}
                                className="sorting-select"
                              >
                                <option value="distance">Distance</option>
                                <option value="price">Price: Low to High</option>
                                <option value="price-desc">Price: High to Low</option>
                              </select>
                              <div className="select-arrow"></div>
                            </div>
                          </div>
                        </div>
                        
                        {filteredSpots.length === 0 ? (
                          <div className="no-results">
                            <div className="no-results-icon">
                              <FaSearch />
                            </div>
                            <h3 className="no-results-title">No Parking Spots Found</h3>
                            <p className="no-results-text">Try adjusting your filters or search for a different location.</p>
                            <button 
                              onClick={resetFilters}
                              className="btn btn-primary"
                            >
                              Reset Filters
                            </button>
                          </div>
                        ) : (
                          <div className="results-grid">
                            {filteredSpots.map(spot => (
                              <div 
                                key={spot.id} 
                                className="result-card"
                                onClick={() => navigate(`/details/${spot.id}`)}
                              >
                                <div className="result-image">
                                  <img 
                                    src={`https://source.unsplash.com/random/300x200/?parking,${spot.id}`}
                                    alt={spot.name}
                                  />
                                  <div className="result-status">
                                    <span className={spot.available ? "badge-available" : "badge-full"}>
                                      {spot.available ? "Available" : "Full"}
                                    </span>
                                  </div>
                                </div>
                                
                                <div className="result-content">
                                  <div className="result-top">
                                    <h3 className="result-title">{spot.name}</h3>
                                    <div className="result-rating">
                                      <FaStar />
                                      <span>4.8</span>
                                    </div>
                                  </div>
                                  
                                  <div className="result-location">
                                    <FaMapMarkerAlt />
                                    <span>{spot.address}</span>
                                  </div>
                                  
                                  <div className="result-distance">
                                    <span>{spot.distance} km away</span>
                                  </div>
                                  
                                  <div className="result-features">
                                    {spot.features && spot.features.slice(0, 3).map((feature, index) => (
                                      <div className="result-feature" key={index}>
                                        <FaCheck /> {feature}
                                      </div>
                                    ))}
                                  </div>
                                  
                                  <div className="result-bottom">
                                    <div className="result-price">
                                      ${spot.price}<span>/hr</span>
                                    </div>
                                    
                                    <button className="result-button">
                                      View Details
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {/* Pagination */}
                        {filteredSpots.length > 0 && (
                          <div className="pagination">
                            <button className="pagination-button disabled">
                              &lt;
                            </button>
                            <button className="pagination-button active">1</button>
                            <button className="pagination-button">2</button>
                            <button className="pagination-button">3</button>
                            <button className="pagination-button">
                              &gt;
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error rendering Search component:", error);
    return <SearchFallback />;
  }
};

export default Search;