import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from './_middleware';
import { insertBookingSchema } from '../shared/schema';
import { z } from 'zod';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    // Get user bookings - for now return empty array since we don't have session management
    res.json([]);
  } else if (req.method === 'POST') {
    try {
      const validatedData = insertBookingSchema.parse(req.body);
      const booking = await storage.createBooking(validatedData);
      res.status(201).json(booking);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create booking" });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}