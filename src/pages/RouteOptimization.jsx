import { useState } from 'react';
import MetricsGrid from '../components/MetricsGrid';
import OptimizationPanel from '../components/OptimizationPanel';
import RouteMap from '../components/RouteMap';
import ResultsPanel from '../components/ResultsPanel';
import ComparisonView from '../components/ComparisonView';
import { metricsData, defaultParameters, sampleRoutes } from '../data/dummyData';
import { optimizeRoute } from '../utils/routeOptimizer';
import styles from './RouteOptimization.module.css';

export default function RouteOptimization() {
    const [parameters, setParameters] = useState(defaultParameters);
    const [results, setResults] = useState(null);
    const [isOptimizing, setIsOptimizing] = useState(false);
    const [currentRoute] = useState(sampleRoutes[0]);

    const handleOptimize = () => {
        setIsOptimizing(true);

        // Simulate API call delay
        setTimeout(() => {
            const optimizationResults = optimizeRoute(parameters);
            setResults(optimizationResults);
            setIsOptimizing(false);
        }, 1500);
    };

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <h1>🤖 ML Route Optimization Engine</h1>
                <p>Intelligent route planning with area coverage, load optimization, and fuel efficiency</p>
            </div>

            <MetricsGrid metrics={metricsData} />

            <div className={styles.mainGrid}>
                <OptimizationPanel
                    parameters={parameters}
                    setParameters={setParameters}
                    onOptimize={handleOptimize}
                    isOptimizing={isOptimizing}
                />
                <ResultsPanel results={results} />
            </div>

            <div className={styles.mapSection}>
                <h2 className={styles.sectionTitle}>
                    <span>🗺️</span>
                    <span>Route Visualization</span>
                </h2>
                <RouteMap
                    waypoints={results ? currentRoute.waypoints : currentRoute.waypoints}
                    isOptimized={results !== null}
                />
            </div>

            {results && <ComparisonView results={results} />}
        </div>
    );
}
