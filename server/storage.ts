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
    // Initialize sample destinations
    await this.createDestination({
      name: "Cox's Bazar",
      country: 'Bangladesh',
      description: "World's longest natural sandy sea beach",
      imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      rating: '4.8',
      priceFrom: 3500,
    });
    
    await this.createDestination({
      name: 'Sundarbans',
      country: 'Bangladesh',
      description: 'Largest mangrove forest and Royal Bengal Tiger habitat',
      imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      rating: '4.9',
      priceFrom: 4500,
    });
    
    await this.createDestination({
      name: 'Sylhet Tea Gardens',
      country: 'Bangladesh',
      description: 'Rolling green hills covered with tea plantations',
      imageUrl: 'https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      rating: '4.7',
      priceFrom: 2800,
    });

    // Initialize sample hotels
    await this.createHotel({
      name: 'Sea Palace Hotel',
      location: "Cox's Bazar • Sea View • Premium Resort",
      description: 'Luxury beachfront hotel overlooking the Bay of Bengal',
      imageUrl: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      rating: '4.7',
      pricePerNight: 8500,
      amenities: ['Sea View', 'Pool', 'Spa', 'Restaurant'],
    });
    
    await this.createHotel({
      name: 'Pan Pacific Sonargaon',
      location: 'Dhaka • Business District • 5-Star',
      description: 'Premier luxury hotel in the heart of Dhaka',
      imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      rating: '4.8',
      pricePerNight: 12500,
      amenities: ['Business Center', 'Gym', 'Pool', 'Multiple Restaurants'],
    });

    // Initialize sample flights
    await this.createFlight({
      origin: 'Dhaka',
      destination: "Cox's Bazar",
      price: 4500,
      duration: 'Round trip • Direct',
      stops: 'Direct',
      departureDate: 'Dec 15 - Dec 22',
      returnDate: 'Dec 22',
      dealType: 'Save 20%',
    });
    
    await this.createFlight({
      origin: 'Dhaka',
      destination: 'Sylhet',
      price: 3800,
      duration: 'Round trip • Direct',
      stops: 'Direct',
      departureDate: 'Jan 10 - Jan 20',
      returnDate: 'Jan 20',
      dealType: 'Hot Deal',
    });

    // Initialize sample travel packages
    await this.createTravelPackage({
      name: "Cox's Bazar Beach Getaway",
      description: 'Relax at the world\'s longest natural beach with sunset views',
      imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      duration: '5 Days',
      rating: '4.8',
      price: 15500,
      includes: ['Round-trip flights included', 'Sea-view hotel accommodation', 'Beach activities & water sports'],
    });
    
    console.log('Storage initialized successfully with sample data');
  }
}

export const storage = new MemStorage();
