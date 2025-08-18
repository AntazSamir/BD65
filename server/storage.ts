import { 
  type User, type InsertUser, type UpdateUser, type LoginCredentials,
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
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, user: UpdateUser): Promise<User | undefined>;
  validateUser(email: string, password: string): Promise<User | undefined>;
  
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

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const now = new Date().toISOString();
    const user: User = { 
      ...insertUser, 
      id,
      phone: insertUser.phone || null,
      dateOfBirth: insertUser.dateOfBirth || null,
      nationality: insertUser.nationality || null,
      profileImageUrl: insertUser.profileImageUrl || null,
      createdAt: now,
      updatedAt: now
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: string, updateData: UpdateUser): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser: User = {
      ...user,
      ...updateData,
      updatedAt: new Date().toISOString()
    };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async validateUser(email: string, password: string): Promise<User | undefined> {
    const user = await this.getUserByEmail(email);
    if (user && user.password === password) {
      return user;
    }
    return undefined;
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
      name: 'Lalbagh Fort',
      country: 'Bangladesh',
      district: 'Dhaka',
      description: 'Historic Mughal fort complex in Old Dhaka with beautiful architecture',
      imageUrl: 'https://images.unsplash.com/photo-1582718471137-c3967ffb1c42?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080',
      rating: '4.2',
      priceFrom: 500,
    });

    await this.createDestination({
      name: "Cox's Bazar",
      country: 'Bangladesh',
      district: "Cox's Bazar",
      description: "World's longest natural sandy sea beach",
      imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080',
      rating: '4.8',
      priceFrom: 3500,
    });
    
    await this.createDestination({
      name: 'Sundarbans',
      country: 'Bangladesh',
      district: 'Khulna',
      description: 'Largest mangrove forest and Royal Bengal Tiger habitat',
      imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080',
      rating: '4.9',
      priceFrom: 4500,
    });
    
    await this.createDestination({
      name: 'Sylhet Tea Gardens',
      country: 'Bangladesh',
      district: 'Sylhet',
      description: 'Rolling green hills covered with tea plantations',
      imageUrl: 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080',
      rating: '4.7',
      priceFrom: 2800,
    });

    await this.createDestination({
      name: 'Saint Martin Island',
      country: 'Bangladesh',
      district: "Cox's Bazar",
      description: 'Small coral island with pristine beaches and clear blue waters',
      imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080',
      rating: '4.6',
      priceFrom: 5200,
    });

    await this.createDestination({
      name: 'Chittagong Hill Tracts',
      country: 'Bangladesh',
      district: 'Chittagong Hill Tracts',
      description: 'Mountainous region with tribal culture, waterfalls and scenic beauty',
      imageUrl: 'https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080',
      rating: '4.8',
      priceFrom: 3200,
    });

    await this.createDestination({
      name: 'Rangamati',
      country: 'Bangladesh',
      district: 'Chittagong Hill Tracts',
      description: 'Lake district with hanging bridge, tribal museums and boat rides',
      imageUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080',
      rating: '4.5',
      priceFrom: 2900,
    });

    await this.createDestination({
      name: 'Kuakata Beach',
      country: 'Bangladesh',
      district: 'Patuakhali',
      description: 'Unique beach where you can see both sunrise and sunset',
      imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080',
      rating: '4.4',
      priceFrom: 2500,
    });

    await this.createDestination({
      name: 'Paharpur Buddhist Vihara',
      country: 'Bangladesh',
      district: 'Naogaon',
      description: 'UNESCO World Heritage archaeological site with ancient Buddhist ruins',
      imageUrl: 'https://images.unsplash.com/photo-1580500550469-d2bb0ebe3d3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080',
      rating: '4.3',
      priceFrom: 1800,
    });

    await this.createDestination({
      name: 'Bagerhat Mosque City',
      country: 'Bangladesh',
      district: 'Bagerhat',
      description: 'Historic mosque city with 60 domed mosques and ancient Islamic architecture',
      imageUrl: '/assets/Sixty_Dome_Mosque,Bagerhat_1755544692073.jpg',
      rating: '4.4',
      priceFrom: 2200,
    });

    await this.createDestination({
      name: 'Sajek Valley',
      country: 'Bangladesh',
      district: 'Rangamati',
      description: 'Queen of hills with clouds touching mountain peaks and tribal culture',
      imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080',
      rating: '4.7',
      priceFrom: 3800,
    });

    await this.createDestination({
      name: 'Jaflong',
      country: 'Bangladesh',
      district: 'Sylhet',
      description: 'Stone collection area with crystal clear river and scenic mountain views',
      imageUrl: 'https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080',
      rating: '4.5',
      priceFrom: 2400,
    });

    await this.createDestination({
      name: 'Srimangal',
      country: 'Bangladesh',
      district: 'Moulvibazar',
      description: 'Tea capital of Bangladesh with seven-layer tea and rainforest',
      imageUrl: 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080',
      rating: '4.6',
      priceFrom: 2600,
    });

    await this.createDestination({
      name: 'Nilgiri Hills',
      country: 'Bangladesh',
      district: 'Bandarban',
      description: 'Highest hills in Bangladesh with cloud kissing peaks and scenic beauty',
      imageUrl: 'https://images.unsplash.com/photo-1464822759844-d150baec4ba5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080',
      rating: '4.8',
      priceFrom: 4200,
    });

    await this.createDestination({
      name: 'Nafakhum Waterfall',
      country: 'Bangladesh',
      district: 'Bandarban',
      description: 'Largest waterfall in Bangladesh surrounded by hills and natural beauty',
      imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080',
      rating: '4.9',
      priceFrom: 4800,
    });

    await this.createDestination({
      name: 'Mahasthangarh',
      country: 'Bangladesh',
      district: 'Bogra',
      description: 'Ancient archaeological site with ruins of the earliest urban settlement',
      imageUrl: 'https://images.unsplash.com/photo-1539650116574-75c0c6d6d4ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080',
      rating: '4.2',
      priceFrom: 1600,
    });

    await this.createDestination({
      name: 'Ratargul Swamp Forest',
      country: 'Bangladesh',
      district: 'Sylhet',
      description: 'Freshwater swamp forest with boat rides through submerged trees',
      imageUrl: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080',
      rating: '4.5',
      priceFrom: 2300,
    });

    await this.createDestination({
      name: 'Bandarban',
      country: 'Bangladesh',
      district: 'Bandarban',
      description: 'Hill district with tribal culture, natural beauty and adventure activities',
      imageUrl: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080',
      rating: '4.7',
      priceFrom: 3500,
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

    await this.createHotel({
      name: 'Hotel Agrabad',
      location: 'Chittagong • Port City • Business Hotel',
      description: 'Modern hotel in the commercial heart of Chittagong',
      imageUrl: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      rating: '4.3',
      pricePerNight: 7800,
      amenities: ['Conference Hall', 'Restaurant', 'Wi-Fi', 'Airport Shuttle'],
    });

    await this.createHotel({
      name: 'Hotel Supreme',
      location: 'Sylhet • City Center • Premium',
      description: 'Elegant hotel with mountain views and tea garden access',
      imageUrl: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      rating: '4.4',
      pricePerNight: 6500,
      amenities: ['Garden View', 'Traditional Cuisine', 'Cultural Tours'],
    });

    await this.createHotel({
      name: 'Kuakata Guest House',
      location: 'Kuakata • Beachfront • Eco-Resort',
      description: 'Sustainable beachfront accommodation with sunrise/sunset views',
      imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      rating: '4.1',
      pricePerNight: 4200,
      amenities: ['Beach Access', 'Fishing Trips', 'Local Cuisine'],
    });

    await this.createHotel({
      name: 'Rangamati Water Resort',
      location: 'Rangamati • Lakeside • Resort',
      description: 'Floating resort with panoramic lake views and boat facilities',
      imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      rating: '4.5',
      pricePerNight: 5800,
      amenities: ['Lake View', 'Boat Rides', 'Tribal Cultural Shows'],
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

    await this.createFlight({
      origin: 'Dhaka',
      destination: 'Chittagong',
      price: 4200,
      duration: 'Round trip • Direct',
      stops: 'Direct',
      departureDate: 'Feb 5 - Feb 15',
      returnDate: 'Feb 15',
      dealType: 'Limited Seats',
    });

    await this.createFlight({
      origin: 'Chittagong',
      destination: 'Cox\'s Bazar',
      price: 2800,
      duration: 'Round trip • Direct',
      stops: 'Direct',
      departureDate: 'Mar 1 - Mar 10',
      returnDate: 'Mar 10',
      dealType: 'Best Price',
    });

    await this.createFlight({
      origin: 'Dhaka',
      destination: 'Jessore',
      price: 3200,
      duration: 'Round trip • Direct',
      stops: 'Direct',
      departureDate: 'Apr 15 - Apr 25',
      returnDate: 'Apr 25',
      dealType: 'Early Bird',
    });

    await this.createFlight({
      origin: 'Sylhet',
      destination: 'Cox\'s Bazar',
      price: 5500,
      duration: 'Round trip • 1 Stop',
      stops: '1 Stop in Dhaka',
      departureDate: 'May 20 - May 30',
      returnDate: 'May 30',
      dealType: 'Weekend Special',
    });

    await this.createFlight({
      origin: 'Dhaka',
      destination: 'Barisal',
      price: 2900,
      duration: 'Round trip • Direct',
      stops: 'Direct',
      departureDate: 'Jun 10 - Jun 20',
      returnDate: 'Jun 20',
      dealType: 'Summer Deal',
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

    await this.createTravelPackage({
      name: 'Sundarbans Wildlife Safari',
      description: 'Explore the mangrove forests and spot Royal Bengal Tigers',
      imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      duration: '4 Days',
      rating: '4.9',
      price: 18500,
      includes: ['Professional wildlife guide', 'Boat safari through mangroves', 'Eco-lodge accommodation'],
    });

    await this.createTravelPackage({
      name: 'Chittagong Hill Adventure',
      description: 'Experience tribal culture and pristine hill station beauty',
      imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      duration: '6 Days',
      rating: '4.6',
      price: 16200,
      includes: ['Tribal village visits', 'Waterfall trekking', 'Mountain resort accommodation'],
    });

    await this.createTravelPackage({
      name: 'Rangamati Lake District Tour',
      description: 'Discover the lake district with hanging bridge and cultural experiences',
      imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      duration: '3 Days',
      rating: '4.4',
      price: 12800,
      includes: ['Lake boat rides', 'Tribal museum visits', 'Traditional handicraft shopping'],
    });
    
    console.log('Storage initialized successfully with sample data');
  }
}

export const storage = new MemStorage();
