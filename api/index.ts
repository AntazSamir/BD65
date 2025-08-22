import { VercelRequest, VercelResponse } from '@vercel/node';
import express from 'express';
import 'dotenv/config';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Initialize the app with routes
let initialized = false;

async function initializeApp() {
  if (initialized) return;
  
  try {
    const { registerRoutes } = await import('../server/routes');
    await registerRoutes(app);
    initialized = true;
  } catch (error) {
    console.error('Failed to initialize app:', error);
    throw error;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  await initializeApp();
  
  // Convert Vercel request/response to Express format
  const expressReq = req as any;
  const expressRes = res as any;
  
  return new Promise((resolve, reject) => {
    expressRes.on('finish', resolve);
    expressRes.on('error', reject);
    
    app(expressReq, expressRes);
  });
}
