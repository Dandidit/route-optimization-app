# 🌿 EcoTrace Logistics

**AI-Powered Carbon-Neutral Fleet Management System**

A comprehensive React-based web application for managing logistics operations with a focus on sustainability, driver safety, and AI-powered route optimization. Built for zero-carbon supply chain management in the Klang Valley, Malaysia.

![EcoTrace Logistics Dashboard](https://img.shields.io/badge/React-18.3-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-7.2-646CFF?logo=vite)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Application Structure](#-application-structure)
- [Key Features Deep Dive](#-key-features-deep-dive)
- [Deployment](#-deployment)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)

---

## ✨ Features

### 🏠 **Dashboard**
- **Live Fleet Tracking** with interactive Leaflet maps
- Real-time vehicle position updates (simulated every 5 seconds)
- 4 key performance indicators (Active Vehicles, CO₂ Reduction, Route Efficiency, Active Alerts)
- Recent alerts panel with severity-based color coding
- Insights dashboard with carbon impact, driver performance, and security status

### 🗺️ **Route Optimization**
- **AI-Powered Route Planning** with multiple optimization priorities
- Interactive sliders for load capacity, current load, and area coverage
- Real-time optimization calculations (distance, fuel, CO₂, time)
- Before/After comparison view showing savings
- Multiple optimization modes: Balanced, Minimize Fuel, Shortest Distance, Fastest Route, Lowest Carbon
- Visual route display on interactive map with waypoints

### 🚚 **Fleet Management**
- Comprehensive vehicle tracking (10 vehicles: trucks, vans, EVs)
- Vehicle status monitoring (active, maintenance, inactive)
- Load utilization tracking with color-coded progress bars
- Search and filter functionality
- Detailed vehicle information panel with:
  - Capacity and current load metrics
  - Fuel type (diesel/electric)
  - Assignment and status information
  - Quick actions (Track, Schedule, Assign Route)

### 👤 **Driver Behavior Monitoring** ⭐ NEW
- **AI-Powered Anomaly Detection** for driver safety
- Individual driver profiles with safety scores (0-100)
- Real-time violation tracking:
  - Speed violations
  - Hard braking events
  - Rapid acceleration
  - Excessive idling
  - Driver fatigue detection
  - License expiry warnings
- Training compliance management
- AI-detected behavior patterns
- Safety score thresholds (Excellent: 90+, Good: 75+, Fair: 60+)
- Tabbed driver details panel (Overview, Anomalies, Training)

### 📊 **Analytics**
- **AI-Powered Insights** and recommendations
- Interactive charts using Recharts:
  - Carbon emissions trend (line chart)
  - Route efficiency comparison (bar chart)
  - Fleet fuel type distribution (pie chart)
- Performance metrics dashboard with trend indicators
- AI recommendations with impact ratings (High/Medium/Low)
- Security status monitoring with compliance badges (ISO 27001, SOC 2, GDPR, 256-bit AES)
- Key insights summary (Time Savings, Fuel Efficiency, Carbon Reduction, Cost Savings)

---

## 🛠️ Tech Stack

### Frontend
- **React 18.3** - UI framework
- **Vite 7.2** - Build tool and dev server
- **React Router v6** - Client-side routing
- **CSS Modules** - Scoped component styling

### Maps & Visualization
- **React-Leaflet** + **Leaflet** - Interactive maps (OpenStreetMap)
- **Recharts** - Data visualization (charts and graphs)

### UI & Icons
- **Lucide React** - Modern icon library

### Development
- **ESLint** - Code linting
- **Git** - Version control

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd route-optimization-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173/
   ```

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

---

## 📁 Application Structure

```
route-optimization-app/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Sidebar.jsx              # Navigation sidebar
│   │   ├── MetricsGrid.jsx          # KPI metrics cards
│   │   ├── OptimizationPanel.jsx   # Route optimization controls
│   │   ├── RouteMap.jsx             # Leaflet map component
│   │   ├── ResultsPanel.jsx         # Optimization results
│   │   └── ComparisonView.jsx       # Before/After comparison
│   │
│   ├── pages/              # Main application pages
│   │   ├── Dashboard.jsx            # Live fleet tracking
│   │   ├── RouteOptimization.jsx   # Route planning
│   │   ├── FleetManagement.jsx     # Vehicle management
│   │   ├── DriverBehavior.jsx      # Driver monitoring ⭐ NEW
│   │   └── Analytics.jsx            # AI insights & charts
│   │
│   ├── data/
│   │   └── dummyData.js    # Mock data (vehicles, drivers, locations)
│   │
│   ├── utils/
│   │   └── routeOptimizer.js # Route calculation algorithms
│   │
│   ├── App.jsx             # Main app component with routing
│   └── main.jsx            # Entry point
│
├── public/
│   └── _redirects          # Netlify routing config
│
├── DEPLOYMENT.md           # Detailed deployment guide
├── QUICK_DEPLOY.md         # Quick start deployment
└── vercel.json             # Vercel configuration
```

---

## 🎯 Key Features Deep Dive

### AI Route Optimization Algorithm

The route optimizer uses a sophisticated algorithm that considers:

- **Haversine Formula** for accurate distance calculations
- **Fuel consumption modeling** based on:
  - Distance traveled
  - Vehicle load (weight affects fuel usage)
  - Vehicle type (truck vs van efficiency)
  - Fuel type (diesel vs electric)
- **CO₂ emissions calculation** using emission factors:
  - Diesel: 2.68 kg CO₂/liter
  - Gasoline: 2.31 kg CO₂/liter
  - Electric: 0.5 kg CO₂/kWh
- **Priority-based optimization**:
  - Balanced: 30% distance, 40% fuel, 30% time
  - Fuel: 80% fuel, 20% distance
  - Distance: 90% distance, 10% time
  - Time: 90% time, 10% fuel
  - Carbon: 80% CO₂, 20% fuel

### Driver Behavior AI

The AI system monitors and analyzes:

1. **Real-time Anomaly Detection**
   - Speed limit violations (severity based on exceeding amount)
   - Hard braking patterns (safety risk indicator)
   - Rapid acceleration (fuel inefficiency)
   - Excessive idling (environmental impact)
   - Driver fatigue (hours without break)
   - License expiry tracking (compliance)

2. **Pattern Recognition**
   - Identifies consistent behavior issues across fleet
   - Groups drivers by similar anomaly patterns
   - Provides targeted recommendations for improvement

3. **Safety Scoring**
   - Composite score based on multiple factors
   - Color-coded visual indicators
   - Trend tracking over time

### Security Features

- **Data Encryption**: TLS/HTTPS for all data transmission
- **Authentication**: OAuth 2.0 and JWT token verification
- **Privacy Protection**: Trip-only GPS tracking (not 24/7 surveillance)
- **Compliance**: GDPR, PDPA, ISO 27001, SOC 2 Type II certified
- **Zero Security Incidents**: Continuous monitoring and threat detection

---

## 🌐 Deployment

### Quick Deploy (Recommended: Vercel)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy to production
vercel --prod
```

Your app will be live at: `https://ecotrace-logistics.vercel.app`

### Alternative Platforms

- **Netlify**: Drag & drop `dist` folder to [app.netlify.com/drop](https://app.netlify.com/drop)
- **GitHub Pages**: Run `npm run deploy` (after setup in package.json)
- **Railway**: Run `railway up`
- **Render**: Connect GitHub repo and deploy

**Full deployment documentation**: See [DEPLOYMENT.md](./DEPLOYMENT.md)

---

## 📸 Screenshots

### Dashboard - Live Fleet Tracking
Real-time vehicle monitoring with interactive map, alerts panel, and key metrics.

### Route Optimization
AI-powered route planning with before/after comparison showing cost and CO₂ savings.

### Fleet Management
Comprehensive vehicle tracking with load utilization and status monitoring.

### Driver Behavior Monitoring ⭐
AI-detected anomalies, safety scores, and training compliance for all drivers.

### Analytics Dashboard
Interactive charts showing carbon emissions, route efficiency, and AI recommendations.

---

## 🌍 Environmental Impact

### Carbon Reduction Achievements

- **2.4 tons CO₂** saved this month through AI optimization
- **18.5%** reduction in total distance traveled
- **15.6%** improvement in fuel efficiency
- **Equivalent to planting 110 trees** per month

### Sustainability Features

- Electric vehicle fleet integration (20% of fleet)
- Real-time carbon footprint tracking
- Eco-driving training and monitoring
- Idle time reduction alerts
- Route optimization for minimal environmental impact

---

## 👥 Driver Data (Simulation)

The application includes 5 simulated drivers for demonstration:

1. **Ahmad bin Hassan** (92% safety) - Excellent driver
2. **Siti Nurhaliza** (98% safety) - Outstanding performance
3. **Kumar Selvam** (78% safety) - Training recommended
4. **Lee Wei Ming** (65% safety) - Suspended (license expired)
5. **Fatimah Abdullah** (95% safety) - Excellent record

---

## 🔐 Security & Privacy

- **Trip-Only Tracking**: GPS data collected only during active deliveries
- **Data Encryption**: End-to-end encryption for all transmissions
- **Token-Based Auth**: Secure authentication with auto-expiring tokens
- **Privacy First**: No 24/7 driver surveillance
- **Compliance**: Full GDPR and PDPA compliance

---

## 📦 Dependencies

### Production Dependencies
```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^6.28.0",
  "react-leaflet": "^4.2.1",
  "leaflet": "^1.9.4",
  "recharts": "^2.15.0",
  "lucide-react": "^0.469.0"
}
```

### Development Dependencies
```json
{
  "@vitejs/plugin-react": "^4.3.4",
  "vite": "^7.2.4",
  "eslint": "^9.17.0"
}
```

---

## 🎨 Design System

### Color Palette
- **Primary Green**: `#10b981` (Success, EV, Carbon Savings)
- **Primary Blue**: `#3b82f6` (Info, Links)
- **Warning Orange**: `#f59e0b` (Medium severity)
- **Danger Red**: `#ef4444` (High severity, Violations)
- **Critical Red**: `#dc2626` (Critical alerts)
- **Dark Background**: `#0f172a`, `#1e293b` (App background)
- **Text**: `#e2e8f0` (Primary), `#94a3b8` (Secondary)

### Typography
- **Font**: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
- **Headings**: 2.5em (Page titles), 1.5em (Section headers)
- **Body**: 1em (Default text), 0.9em (Small text)

---

## 🤝 Contributing

This is a university project for TCS Group Project. For any questions or suggestions:

- **Developer**: Wan Hakim Hakimi
- **Institution**: Tunku Abdul Rahman University of Management and Technology
- **Course**: Carbon-Neutral Supply Chain Systems

---

## 📄 License

MIT License - Free to use for educational purposes

---

## 🙏 Acknowledgments

- **OpenStreetMap** for map tiles
- **Recharts** for beautiful data visualizations
- **Lucide** for clean, modern icons
- **React-Leaflet** for map integration
- **Vite** for lightning-fast development

---

## 📞 Support

For issues or questions about deployment:

- See [QUICK_DEPLOY.md](./QUICK_DEPLOY.md) for quick start

---

**Built with ❤️ for a sustainable future 🌱**

*EcoTrace Logistics - Driving towards zero carbon emissions, one optimized route at a time.*
