import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertDestinationSchema,
  insertHotelSchema,
  insertFlightSchema,
  insertTravelPackageSchema
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Destinations routes
  app.get("/api/destinations", async (req, res) => {
    try {
      const destinations = await storage.getDestinations();
      res.json(destinations);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch destinations" });
    }
  });

  app.get("/api/destinations/:id", async (req, res) => {
    try {
      const destination = await storage.getDestination(req.params.id);
      if (!destination) {
        return res.status(404).json({ message: "Destination not found" });
      }
      res.json(destination);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch destination" });
    }
  });

  app.post("/api/destinations", async (req, res) => {
    try {
      const validatedData = insertDestinationSchema.parse(req.body);
      const destination = await storage.createDestination(validatedData);
      res.status(201).json(destination);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create destination" });
    }
  });

  // Hotels routes
  app.get("/api/hotels", async (req, res) => {
    try {
      const hotels = await storage.getHotels();
      res.json(hotels);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch hotels" });
    }
  });

  app.get("/api/hotels/:id", async (req, res) => {
    try {
      const hotel = await storage.getHotel(req.params.id);
      if (!hotel) {
        return res.status(404).json({ message: "Hotel not found" });
      }
      res.json(hotel);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch hotel" });
    }
  });

  app.post("/api/hotels", async (req, res) => {
    try {
      const validatedData = insertHotelSchema.parse(req.body);
      const hotel = await storage.createHotel(validatedData);
      res.status(201).json(hotel);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create hotel" });
    }
  });

  // Flights routes
  app.get("/api/flights", async (req, res) => {
    try {
      const flights = await storage.getFlights();
      res.json(flights);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch flights" });
    }
  });

  app.get("/api/flights/:id", async (req, res) => {
    try {
      const flight = await storage.getFlight(req.params.id);
      if (!flight) {
        return res.status(404).json({ message: "Flight not found" });
      }
      res.json(flight);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch flight" });
    }
  });

  app.post("/api/flights", async (req, res) => {
    try {
      const validatedData = insertFlightSchema.parse(req.body);
      const flight = await storage.createFlight(validatedData);
      res.status(201).json(flight);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create flight" });
    }
  });

  // Travel packages routes
  app.get("/api/travel-packages", async (req, res) => {
    try {
      const packages = await storage.getTravelPackages();
      res.json(packages);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch travel packages" });
    }
  });

  app.get("/api/travel-packages/:id", async (req, res) => {
    try {
      const travelPackage = await storage.getTravelPackage(req.params.id);
      if (!travelPackage) {
        return res.status(404).json({ message: "Travel package not found" });
      }
      res.json(travelPackage);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch travel package" });
    }
  });

  app.post("/api/travel-packages", async (req, res) => {
    try {
      const validatedData = insertTravelPackageSchema.parse(req.body);
      const travelPackage = await storage.createTravelPackage(validatedData);
      res.status(201).json(travelPackage);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create travel package" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
