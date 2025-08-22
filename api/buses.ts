import { VercelRequest, VercelResponse } from '@vercel/node';

// Self-contained sample data for buses
const SAMPLE_BUSES = [
  {
    id: '1',
    name: 'Green Line Paribahan',
    route: 'Dhaka - Cox\'s Bazar',
    departureTime: '10:00 PM',
    arrivalTime: '6:00 AM',
    duration: '8h 0m',
    price: 1200,
    busType: 'AC Sleeper',
    availableSeats: 25,
    totalSeats: 40,
    amenities: ['AC', 'WiFi', 'Charging Port', 'Blanket'],
    rating: '4.5',
  },
  {
    id: '2',
    name: 'Shohagh Paribahan',
    route: 'Dhaka - Sylhet',
    departureTime: '11:30 PM',
    arrivalTime: '5:30 AM',
    duration: '6h 0m',
    price: 800,
    busType: 'AC Business',
    availableSeats: 18,
    totalSeats: 32,
    amenities: ['AC', 'Reclining Seats', 'Reading Light'],
    rating: '4.3',
  },
  {
    id: '3',
    name: 'Hanif Enterprise',
    route: 'Dhaka - Chittagong',
    departureTime: '9:00 PM',
    arrivalTime: '4:00 AM',
    duration: '7h 0m',
    price: 950,
    busType: 'AC Sleeper',
    availableSeats: 12,
    totalSeats: 36,
    amenities: ['AC', 'WiFi', 'Snacks', 'Pillow'],
    rating: '4.4',
  },
  {
    id: '4',
    name: 'Ena Transport',
    route: 'Dhaka - Jessore',
    departureTime: '8:00 AM',
    arrivalTime: '2:00 PM',
    duration: '6h 0m',
    price: 650,
    busType: 'AC Chair',
    availableSeats: 28,
    totalSeats: 45,
    amenities: ['AC', 'Comfortable Seats'],
    rating: '4.2',
  },
  {
    id: '5',
    name: 'Soudia Transport',
    route: 'Chittagong - Cox\'s Bazar',
    departureTime: '7:00 AM',
    arrivalTime: '11:00 AM',
    duration: '4h 0m',
    price: 450,
    busType: 'AC Business',
    availableSeats: 20,
    totalSeats: 40,
    amenities: ['AC', 'Music System'],
    rating: '4.1',
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
      console.log('🎯 [API] Buses endpoint called - returning', SAMPLE_BUSES.length, 'buses');
      return res.status(200).json(SAMPLE_BUSES);
    }
    
    if (req.method === 'POST') {
      // For POST requests, just return the posted data with a generated ID
      const bus = {
        id: Date.now().toString(),
        ...req.body
      };
      return res.status(201).json(bus);
    }
    
    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    console.error('❌ [API] Error in buses endpoint:', error);
    return res.status(500).json({ 
      message: 'Failed to fetch buses',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

export default handler;
module.exports = handler;