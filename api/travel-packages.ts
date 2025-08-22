import { VercelRequest, VercelResponse } from '@vercel/node';

// Self-contained sample data for travel packages
const SAMPLE_TRAVEL_PACKAGES = [
  {
    id: '1',
    name: "Cox's Bazar Beach Paradise",
    destination: "Cox's Bazar",
    duration: '3 Days 2 Nights',
    price: 12500,
    originalPrice: 15000,
    discount: '17%',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    rating: '4.8',
    includes: ['Hotel Stay', 'Breakfast', 'Transportation', 'Sightseeing'],
    description: 'Relax on the world\'s longest natural sandy beach with luxury accommodation',
  },
  {
    id: '2',
    name: 'Sundarbans Wildlife Adventure',
    destination: 'Sundarbans',
    duration: '2 Days 1 Night',
    price: 8500,
    originalPrice: 10000,
    discount: '15%',
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    rating: '4.9',
    includes: ['Boat Safari', 'Meals', 'Guide', 'Wildlife Viewing'],
    description: 'Explore the largest mangrove forest and spot Royal Bengal Tigers',
  },
  {
    id: '3',
    name: 'Sylhet Tea Garden Retreat',
    destination: 'Sylhet',
    duration: '4 Days 3 Nights',
    price: 11000,
    originalPrice: 13500,
    discount: '19%',
    imageUrl: 'https://images.unsplash.com/photo-1627813303514-4e6a628b3bce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    rating: '4.7',
    includes: ['Resort Stay', 'All Meals', 'Tea Garden Tours', 'Nature Walks'],
    description: 'Experience the rolling green hills and tea plantations of Sylhet',
  },
  {
    id: '4',
    name: 'Bandarban Hill Adventure',
    destination: 'Bandarban',
    duration: '3 Days 2 Nights',
    price: 9500,
    originalPrice: 11000,
    discount: '14%',
    imageUrl: 'https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    rating: '4.6',
    includes: ['Mountain Resort', 'Tribal Culture Tour', 'Hiking', 'Local Cuisine'],
    description: 'Discover tribal culture and natural beauty in the hill district',
  },
  {
    id: '5',
    name: 'Saint Martin Island Getaway',
    destination: 'Saint Martin Island',
    duration: '2 Days 1 Night',
    price: 14500,
    originalPrice: 17000,
    discount: '15%',
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    rating: '4.8',
    includes: ['Island Resort', 'Boat Transfer', 'Snorkeling', 'Fresh Seafood'],
    description: 'Pristine coral island with crystal clear waters and white sandy beaches',
  },
  {
    id: '6',
    name: 'Srimangal Tea Capital Experience',
    destination: 'Srimangal',
    duration: '2 Days 1 Night',
    price: 7500,
    originalPrice: 9000,
    discount: '17%',
    imageUrl: 'https://images.unsplash.com/photo-1627813303514-4e6a628b3bce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    rating: '4.5',
    includes: ['Eco Lodge', 'Seven Layer Tea', 'Rainforest Walk', 'Bird Watching'],
    description: 'Tea capital of Bangladesh with famous seven-layer tea and rainforest',
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
      console.log('🎯 [API] Travel packages endpoint called - returning', SAMPLE_TRAVEL_PACKAGES.length, 'travel packages');
      return res.status(200).json(SAMPLE_TRAVEL_PACKAGES);
    }
    
    if (req.method === 'POST') {
      // For POST requests, just return the posted data with a generated ID
      const travelPackage = {
        id: Date.now().toString(),
        ...req.body
      };
      return res.status(201).json(travelPackage);
    }
    
    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    console.error('❌ [API] Error in travel packages endpoint:', error);
    return res.status(500).json({ 
      message: 'Failed to fetch travel packages',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

export default handler;
module.exports = handler;