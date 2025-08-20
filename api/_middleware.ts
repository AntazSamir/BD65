import { storage } from '../server/storage';
import { getSession, isAuthenticated } from '../server/auth';

// Export storage and auth utilities for API routes
export { storage, getSession, isAuthenticated };