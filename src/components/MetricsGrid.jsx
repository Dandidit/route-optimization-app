import { TrendingUp, TrendingDown } from 'lucide-react';
import styles from './MetricsGrid.module.css';

export default function MetricsGrid({ metrics }) {
    const metricCards = [
        {
            icon: '🗺️',
            label: 'Total Area Covered',
            value: `${metrics.areaCovered.toLocaleString()} km²`,
            trend: metrics.areaCoveredTrend,
            trendText: `${Math.abs(metrics.areaCoveredTrend)}% this month`,
        },
        {
            icon: '📦',
            label: 'Average Load Utilization',
            value: `${metrics.loadUtilization}%`,
            trend: metrics.loadUtilizationTrend,
            trendText: `${Math.abs(metrics.loadUtilizationTrend)}% improvement`,
        },
        {
            icon: '⚡',
            label: 'Fuel Efficiency',
            value: `${metrics.fuelEfficiency} L/100km`,
            trend: metrics.fuelEfficiencyTrend,
            trendText: `${Math.abs(metrics.fuelEfficiencyTrend)}% reduction`,
        },
        {
            icon: '🌱',
            label: 'CO₂ Saved',
            value: `${metrics.co2Saved} tons`,
            trend: metrics.co2SavedTrend,
            trendText: 'This week',
        },
    ];

    return (
        <div className={styles.grid}>
            {metricCards.map((card, index) => (
                <div key={index} className={styles.card}>
                    <div className={styles.icon}>{card.icon}</div>
                    <div className={styles.content}>
                        <div className={styles.label}>{card.label}</div>
                        <div className={styles.value}>{card.value}</div>
                        <div className={`${styles.trend} ${card.trend >= 0 ? styles.positive : styles.negative}`}>
                            {card.trend >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                            <span>{card.trendText}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
