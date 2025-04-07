# Educational Platform

A modern platform for learning programming through hands-on projects and interactive exercises.

## Features

- Project-based learning with real-world applications
- Interactive code playground
- Community-driven learning environment
- Personalized learning paths
- Code reviews and mentorship
- Progress tracking and achievements

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables (see `.env.example`)
4. Run development server: `npm run dev`

## Deployment

This project uses GitHub Actions for CI/CD to automatically deploy to Vercel.

- All pushes to the `main` branch trigger an automatic deployment
- See `.github/workflows/deploy.yml` for the workflow configuration
- Check `docs/CICD-SETUP.md` for detailed setup instructions

### Manual Deployment

You can also deploy manually:

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy to production
vercel deploy --prod
```

## Recent Updates

### Project Page Enhancement
- Improved project discovery and filtering
- Enhanced project details and documentation
- Better code examples and explanations
- Integrated testing environment

### Community Features
- Enhanced collaboration tools
- Improved discussion forums
- Real-time chat integration
- Mentorship program

### UI/UX Improvements
- Modern, responsive design
- Dark mode support
- Improved navigation
- Better mobile experience

## Contributing

We welcome contributions! Please see our contributing guidelines for more details.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
