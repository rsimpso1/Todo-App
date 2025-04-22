# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

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

# Todo App

A simple todo application built with React and TypeScript.

## Features

- Add new todos
- Mark todos as completed
- Delete todos
- Responsive design for mobile and desktop
- Material Icons integration

## Components

The application is built with the following components:

- `Todo`: The main container component that manages the todo list state
- `TodoItem`: A component that represents a single todo item
- `Button`: A reusable button component used for add and delete actions
- `Input`: A reusable input component for the todo input field

## Testing

The application includes comprehensive tests for all components using Jest and React Testing Library.

### Running Tests

To run the tests, use the following command:

```bash
npm test
```

This will start the Jest test runner and execute all tests in the `src/components/__tests__` directory.

### Test Coverage

The tests cover the following functionality:

#### Todo Component
- Initial rendering
- Adding new todos
- Preventing empty todos
- Toggling todo completion status
- Deleting todos
- Handling multiple todos
- Form submission with Enter key
- Add button active state

#### TodoItem Component
- Rendering todo text
- Applying completed class
- Toggling completion status
- Deleting todos
- Event propagation handling

#### Button Component
- Rendering with correct icon
- Handling click events
- Applying variant classes
- Applying size classes
- Handling active state
- Applying custom classes
- Default props behavior

#### Input Component
- Rendering with correct value
- Handling change events
- Rendering with placeholder
- Rendering with name attribute
- Rendering with type attribute
- Applying custom classes
- Default props behavior

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

## Technologies Used

- React
- TypeScript
- SASS
- Jest
- React Testing Library
- Material Icons
