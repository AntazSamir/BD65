import session from "express-session";
import type { RequestHandler } from "express";
import type { User } from "@shared/schema";

declare module "express-session" {
  interface SessionData {
    userId?: string;
    user?: User;
  }
}

export function getSession() {
  return session({
    secret: process.env.SESSION_SECRET || "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // Set to true in production with HTTPS
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  });
}

export const isAuthenticated: RequestHandler = (req, res, next) => {
  if (req.session.userId) {
    return next();
  }
  return res.status(401).json({ message: "Unauthorized" });
};