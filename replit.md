# TravelHub - Full-Stack Travel Booking Platform

## Overview

TravelHub is a modern full-stack travel booking platform built with React, TypeScript, and Express.js. The application provides users with a comprehensive travel planning experience, allowing them to browse destinations, hotels, flights, and travel packages. The platform features a responsive design with a modern UI built using shadcn/ui components and Tailwind CSS.

## User Preferences

Preferred communication style: Simple, everyday language.

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