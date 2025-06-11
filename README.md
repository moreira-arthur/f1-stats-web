# F1 Stats Platform

## Installation

1. **Clone the repository:**
    ```sh
    git clone <https://github.com/moreira-arthur/f1-stats-web>
    cd f1-stats-web
    ```
2. **Install dependencies:**
    ```sh
    npm install
    ```

## Running the Project

Start the development server with:
```sh
npm run dev
```
This will launch the app at [http://localhost:5173](http://localhost:5173) (or another port if 5173 is in use).

## Building for Production

To build the project for production:
```sh
npm run build
```
The output will be in the `dist/` folder.

## Linting

To check for lint errors:
```sh
npm run lint
```

## Project Structure

```
src/            # Main source code
  components/   # React components (dashboards, reports, UI elements)
  pages/        # Page-level components (Home, Login, Dashboard, Reports)
  context/      # React context for authentication
  services/     # API service functions
  lib/          # Utility functions
  assets/       # Static images and assets
public/         # Static files (e.g., SVGs)
index.html      # Main HTML file
```

## Context

This project is designed for Formula 1 data management and analytics. It supports different user roles, each with tailored dashboards and reports:

- **Admins:** Manage the database and view global F1 statistics.
- **Teams:** Analyze their own performance, manage pilots, and upload pilot data.
- **Drivers:** Track their career stats and race results.

## License

MIT