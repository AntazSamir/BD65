import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../_middleware';
import { loginSchema } from '../../shared/schema';
import { z } from 'zod';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const validatedData = loginSchema.parse(req.body);
    const user = await storage.validateUser(validatedData.email, validatedData.password);
    
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    
    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: "Invalid data", errors: error.errors });
    }
    res.status(500).json({ message: "Failed to sign in" });
  }
}