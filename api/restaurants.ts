import type { VercelRequest, VercelResponse } from '@vercel/node';

// Self-contained sample data for restaurants
const SAMPLE_RESTAURANTS = [
	{
		id: '1',
		name: 'Jhau Bon Restaurant',
		location: "Cox's Bazar • Beachfront • Seafood",
		description: 'Fresh seafood with panoramic ocean views and traditional Bengali cuisine',
		imageUrl: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
		rating: '4.6',
		cuisine: 'Bengali Seafood',
		priceRange: '৳৳৳',
		phone: '+880-341-65432',
		reviews: ['Amazing fresh fish and prawns!', 'Best beachfront dining experience'],
	},
	{
		id: '2',
		name: 'Kacchi Bhai',
		location: 'Dhaka • Banani • Family Restaurant',
		description: 'Famous for authentic kacchi biryani and traditional dishes',
		imageUrl: 'https://images.unsplash.com/photo-1526318472351-c75fcf070305?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
		rating: '4.5',
		cuisine: 'Bangladeshi',
		priceRange: '৳৳',
		phone: '+880-2-5551234',
		reviews: ['Delicious biryani!', 'Great value for money'],
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
			console.log('🎯 [API] Restaurants endpoint called - returning', SAMPLE_RESTAURANTS.length, 'restaurants');
			return res.status(200).json(SAMPLE_RESTAURANTS);
		}

		if (req.method === 'POST') {
			const restaurant = { id: Date.now().toString(), ...req.body };
			return res.status(201).json(restaurant);
		}

		return res.status(405).json({ message: 'Method not allowed' });
	} catch (error) {
		console.error('❌ [API] Error in restaurants endpoint:', error);
		return res.status(500).json({
			message: 'Failed to fetch restaurants',
			error: error instanceof Error ? error.message : 'Unknown error',
		});
	}
}