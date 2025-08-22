// Self-contained sample data for restaurants
const SAMPLE_RESTAURANTS = [
  {
    id: '1',
    name: 'Dhaka Kitchen',
    location: 'Dhaka • Gulshan • Fine Dining',
    description: 'Authentic Bengali cuisine with modern presentation',
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    rating: '4.7',
    cuisine: 'Bengali',
    priceRange: '৳৳৳',
    phone: '+880-2-9876543',
    reviews: [
      'Amazing traditional flavors with a modern twist',
      'The hilsha fish curry is exceptional',
      'Great ambiance and excellent service'
    ]
  },
  {
    id: '2',
    name: 'Spice Garden',
    location: "Cox's Bazar • Beach Road • Seafood",
    description: 'Fresh seafood restaurant with ocean views',
    imageUrl: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    rating: '4.5',
    cuisine: 'Seafood',
    priceRange: '৳৳',
    phone: '+880-341-123456',
    reviews: [
      'Fresh catch of the day, perfectly prepared',
      'Beautiful sunset views while dining',
      'Must try the grilled prawns'
    ]
  },
  {
    id: '3',
    name: 'Tea House Sylhet',
    location: 'Sylhet • Zindabazar • Traditional',
    description: 'Traditional tea house with local delicacies',
    imageUrl: 'https://images.unsplash.com/photo-1552566618-dcd3ec399fb5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    rating: '4.3',
    cuisine: 'Traditional',
    priceRange: '৳',
    phone: '+880-821-654321',
    reviews: [
      'Perfect place for authentic seven-layer tea',
      'Cozy atmosphere with local charm',
      'Great value for money'
    ]
  },
  {
    id: '4',
    name: 'Royal Biryani House',
    location: 'Dhaka • Old Town • Mughlai',
    description: 'Famous for authentic Kacchi Biryani and Mughlai cuisine',
    imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    rating: '4.8',
    cuisine: 'Mughlai',
    priceRange: '৳৳',
    phone: '+880-2-7654321',
    reviews: [
      'Best Kacchi Biryani in Dhaka',
      'Authentic Mughlai flavors',
      'Generous portions and rich taste'
    ]
  },
  {
    id: '5',
    name: 'Hill View Cafe',
    location: 'Bandarban • Nilgiri Hills • Cafe',
    description: 'Mountain cafe with tribal cuisine and scenic views',
    imageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    rating: '4.4',
    cuisine: 'Tribal',
    priceRange: '৳',
    phone: '+880-361-987654',
    reviews: [
      'Unique tribal dishes with mountain views',
      'Fresh ingredients from local sources',
      'Perfect stop during hill trekking'
    ]
  },
  {
    id: '6',
    name: 'Coastal Breeze',
    location: "Saint Martin's Island • Beach Front • Seafood",
    description: 'Beachfront restaurant specializing in fresh island seafood',
    imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    rating: '4.6',
    cuisine: 'Seafood',
    priceRange: '৳৳৳',
    phone: '+880-341-456789',
    reviews: [
      'Incredible fresh lobster and crab',
      'Dining right on the beach',
      'Expensive but worth every taka'
    ]
  }
];

export default async function handler(req, res) {
  try {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }
    
    if (req.method === 'GET') {
      console.log('🎯 [API] Restaurants endpoint called - returning', SAMPLE_RESTAURANTS.length, 'restaurants');
      return res.status(200).json(SAMPLE_RESTAURANTS);
    }
    
    if (req.method === 'POST') {
      // For POST requests, just return the posted data with a generated ID
      const restaurant = {
        id: Date.now().toString(),
        ...req.body
      };
      return res.status(201).json(restaurant);
    }
    
    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    console.error('❌ [API] Error in restaurants endpoint:', error);
    return res.status(500).json({ 
      message: 'Failed to fetch restaurants',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}