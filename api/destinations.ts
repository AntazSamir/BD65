import { VercelRequest, VercelResponse } from '@vercel/node';
import 'dotenv/config';

// Import storage directly and ensure it's initialized
let storage: any = null;

async function initStorage() {
  if (storage) return storage;
  
  try {
    const { storage: storageInstance } = await import('../server/storage');
    storage = storageInstance;
    
    // Ensure storage is initialized with sample data
    if (!storage.isInitialized) {
      await storage.init?.();
    }
    
    return storage;
  } catch (error) {
    console.error('❌ [API] Failed to initialize storage:', error);
    throw error;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  try {
    console.log('🎯 [API] Destinations endpoint called');
    const storageInstance = await initStorage();
    
    if (req.method === 'GET') {
      console.log('🎯 [API] Fetching destinations...');
      const destinations = await storageInstance.getDestinations();
      console.log(`✅ [API] Found ${destinations.length} destinations`);
      return res.status(200).json(destinations);
    }
    
    if (req.method === 'POST') {
      const destination = await storageInstance.createDestination(req.body);
      return res.status(201).json(destination);
    }
    
    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    console.error('❌ [API] Error in destinations endpoint:', error);
    return res.status(500).json({ 
      message: 'Failed to fetch destinations',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
