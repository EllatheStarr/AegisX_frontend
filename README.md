# AegisX Frontend

## Overview

AegisX is a security-focused application designed to provide robust protection and monitoring capabilities. This repository contains the frontend codebase built with React and Vite, offering a responsive and intuitive user interface for the AegisX security platform.

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Development](#development)
  - [Code Style and Linting](#code-style-and-linting)
- [Architecture](#architecture)
- [API Integration](#api-integration)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Secure Authentication**: Multi-factor authentication system with secure token management
- **Real-time Monitoring**: Dashboard with real-time security event visualization
- **Threat Detection**: Advanced algorithms to identify and highlight potential security breaches
- **User Management**: Comprehensive user role and permission management
- **Alert System**: Configurable alert notifications for security events
- **Responsive Design**: Fully responsive interface that works across devices
- **Dark/Light Themes**: User-selectable interface themes

## Technology Stack

- **React**: Frontend library for building the user interface
- **Vite**: Next-generation frontend tooling for faster development
- **React Router**: Navigation and routing for the SPA
- **Redux/Context API**: State management
- **Axios/Fetch**: API communication
- **CSS-in-JS/SCSS**: Styling solution
- **Jest/React Testing Library**: Testing frameworks

## Getting Started

### Prerequisites

- Node.js (v14.x or higher)
- npm (v7.x or higher) or yarn (v1.22.x or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/aegisx-frontend.git
   cd aegisx-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Configuration

1. Create a `.env` file in the root directory based on `.env.example`:
   ```
   VITE_API_BASE_URL=http://localhost:8000/api
   VITE_AUTH_TOKEN_KEY=aegis_auth_token
   ```

2. Adjust the values according to your backend configuration.

## Usage

After logging in, you will have access to:

- **Dashboard**: Overview of security metrics and alerts
- **Monitoring**: Detailed view of system and network activities
- **Reports**: Generated security reports and analytics
- **Settings**: Configuration options for the platform
- **User Management**: Admin interface for managing user accounts

## Project Structure

```
aegisx-frontend/
├── public/                 # Static assets
├── src/
│   ├── assets/             # Images, fonts, etc.
│   ├── components/         # Reusable UI components
│   │   ├── common/         # Shared components
│   │   └── specific/       # Feature-specific components
│   ├── contexts/           # React Context providers
│   ├── hooks/              # Custom React hooks
│   ├── layouts/            # Page layout components
│   ├── pages/              # Page components
│   ├── services/           # API and external service integrations
│   ├── store/              # State management
│   ├── styles/             # Global styles and themes
│   ├── utils/              # Utility functions
│   ├── App.jsx             # Main app component
│   └── main.jsx            # Entry point
├── .eslintrc.js            # ESLint configuration
├── .gitignore              # Git ignore rules
├── index.html              # HTML entry point
├── package.json            # Dependencies and scripts
├── vite.config.js          # Vite configuration
└── README.md               # Project documentation
```

## Development

### Code Style and Linting

This project follows the Airbnb JavaScript Style Guide with some custom rules. ESLint and Prettier are configured to maintain code quality.

## Architecture

AegisX frontend follows a component-based architecture with separation of concerns:

- **Presentation Layer**: React components responsible for UI rendering
- **State Management**: Centralized state using Redux/Context API
- **Service Layer**: API communication and external service integration
- **Utility Layer**: Helper functions and shared logic

## API Integration

The frontend communicates with the AegisX backend API using Axios. API services are organized by domain in the `utils` directory.

## Testing

We use Jest and React Testing Library for:

- Unit tests for utility functions
- Component tests for UI elements
- Integration tests for component interactions
- End-to-end tests for critical user flows

## Deployment

The application is deployed on vercel



## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

Please ensure your code follows the project's style guide and passes all tests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

#