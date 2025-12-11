import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { Icon } from 'leaflet';
import { AlertTriangle, MapPin, Fuel, CheckCircle } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import { vehicles, metricsData } from '../data/dummyData';
import styles from './Dashboard.module.css';

// Fix for default marker icons
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
});

// Live vehicle positions (simulated)
const liveVehicles = [
    { id: 1, name: 'Truck #14', lat: 3.1390, lng: 101.6869, status: 'active', speed: 45 },
    { id: 2, name: 'Van #07', lat: 3.1073, lng: 101.6670, status: 'active', speed: 52 },
    { id: 3, name: 'Truck #22', lat: 3.0733, lng: 101.5185, status: 'active', speed: 38 },
    { id: 4, name: 'Van #15', lat: 3.0437, lng: 101.5874, status: 'active', speed: 48 },
    { id: 5, name: 'Truck #09', lat: 3.0333, lng: 101.4500, status: 'active', speed: 41 },
];

// Recent alerts
const recentAlerts = [
    {
        id: 1,
        type: 'danger',
        icon: AlertTriangle,
        title: 'Speed Anomaly',
        message: 'Truck #14 exceeded speed limit by 15 km/h',
        time: '5 minutes ago',
    },
    {
        id: 2,
        type: 'warning',
        icon: MapPin,
        title: 'Route Deviation',
        message: 'Van #07 deviated 2.3 km from optimal route',
        time: '12 minutes ago',
    },
    {
        id: 3,
        type: 'warning',
        icon: Fuel,
        title: 'Fuel Inefficiency',
        message: 'Truck #22 showing 18% higher fuel consumption',
        time: '28 minutes ago',
    },
    {
        id: 4,
        type: 'info',
        icon: CheckCircle,
        title: 'Route Optimized',
        message: 'Van #15 accepted ML-suggested route (saves 3.2 km)',
        time: '45 minutes ago',
    },
];

export default function Dashboard() {
    const [activeVehicles, setActiveVehicles] = useState(liveVehicles);

    // Simulate vehicle movement
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveVehicles(prev => prev.map(vehicle => ({
                ...vehicle,
                lat: vehicle.lat + (Math.random() - 0.5) * 0.002,
                lng: vehicle.lng + (Math.random() - 0.5) * 0.002,
            })));
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const stats = [
        {
            icon: '🚚',
            value: metricsData.activeVehicles,
            label: 'Active Vehicles',
            change: '↑ 3 from yesterday',
            positive: true,
        },
        {
            icon: '🌱',
            value: '9%',
            label: 'CO₂ Reduction',
            change: '↓ 0.9 tons this month',
            positive: true,
        },
        {
            icon: '⚡',
            value: '92%',
            label: 'Route Efficiency',
            change: '↑ 8% improvement',
            positive: true,
        },
        {
            icon: '⚠️',
            value: recentAlerts.filter(a => a.type !== 'info').length,
            label: 'Active Alerts',
            change: 'Requires attention',
            positive: false,
        },
    ];

    const insights = [
        {
            icon: '🌍',
            title: 'Carbon Impact',
            value: '2.4 tons',
            description: 'CO₂ emissions saved this month through ML route optimization. Equivalent to planting 110 trees.',
            progress: 75,
        },
        {
            icon: '📊',
            title: 'Driver Performance',
            value: '3 drivers',
            description: 'Deviated from optimal routes today. ML has suggested corrective routes reducing total distance by 12.5 km.',
            progress: 88,
        },
        {
            icon: '🔒',
            title: 'Security Status',
            value: '100%',
            description: 'All GPS data encrypted with TLS/HTTPS. Zero security incidents detected. Authentication tokens verified.',
            progress: 100,
        },
    ];

    return (
        <div className={styles.dashboard}>
            {/* Header */}
            <div className={styles.header}>
                <h1>🌿 Fleet Management Dashboard</h1>
                <p>Real-time monitoring and carbon optimization</p>
            </div>

            {/* Stats Grid */}
            <div className={styles.statsGrid}>
                {stats.map((stat, index) => (
                    <div key={index} className={styles.statCard}>
                        <div className={styles.statIcon}>{stat.icon}</div>
                        <div className={styles.statValue}>{stat.value}</div>
                        <div className={styles.statLabel}>{stat.label}</div>
                        <span className={`${styles.statChange} ${stat.positive ? styles.positive : styles.negative}`}>
                            {stat.change}
                        </span>
                    </div>
                ))}
            </div>

            {/* Main Grid - Map and Alerts */}
            <div className={styles.mainGrid}>
                {/* Map Container */}
                <div className={styles.mapContainer}>
                    <div className={styles.mapHeader}>
                        <div className={styles.mapTitle}>📍 Live Fleet Tracking</div>
                        <div className={styles.liveIndicator}>
                            <span className={styles.liveDot}></span>
                            <span>Live</span>
                        </div>
                    </div>
                    <div className={styles.mapWrapper}>
                        <MapContainer
                            center={[3.1390, 101.6869]}
                            zoom={11}
                            className={styles.map}
                            scrollWheelZoom={true}
                        >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />

                            {/* Vehicle markers */}
                            {activeVehicles.map((vehicle) => (
                                <Marker
                                    key={vehicle.id}
                                    position={[vehicle.lat, vehicle.lng]}
                                >
                                    <Popup>
                                        <div className={styles.popup}>
                                            <div className={styles.popupTitle}>{vehicle.name}</div>
                                            <div className={styles.popupInfo}>
                                                <div>Status: <strong>{vehicle.status}</strong></div>
                                                <div>Speed: <strong>{vehicle.speed} km/h</strong></div>
                                            </div>
                                        </div>
                                    </Popup>
                                </Marker>
                            ))}

                            {/* Route lines */}
                            <Polyline
                                positions={[
                                    [3.1390, 101.6869],
                                    [3.1073, 101.6670],
                                ]}
                                color="#3b82f6"
                                weight={3}
                                opacity={0.6}
                            />
                            <Polyline
                                positions={[
                                    [3.1073, 101.6670],
                                    [3.0733, 101.5185],
                                ]}
                                color="#10b981"
                                weight={3}
                                opacity={0.6}
                            />
                        </MapContainer>
                    </div>
                </div>

                {/* Alerts Panel */}
                <div className={styles.alertsPanel}>
                    <div className={styles.alertsTitle}>🚨 Recent Alerts</div>
                    <div className={styles.alertsList}>
                        {recentAlerts.map((alert) => {
                            const AlertIcon = alert.icon;
                            return (
                                <div key={alert.id} className={`${styles.alert} ${styles[alert.type]}`}>
                                    <div className={styles.alertHeader}>
                                        <AlertIcon size={20} className={styles.alertIcon} />
                                        <span className={styles.alertTitle}>{alert.title}</span>
                                    </div>
                                    <div className={styles.alertMessage}>{alert.message}</div>
                                    <div className={styles.alertTime}>{alert.time}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Insights Grid */}
            <div className={styles.insightsGrid}>
                {insights.map((insight, index) => (
                    <div key={index} className={styles.insightCard}>
                        <div className={styles.insightHeader}>
                            <span className={styles.insightIcon}>{insight.icon}</span>
                            <span className={styles.insightTitle}>{insight.title}</span>
                        </div>
                        <div className={styles.insightValue}>{insight.value}</div>
                        <div className={styles.insightDescription}>{insight.description}</div>
                        <div className={styles.progressBar}>
                            <div
                                className={styles.progressFill}
                                style={{ width: `${insight.progress}%` }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
