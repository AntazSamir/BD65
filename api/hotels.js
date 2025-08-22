// Self-contained sample data for hotels
const SAMPLE_HOTELS = [
  {
    id: '1',
    name: 'Sea Palace Hotel',
    location: "Cox's Bazar • Sea View • Premium Resort",
    description: 'Luxury beachfront hotel overlooking the Bay of Bengal',
    imageUrl: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    rating: '4.7',
    pricePerNight: 8500,
    phone: '+880-341-64521',
    amenities: ['Sea View', 'Pool', 'Spa', 'Restaurant'],
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
    amenities: ['Business Center', 'Gym', 'Pool', 'Multiple Restaurants'],
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
    amenities: ['Garden View', 'Organic Restaurant', 'Nature Walks', 'Tea Tasting'],
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
    amenities: ['City View', 'Business Center', 'Spa', 'Fine Dining'],
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
    amenities: ['Mountain View', 'Hiking Trails', 'Tribal Culture', 'Adventure Sports'],
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
      console.log('🎯 [API] Hotels endpoint called - returning', SAMPLE_HOTELS.length, 'hotels');
      return res.status(200).json(SAMPLE_HOTELS);
    }
    
    if (req.method === 'POST') {
      // For POST requests, just return the posted data with a generated ID
      const hotel = {
        id: Date.now().toString(),
        ...req.body
      };
      return res.status(201).json(hotel);
    }
    
    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    console.error('❌ [API] Error in hotels endpoint:', error);
    return res.status(500).json({ 
      message: 'Failed to fetch hotels',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
