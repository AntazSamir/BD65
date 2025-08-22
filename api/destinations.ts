import { VercelRequest, VercelResponse } from '@vercel/node';

// Self-contained sample data for destinations
const SAMPLE_DESTINATIONS = [
  {
    id: '1',
    name: "Cox's Bazar",
    country: 'Bangladesh',
    district: "Cox's Bazar",
    description: "World's longest natural sandy sea beach",
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    rating: '4.8',
    priceFrom: 3500,
  },
  {
    id: '2',
    name: 'Sundarbans',
    country: 'Bangladesh',
    district: 'Khulna',
    description: 'Largest mangrove forest and Royal Bengal Tiger habitat',
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    rating: '4.9',
    priceFrom: 4500,
  },
  {
    id: '3',
    name: 'Sylhet Tea Gardens',
    country: 'Bangladesh',
    district: 'Sylhet',
    description: 'Rolling green hills covered with tea plantations',
    imageUrl: 'https://images.unsplash.com/photo-1627813303514-4e6a628b3bce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    rating: '4.7',
    priceFrom: 2800,
  },
  {
    id: '4',
    name: 'Bandarban',
    country: 'Bangladesh',
    district: 'Bandarban',
    description: 'Hill district with tribal culture, natural beauty and adventure activities',
    imageUrl: 'https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    rating: '4.7',
    priceFrom: 3500,
  },
  {
    id: '5',
    name: 'Saint Martin Island',
    country: 'Bangladesh',
    district: "Cox's Bazar",
    description: 'Small coral island with pristine beaches and clear blue waters',
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    rating: '4.6',
    priceFrom: 5200,
  },
  {
    id: '6',
    name: 'Srimangal',
    country: 'Bangladesh',
    district: 'Moulvibazar',
    description: 'Tea capital of Bangladesh with seven-layer tea and rainforest',
    imageUrl: 'https://images.unsplash.com/photo-1627813303514-4e6a628b3bce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    rating: '4.6',
    priceFrom: 2600,
  }
];

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }
    
    if (req.method === 'GET') {
      console.log('🎯 [API] Destinations endpoint called - returning', SAMPLE_DESTINATIONS.length, 'destinations');
      return res.status(200).json(SAMPLE_DESTINATIONS);
    }
    
    if (req.method === 'POST') {
      // For POST requests, just return the posted data with a generated ID
      const destination = {
        id: Date.now().toString(),
        ...req.body
      };
      return res.status(201).json(destination);
    }
    
    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    console.error('❌ [API] Error in destinations endpoint:', error);
    return res.status(500).json({ 
      message: 'Failed to fetch destinations',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
