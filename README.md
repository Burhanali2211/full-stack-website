# Educational Platform

A modern, interactive educational platform for learning programming and web development built with Next.js 14, React, TypeScript, and Tailwind CSS.

## Features

- Modern UI with light/dark mode support
- Responsive design for all devices
- Interactive tutorials with code editor
- Project-based learning
- Blog with educational articles
- User authentication with Supabase
- Community features

## Technologies Used

- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion for animations
- Radix UI for accessible components
- Supabase for authentication and database
- Zustand for state management
- React Query for data fetching

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- PostgreSQL (optional, for local development)

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/educational-platform.git
cd educational-platform
```

2. Install dependencies

```bash
npm install --legacy-peer-deps
# or
yarn install
```

3. Set up environment variables

Copy the example environment file and modify it according to your setup:

```bash
cp .env.example .env.local
```

4. Start the development server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `src/app` - App Router pages and layouts
- `src/components` - Reusable UI components
- `src/lib` - Utility functions and hooks
- `src/contexts` - Context providers
- `public` - Static assets
- `prisma` - Database schema
- `styles` - Global styles

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Recent Updates

- Added missing Radix UI packages
- Fixed SVG image formatting issues
- Improved environment variable handling
- Enhanced light/dark mode contrast
- Optimized mobile responsiveness
- Updated Navbar and Contact components with better styling
- Added proper animations across components
