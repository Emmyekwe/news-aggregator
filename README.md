The application was developed with React JS and Typescript with MVVM Architecture.

Models handle data fetching/transformation, ViewModels (custom hooks) manage state and business logic, and Views/Components handle UI. 

For styling and responsiveness I used tailwind CSS, which is responsive by default with breakpoints for multiple screen sizes.

For Multi-Source API Fetching, I used Promise.allSettled for Graceful Degradation: 

Parallel over Sequential calls - All 6 API calls fire simultaneously (4 NewsAPI categories + Guardian + NYT), drastically reducing load time compared to sequential awaits. I used allSettled not all Promise.allSettled() continues even if some APIs fail, unlike Promise.all() which would abort on first failure. I only display error on total failure.

On the Home page, there is 2 tabs: "All Articles" - Shows everything from all news sources, For You" - Shows only articles matching your interests.

Personalized news feed by selecting preferred sources, categories, and authors.

Generic API Utility Pattern

The codebase has a centralized fetchAPI utility that handles all HTTP requests. Instead of having repetitive fetch/error-handling code scattered across multiple service files.

Date Operations Library 

Multi-Stage Filtering Pipeline

Personalization (if "For You" mode) → Filter by preferences

Search Query → Match title/description/author

Source Filter → NewsAPI, Guardian, or NYT

Category Filter → Business, Sports, etc.

Set Preferences → Saved to localStorage (persists across sessions)

Results Update → Automatically via React's reactive system

The codebase centralizes date-related operations with dedicated utility functions 

The application implements a comprehensive color management system 

Dsign patterns such as  D.R.Y, KISS was implemented

Docker containerization for consistent deployment.





