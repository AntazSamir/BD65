import { VercelRequest, VercelResponse } from '@vercel/node';

// Self-contained sample data for trip planners
const SAMPLE_TRIP_PLANNERS = [
  {
    id: '1',
    origin: 'Dhaka',
    destination: "Cox's Bazar",
    price: 4500,
    duration: 'Round trip • Direct',
    stops: 'Direct',
    departureDate: 'Dec 15 - Dec 22',
    returnDate: 'Dec 22',
    dealType: 'Save 20%',
  },
  {
    id: '2',
    origin: 'Dhaka',
    destination: 'Sylhet',
    price: 3800,
    duration: 'Round trip • Direct',
    stops: 'Direct',
    departureDate: 'Jan 10 - Jan 20',
    returnDate: 'Jan 20',
    dealType: 'Hot Deal',
  },
  {
    id: '3',
    origin: 'Dhaka',
    destination: 'Chittagong',
    price: 4200,
    duration: 'Round trip • Direct',
    stops: 'Direct',
    departureDate: 'Feb 5 - Feb 15',
    returnDate: 'Feb 15',
    dealType: 'Limited Seats',
  },
  {
    id: '4',
    origin: 'Chittagong',
    destination: 'Cox\'s Bazar',
    price: 2800,
    duration: 'Round trip • Direct',
    stops: 'Direct',
    departureDate: 'Mar 1 - Mar 10',
    returnDate: 'Mar 10',
    dealType: 'Best Price',
  },
  {
    id: '5',
    origin: 'Dhaka',
    destination: 'Jessore',
    price: 3200,
    duration: 'Round trip • Direct',
    stops: 'Direct',
    departureDate: 'Apr 15 - Apr 25',
    returnDate: 'Apr 25',
    dealType: 'Early Bird',
  },
  {
    id: '6',
    origin: 'Sylhet',
    destination: 'Cox\'s Bazar',
    price: 5500,
    duration: 'Round trip • 1 Stop',
    stops: '1 Stop in Dhaka',
    departureDate: 'May 20 - May 30',
    returnDate: 'May 30',
    dealType: 'Weekend Special',
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
      console.log('🎯 [API] Trip planners endpoint called - returning', SAMPLE_TRIP_PLANNERS.length, 'trip planners');
      return res.status(200).json(SAMPLE_TRIP_PLANNERS);
    }
    
    if (req.method === 'POST') {
      // For POST requests, just return the posted data with a generated ID
      const tripPlanner = {
        id: Date.now().toString(),
        ...req.body
      };
      return res.status(201).json(tripPlanner);
    }
    
    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    console.error('❌ [API] Error in trip planners endpoint:', error);
    return res.status(500).json({ 
      message: 'Failed to fetch trip planners',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

export default handler;
module.exports = handler;
