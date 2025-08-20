import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../_middleware';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { id } = req.query;
    if (!id || typeof id !== 'string') {
      return res.status(400).json({ message: 'Invalid hotel ID' });
    }

    const hotel = await storage.getHotel(id);
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }

    res.json(hotel);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch hotel' });
  }
}