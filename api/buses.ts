import type { VercelRequest, VercelResponse } from '@vercel/node';

// Self-contained sample data for buses
const SAMPLE_BUSES = [
	{
		operator: 'Green Line Paribahan',
		type: 'AC Bus',
		origin: 'Dhaka',
		destination: "Cox's Bazar",
		price: 1800,
		departureTime: '07:30 AM',
		arrivalTime: '02:15 PM',
		duration: '6h 45m',
		seatsAvailable: 12,
		id: 'bus-1',
	},
	{
		operator: 'Shohag Paribahan',
		type: 'Non-AC Bus',
		origin: 'Dhaka',
		destination: 'Sylhet',
		price: 950,
		departureTime: '09:00 AM',
		arrivalTime: '02:00 PM',
		duration: '5h 0m',
		seatsAvailable: 20,
		id: 'bus-2',
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
			console.log('🎯 [API] Buses endpoint called - returning', SAMPLE_BUSES.length, 'buses');
			return res.status(200).json(SAMPLE_BUSES);
		}

		if (req.method === 'POST') {
			const bus = { id: Date.now().toString(), ...req.body };
			return res.status(201).json(bus);
		}

		return res.status(405).json({ message: 'Method not allowed' });
	} catch (error) {
		console.error('❌ [API] Error in buses endpoint:', error);
		return res.status(500).json({
			message: 'Failed to fetch buses',
			error: error instanceof Error ? error.message : 'Unknown error',
		});
	}
}