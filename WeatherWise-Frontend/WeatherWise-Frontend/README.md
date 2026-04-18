# WeatherWise Frontend

Welcome to the frontend application for WeatherWise, a beautiful, full-stack weather tracking application.

## 🚀 Getting Started

To get started with the project locally, make sure you have Node.js installed, then run the following commands:

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```

The application will start on the configured port (default is usually `http://localhost:5173`).

## 🛠️ Built With
- **React**: Modern component-based UI
- **Vite**: Ultra-fast build tool
- **Tailwind CSS** (if applicable) / Vanilla CSS: For dynamic and responsive styling
- **React Router**: For seamless client-side navigation
- **Lucide React**: For beautiful, crisp SVG icons
- **GSAP**: For fluid animations

## 🔌 API Integration
The frontend interacts closely with our Spring Boot backend. Ensure your backend server is running (default `http://localhost:8080`) to fetch real-time weather data and manage user authentication correctly.

Authentication is handled securely via JWT, managed efficiently per-session.

## 📂 Project Structure
- `src/components/`: Reusable, atomic UI components
- `src/contexts/`: React Contexts (e.g., Auth, Weather state management)
- `src/lib/`: API utilities and helper functions

Enjoy using WeatherWise!
