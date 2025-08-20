# BD Explorer - Full-Stack Travel Booking Platform

## Overview

BD Explorer is a modern full-stack travel booking platform built with React, TypeScript, and Express.js, specifically focused on Bangladesh tourism. The application provides users with a comprehensive travel planning experience, allowing them to browse Bangladesh's destinations, hotels, domestic flights, and travel packages. The platform features a responsive design with a modern UI built using shadcn/ui components and Tailwind CSS, showcasing authentic Bangladesh tourist spots and experiences.

## User Preferences

Preferred communication style: Simple, everyday language.
Project Focus: Bangladesh tourism and travel destinations.

## Recent Changes

- Updated all travel data to showcase authentic Bangladesh tourist destinations including Cox's Bazar, Sundarbans, Sylhet Tea Gardens, Saint Martin Island, Bandarban Hills, and Paharpur Buddhist Vihara
- Changed pricing format from USD ($) to Bangladeshi Taka (৳) throughout the application
- Updated branding from "TravelHub" to "BD Explorer" 
- Modified flight routes to show domestic Bangladesh destinations (Dhaka, Cox's Bazar, Sylhet, Chittagong, Jessore)
- Updated hotel listings to feature authentic Bangladesh accommodations
- Created Bangladesh-specific testimonials
- Added comprehensive FAQ section about Bangladesh travel
- Updated hero section messaging to focus on discovering Bangladesh
- Removed travel packages section from home page per user request
- Created comprehensive About page with company story, team, values, mission, and statistics
- Updated navigation to link to the new About page (/about route)
- Created comprehensive Support page (/support route) with contact information, FAQ section, support ticket form, and help resources (August 2025)
- Enhanced Support page hero section with professional customer service imagery and improved layout with stats and visual elements

### Layout and Visual Improvements (August 2025)
- Enhanced Popular Destinations section layout with increased spacing between hero and destinations
- Moved destination text content (headings, descriptions, buttons) to a dedicated gap section with light background
- Increased destination section height to 800px for more immersive background images
- Positioned destination cards at the bottom of the section for better visual hierarchy
- Reduced destination card image heights for better proportions (h-32 md:h-48)
- Updated 9 destinations with authentic custom images stored in /client/public/assets/
- Implemented proper state management for destination selection across components
- Completely redesigned destinations page hero section with dynamic carousel backgrounds, interactive search, stats display, and engaging CTAs (August 2025)
- Added functional search and filtering capabilities for destinations with real-time results
- Enhanced visual hierarchy with backdrop blur effects, gradient text, and animated elements
- **Full Page Booking System (August 2025)**: 
  - Created dedicated booking pages for hotels (/hotel-booking/:id), restaurants (/restaurant-booking/:id), and transportation (/transport-booking/:type/:id)
  - Replaced dialog-based booking with comprehensive full-page forms
  - Added mandatory National ID (NID) requirement for hotel and transport bookings
  - Implemented comprehensive booking forms with authentication requirements
  - Users must sign in before making any hotel, restaurant, or transportation bookings
  - Added seat selection functionality for bus bookings
  - Implemented booking confirmation screens with receipt download capability
  - Enhanced booking receipts to include NID information for compliance
  - Added "Couple Room" option to hotel booking room types
- **Auto-sliding Carousel Implementation (August 2025)**: 
  - Added 9 new destinations with high-quality Unsplash images (total now 18 destinations)
  - Implemented auto-sliding carousel showing 5 cards with center focus
  - Auto-slides every 3 seconds with smooth transitions
  - Manual navigation with left/right arrows and dot indicators
  - Center card displays larger with white ring indicator
  - Background changes to match center card image with smooth transitions
  - Auto-sliding pauses for 10 seconds when user interacts manually
  - Enhanced destination details display in header with rating and pricing

### Bug Fixes and Code Quality Improvements (August 2025)
- **Authentication System**: Fixed auth hook to properly handle 401 responses without throwing errors
- **API Response Handling**: Fixed sign in, sign up, sign out, and profile update functions to properly parse JSON responses
- **Code Cleanup**: Removed debugging console.log statements from production booking API routes
- **Trip Planner UI**: Reduced trip planner card image height from h-48 to h-36 for more compact display

### Design System Overhaul - "Why Choose Us" Styling Applied (August 2025)
- **Consistent Visual Language**: Applied the elegant "Why Choose Us" section styling across the entire website
- **Soft Gradient Backgrounds**: Implemented three main background gradients (soft, warm, cool) for different sections
- **Enhanced Card Design**: Created unified "elegant-card" class with improved shadows, rounded corners, and hover effects
- **Colorful Section Icons**: Added decorative colored icons to all major sections:
  - Hotels: Blue building icon
  - Trip Planner: Orange map icon  
  - Testimonials: Green chat icon
  - FAQ: Purple question icon
  - Newsletter: Yellow mail icon
- **Improved Visual Hierarchy**: Enhanced navigation with better shadows, updated buttons with rounded corners and lift effects
- **Color Coordination**: Applied consistent color scheme with orange, blue, green, purple, red, and yellow icon backgrounds
- **Smooth Transitions**: Enhanced all hover effects and animations to match the refined aesthetic

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: shadcn/ui component library with Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens and CSS variables
- **State Management**: TanStack Query for server state management
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Development Server**: Hot module replacement via Vite integration
- **Middleware**: JSON parsing, URL encoding, and request logging
- **Error Handling**: Centralized error handling middleware

### Data Layer
- **Database**: PostgreSQL (configured for production)
- **ORM**: Drizzle ORM with type-safe schema definitions
- **Storage Interface**: Abstracted storage layer with in-memory implementation for development
- **Schema**: Includes users, destinations, hotels, flights, and travel packages tables

### Development Environment
- **Hot Reloading**: Vite development server with HMR
- **Type Checking**: TypeScript with strict mode enabled
- **Code Quality**: Path aliases for clean imports
- **Error Overlay**: Runtime error modal for development

### Project Structure
- **Monorepo Layout**: Client, server, and shared code in organized directories
- **Client**: React application with component-based architecture
- **Server**: Express.js API with modular route structure
- **Shared**: Common TypeScript types and database schema

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React 18, React DOM, TanStack Query for data fetching
- **Express.js**: Web server framework with TypeScript support
- **Wouter**: Lightweight routing library for React

### Database & ORM
- **Drizzle ORM**: Type-safe database interactions
- **Neon Database**: PostgreSQL serverless database provider
- **Drizzle Kit**: Database migrations and schema management

### UI & Styling
- **Radix UI**: Comprehensive set of unstyled, accessible UI primitives
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library
- **shadcn/ui**: Pre-built component library

### Development Tools
- **Vite**: Build tool and development server
- **TypeScript**: Static type checking
- **PostCSS**: CSS processing with Tailwind
- **ESBuild**: Fast JavaScript bundler for production

### Additional Libraries
- **Date-fns**: Date manipulation utilities
- **Class Variance Authority**: Utility for managing component variants
- **React Hook Form**: Form state management with validation
- **Embla Carousel**: Carousel component library