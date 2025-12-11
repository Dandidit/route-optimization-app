import { formatNumber, formatTime } from '../utils/routeOptimizer';
import styles from './ResultsPanel.module.css';

export default function ResultsPanel({ results }) {
    if (!results) {
        return (
            <div className={styles.panel}>
                <h2 className={styles.title}>
                    <span>📈</span>
                    <span>Optimization Results</span>
                </h2>
                <div className={styles.placeholder}>
                    <p>Click "Optimize Route" to see results</p>
                </div>
            </div>
        );
    }

    const { optimized, savings } = results;

    const resultItems = [
        {
            title: 'Optimized Distance',
            value: `${formatNumber(optimized.distance, 1)} km`,
            description: `${formatNumber(savings.distance, 1)} km shorter than current route`,
            savingsPercent: savings.distancePercent,
        },
        {
            title: 'Estimated Fuel Consumption',
            value: `${formatNumber(optimized.fuel, 1)} L`,
            description: `${formatNumber(savings.fuel, 1)} L saved (${formatNumber(savings.fuelPercent, 1)}% reduction)`,
            savingsPercent: savings.fuelPercent,
        },
        {
            title: 'Area Coverage Efficiency',
            value: `${formatNumber(optimized.area, 0)} km²`,
            description: 'Optimal coverage within constraints',
            savingsPercent: null,
        },
        {
            title: 'Load Utilization',
            value: `${formatNumber(optimized.loadUtilization, 1)}%`,
            description: 'Efficient cargo capacity usage',
            savingsPercent: null,
        },
        {
            title: 'Estimated Time',
            value: formatTime(optimized.time),
            description: `${formatNumber(savings.time, 0)} minutes saved`,
            savingsPercent: savings.timePercent,
        },
        {
            title: 'CO₂ Emissions',
            value: `${formatNumber(optimized.co2, 1)} kg`,
            description: `${formatNumber(savings.co2, 1)} kg reduction from baseline`,
            savingsPercent: savings.co2Percent,
        },
    ];

    return (
        <div className={styles.panel}>
            <h2 className={styles.title}>
                <span>📈</span>
                <span>Optimization Results</span>
            </h2>

            <div className={styles.results}>
                {resultItems.map((item, index) => (
                    <div key={index} className={styles.resultItem}>
                        <div className={styles.resultTitle}>{item.title}</div>
                        <div className={styles.resultValue}>{item.value}</div>
                        <div className={styles.resultDescription}>{item.description}</div>
                        {item.savingsPercent !== null && item.savingsPercent > 0 && (
                            <div className={styles.savingsBadge}>
                                ↓ {formatNumber(item.savingsPercent, 1)}% improvement
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
