import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // For Vercel serverless functions, session management needs to be handled differently
  // You might want to use JWT tokens or other stateless authentication
  return res.status(401).json({ message: "Unauthorized" });
}