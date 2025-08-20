import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../_middleware';
import { insertUserSchema } from '../../shared/schema';
import { z } from 'zod';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const validatedData = insertUserSchema.parse(req.body);
    
    // Check if user already exists
    const existingUser = await storage.getUserByEmail(validatedData.email);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists with this email" });
    }

    const existingUsername = await storage.getUserByUsername(validatedData.username);
    if (existingUsername) {
      return res.status(400).json({ message: "Username already taken" });
    }

    const user = await storage.createUser(validatedData);
    
    const { password, ...userWithoutPassword } = user;
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: "Invalid data", errors: error.errors });
    }
    res.status(500).json({ message: "Failed to create user" });
  }
}