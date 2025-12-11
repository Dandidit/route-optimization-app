import { useState } from 'react';
import { Sparkles, Brain, Zap } from 'lucide-react';
import { optimizationPriorities } from '../data/dummyData';
import styles from './OptimizationPanel.module.css';

export default function OptimizationPanel({ parameters, setParameters, onOptimize, isOptimizing }) {
    const handleSliderChange = (field, value) => {
        setParameters(prev => ({ ...prev, [field]: parseInt(value) }));
    };

    const handleInputChange = (field, value) => {
        setParameters(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div className={styles.panel}>
            <h2 className={styles.title}>
                <Brain size={24} />
                <span>Route Optimization Parameters</span>
            </h2>

            <div className={styles.inputGroup}>
                <label className={styles.label}>Starting Location</label>
                <input
                    type="text"
                    className={styles.input}
                    value={parameters.startLocation}
                    onChange={(e) => handleInputChange('startLocation', e.target.value)}
                    placeholder="Enter warehouse or depot address"
                />
            </div>

            <div className={styles.inputGroup}>
                <label className={styles.label}>Destination Points</label>
                <input
                    type="text"
                    className={styles.input}
                    value={parameters.destinations.join(', ')}
                    onChange={(e) => handleInputChange('destinations', e.target.value.split(',').map(s => s.trim()))}
                    placeholder="Enter delivery addresses (comma-separated)"
                />
            </div>

            <div className={styles.sliderGroup}>
                <label className={styles.label}>Vehicle Load Capacity (kg)</label>
                <input
                    type="range"
                    min="0"
                    max="5000"
                    step="100"
                    value={parameters.loadCapacity}
                    onChange={(e) => handleSliderChange('loadCapacity', e.target.value)}
                    className={styles.slider}
                />
                <div className={styles.sliderValue}>
                    <span>0 kg</span>
                    <span className={styles.currentValue}>{parameters.loadCapacity.toLocaleString()} kg</span>
                    <span>5,000 kg</span>
                </div>
            </div>

            <div className={styles.sliderGroup}>
                <label className={styles.label}>Current Load Amount (kg)</label>
                <input
                    type="range"
                    min="0"
                    max={parameters.loadCapacity}
                    step="50"
                    value={parameters.currentLoad}
                    onChange={(e) => handleSliderChange('currentLoad', e.target.value)}
                    className={styles.slider}
                />
                <div className={styles.sliderValue}>
                    <span>0 kg</span>
                    <span className={styles.currentValue}>{parameters.currentLoad.toLocaleString()} kg</span>
                    <span>{parameters.loadCapacity.toLocaleString()} kg</span>
                </div>
                <div className={styles.utilization}>
                    Load Utilization: <strong>{((parameters.currentLoad / parameters.loadCapacity) * 100).toFixed(1)}%</strong>
                </div>
            </div>

            <div className={styles.sliderGroup}>
                <label className={styles.label}>Maximum Area Coverage (km²)</label>
                <input
                    type="range"
                    min="0"
                    max="1000"
                    step="10"
                    value={parameters.areaCoverage}
                    onChange={(e) => handleSliderChange('areaCoverage', e.target.value)}
                    className={styles.slider}
                />
                <div className={styles.sliderValue}>
                    <span>0 km²</span>
                    <span className={styles.currentValue}>{parameters.areaCoverage.toLocaleString()} km²</span>
                    <span>1,000 km²</span>
                </div>
            </div>

            <div className={styles.inputGroup}>
                <label className={styles.label}>Optimization Priority</label>
                <select
                    className={styles.select}
                    value={parameters.priority}
                    onChange={(e) => handleInputChange('priority', e.target.value)}
                >
                    {optimizationPriorities.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
            </div>

            <button
                className={styles.optimizeBtn}
                onClick={onOptimize}
                disabled={isOptimizing}
            >
                {isOptimizing ? (
                    <>
                        <Zap size={20} className={styles.spin} />
                        <span>Optimizing...</span>
                    </>
                ) : (
                    <>
                        <Sparkles size={20} />
                        <span>Optimize Route</span>
                    </>
                )}
            </button>

            <ul className={styles.featureList}>
                <li className={styles.featureItem}>
                    <span className={styles.featureIcon}>🧠</span>
                    <span>ML-powered multi-objective optimization</span>
                </li>
                <li className={styles.featureItem}>
                    <span className={styles.featureIcon}>📊</span>
                    <span>Real-time traffic and weather integration</span>
                </li>
                <li className={styles.featureItem}>
                    <span className={styles.featureIcon}>🔄</span>
                    <span>Dynamic re-routing based on conditions</span>
                </li>
            </ul>
        </div >
    );
}
