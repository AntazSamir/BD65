import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from './_middleware';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const hotels = await storage.getHotels();
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch hotels' });
  }
}