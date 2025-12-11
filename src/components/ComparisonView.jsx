import { formatNumber, formatTime } from '../utils/routeOptimizer';
import styles from './ComparisonView.module.css';

export default function ComparisonView({ results }) {
    if (!results) {
        return null;
    }

    const { current, optimized, savings } = results;

    const metrics = [
        { label: 'Distance', current: `${formatNumber(current.distance, 1)} km`, optimized: `${formatNumber(optimized.distance, 1)} km` },
        { label: 'Fuel', current: `${formatNumber(current.fuel, 1)} L`, optimized: `${formatNumber(optimized.fuel, 1)} L` },
        { label: 'Time', current: formatTime(current.time), optimized: formatTime(optimized.time) },
        { label: 'CO₂', current: `${formatNumber(current.co2, 1)} kg`, optimized: `${formatNumber(optimized.co2, 1)} kg` },
        { label: 'Area Coverage', current: `${formatNumber(current.area, 0)} km²`, optimized: `${formatNumber(optimized.area, 0)} km²` },
        { label: 'Load Efficiency', current: `${formatNumber(current.loadUtilization, 1)}%`, optimized: `${formatNumber(optimized.loadUtilization, 1)}%` },
    ];

    return (
        <div className={styles.section}>
            <h2 className={styles.title}>
                <span>⚖️</span>
                <span>Before vs After Comparison</span>
            </h2>

            <div className={styles.grid}>
                <div className={`${styles.card} ${styles.current}`}>
                    <div className={`${styles.cardLabel} ${styles.currentLabel}`}>❌ Current Route</div>
                    <div className={styles.metrics}>
                        {metrics.map((metric, index) => (
                            <div key={index} className={styles.metric}>
                                <span className={styles.metricLabel}>{metric.label}</span>
                                <span className={styles.metricValue}>{metric.current}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={`${styles.card} ${styles.optimized}`}>
                    <div className={`${styles.cardLabel} ${styles.optimizedLabel}`}>✅ Optimized Route</div>
                    <div className={styles.metrics}>
                        {metrics.map((metric, index) => (
                            <div key={index} className={styles.metric}>
                                <span className={styles.metricLabel}>{metric.label}</span>
                                <span className={styles.metricValue}>{metric.optimized}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className={styles.savingsBadge}>
                <div className={styles.savingsTitle}>💰 Total Savings Per Route</div>
                <div className={styles.savingsValue}>
                    RM {formatNumber(savings.cost, 2)} + {formatNumber(savings.co2, 1)} kg CO₂
                </div>
                <div className={styles.savingsDetails}>
                    {formatNumber(savings.distance, 1)} km · {formatNumber(savings.fuel, 1)} L · {formatNumber(savings.time, 0)} min saved
                </div>
            </div>
        </div>
    );
}
