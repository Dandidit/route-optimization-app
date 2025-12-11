import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Route, Truck, User, BarChart3, Settings, Menu, X } from 'lucide-react';
import { useState } from 'react';
import styles from './Sidebar.module.css';

const menuItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/route-optimization', icon: Route, label: 'Route Optimization' },
    { path: '/fleet', icon: Truck, label: 'Fleet Management' },
    { path: '/driver-behavior', icon: User, label: 'Driver Behavior' },
    { path: '/analytics', icon: BarChart3, label: 'Analytics' },
    { path: '/settings', icon: Settings, label: 'Settings' },
];

export default function Sidebar() {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Mobile menu button */}
            <button className={styles.mobileMenuBtn} onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Sidebar */}
            <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
                <div className={styles.logo}>
                    <span className={styles.logoIcon}>🌿</span>
                    <span className={styles.logoText}>EcoTrace Logistics</span>
                </div>

                <nav className={styles.nav}>
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;

                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`${styles.navItem} ${isActive ? styles.active : ''}`}
                                onClick={() => setIsOpen(false)}
                            >
                                <Icon size={20} />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className={styles.footer}>
                    <div className={styles.footerInfo}>
                        <div className={styles.footerLabel}>System Status</div>
                        <div className={styles.footerStatus}>
                            <span className={styles.statusDot}></span>
                            <span>All Systems Operational</span>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Overlay for mobile */}
            {isOpen && <div className={styles.overlay} onClick={() => setIsOpen(false)} />}
        </>
    );
}
