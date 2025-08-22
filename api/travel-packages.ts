import type { VercelRequest, VercelResponse } from '@vercel/node';

// Self-contained sample data for travel packages
const SAMPLE_TRAVEL_PACKAGES = [
	{
		id: 'pkg-1',
		name: "Cox's Bazar Beach Escape",
		description: '3 nights at a beachfront resort with city tour and seafood dinner',
		imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
		duration: '4 Days • 3 Nights',
		includes: ['Round-trip flight', '3 nights resort stay', 'Daily breakfast'],
		price: 18999,
		rating: '4.7',
	},
	{
		id: 'pkg-2',
		name: 'Sylhet Tea Valley Retreat',
		description: 'Guided tea garden tour with eco-lodge stay and local cuisine',
		imageUrl: 'https://images.unsplash.com/photo-1627813303514-4e6a628b3bce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
		duration: '3 Days • 2 Nights',
		includes: ['AC bus tickets', 'Eco-lodge stay', 'Breakfast & dinner'],
		price: 12999,
		rating: '4.6',
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
			console.log('🎯 [API] Travel packages endpoint called - returning', SAMPLE_TRAVEL_PACKAGES.length, 'packages');
			return res.status(200).json(SAMPLE_TRAVEL_PACKAGES);
		}

		if (req.method === 'POST') {
			const travelPackage = { id: Date.now().toString(), ...req.body };
			return res.status(201).json(travelPackage);
		}

		return res.status(405).json({ message: 'Method not allowed' });
	} catch (error) {
		console.error('❌ [API] Error in travel packages endpoint:', error);
		return res.status(500).json({
			message: 'Failed to fetch travel packages',
			error: error instanceof Error ? error.message : 'Unknown error',
		});
	}
}