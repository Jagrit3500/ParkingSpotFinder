# Parking Spot Finder

<img src="https://github.com/yourusername/parking-spot-finder/raw/main/public/project-banner.png" width="100%" alt="Parking Spot Finder Banner" />

## 🚗 Overview

Parking Spot Finder is a modern React application that simplifies the parking experience in cities across India. Users can search, filter, and book parking spots based on their specific needs - whether it's finding the most affordable option, the closest spot to their destination, or a facility with specific features like EV charging or handicap accessibility.

Our goal is to eliminate the stress of finding parking in busy urban areas by providing a comprehensive, user-friendly solution that works seamlessly across all devices.

**Note: This is a demonstration project that uses mock data instead of real API connections.**

## ✨ Features

### 🔍 Search & Filtering
- **Location-based search** - Find spots near your destination
- **Multi-criteria filtering system** with options for:
  - Price range (₹0-₹400, ₹400-₹800, ₹800+)
  - Real-time availability status
  - Distance from destination (1km, 2km, 5km, 10km)
  - Specialized features (Covered parking, Security, EV charging, etc.)
  - User ratings (3★+, 4★+, 4.5★+)
  - Accepted payment methods (Cash, Card, UPI)

### 📊 Spot Information
- **Detailed parking spot listings** with:
  - High-quality images
  - Pricing information
  - Availability indicator
  - User ratings and reviews
  - Address and distance information
  - Feature badges
  - Operating hours
  - Description

### 📱 User Experience
- **Fully responsive design** - Optimized for mobile, tablet, and desktop
- **Animated interface** with smooth transitions and loading states
- **Interactive UI elements** for enhanced usability
- **Clean, modern aesthetic** with intuitive navigation

### 🛠️ Technical Features
- **Context API state management** for efficient data handling
- **Mock data implementation** for demonstration without backend dependencies
- **Component-based architecture** for maintainability and reusability
- **CSS styling with variables** for consistent theming and easy customization

## 📸 Screenshots

<div align="center">
  <img src="https://github.com/yourusername/parking-spot-finder/raw/main/public/screenshot-search.png" width="45%" alt="Search Page" />
  <img src="https://github.com/yourusername/parking-spot-finder/raw/main/public/screenshot-details.png" width="45%" alt="Details Page" />
</div>

## 🚀 Installation & Setup

### Prerequisites
- Node.js 14.0 or later
- npm or yarn

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/parking-spot-finder.git
   cd parking-spot-finder
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Access the application**
   Open your browser and visit [http://localhost:5173](http://localhost:5173)

## 💾 Mock Data Implementation

This project uses a custom mock data implementation to simulate parking spot information without requiring a backend server or API connections.

### Data Structure

Each parking spot in our mock dataset includes:

```javascript
{
  id: "spot-1",
  name: "Central Mall Parking",
  address: "123 Main St, Mumbai",
  price: 5,                           // Base price in USD (converted to INR in UI)
  available_spots: 15,                // Real-time availability
  total_spots: 50,                    // Total capacity
  distance: 0.5,                      // Distance in km from search location
  rating: 4.5,                        // User rating (out of 5)
  reviewCount: 127,                   // Number of user reviews
  features: ["covered", "security", "electric"],  // Special features
  image_url: "https://example.com/image.jpg",     // Spot image
  description: "Secure parking with 24/7 security",
  opening_hours: "24 hours",
  payment_methods: ["cash", "card", "upi"]        // Accepted payment methods
}
```

### How Mock Data is Used

1. Data is stored in `src/context/mockData.js` as a JavaScript array
2. The application simulates API loading with artificial delays in `AppContext.jsx`
3. Context API provides the data to all components that need it
4. All filtering, sorting, and search operations work on this local data

### Customizing Mock Data

To add or modify parking spots:

1. Open `src/context/mockData.js`
2. Add new objects to the array or modify existing ones
3. Restart the development server to see your changes

## 📁 Project Structure

```
parking-spot-finder/
├── public/                  # Static assets and images
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Header/
│   │   ├── Footer/
│   │   ├── ParkingCard/
│   │   ├── Filters/
│   │   ├── SearchBar/
│   │   └── ...
│   ├── context/             # Application state management
│   │   ├── AppContext.jsx   # Main context provider
│   │   └── mockData.js      # Mock parking spot data
│   ├── pages/               # Page components
│   │   ├── Home/            # Landing page
│   │   ├── Search/          # Search results page
│   │   ├── Details/         # Parking spot details
│   │   └── Bookings/        # User bookings page
│   ├── utils/               # Utility functions
│   │   ├── currency.js      # Currency conversion utilities
│   │   └── ...
│   ├── App.jsx              # Main application component
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── package.json             # Dependencies and scripts
├── vite.config.js           # Vite configuration
└── README.md                # Project documentation
```

## 🛠️ Technologies Used

- **React** - UI library
- **React Router** - Navigation and routing
- **Context API** - State management
- **React Icons** - Icon library
- **CSS Variables** - Theming and styling
- **Vite** - Build tool and development server

## 🧪 Testing

Run the test suite with:

```bash
npm run test
# or
yarn test
```

## 🔜 Roadmap & Future Improvements

- [ ] User authentication and profiles
- [ ] Real-time availability updates
- [ ] Payment gateway integration
- [ ] Google Maps integration
- [ ] User reviews and ratings
- [ ] Booking history and favorites
- [ ] Dark mode theme
- [ ] Multi-language support

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 📝 Note

This project is a demonstration and uses simulated data. In a production environment, it would connect to a backend API for real parking data. The currency conversion is also simplified using a fixed exchange rate.

## 📞 Contact

If you have any questions or feedback, please reach out to us at:

- Email: your.email@example.com
- GitHub: [yourusername](https://github.com/yourusername) 