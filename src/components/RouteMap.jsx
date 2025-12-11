import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styles from './RouteMap.module.css';

// Fix for default marker icons in React-Leaflet
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
});

export default function RouteMap({ waypoints, isOptimized = false }) {
    if (!waypoints || waypoints.length === 0) {
        return (
            <div className={styles.container}>
                <div className={styles.placeholder}>
                    <span className={styles.placeholderIcon}>🗺️</span>
                    <p>No route data available</p>
                </div>
            </div>
        );
    }

    // Calculate center of the map
    const center = waypoints.length > 0
        ? [waypoints[0].lat, waypoints[0].lng]
        : [3.1390, 101.6869]; // Default to KL

    // Prepare polyline positions
    const positions = waypoints.map(wp => [wp.lat, wp.lng]);

    // Color based on optimization status
    const pathColor = isOptimized ? '#10b981' : '#ef4444';

    return (
        <div className={styles.container}>
            <MapContainer
                center={center}
                zoom={11}
                className={styles.map}
                scrollWheelZoom={true}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* Route polyline */}
                <Polyline
                    positions={positions}
                    color={pathColor}
                    weight={4}
                    opacity={0.7}
                />

                {/* Markers for each waypoint */}
                {waypoints.map((waypoint, index) => {
                    let markerColor = '#3b82f6'; // Default blue
                    let markerLabel = '📍';

                    if (index === 0) {
                        markerColor = '#3b82f6'; // Blue for start
                        markerLabel = '🏭';
                    } else if (index === waypoints.length - 1) {
                        markerColor = '#ef4444'; // Red for end
                        markerLabel = '🏁';
                    } else {
                        markerColor = '#10b981'; // Green for delivery stops
                        markerLabel = '📦';
                    }

                    return (
                        <Marker
                            key={index}
                            position={[waypoint.lat, waypoint.lng]}
                        >
                            <Popup>
                                <div className={styles.popup}>
                                    <div className={styles.popupIcon}>{markerLabel}</div>
                                    <div className={styles.popupName}>{waypoint.name}</div>
                                    {index === 0 && <div className={styles.popupType}>Starting Point</div>}
                                    {index > 0 && index < waypoints.length - 1 && (
                                        <div className={styles.popupType}>Stop {index}</div>
                                    )}
                                    {index === waypoints.length - 1 && index > 0 && (
                                        <div className={styles.popupType}>Final Destination</div>
                                    )}
                                </div>
                            </Popup>
                        </Marker>
                    );
                })}
            </MapContainer>

            <div className={styles.legend}>
                <div className={styles.legendItem}>
                    <span className={styles.legendDot} style={{ background: '#3b82f6' }}></span>
                    <span>Start</span>
                </div>
                <div className={styles.legendItem}>
                    <span className={styles.legendDot} style={{ background: '#10b981' }}></span>
                    <span>Delivery Stop</span>
                </div>
                <div className={styles.legendItem}>
                    <span className={styles.legendDot} style={{ background: '#ef4444' }}></span>
                    <span>End</span>
                </div>
                <div className={styles.legendItem}>
                    <span className={styles.legendLine} style={{ background: pathColor }}></span>
                    <span>{isOptimized ? 'Optimized Route' : 'Current Route'}</span>
                </div>
            </div>
        </div>
    );
}
