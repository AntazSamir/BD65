import { VercelRequest, VercelResponse } from '@vercel/node';

// Self-contained sample data for restaurants
const SAMPLE_RESTAURANTS = [
  {
    id: '1',
    name: 'Dhaka Regency Restaurant',
    location: 'Dhaka • Fine Dining • Continental',
    description: 'Elegant fine dining restaurant with international cuisine',
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    rating: '4.8',
    priceRange: '৳৳৳',
    phone: '+880-2-8833221',
    amenities: ['Fine Dining', 'Live Music', 'Private Dining', 'Valet Parking'],
  },
  {
    id: '2',
    name: 'Spice Garden',
    location: "Cox's Bazar • Seafood • Local Cuisine",
    description: 'Fresh seafood restaurant with traditional Bengali dishes',
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    rating: '4.6',
    priceRange: '৳৳',
    phone: '+880-341-64521',
    amenities: ['Seafood', 'Ocean View', 'Traditional Cuisine', 'Outdoor Seating'],
  },
  {
    id: '3',
    name: 'Tea House Sreemangal',
    location: 'Sreemangal • Tea Restaurant • Organic',
    description: 'Organic restaurant specializing in tea-infused dishes',
    imageUrl: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    rating: '4.5',
    priceRange: '৳',
    phone: '+880-861-71234',
    amenities: ['Organic Food', 'Tea Tasting', 'Garden Setting', 'Vegetarian Options'],
  },
  {
    id: '4',
    name: 'Riverside Grill',
    location: 'Sylhet • BBQ • Riverside',
    description: 'Riverside BBQ restaurant with scenic river views',
    imageUrl: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    rating: '4.4',
    priceRange: '৳৳',
    phone: '+880-821-12345',
    amenities: ['BBQ', 'River View', 'Outdoor Dining', 'Live Grill'],
  },
  {
    id: '5',
    name: 'Hill Top Cafe',
    location: 'Bandarban • Cafe • Mountain View',
    description: 'Mountain cafe with panoramic hill views and local coffee',
    imageUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    rating: '4.3',
    priceRange: '৳',
    phone: '+880-361-62345',
    amenities: ['Mountain View', 'Local Coffee', 'Tribal Food', 'Scenic Location'],
  }
];

async function handler(req: VercelRequest, res: VercelResponse) {
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

export default handler;
module.exports = handler;