const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3001; // Use different port to avoid conflicts

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

// Sample data - comprehensive destinations
const destinations = [
  {
    id: '1',
    name: "Cox's Bazar",
    country: 'Bangladesh',
    district: "Cox's Bazar",
    description: "World's longest natural sandy sea beach",
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    rating: '4.8',
    priceFrom: 3500
  },
  {
    id: '2',
    name: 'Sundarbans',
    country: 'Bangladesh',
    district: 'Khulna',
    description: 'Largest mangrove forest and Royal Bengal Tiger habitat',
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    rating: '4.9',
    priceFrom: 4500
  },
  {
    id: '3',
    name: 'Sylhet Tea Gardens',
    country: 'Bangladesh',
    district: 'Sylhet',
    description: 'Rolling green hills covered with tea plantations',
    imageUrl: 'https://images.unsplash.com/photo-1627813303514-4e6a628b3bce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    rating: '4.7',
    priceFrom: 2800
  },
  {
    id: '4',
    name: 'Srimangal',
    country: 'Bangladesh',
    district: 'Moulvibazar',
    description: 'Tea capital of Bangladesh with lush green landscapes',
    imageUrl: 'https://images.unsplash.com/photo-1627813303514-4e6a628b3bce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    rating: '4.6',
    priceFrom: 2500
  },
  {
    id: '5',
    name: 'Bandarban',
    country: 'Bangladesh',
    district: 'Bandarban',
    description: 'Mountainous region with tribal culture and scenic beauty',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    rating: '4.7',
    priceFrom: 3200
  },
  {
    id: '6',
    name: 'Saint Martins Island',
    country: 'Bangladesh',
    district: "Cox's Bazar",
    description: 'Coral island with crystal clear waters and pristine beaches',
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    rating: '4.8',
    priceFrom: 4200
  }
];

const hotels = [
  {
    id: '1',
    name: 'Sea Palace Hotel',
    location: "Cox's Bazar • Sea View • Premium Resort",
    description: 'Luxury beachfront hotel overlooking the Bay of Bengal',
    imageUrl: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    rating: '4.7',
    pricePerNight: 8500,
    phone: '+880-341-64521',
    amenities: ['Sea View', 'Pool', 'Spa', 'Restaurant']
  },
  {
    id: '2',
    name: 'Pan Pacific Sonargaon',
    location: 'Dhaka • Business District • 5-Star',
    description: 'Premier luxury hotel in the heart of Dhaka',
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    rating: '4.8',
    pricePerNight: 12500,
    phone: '+880-2-8833221',
    amenities: ['Business Center', 'Gym', 'Pool', 'Multiple Restaurants']
  },
  {
    id: '3',
    name: 'Tea Resort Sreemangal',
    location: 'Sreemangal • Tea Garden • Eco Resort',
    description: 'Eco-friendly resort surrounded by lush tea gardens',
    imageUrl: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    rating: '4.5',
    pricePerNight: 6500,
    phone: '+880-861-71234',
    amenities: ['Garden View', 'Organic Restaurant', 'Nature Walks', 'Tea Tasting']
  },
  {
    id: '4',
    name: 'Dhaka Regency Hotel',
    location: 'Dhaka • Gulshan • 5-Star',
    description: 'Modern luxury hotel in diplomatic zone',
    imageUrl: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    rating: '4.6',
    pricePerNight: 9500,
    phone: '+880-2-8881234',
    amenities: ['City View', 'Business Center', 'Spa', 'Fine Dining']
  },
  {
    id: '5',
    name: 'Hill View Resort Bandarban',
    location: 'Bandarban • Hilltop • Mountain Resort',
    description: 'Mountain resort with panoramic hill views',
    imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    rating: '4.4',
    pricePerNight: 5500,
    phone: '+880-361-62345',
    amenities: ['Mountain View', 'Hiking Trails', 'Tribal Culture', 'Adventure Sports']
  }
];

const restaurants = [
  {
    id: '1',
    name: 'Jhau Bon Restaurant',
    location: "Cox's Bazar • Beachfront • Seafood",
    description: 'Fresh seafood with panoramic ocean views and traditional Bengali cuisine',
    imageUrl: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    rating: '4.6',
    cuisine: 'Bengali Seafood',
    priceRange: '৳৳৳',
    phone: '+880-341-65432',
    reviews: ['Amazing fresh fish and prawns!', 'Best beachfront dining experience']
  }
];

const tripPlanners = [
  {
    id: '1',
    origin: 'Dhaka',
    destination: "Cox's Bazar",
    price: 4500,
    duration: 'Round trip • Direct',
    stops: 'Direct',
    departureDate: 'Dec 15 - Dec 22',
    returnDate: 'Dec 22',
    dealType: 'Save 20%'
  }
];

// API Routes
app.get('/api/destinations', (req, res) => {
  console.log('✅ Serving destinations');
  res.json(destinations);
});

app.get('/api/hotels', (req, res) => {
  console.log('✅ Serving hotels');
  res.json(hotels);
});

app.get('/api/restaurants', (req, res) => {
  console.log('✅ Serving restaurants');
  res.json(restaurants);
});

app.get('/api/trip-planners', (req, res) => {
  console.log('✅ Serving trip planners');
  res.json(tripPlanners);
});

// Serve static files for client
app.use(express.static(path.join(__dirname, 'dist/public')));

// Fallback for SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/public/index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Simple server running on http://localhost:${PORT}`);
  console.log('🎯 API endpoints available:');
  console.log(`   • http://localhost:${PORT}/api/destinations`);
  console.log(`   • http://localhost:${PORT}/api/hotels`);
  console.log(`   • http://localhost:${PORT}/api/restaurants`);
  console.log(`   • http://localhost:${PORT}/api/trip-planners`);
});
