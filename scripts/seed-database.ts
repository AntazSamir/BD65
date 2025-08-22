import 'dotenv/config';
import { db } from '../server/db';
import { destinations, hotels, restaurants, tripPlanners, buses, privateCars, travelPackages } from '@shared/schema';

async function seedDatabase() {
  if (!db) {
    console.error('Database connection not available. Please check your Supabase configuration.');
    process.exit(1);
  }

  try {
    console.log('🌱 Starting database seeding...');

    // Clear existing data (optional)
    console.log('🧹 Clearing existing data...');
    await db.delete(destinations);
    await db.delete(hotels);
    await db.delete(restaurants);
    await db.delete(tripPlanners);
    await db.delete(buses);
    await db.delete(privateCars);
    await db.delete(travelPackages);

    // Seed destinations
    console.log('📍 Seeding destinations...');
    await db.insert(destinations).values([
      {
        name: 'Lalbagh Fort',
        country: 'Bangladesh',
        district: 'Dhaka',
        description: 'Historic Mughal fort complex in Old Dhaka with beautiful architecture',
        imageUrl: '/assets/lalbagh-fort.jpg',
        rating: '4.2',
        priceFrom: 500,
      },
      {
        name: "Cox's Bazar",
        country: 'Bangladesh',
        district: "Cox's Bazar",
        description: "World's longest natural sandy sea beach",
        imageUrl: '/attached_assets/coxs-bazar-beach.jpg',
        rating: '4.8',
        priceFrom: 3500,
      },
      {
        name: 'Sundarbans',
        country: 'Bangladesh',
        district: 'Khulna',
        description: 'Largest mangrove forest and Royal Bengal Tiger habitat',
        imageUrl: '/attached_assets/বিষ্ময়কর_সুন্দরবন_1755679381011.jpg',
        rating: '4.9',
        priceFrom: 4500,
      },
      {
        name: 'Sylhet Tea Gardens',
        country: 'Bangladesh',
        district: 'Sylhet',
        description: 'Rolling green hills covered with tea plantations',
        imageUrl: '/attached_assets/R_1755680607561.jpg',
        rating: '4.7',
        priceFrom: 2800,
      },
      {
        name: 'Saint Martin Island',
        country: 'Bangladesh',
        district: "Cox's Bazar",
        description: 'Small coral island with pristine beaches and clear blue waters',
        imageUrl: '/attached_assets/R_1755681418237.jpg',
        rating: '4.6',
        priceFrom: 5200,
      },
      {
        name: 'Chittagong Hill Tracts',
        country: 'Bangladesh',
        district: 'Chittagong Hill Tracts',
        description: 'Mountainous region with tribal culture, waterfalls and scenic beauty',
        imageUrl: '/attached_assets/rsz_chittagong_hill_tracts_bangladesh_13817459523_1755682005508.jpg',
        rating: '4.8',
        priceFrom: 3200,
      }
    ]);

    // Seed hotels
    console.log('🏨 Seeding hotels...');
    await db.insert(hotels).values([
      {
        name: 'Sea Palace Hotel',
        location: "Cox's Bazar • Sea View • Premium Resort",
        description: 'Luxury beachfront hotel overlooking the Bay of Bengal',
        imageUrl: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
        rating: '4.7',
        pricePerNight: 8500,
        phone: '+880-341-64521',
        amenities: ['Sea View', 'Pool', 'Spa', 'Restaurant'],
      },
      {
        name: 'Pan Pacific Sonargaon',
        location: 'Dhaka • Business District • 5-Star',
        description: 'Premier luxury hotel in the heart of Dhaka',
        imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
        rating: '4.8',
        pricePerNight: 12500,
        phone: '+880-2-8833221',
        amenities: ['Business Center', 'Gym', 'Pool', 'Multiple Restaurants'],
      },
      {
        name: 'Hotel Agrabad',
        location: 'Chittagong • Port City • Business Hotel',
        description: 'Modern hotel in the commercial heart of Chittagong',
        imageUrl: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
        rating: '4.3',
        pricePerNight: 7800,
        phone: '+880-31-726543',
        amenities: ['Conference Hall', 'Restaurant', 'Wi-Fi', 'Airport Shuttle'],
      },
      {
        name: 'Hotel Supreme',
        location: 'Sylhet • City Center • Premium',
        description: 'Elegant hotel with mountain views and tea garden access',
        imageUrl: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
        rating: '4.4',
        pricePerNight: 6500,
        phone: '+880-821-719832',
        amenities: ['Garden View', 'Traditional Cuisine', 'Cultural Tours'],
      }
    ]);

    // Seed restaurants
    console.log('🍽️ Seeding restaurants...');
    await db.insert(restaurants).values([
      {
        name: 'Jhau Bon Restaurant',
        location: "Cox's Bazar • Beachfront • Seafood",
        description: 'Fresh seafood with panoramic ocean views and traditional Bengali cuisine',
        imageUrl: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
        rating: '4.6',
        cuisine: 'Bengali Seafood',
        priceRange: '৳৳৳',
        phone: '+880-341-65432',
        reviews: ['Amazing fresh fish and prawns!', 'Best beachfront dining experience', 'Authentic Bengali flavors with sea view']
      },
      {
        name: 'Handi Restaurant',
        location: 'Dhaka • Dhanmondi • Fine Dining',
        description: 'Premium dining experience with authentic Bangladeshi and Indian cuisine',
        imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
        rating: '4.8',
        cuisine: 'Bangladeshi & Indian',
        priceRange: '৳৳৳৳',
        phone: '+880-2-9661234',
        reviews: ['Excellent biryani and kebabs', 'Elegant atmosphere for special occasions', 'Outstanding service and food quality']
      }
    ]);

    // Seed trip planners
    console.log('✈️ Seeding trip planners...');
    await db.insert(tripPlanners).values([
      {
        origin: 'Dhaka',
        destination: "Cox's Bazar",
        price: 4500,
        duration: 'Round trip • Direct',
        stops: 'Direct',
        departureDate: 'Dec 15 - Dec 22',
        returnDate: 'Dec 22',
        dealType: 'Save 20%',
      },
      {
        origin: 'Dhaka',
        destination: 'Sylhet',
        price: 3800,
        duration: 'Round trip • Direct',
        stops: 'Direct',
        departureDate: 'Jan 10 - Jan 20',
        returnDate: 'Jan 20',
        dealType: 'Hot Deal',
      }
    ]);

    // Seed buses
    console.log('🚌 Seeding buses...');
    await db.insert(buses).values([
      {
        operator: 'Green Line Paribahan',
        type: 'AC Bus',
        origin: 'Dhaka',
        destination: 'Cox\'s Bazar',
        departure: '07:00 AM',
        arrival: '03:00 PM',
        duration: '8h 0m',
        price: 1200,
        seats: 45,
        amenities: ['AC', 'WiFi', 'TV', 'Refreshments'],
        rating: '4.5'
      },
      {
        operator: 'Shohagh Paribahan',
        type: 'Non-AC Bus',
        origin: 'Dhaka',
        destination: 'Chittagong',
        departure: '09:30 AM',
        arrival: '05:30 PM',
        duration: '8h 0m',
        price: 800,
        seats: 52,
        amenities: ['TV', 'Refreshments'],
        rating: '4.2'
      }
    ]);

    // Seed private cars
    console.log('🚗 Seeding private cars...');
    await db.insert(privateCars).values([
      {
        type: 'Toyota Premio',
        category: 'Sedan',
        origin: 'Dhaka',
        destination: 'Cox\'s Bazar',
        capacity: 4,
        duration: '5h 30m',
        price: 8500,
        driver: 'Included',
        features: ['AC', 'GPS', 'Professional Driver', 'Fuel Included'],
        rating: '4.8'
      }
    ]);

    // Seed travel packages
    console.log('📦 Seeding travel packages...');
    await db.insert(travelPackages).values([
      {
        name: "Cox's Bazar Beach Getaway",
        description: 'Relax at the world\'s longest natural beach with sunset views',
        imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
        duration: '5 Days',
        rating: '4.8',
        price: 15500,
        includes: ['Round-trip flights included', 'Sea-view hotel accommodation', 'Beach activities & water sports'],
      },
      {
        name: 'Sundarbans Wildlife Safari',
        description: 'Explore the mangrove forests and spot Royal Bengal Tigers',
        imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
        duration: '4 Days',
        rating: '4.9',
        price: 18500,
        includes: ['Professional wildlife guide', 'Boat safari through mangroves', 'Eco-lodge accommodation'],
      }
    ]);

    console.log('✅ Database seeding completed successfully!');
    console.log('📊 Summary:');
    console.log('- Destinations: 6 added');
    console.log('- Hotels: 4 added');
    console.log('- Restaurants: 2 added');
    console.log('- Trip Planners: 2 added');
    console.log('- Buses: 2 added');
    console.log('- Private Cars: 1 added');
    console.log('- Travel Packages: 2 added');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

// Run the seeder
seedDatabase();
