import { VercelRequest, VercelResponse } from '@vercel/node';

// Self-contained sample data for private cars
const SAMPLE_PRIVATE_CARS = [
  {
    id: '1',
    name: 'Toyota Corolla',
    type: 'Sedan',
    capacity: 4,
    pricePerKm: 15,
    pricePerDay: 3500,
    features: ['AC', 'GPS', 'Music System', 'Comfortable Seats'],
    driverIncluded: true,
    fuelType: 'Petrol',
    imageUrl: 'https://images.unsplash.com/photo-1549924231-f129b911e442?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    rating: '4.6',
    availability: 'Available',
  },
  {
    id: '2',
    name: 'Honda CR-V',
    type: 'SUV',
    capacity: 7,
    pricePerKm: 20,
    pricePerDay: 4500,
    features: ['AC', 'GPS', '4WD', 'Spacious Interior', 'Luggage Space'],
    driverIncluded: true,
    fuelType: 'Petrol',
    imageUrl: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    rating: '4.8',
    availability: 'Available',
  },
  {
    id: '3',
    name: 'Toyota Hiace',
    type: 'Microbus',
    capacity: 12,
    pricePerKm: 25,
    pricePerDay: 5500,
    features: ['AC', 'GPS', 'Large Capacity', 'Comfortable Seating'],
    driverIncluded: true,
    fuelType: 'Diesel',
    imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    rating: '4.5',
    availability: 'Available',
  },
  {
    id: '4',
    name: 'Nissan X-Trail',
    type: 'SUV',
    capacity: 5,
    pricePerKm: 18,
    pricePerDay: 4000,
    features: ['AC', 'GPS', 'Sunroof', 'Premium Interior'],
    driverIncluded: true,
    fuelType: 'Petrol',
    imageUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    rating: '4.7',
    availability: 'Available',
  },
  {
    id: '5',
    name: 'Toyota Prado',
    type: 'SUV',
    capacity: 7,
    pricePerKm: 30,
    pricePerDay: 6500,
    features: ['AC', 'GPS', '4WD', 'Luxury Interior', 'Off-road Capable'],
    driverIncluded: true,
    fuelType: 'Diesel',
    imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    rating: '4.9',
    availability: 'Available',
  },
  {
    id: '6',
    name: 'Mitsubishi Pajero',
    type: 'SUV',
    capacity: 7,
    pricePerKm: 28,
    pricePerDay: 6000,
    features: ['AC', 'GPS', '4WD', 'Hill Climbing', 'Premium Sound'],
    driverIncluded: true,
    fuelType: 'Diesel',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    rating: '4.6',
    availability: 'Available',
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
      console.log('🎯 [API] Private cars endpoint called - returning', SAMPLE_PRIVATE_CARS.length, 'private cars');
      return res.status(200).json(SAMPLE_PRIVATE_CARS);
    }
    
    if (req.method === 'POST') {
      // For POST requests, just return the posted data with a generated ID
      const privateCar = {
        id: Date.now().toString(),
        ...req.body
      };
      return res.status(201).json(privateCar);
    }
    
    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    console.error('❌ [API] Error in private cars endpoint:', error);
    return res.status(500).json({ 
      message: 'Failed to fetch private cars',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

export default handler;
module.exports = handler;