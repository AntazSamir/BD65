import session from "express-session";
import type { RequestHandler } from "express";
import type { User } from "@shared/schema";
import { randomBytes } from "crypto";

declare module "express-session" {
  interface SessionData {
    userId?: string;
    user?: User;
  }
}

// Generate a secure random secret if none is provided
const generateSecureSecret = () => {
  return randomBytes(32).toString('hex');
};

export function getSession() {
  const isProduction = process.env.NODE_ENV === 'production';
  
  return session({
    secret: process.env.SESSION_SECRET || generateSecureSecret(),
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: isProduction, // Use secure cookies in production
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      sameSite: 'strict', // CSRF protection
    },
    name: 'sessionId', // Change default session name for security
  });
}

export const isAuthenticated: RequestHandler = (req, res, next) => {
  if (req.session.userId) {
    return next();
  }
  return res.status(401).json({ message: "Unauthorized" });
};