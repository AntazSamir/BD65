import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, decimal, boolean } from "drizzle-orm/pg-core";
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

export type InsertUser = z.infer<typeof insertUserSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;
export type LoginCredentials = z.infer<typeof loginSchema>;
export type InsertDestination = z.infer<typeof insertDestinationSchema>;
export type InsertHotel = z.infer<typeof insertHotelSchema>;
export type InsertFlight = z.infer<typeof insertFlightSchema>;
export type InsertTravelPackage = z.infer<typeof insertTravelPackageSchema>;
export type User = typeof users.$inferSelect;
export type Destination = typeof destinations.$inferSelect;
export type Hotel = typeof hotels.$inferSelect;
export type Flight = typeof flights.$inferSelect;
export type TravelPackage = typeof travelPackages.$inferSelect;
