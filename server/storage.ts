import { 
  type User, type InsertUser, type UpdateUser, type LoginCredentials,
  type Destination, type InsertDestination,
  type Hotel, type InsertHotel,
  type TripPlanner, type InsertTripPlanner,
  type Bus, type InsertBus,
  type PrivateCar, type InsertPrivateCar,
  type TravelPackage, type InsertTravelPackage,
  type Restaurant, type InsertRestaurant,
  type Booking, type InsertBooking
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
  
  // Trip Planner operations
  getTripPlanners(): Promise<TripPlanner[]>;
  getTripPlanner(id: string): Promise<TripPlanner | undefined>;
  createTripPlanner(tripPlanner: InsertTripPlanner): Promise<TripPlanner>;
  
  // Bus operations
  getBuses(): Promise<Bus[]>;
  getBus(id: string): Promise<Bus | undefined>;
  createBus(bus: InsertBus): Promise<Bus>;
  
  // Private Car operations
  getPrivateCars(): Promise<PrivateCar[]>;
  getPrivateCar(id: string): Promise<PrivateCar | undefined>;
  createPrivateCar(privateCar: InsertPrivateCar): Promise<PrivateCar>;
  
  // Travel Package operations
  getTravelPackages(): Promise<TravelPackage[]>;
  getTravelPackage(id: string): Promise<TravelPackage | undefined>;
  createTravelPackage(travelPackage: InsertTravelPackage): Promise<TravelPackage>;
  
  // Restaurant operations
  getRestaurants(): Promise<Restaurant[]>;
  getRestaurant(id: string): Promise<Restaurant | undefined>;
  createRestaurant(restaurant: InsertRestaurant): Promise<Restaurant>;
  
  // Booking operations
  getBookings(userId: string): Promise<Booking[]>;
  getBooking(id: string): Promise<Booking | undefined>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  updateBookingStatus(id: string, status: string): Promise<Booking | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private destinations: Map<string, Destination>;
  private hotels: Map<string, Hotel>;
  private tripPlanners: Map<string, TripPlanner>;
  private buses: Map<string, Bus>;
  private privateCars: Map<string, PrivateCar>;
  private travelPackages: Map<string, TravelPackage>;
  private restaurants: Map<string, Restaurant>;
  private bookings: Map<string, Booking>;

  constructor() {
    this.users = new Map();
    this.destinations = new Map();
    this.hotels = new Map();
    this.tripPlanners = new Map();
    this.buses = new Map();
    this.privateCars = new Map();
    this.travelPackages = new Map();
    this.restaurants = new Map();
    this.bookings = new Map();
    
    // Initialize with sample data
    this.initializeSampleData().catch((error) => {
      console.error('Failed to initialize sample data:', error);
      // Continue with empty storage if initialization fails
    });
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
  
  // Trip Planner operations
  async getTripPlanners(): Promise<TripPlanner[]> {
    return Array.from(this.tripPlanners.values());
  }
  
  async getTripPlanner(id: string): Promise<TripPlanner | undefined> {
    return this.tripPlanners.get(id);
  }
  
  async createTripPlanner(insertTripPlanner: InsertTripPlanner): Promise<TripPlanner> {
    const id = randomUUID();
    const tripPlanner: TripPlanner = { 
      ...insertTripPlanner, 
      id,
      duration: insertTripPlanner.duration || '',
      stops: insertTripPlanner.stops || '',
      departureDate: insertTripPlanner.departureDate || '',
      returnDate: insertTripPlanner.returnDate || '',
      dealType: insertTripPlanner.dealType || ''
    };
    this.tripPlanners.set(id, tripPlanner);
    return tripPlanner;
  }
  
  // Bus operations
  async getBuses(): Promise<Bus[]> {
    return Array.from(this.buses.values());
  }
  
  async getBus(id: string): Promise<Bus | undefined> {
    return this.buses.get(id);
  }
  
  async createBus(insertBus: InsertBus): Promise<Bus> {
    const id = randomUUID();
    const bus: Bus = { 
      ...insertBus, 
      id,
      amenities: insertBus.amenities || []
    };
    this.buses.set(id, bus);
    return bus;
  }
  
  // Private Car operations
  async getPrivateCars(): Promise<PrivateCar[]> {
    return Array.from(this.privateCars.values());
  }
  
  async getPrivateCar(id: string): Promise<PrivateCar | undefined> {
    return this.privateCars.get(id);
  }
  
  async createPrivateCar(insertPrivateCar: InsertPrivateCar): Promise<PrivateCar> {
    const id = randomUUID();
    const privateCar: PrivateCar = { 
      ...insertPrivateCar, 
      id,
      features: insertPrivateCar.features || []
    };
    this.privateCars.set(id, privateCar);
    return privateCar;
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
  
  // Restaurant operations
  async getRestaurants(): Promise<Restaurant[]> {
    return Array.from(this.restaurants.values());
  }
  
  async getRestaurant(id: string): Promise<Restaurant | undefined> {
    return this.restaurants.get(id);
  }
  
  async createRestaurant(insertRestaurant: InsertRestaurant): Promise<Restaurant> {
    const id = randomUUID();
    const restaurant: Restaurant = { 
      ...insertRestaurant, 
      id,
      reviews: insertRestaurant.reviews || []
    };
    this.restaurants.set(id, restaurant);
    return restaurant;
  }

  // Booking operations
  async getBookings(userId: string): Promise<Booking[]> {
    return Array.from(this.bookings.values()).filter(
      (booking) => booking.userId === userId
    );
  }

  async getBooking(id: string): Promise<Booking | undefined> {
    return this.bookings.get(id);
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const id = randomUUID();
    const now = new Date();
    const booking: Booking = { 
      ...insertBooking,
      id,
      status: insertBooking.status || 'confirmed',
      // Handle nullable fields by converting undefined to null
      roomType: insertBooking.roomType || null,
      checkIn: insertBooking.checkIn || null,
      checkOut: insertBooking.checkOut || null,
      nights: insertBooking.nights || null,
      guests: insertBooking.guests || null,
      totalAmount: insertBooking.totalAmount || null,
      reservationDate: insertBooking.reservationDate || null,
      reservationTime: insertBooking.reservationTime || null,
      partySize: insertBooking.partySize || null,
      cuisine: insertBooking.cuisine || null,
      priceRange: insertBooking.priceRange || null,
      createdAt: now,
      updatedAt: now
    };
    this.bookings.set(id, booking);
    return booking;
  }

  async updateBookingStatus(id: string, status: string): Promise<Booking | undefined> {
    const booking = this.bookings.get(id);
    if (booking) {
      const updatedBooking = { ...booking, status, updatedAt: new Date() };
      this.bookings.set(id, updatedBooking);
      return updatedBooking;
    }
    return undefined;
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
      phone: '+880-341-64521',
      amenities: ['Sea View', 'Pool', 'Spa', 'Restaurant'],
    });
    
    await this.createHotel({
      name: 'Pan Pacific Sonargaon',
      location: 'Dhaka • Business District • 5-Star',
      description: 'Premier luxury hotel in the heart of Dhaka',
      imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      rating: '4.8',
      pricePerNight: 12500,
      phone: '+880-2-8833221',
      amenities: ['Business Center', 'Gym', 'Pool', 'Multiple Restaurants'],
    });

    await this.createHotel({
      name: 'Hotel Agrabad',
      location: 'Chittagong • Port City • Business Hotel',
      description: 'Modern hotel in the commercial heart of Chittagong',
      imageUrl: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      rating: '4.3',
      pricePerNight: 7800,
      phone: '+880-31-726543',
      amenities: ['Conference Hall', 'Restaurant', 'Wi-Fi', 'Airport Shuttle'],
    });

    await this.createHotel({
      name: 'Hotel Supreme',
      location: 'Sylhet • City Center • Premium',
      description: 'Elegant hotel with mountain views and tea garden access',
      imageUrl: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      rating: '4.4',
      pricePerNight: 6500,
      phone: '+880-821-719832',
      amenities: ['Garden View', 'Traditional Cuisine', 'Cultural Tours'],
    });

    await this.createHotel({
      name: 'Kuakata Guest House',
      location: 'Kuakata • Beachfront • Eco-Resort',
      description: 'Sustainable beachfront accommodation with sunrise/sunset views',
      imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      rating: '4.1',
      pricePerNight: 4200,
      phone: '+880-441-56789',
      amenities: ['Beach Access', 'Fishing Trips', 'Local Cuisine'],
    });

    await this.createHotel({
      name: 'Rangamati Water Resort',
      location: 'Rangamati • Lakeside • Resort',
      description: 'Floating resort with panoramic lake views and boat facilities',
      imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      rating: '4.5',
      pricePerNight: 5800,
      phone: '+880-351-62456',
      amenities: ['Lake View', 'Boat Rides', 'Tribal Cultural Shows'],
    });

    // Initialize sample trip planners
    await this.createTripPlanner({
      origin: 'Dhaka',
      destination: "Cox's Bazar",
      price: 4500,
      duration: 'Round trip • Direct',
      stops: 'Direct',
      departureDate: 'Dec 15 - Dec 22',
      returnDate: 'Dec 22',
      dealType: 'Save 20%',
    });
    
    await this.createTripPlanner({
      origin: 'Dhaka',
      destination: 'Sylhet',
      price: 3800,
      duration: 'Round trip • Direct',
      stops: 'Direct',
      departureDate: 'Jan 10 - Jan 20',
      returnDate: 'Jan 20',
      dealType: 'Hot Deal',
    });

    await this.createTripPlanner({
      origin: 'Dhaka',
      destination: 'Chittagong',
      price: 4200,
      duration: 'Round trip • Direct',
      stops: 'Direct',
      departureDate: 'Feb 5 - Feb 15',
      returnDate: 'Feb 15',
      dealType: 'Limited Seats',
    });

    await this.createTripPlanner({
      origin: 'Chittagong',
      destination: 'Cox\'s Bazar',
      price: 2800,
      duration: 'Round trip • Direct',
      stops: 'Direct',
      departureDate: 'Mar 1 - Mar 10',
      returnDate: 'Mar 10',
      dealType: 'Best Price',
    });

    await this.createTripPlanner({
      origin: 'Dhaka',
      destination: 'Jessore',
      price: 3200,
      duration: 'Round trip • Direct',
      stops: 'Direct',
      departureDate: 'Apr 15 - Apr 25',
      returnDate: 'Apr 25',
      dealType: 'Early Bird',
    });

    await this.createTripPlanner({
      origin: 'Sylhet',
      destination: 'Cox\'s Bazar',
      price: 5500,
      duration: 'Round trip • 1 Stop',
      stops: '1 Stop in Dhaka',
      departureDate: 'May 20 - May 30',
      returnDate: 'May 30',
      dealType: 'Weekend Special',
    });

    await this.createTripPlanner({
      origin: 'Dhaka',
      destination: 'Barisal',
      price: 2900,
      duration: 'Round trip • Direct',
      stops: 'Direct',
      departureDate: 'Jun 10 - Jun 20',
      returnDate: 'Jun 20',
      dealType: 'Summer Deal',
    });

    // Initialize sample buses
    await this.createBus({
      operator: 'Green Line Paribahan',
      type: 'AC Bus',
      departure: '07:00 AM',
      arrival: '03:00 PM',
      duration: '8h 0m',
      price: 1200,
      seats: 45,
      amenities: ['AC', 'WiFi', 'TV', 'Refreshments'],
      rating: '4.5'
    });

    await this.createBus({
      operator: 'Shohagh Paribahan',
      type: 'Non-AC Bus',
      departure: '09:30 AM',
      arrival: '05:30 PM',
      duration: '8h 0m',
      price: 800,
      seats: 52,
      amenities: ['TV', 'Refreshments'],
      rating: '4.2'
    });

    await this.createBus({
      operator: 'Hanif Enterprise',
      type: 'Sleeper Coach',
      departure: '10:00 PM',
      arrival: '06:00 AM',
      duration: '8h 0m',
      price: 1500,
      seats: 32,
      amenities: ['AC', 'WiFi', 'Sleeper Berth', 'Blanket'],
      rating: '4.7'
    });

    await this.createBus({
      operator: 'Ena Transport',
      type: 'Deluxe Bus',
      departure: '06:00 AM',
      arrival: '02:00 PM',
      duration: '8h 0m',
      price: 1000,
      seats: 40,
      amenities: ['AC', 'TV', 'Refreshments'],
      rating: '4.3'
    });

    // Initialize sample private cars
    await this.createPrivateCar({
      type: 'Toyota Premio',
      category: 'Sedan',
      capacity: 4,
      duration: '5h 30m',
      price: 8500,
      driver: 'Included',
      features: ['AC', 'GPS', 'Professional Driver', 'Fuel Included'],
      rating: '4.8'
    });

    await this.createPrivateCar({
      type: 'Toyota Hiace',
      category: 'Microbus',
      capacity: 12,
      duration: '6h 0m',
      price: 12000,
      driver: 'Included',
      features: ['AC', 'GPS', 'Professional Driver', 'Fuel Included', 'Extra Space'],
      rating: '4.6'
    });

    await this.createPrivateCar({
      type: 'Mitsubishi Pajero',
      category: 'SUV',
      capacity: 7,
      duration: '5h 45m',
      price: 15000,
      driver: 'Included',
      features: ['AC', 'GPS', '4WD', 'Professional Driver', 'Fuel Included', 'Luxury Interior'],
      rating: '4.9'
    });

    await this.createPrivateCar({
      type: 'Honda CRV',
      category: 'SUV',
      capacity: 5,
      duration: '5h 15m',
      price: 10500,
      driver: 'Included',
      features: ['AC', 'GPS', 'Professional Driver', 'Fuel Included', 'Comfortable Interior'],
      rating: '4.7'
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

    // Initialize sample restaurants
    await this.createRestaurant({
      name: 'Jhau Bon Restaurant',
      location: "Cox's Bazar • Beachfront • Seafood",
      description: 'Fresh seafood with panoramic ocean views and traditional Bengali cuisine',
      imageUrl: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      rating: '4.6',
      cuisine: 'Bengali Seafood',
      priceRange: '৳৳৳',
      phone: '+880-341-65432',
      reviews: ['Amazing fresh fish and prawns!', 'Best beachfront dining experience', 'Authentic Bengali flavors with sea view']
    });

    await this.createRestaurant({
      name: 'Handi Restaurant',
      location: 'Dhaka • Dhanmondi • Fine Dining',
      description: 'Premium dining experience with authentic Bangladeshi and Indian cuisine',
      imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      rating: '4.8',
      cuisine: 'Bangladeshi & Indian',
      priceRange: '৳৳৳৳',
      phone: '+880-2-9661234',
      reviews: ['Excellent biryani and kebabs', 'Elegant atmosphere for special occasions', 'Outstanding service and food quality']
    });

    await this.createRestaurant({
      name: 'Mezban Restaurant',
      location: 'Chittagong • Agrabad • Traditional',
      description: 'Traditional Chittagonian cuisine including famous mezbani beef',
      imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      rating: '4.5',
      cuisine: 'Chittagonian',
      priceRange: '৳৳',
      phone: '+880-31-654987',
      reviews: ['Authentic mezbani beef curry', 'Must-try Chittagonian specialties', 'Rich flavors and generous portions']
    });

    await this.createRestaurant({
      name: 'Tea Resort Restaurant',
      location: 'Sylhet • Sreemangal • Garden Dining',
      description: 'Garden restaurant serving fresh local cuisine amidst tea plantations',
      imageUrl: 'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      rating: '4.4',
      cuisine: 'Local & Continental',
      priceRange: '৳৳',
      phone: '+880-821-567234',
      reviews: ['Beautiful garden setting', 'Fresh organic ingredients', 'Perfect spot for tea lovers']
    });

    await this.createRestaurant({
      name: 'Tribal Kitchen',
      location: 'Bandarban • Hill District • Ethnic',
      description: 'Authentic tribal cuisine featuring indigenous cooking methods and ingredients',
      imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      rating: '4.7',
      cuisine: 'Tribal & Indigenous',
      priceRange: '৳৳',
      phone: '+880-361-23456',
      reviews: ['Unique bamboo shoot dishes', 'Cultural dining experience', 'Incredible hill station atmosphere']
    });

    await this.createRestaurant({
      name: 'Mangrove Cafe',
      location: 'Sundarbans • Eco-Resort • Natural',
      description: 'Eco-friendly restaurant serving sustainable local cuisine in the heart of mangroves',
      imageUrl: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      rating: '4.3',
      cuisine: 'Eco-Local',
      priceRange: '৳৳',
      phone: '+880-41-789123',
      reviews: ['Sustainable and delicious', 'Beautiful nature views while dining', 'Supporting local communities']
    });

    // Add more location-specific hotels for better filtering
    await this.createHotel({
      name: 'Dhaka Regency Hotel',
      location: 'Dhaka • Gulshan • Business District',
      description: 'Modern business hotel in the heart of Dhaka with executive facilities',
      imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      rating: '4.5',
      pricePerNight: 9500,
      phone: '+880-2-8821456',
      amenities: ['Business Center', 'Rooftop Pool', 'Airport Transfer', 'Conference Rooms'],
    });

    await this.createHotel({
      name: 'Sundarbans Eco Lodge',
      location: 'Khulna • Sundarbans • Eco Resort',
      description: 'Sustainable eco-lodge offering wildlife viewing and nature experiences',
      imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      rating: '4.2',
      pricePerNight: 6800,
      phone: '+880-41-567890',
      amenities: ['Wildlife Tours', 'Boat Trips', 'Nature Walks', 'Bird Watching'],
    });

    await this.createHotel({
      name: 'Hill View Resort',
      location: 'Bandarban • Hill District • Mountain Resort',
      description: 'Mountain resort with panoramic valley views and adventure activities',
      imageUrl: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      rating: '4.6',
      pricePerNight: 7200,
      phone: '+880-361-78912',
      amenities: ['Mountain Views', 'Trekking Guide', 'Tribal Cultural Shows', 'Adventure Sports'],
    });

    // Add more location-specific restaurants
    await this.createRestaurant({
      name: 'Old Dhaka Biriyani House',
      location: 'Dhaka • Old Town • Traditional',
      description: 'Famous for authentic Dhaka-style biriyani and traditional Bengali dishes',
      imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      rating: '4.7',
      cuisine: 'Traditional Bengali',
      priceRange: '৳৳',
      phone: '+880-2-7312456',
      reviews: ['Best biriyani in Old Dhaka!', 'Authentic flavors passed down generations', 'Must-try for biriyani lovers']
    });

    await this.createRestaurant({
      name: 'Khulna Riverside Grill',
      location: 'Khulna • Riverfront • Seafood',
      description: 'Fresh river fish and traditional Khulna cuisine with riverside dining',
      imageUrl: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      rating: '4.4',
      cuisine: 'River Fish & Bengali',
      priceRange: '৳৳',
      phone: '+880-41-234567',
      reviews: ['Fresh river fish preparations', 'Beautiful riverside setting', 'Authentic Khulna flavors']
    });

    await this.createRestaurant({
      name: 'Patuakhali Beach Shack',
      location: 'Patuakhali • Kuakata Beach • Coastal',
      description: 'Beachside restaurant specializing in fresh seafood and coastal delicacies',
      imageUrl: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      rating: '4.3',
      cuisine: 'Coastal Seafood',
      priceRange: '৳৳',
      phone: '+880-441-34567',
      reviews: ['Fresh crab and prawns', 'Perfect sunset dining', 'Authentic coastal flavors']
    });

    // Add Bagerhat hotels and restaurants
    await this.createHotel({
      name: 'Bagerhat Heritage Hotel',
      location: 'Bagerhat • Historic City • Heritage Hotel',
      description: 'Traditional hotel near the famous Sixty Dome Mosque with Islamic architecture',
      imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      rating: '4.1',
      pricePerNight: 4500,
      phone: '+880-468-23456',
      amenities: ['Mosque View', 'Traditional Architecture', 'Cultural Tours', 'Free WiFi'],
    });

    await this.createHotel({
      name: 'Khan Jahan Ali Resort',
      location: 'Bagerhat • Mosque City • Boutique Resort',
      description: 'Boutique resort inspired by the medieval ruler Khan Jahan Ali with modern amenities',
      imageUrl: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      rating: '4.3',
      pricePerNight: 5800,
      phone: '+880-468-56789',
      amenities: ['Heritage Tours', 'Restaurant', 'Garden Views', 'Airport Transfer'],
    });

    await this.createHotel({
      name: 'Sixty Dome Guest House',
      location: 'Bagerhat • UNESCO Site • Budget Hotel',
      description: 'Comfortable budget accommodation within walking distance of UNESCO World Heritage sites',
      imageUrl: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      rating: '3.9',
      pricePerNight: 2800,
      phone: '+880-468-12345',
      amenities: ['Heritage Site Access', 'Local Guide Service', 'Traditional Breakfast', 'Bicycle Rental'],
    });

    await this.createRestaurant({
      name: 'Khan Jahan Ali Kitchen',
      location: 'Bagerhat • Historic Quarter • Traditional',
      description: 'Traditional Bengali restaurant serving authentic regional dishes near the mosque complex',
      imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      rating: '4.2',
      cuisine: 'Traditional Bengali',
      priceRange: '৳৳',
      phone: '+880-468-98765',
      reviews: ['Authentic local flavors', 'Historic atmosphere', 'Great traditional fish curry']
    });

    await this.createRestaurant({
      name: 'Heritage Spice Restaurant',
      location: 'Bagerhat • Mosque City • Regional Cuisine',
      description: 'Family-owned restaurant specializing in Bagerhat regional cuisine and fresh river fish',
      imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      rating: '4.4',
      cuisine: 'Regional Bengali',
      priceRange: '৳৳',
      phone: '+880-468-45678',
      reviews: ['Amazing river fish preparations', 'Warm hospitality', 'Must-try local specialties']
    });

    await this.createRestaurant({
      name: 'Dome View Cafe',
      location: 'Bagerhat • UNESCO Area • Cafe',
      description: 'Charming cafe with views of historic domes serving tea, snacks and light meals',
      imageUrl: 'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      rating: '4.0',
      cuisine: 'Cafe & Snacks',
      phone: '+880-468-87654',
      priceRange: '৳',
      reviews: ['Perfect for history lovers', 'Great tea and pastries', 'Beautiful dome views']
    });
    
    console.log('Storage initialized successfully with sample data');
  }
}

export const storage = new MemStorage();
