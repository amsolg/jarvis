# Contributing to Pensieve

Thank you for your interest in contributing to Pensieve! This document provides guidelines and instructions for contributing to this project.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for everyone involved. Please be kind and constructive in all interactions.

## Getting Started

1. Fork the repository
2. Clone your fork locally
3. Create a new branch for your feature or fix
4. Make your changes
5. Push your branch and submit a pull request

## Branching Strategy

We use a simplified Git workflow with the following branches:

- `main`: Production-ready code
- `dev`: Development branch where features are integrated
- Feature branches: Created from `dev` for individual features or fixes

Branch naming convention:
- Feature branches: `feature/short-description`
- Bug fix branches: `fix/short-description`
- Documentation branches: `docs/short-description`

## Commit Messages

Commit messages should be clear and descriptive. We follow these conventions:

- Start with a type: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`
- Use the imperative mood ("Add feature" not "Added feature")
- Keep the first line under 72 characters
- Reference relevant issues in the commit body

Example:
```
feat: add user authentication system

- Implement JWT token handling
- Add login and registration forms
- Set up authentication middleware

Fixes #42
```

## Pull Requests

When submitting a pull request:

1. Update the README.md with details of changes if applicable
2. Update documentation as needed
3. The PR should work properly on the target branch
4. Link any relevant issues in the PR description
5. Request a review from at least one maintainer

## Coding Standards

### General Guidelines

- Write clear, readable, and maintainable code
- Use meaningful variable and function names
- Add comments for complex logic, but prefer self-documenting code
- Follow the principle of single responsibility

### JavaScript/TypeScript

- Use ES6+ features where appropriate
- Follow [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- Use `const` for variables that don't change, `let` otherwise
- Use async/await for asynchronous code instead of callbacks
- Document functions with JSDoc comments

### CSS/SCSS

- Use BEM methodology for CSS class naming
- Prefer flexbox and grid for layouts
- Use variables for colors, spacing, and other repeated values
- Keep selectors as simple as possible

### Testing

- Write tests for all new features and bug fixes
- Maintain or improve code coverage with each contribution
- Follow the existing testing patterns in the codebase

## Development Setup

### Prerequisites

- Node.js (v14+)
- npm or yarn
- Git

### Setting Up Local Development Environment

1. Install dependencies: `npm install`
2. Configure environment variables (copy `.env.example` to `.env`)
3. Start development server: `npm run dev`
4. Run tests: `npm test`

## Issue Tracking

- Use GitHub Issues for bug reports, feature requests, and other tasks
- Apply appropriate labels to issues
- Reference issues in commits and pull requests
- Use the project board for task organization

## Documentation

- Update documentation when adding or modifying features
- Document APIs using standard formats
- Keep the README.md up-to-date with the latest instructions
- Add inline code comments where complex logic needs explanation

## Review Process

1. All code changes require a pull request
2. At least one maintainer must approve the PR
3. All CI checks must pass before merging
4. Feedback should be addressed before merging

## License

By contributing to Pensieve, you agree that your contributions will be licensed under the project's license.