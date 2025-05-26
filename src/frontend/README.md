# Frontend

This directory contains the user interface components and frontend application code for Jarvis, implemented as a React + Vite application.

## Purpose

The frontend provides the user interface for interacting with the Jarvis knowledge base, including:

- User authentication UI
- Dashboard interface
- PARA method implementation UI
- Text and voice interaction interfaces

## Getting Started

To run the frontend prototype locally:

```bash
# Navigate to the frontend directory
cd src/frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at `http://localhost:5173` by default.

## Features

The current implementation is a frontend prototype with:
- Mock data (no backend connection)
- UI components for authentication, dashboard, and PARA method
- Responsive design for desktop and mobile

## Development

This project uses React with TypeScript and Vite for optimal developer experience.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
