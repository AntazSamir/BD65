import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, decimal, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  username: text("username").notNull().unique(),
  phone: text("phone"),
  dateOfBirth: text("date_of_birth"),
  nationality: text("nationality"),
  profileImageUrl: text("profile_image_url"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const destinations = pgTable("destinations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  country: text("country").notNull(),
  district: text("district").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  rating: text("rating").notNull(),
  priceFrom: integer("price_from").notNull(),
});

export const hotels = pgTable("hotels", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  location: text("location").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  rating: text("rating").notNull(),
  pricePerNight: integer("price_per_night").notNull(),
  phone: text("phone").notNull(),
  amenities: text("amenities").array().notNull().default([]),
});

export const flights = pgTable("flights", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  origin: text("origin").notNull(),
  destination: text("destination").notNull(),
  price: integer("price").notNull(),
  duration: text("duration").notNull().default(''),
  stops: text("stops").notNull().default(''),
  departureDate: text("departure_date").notNull().default(''),
  returnDate: text("return_date").notNull().default(''),
  dealType: text("deal_type").notNull().default(''),
});

export const travelPackages = pgTable("travel_packages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  duration: text("duration").notNull(),
  rating: text("rating").notNull(),
  price: integer("price").notNull(),
  includes: text("includes").array().notNull().default([]),
});

export const restaurants = pgTable("restaurants", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  location: text("location").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  rating: text("rating").notNull(),
  cuisine: text("cuisine").notNull(),
  priceRange: text("price_range").notNull(),
  phone: text("phone").notNull(),
  reviews: text("reviews").array().notNull().default([]),
});

export const bookings = pgTable("bookings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  confirmationNumber: text("confirmation_number").notNull().unique(),
  bookingType: text("booking_type").notNull(), // 'hotel' or 'restaurant'
  propertyId: varchar("property_id").notNull(), // hotel or restaurant ID
  propertyName: text("property_name").notNull(),
  propertyLocation: text("property_location").notNull(),
  propertyImageUrl: text("property_image_url").notNull(),
  propertyPhone: text("property_phone").notNull(),
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email").notNull(),
  customerPhone: text("customer_phone").notNull(),
  status: text("status").notNull().default('confirmed'), // 'confirmed', 'cancelled'
  // Hotel specific fields
  roomType: text("room_type"),
  checkIn: text("check_in"),
  checkOut: text("check_out"),
  nights: integer("nights"),
  guests: integer("guests"),
  totalAmount: integer("total_amount"),
  // Restaurant specific fields
  reservationDate: text("reservation_date"),
  reservationTime: text("reservation_time"),
  partySize: integer("party_size"),
  cuisine: text("cuisine"),
  priceRange: text("price_range"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateUserSchema = createInsertSchema(users).omit({
  id: true,
  email: true,
  password: true,
  createdAt: true,
  updatedAt: true,
}).partial();

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const insertDestinationSchema = createInsertSchema(destinations).omit({
  id: true,
});

export const insertHotelSchema = createInsertSchema(hotels).omit({
  id: true,
});

export const insertFlightSchema = createInsertSchema(flights).omit({
  id: true,
});

export const insertTravelPackageSchema = createInsertSchema(travelPackages).omit({
  id: true,
});

export const insertRestaurantSchema = createInsertSchema(restaurants).omit({
  id: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;
export type LoginCredentials = z.infer<typeof loginSchema>;

export const insertBookingSchema = createInsertSchema(bookings).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type Booking = typeof bookings.$inferSelect;
export type InsertDestination = z.infer<typeof insertDestinationSchema>;
export type InsertHotel = z.infer<typeof insertHotelSchema>;
export type InsertFlight = z.infer<typeof insertFlightSchema>;
export type InsertTravelPackage = z.infer<typeof insertTravelPackageSchema>;
export type InsertRestaurant = z.infer<typeof insertRestaurantSchema>;
export type User = typeof users.$inferSelect;
export type Destination = typeof destinations.$inferSelect;
export type Hotel = typeof hotels.$inferSelect;
export type Flight = typeof flights.$inferSelect;
export type TravelPackage = typeof travelPackages.$inferSelect;
export type Restaurant = typeof restaurants.$inferSelect;
