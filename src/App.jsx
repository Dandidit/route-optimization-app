import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import RouteOptimization from './pages/RouteOptimization';
import FleetManagement from './pages/FleetManagement';
import Analytics from './pages/Analytics';
import DriverBehavior from './pages/DriverBehavior';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/route-optimization" element={<RouteOptimization />} />
            <Route path="/fleet" element={<FleetManagement />} />
            <Route path="/driver-behavior" element={<DriverBehavior />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<PlaceholderPage title="Settings" icon="⚙️" />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

function PlaceholderPage({ title, icon }) {
  return (
    <div style={{ animation: 'fadeIn 0.6s ease' }}>
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{
          fontSize: '2.5em',
          marginBottom: '10px',
          background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
          {icon} {title}
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '1.1em' }}>Coming soon</p>
      </div>
      <div style={{
        background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
        padding: '80px 40px',
        borderRadius: '20px',
        textAlign: 'center',
        border: '1px solid #334155',
      }}>
        <div style={{ fontSize: '5em', marginBottom: '20px' }}>{icon}</div>
        <h2 style={{ fontSize: '2em', marginBottom: '15px', color: '#e2e8f0' }}>
          {title} Page
        </h2>
        <p style={{ color: '#94a3b8', fontSize: '1.1em' }}>
          This feature is under development. Check back soon!
        </p>
      </div>
    </div>
  );
}

export default App;
