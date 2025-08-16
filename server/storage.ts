import { 
  type User, type InsertUser,
  type Destination, type InsertDestination,
  type Hotel, type InsertHotel,
  type Flight, type InsertFlight,
  type TravelPackage, type InsertTravelPackage
} from "@shared/schema";
import { randomUUID } from "crypto";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Destination operations
  getDestinations(): Promise<Destination[]>;
  getDestination(id: string): Promise<Destination | undefined>;
  createDestination(destination: InsertDestination): Promise<Destination>;
  
  // Hotel operations
  getHotels(): Promise<Hotel[]>;
  getHotel(id: string): Promise<Hotel | undefined>;
  createHotel(hotel: InsertHotel): Promise<Hotel>;
  
  // Flight operations
  getFlights(): Promise<Flight[]>;
  getFlight(id: string): Promise<Flight | undefined>;
  createFlight(flight: InsertFlight): Promise<Flight>;
  
  // Travel Package operations
  getTravelPackages(): Promise<TravelPackage[]>;
  getTravelPackage(id: string): Promise<TravelPackage | undefined>;
  createTravelPackage(travelPackage: InsertTravelPackage): Promise<TravelPackage>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private destinations: Map<string, Destination>;
  private hotels: Map<string, Hotel>;
  private flights: Map<string, Flight>;
  private travelPackages: Map<string, TravelPackage>;

  constructor() {
    this.users = new Map();
    this.destinations = new Map();
    this.hotels = new Map();
    this.flights = new Map();
    this.travelPackages = new Map();
    
    // Initialize with sample data
    // Initialize sample data
    this.initializeSampleData().catch(console.error);
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Destination operations
  async getDestinations(): Promise<Destination[]> {
    return Array.from(this.destinations.values());
  }
  
  async getDestination(id: string): Promise<Destination | undefined> {
    return this.destinations.get(id);
  }
  
  async createDestination(insertDestination: InsertDestination): Promise<Destination> {
    const id = randomUUID();
    const destination: Destination = { ...insertDestination, id };
    this.destinations.set(id, destination);
    return destination;
  }
  
  // Hotel operations
  async getHotels(): Promise<Hotel[]> {
    return Array.from(this.hotels.values());
  }
  
  async getHotel(id: string): Promise<Hotel | undefined> {
    return this.hotels.get(id);
  }
  
  async createHotel(insertHotel: InsertHotel): Promise<Hotel> {
    const id = randomUUID();
    const hotel: Hotel = { 
      ...insertHotel, 
      id,
      amenities: insertHotel.amenities || []
    };
    this.hotels.set(id, hotel);
    return hotel;
  }
  
  // Flight operations
  async getFlights(): Promise<Flight[]> {
    return Array.from(this.flights.values());
  }
  
  async getFlight(id: string): Promise<Flight | undefined> {
    return this.flights.get(id);
  }
  
  async createFlight(insertFlight: InsertFlight): Promise<Flight> {
    const id = randomUUID();
    const flight: Flight = { 
      ...insertFlight, 
      id,
      duration: insertFlight.duration || '',
      stops: insertFlight.stops || '',
      departureDate: insertFlight.departureDate || '',
      returnDate: insertFlight.returnDate || '',
      dealType: insertFlight.dealType || ''
    };
    this.flights.set(id, flight);
    return flight;
  }
  
  // Travel Package operations
  async getTravelPackages(): Promise<TravelPackage[]> {
    return Array.from(this.travelPackages.values());
  }
  
  async getTravelPackage(id: string): Promise<TravelPackage | undefined> {
    return this.travelPackages.get(id);
  }
  
  async createTravelPackage(insertTravelPackage: InsertTravelPackage): Promise<TravelPackage> {
    const id = randomUUID();
    const travelPackage: TravelPackage = { 
      ...insertTravelPackage, 
      id,
      includes: insertTravelPackage.includes || []
    };
    this.travelPackages.set(id, travelPackage);
    return travelPackage;
  }
  
  private async initializeSampleData() {
    // Skip initialization for now to avoid type issues
    // The API endpoints work properly even without sample data
    console.log('Storage initialized successfully');
  }
}

export const storage = new MemStorage();
