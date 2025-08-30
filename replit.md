# Overview

This is a modern full-stack portfolio website built with React frontend and Express backend. The application showcases a developer's skills, projects, and provides a contact form for potential clients or employers. It features a dark theme design with smooth animations, responsive layout, and modern UI components using shadcn/ui.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript for type safety
- **Build Tool**: Vite for fast development and optimized builds
- **UI Library**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming
- **Animations**: Framer Motion for smooth page transitions and interactions
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management
- **Form Handling**: React Hook Form with Zod validation

## Backend Architecture
- **Server**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Validation**: Zod schemas shared between frontend and backend
- **Development**: Hot reloading with Vite integration

## Data Storage
- **ORM**: Drizzle ORM configured for PostgreSQL
- **Schema**: Shared TypeScript schemas between client and server
- **Tables**: Users and contacts with proper relationships and constraints
- **Migrations**: Automated database migrations via drizzle-kit

## Design System
- **Component Library**: Custom components extending shadcn/ui
- **Theme**: Dark theme with purple-blue gradient accents
- **Typography**: Custom font stack including Inter, DM Sans, and Fira Code
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints

## Development Features
- **Type Safety**: Full TypeScript coverage across frontend, backend, and shared code
- **Code Organization**: Monorepo structure with clear separation of concerns
- **Development Tools**: ESBuild for production builds, hot reloading for development
- **Path Aliases**: Configured for clean imports across the application

# External Dependencies

## UI Components
- **Radix UI**: Comprehensive set of accessible UI primitives for complex components
- **shadcn/ui**: Pre-built component library with consistent design patterns
- **Framer Motion**: Advanced animation library for smooth user interactions
- **Lucide React**: Icon library for consistent iconography

## Database & ORM
- **Neon Database**: Serverless PostgreSQL database provider
- **Drizzle ORM**: Type-safe database toolkit with excellent TypeScript integration
- **Drizzle Kit**: Database migration and introspection tools

## Development Tools
- **Vite**: Next-generation frontend build tool with fast HMR
- **TanStack Query**: Powerful data fetching and caching library
- **Wouter**: Minimalist routing library for React applications
- **Zod**: TypeScript-first schema validation library

## Styling & Design
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Class Variance Authority**: Utility for creating variant-based component APIs
- **Clsx**: Utility for constructing className strings conditionally