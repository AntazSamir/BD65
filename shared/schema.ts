import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, decimal, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
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

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
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
export type InsertDestination = z.infer<typeof insertDestinationSchema>;
export type InsertHotel = z.infer<typeof insertHotelSchema>;
export type InsertFlight = z.infer<typeof insertFlightSchema>;
export type InsertTravelPackage = z.infer<typeof insertTravelPackageSchema>;
export type User = typeof users.$inferSelect;
export type Destination = typeof destinations.$inferSelect;
export type Hotel = typeof hotels.$inferSelect;
export type Flight = typeof flights.$inferSelect;
export type TravelPackage = typeof travelPackages.$inferSelect;
