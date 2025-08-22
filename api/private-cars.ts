import type { VercelRequest, VercelResponse } from '@vercel/node';

// Self-contained sample data for private cars
const SAMPLE_PRIVATE_CARS = [
	{
		id: 'car-1',
		type: 'Toyota Premio',
		category: 'Sedan',
		origin: 'Dhaka',
		destination: 'Sylhet',
		price: 6500,
		seats: 4,
		withDriver: true,
	},
	{
		id: 'car-2',
		type: 'Toyota Hiace',
		category: 'Microbus',
		origin: 'Dhaka',
		destination: "Cox's Bazar",
		price: 12000,
		seats: 10,
		withDriver: true,
	},
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
			console.log('🎯 [API] Private cars endpoint called - returning', SAMPLE_PRIVATE_CARS.length, 'cars');
			return res.status(200).json(SAMPLE_PRIVATE_CARS);
		}

		if (req.method === 'POST') {
			const car = { id: Date.now().toString(), ...req.body };
			return res.status(201).json(car);
		}

		return res.status(405).json({ message: 'Method not allowed' });
	} catch (error) {
		console.error('❌ [API] Error in private cars endpoint:', error);
		return res.status(500).json({
			message: 'Failed to fetch private cars',
			error: error instanceof Error ? error.message : 'Unknown error',
		});
	}
}