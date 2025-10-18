# News Aggregator

A modern news aggregator application built with React, TypeScript, and Vite that consolidates news from multiple trusted sources into a single, personalized feed.

## Features

- **Multi-Source News Aggregation**: Fetches articles from NewsAPI, The Guardian, and The New York Times
- **Advanced Filtering**: Filter news by source, category, date range, and search terms
- **Personalization**: Save your preferred sources, categories, and authors for a customized experience
- **Two View Modes**:
  - **All Articles**: Browse all available news
  - **For You**: Personalized feed based on your preferences
- **Pagination**: Easy navigation through large numbers of articles (20 per page)
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI**: Built with Tailwind CSS for a clean, contemporary interface

## Tech Stack

- **Frontend**: React 19 with TypeScript
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 4
- **Routing**: React Router Dom 7
- **Icons**: React Icons
- **Architecture**: MVVM pattern with custom hooks

## Running with Docker

### Prerequisites

- Docker and Docker Compose installed on your machine

### Quick Start

1. Build and start the application:
```bash
docker compose up --build
```

2. Open your browser and navigate to:
```
http://localhost:5173
```

3. To stop the application:
```bash
# Press Ctrl+C in the terminal, then run:
docker compose down
```

### Alternative: Using Docker Run

If you prefer to use `docker run` directly:

1. Build the Docker image:
```bash
docker build -t newsaggregator .
```

2. Run the container:
```bash
docker run -p 5173:5173 -v "$(pwd):/app" -v /app/node_modules newsaggregator
```

## Running Locally (Without Docker)

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/      # Reusable UI components
├── constants/       # Application constants
├── hooks/          # Custom React hooks
├── models/         # Data models and services
├── utils/          # Utility functions
├── viewmodels/     # View model layer (MVVM)
└── views/          # Page components
```