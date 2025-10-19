# Contributing to Spotify Clone

Thank you for your interest in contributing to this project! This document provides guidelines for contributing to the Spotify Clone.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/spotify-clone.git`
3. Install dependencies: `npm install`
4. Create a feature branch: `git checkout -b feature/amazing-feature`
5. Make your changes
6. Run tests: `npm test`
7. Run linting: `npm run lint`
8. Commit your changes: `git commit -m 'Add amazing feature'`
9. Push to your branch: `git push origin feature/amazing-feature`
10. Open a Pull Request

## Development Guidelines

### Code Style

- Use TypeScript for all new code
- Follow the existing code style and patterns
- Use meaningful variable and function names
- Add JSDoc comments for complex functions
- Keep functions small and focused

### Testing

- Write tests for new features
- Ensure all tests pass before submitting
- Aim for good test coverage
- Use descriptive test names

### Commits

- Use conventional commit messages
- Keep commits focused and atomic
- Write clear, descriptive commit messages
- Reference issues when applicable

### Pull Requests

- Provide a clear description of changes
- Include screenshots for UI changes
- Ensure CI passes
- Request reviews from maintainers

## Project Structure

```
spotify-clone/
├── app/                    # Next.js App Router
├── components/            # React components
├── context/              # React Context providers
├── data/                 # Mock data and utilities
├── types/                # TypeScript type definitions
├── public/               # Static assets
└── tests/                # Test files
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode

## Reporting Issues

When reporting issues, please include:

- Clear description of the problem
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots (if applicable)
- Browser/OS information

## Feature Requests

For feature requests, please:

- Check existing issues first
- Provide a clear description
- Explain the use case
- Consider implementation complexity

## Code of Conduct

- Be respectful and inclusive
- Welcome newcomers
- Focus on constructive feedback
- Help others learn and grow

## Questions?

Feel free to open an issue for any questions or concerns. We're here to help!

Thank you for contributing! 🎵

