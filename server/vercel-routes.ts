import type { Express } from "express";
import { storage } from "./storage";
import { getSession, isAuthenticated } from "./auth";
import { 
  insertUserSchema,
  loginSchema,
  updateUserSchema,
  insertDestinationSchema,
  insertHotelSchema,
  insertTripPlannerSchema,
  insertBusSchema,
  insertPrivateCarSchema,
  insertTravelPackageSchema,
  insertRestaurantSchema,
  insertBookingSchema
} from "@shared/schema";
import { z } from "zod";

export function registerVercelRoutes(app: Express) {
  // Session middleware
  app.use(getSession());

  // Single consolidated API handler - ALL API calls go through this one function
  app.use("/api", async (req, res, next) => {
    // Skip if this is not an API request
    if (!req.path.startsWith('/')) {
      return next();
    }

    const path = req.path;
    const method = req.method;

    try {
      // Auth routes
      if (path === "/api/auth/signup" && method === "POST") {
        const validatedData = insertUserSchema.parse(req.body);
        const existingUser = await storage.getUserByEmail(validatedData.email);
        if (existingUser) {
          return res.status(400).json({ message: "User already exists with this email" });
        }
        const existingUsername = await storage.getUserByUsername(validatedData.username);
        if (existingUsername) {
          return res.status(400).json({ message: "Username already taken" });
        }
        const user = await storage.createUser(validatedData);
        req.session.userId = user.id;
        req.session.user = user;
        const { password, ...userWithoutPassword } = user;
        return res.status(201).json(userWithoutPassword);
      }

      if (path === "/api/auth/signin" && method === "POST") {
        const validatedData = loginSchema.parse(req.body);
        const user = await storage.validateUser(validatedData.email, validatedData.password);
        if (!user) {
          return res.status(401).json({ message: "Invalid email or password" });
        }
        req.session.userId = user.id;
        req.session.user = user;
        const { password, ...userWithoutPassword } = user;
        return res.json(userWithoutPassword);
      }

      if (path === "/api/auth/signout" && method === "POST") {
        req.session.destroy((err) => {
          if (err) {
            return res.status(500).json({ message: "Failed to sign out" });
          }
          res.json({ message: "Signed out successfully" });
        });
        return;
      }

      if (path === "/api/auth/me" && method === "GET") {
        if (!req.session.userId) {
          return res.status(401).json({ message: "No user session found" });
        }
        const user = await storage.getUser(req.session.userId);
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        const { password, ...userWithoutPassword } = user;
        return res.json(userWithoutPassword);
      }

      // Profile routes
      if (path === "/api/profile" && method === "PUT") {
        if (!req.session.userId) {
          return res.status(401).json({ message: "No user session found" });
        }
        const validatedData = updateUserSchema.parse(req.body);
        const user = await storage.updateUser(req.session.userId, validatedData);
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        req.session.user = user;
        const { password, ...userWithoutPassword } = user;
        return res.json(userWithoutPassword);
      }

      // Destinations routes
      if (path === "/api/destinations" && method === "GET") {
        const destinations = await storage.getDestinations();
        return res.json(destinations);
      }

      if (path.match(/^\/api\/destinations\/[^\/]+$/) && method === "GET") {
        const id = path.split('/').pop();
        const destination = await storage.getDestination(id!);
        if (!destination) {
          return res.status(404).json({ message: "Destination not found" });
        }
        return res.json(destination);
      }

      if (path === "/api/destinations" && method === "POST") {
        const validatedData = insertDestinationSchema.parse(req.body);
        const destination = await storage.createDestination(validatedData);
        return res.status(201).json(destination);
      }

      // Hotels routes
      if (path === "/api/hotels" && method === "GET") {
        const hotels = await storage.getHotels();
        return res.json(hotels);
      }

      if (path.match(/^\/api\/hotels\/[^\/]+$/) && method === "GET") {
        const id = path.split('/').pop();
        const hotel = await storage.getHotel(id!);
        if (!hotel) {
          return res.status(404).json({ message: "Hotel not found" });
        }
        return res.json(hotel);
      }

      if (path === "/api/hotels" && method === "POST") {
        const validatedData = insertHotelSchema.parse(req.body);
        const hotel = await storage.createHotel(validatedData);
        return res.status(201).json(hotel);
      }

      // Trip Planners routes
      if (path === "/api/trip-planners" && method === "GET") {
        const tripPlanners = await storage.getTripPlanners();
        return res.json(tripPlanners);
      }

      if (path.match(/^\/api\/trip-planners\/[^\/]+$/) && method === "GET") {
        const id = path.split('/').pop();
        const tripPlanner = await storage.getTripPlanner(id!);
        if (!tripPlanner) {
          return res.status(404).json({ message: "Trip planner not found" });
        }
        return res.json(tripPlanner);
      }

      if (path === "/api/trip-planners" && method === "POST") {
        const validatedData = insertTripPlannerSchema.parse(req.body);
        const tripPlanner = await storage.createTripPlanner(validatedData);
        return res.status(201).json(tripPlanner);
      }

      // Buses routes
      if (path === "/api/buses" && method === "GET") {
        const buses = await storage.getBuses();
        return res.json(buses);
      }

      if (path === "/api/buses" && method === "POST") {
        const validatedData = insertBusSchema.parse(req.body);
        const bus = await storage.createBus(validatedData);
        return res.status(201).json(bus);
      }

      // Private Cars routes
      if (path === "/api/private-cars" && method === "GET") {
        const privateCars = await storage.getPrivateCars();
        return res.json(privateCars);
      }

      if (path === "/api/private-cars" && method === "POST") {
        const validatedData = insertPrivateCarSchema.parse(req.body);
        const privateCar = await storage.createPrivateCar(validatedData);
        return res.status(201).json(privateCar);
      }

      // Travel Packages routes
      if (path === "/api/travel-packages" && method === "GET") {
        const travelPackages = await storage.getTravelPackages();
        return res.json(travelPackages);
      }

      if (path.match(/^\/api\/travel-packages\/[^\/]+$/) && method === "GET") {
        const id = path.split('/').pop();
        const travelPackage = await storage.getTravelPackage(id!);
        if (!travelPackage) {
          return res.status(404).json({ message: "Travel package not found" });
        }
        return res.json(travelPackage);
      }

      if (path === "/api/travel-packages" && method === "POST") {
        const validatedData = insertTravelPackageSchema.parse(req.body);
        const travelPackage = await storage.createTravelPackage(validatedData);
        return res.status(201).json(travelPackage);
      }

      // Restaurants routes
      if (path === "/api/restaurants" && method === "GET") {
        const restaurants = await storage.getRestaurants();
        return res.json(restaurants);
      }

      if (path.match(/^\/api\/restaurants\/[^\/]+$/) && method === "GET") {
        const id = path.split('/').pop();
        const restaurant = await storage.getRestaurant(id!);
        if (!restaurant) {
          return res.status(404).json({ message: "Restaurant not found" });
        }
        return res.json(restaurant);
      }

      if (path === "/api/restaurants" && method === "POST") {
        const validatedData = insertRestaurantSchema.parse(req.body);
        const restaurant = await storage.createRestaurant(validatedData);
        return res.status(201).json(restaurant);
      }

      // Bookings routes
      if (path === "/api/bookings" && method === "GET") {
        const bookings = await storage.getBookings();
        return res.json(bookings);
      }

      if (path === "/api/bookings" && method === "POST") {
        const validatedData = insertBookingSchema.parse(req.body);
        const booking = await storage.createBooking(validatedData);
        return res.status(201).json(booking);
      }

      if (path.match(/^\/api\/bookings\/[^\/]+\/cancel$/) && method === "PUT") {
        if (!req.session.userId) {
          return res.status(401).json({ message: "Authentication required" });
        }
        const id = path.split('/')[3];
        const booking = await storage.cancelBooking(id);
        if (!booking) {
          return res.status(404).json({ message: "Booking not found" });
        }
        return res.json(booking);
      }

      if (path === "/api/bookings/seats" && method === "GET") {
        const seats = await storage.getAvailableSeats();
        return res.json(seats);
      }

      // If no route matches
      return res.status(404).json({ message: "Route not found" });

    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      console.error('API Error:', error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
}