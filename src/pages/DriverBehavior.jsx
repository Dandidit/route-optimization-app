import { useState } from 'react';
import { Search, Filter, User, AlertTriangle, CheckCircle, XCircle, Award, Calendar, BookOpen, TrendingUp, TrendingDown, Bell } from 'lucide-react';
import { drivers, anomalyTypes, trainingCourses, anomalyPatterns, safetyScoreThresholds } from '../data/dummyData';
import styles from './DriverBehavior.module.css';

export default function DriverBehavior() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [selectedDriver, setSelectedDriver] = useState(null);
    const [activeTab, setActiveTab] = useState('overview');

    // Filter drivers
    const filteredDrivers = drivers.filter(driver => {
        const matchesSearch = driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            driver.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all' || driver.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    // Calculate fleet-wide statistics
    const avgSafetyScore = Math.round(drivers.reduce((sum, d) => sum + d.safetyScore, 0) / drivers.length);
    const totalAnomalies = drivers.reduce((sum, d) => sum + d.recentAnomalies.length, 0);
    const driversNeedingTraining = drivers.filter(d => d.trainingPending.length > 0).length;
    const criticalAlerts = drivers.filter(d =>
        d.recentAnomalies.some(a => a.severity === 'critical') ||
        new Date(d.licenseExpiry) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    ).length;

    const getSafetyScoreColor = (score) => {
        if (score >= safetyScoreThresholds.excellent) return '#10b981';
        if (score >= safetyScoreThresholds.good) return '#f59e0b';
        if (score >= safetyScoreThresholds.fair) return '#ef4444';
        return '#dc2626';
    };

    const getSafetyScoreLabel = (score) => {
        if (score >= safetyScoreThresholds.excellent) return 'Excellent';
        if (score >= safetyScoreThresholds.good) return 'Good';
        if (score >= safetyScoreThresholds.fair) return 'Fair';
        return 'Poor';
    };

    const isLicenseExpiringSoon = (expiryDate) => {
        const daysUntilExpiry = Math.floor((new Date(expiryDate) - new Date()) / (1000 * 60 * 60 * 24));
        return daysUntilExpiry <= 30;
    };

    return (
        <div className={styles.page}>
            {/* Header */}
            <div className={styles.header}>
                <h1>👤 Driver Behavior Monitoring</h1>
                <p>AI-powered driver safety and performance tracking</p>
            </div>

            {/* Fleet Statistics */}
            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <div className={styles.statIcon}>📊</div>
                    <div className={styles.statContent}>
                        <div className={styles.statValue}>{avgSafetyScore}%</div>
                        <div className={styles.statLabel}>Avg Safety Score</div>
                        <div className={styles.statTrend}>
                            <TrendingUp size={16} />
                            <span>+3% from last month</span>
                        </div>
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statIcon}>⚠️</div>
                    <div className={styles.statContent}>
                        <div className={styles.statValue}>{totalAnomalies}</div>
                        <div className={styles.statLabel}>Active Anomalies</div>
                        <div className={styles.statTrend}>
                            <TrendingDown size={16} />
                            <span>-12% from last week</span>
                        </div>
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statIcon}>📚</div>
                    <div className={styles.statContent}>
                        <div className={styles.statValue}>{driversNeedingTraining}</div>
                        <div className={styles.statLabel}>Training Pending</div>
                        <div className={styles.statBadge}>Requires attention</div>
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statIcon}>🚨</div>
                    <div className={styles.statContent}>
                        <div className={styles.statValue}>{criticalAlerts}</div>
                        <div className={styles.statLabel}>Critical Alerts</div>
                        <div className={styles.statBadge}>Immediate action</div>
                    </div>
                </div>
            </div>

            {/* AI Anomaly Patterns */}
            <div className={styles.anomalyPatternsSection}>
                <h2>
                    <Bell size={24} />
                    AI-Detected Patterns
                </h2>
                <div className={styles.patternsGrid}>
                    {anomalyPatterns.map((pattern) => (
                        <div key={pattern.id} className={`${styles.patternCard} ${styles[pattern.severity]}`}>
                            <div className={styles.patternHeader}>
                                <h3>{pattern.pattern}</h3>
                                <span className={`${styles.severityBadge} ${styles[pattern.severity]}`}>
                                    {pattern.severity.toUpperCase()}
                                </span>
                            </div>
                            <div className={styles.patternDetails}>
                                <div className={styles.patternItem}>
                                    <span className={styles.patternLabel}>Drivers Affected:</span>
                                    <span className={styles.patternValue}>{pattern.driversAffected.join(', ')}</span>
                                </div>
                                <div className={styles.patternItem}>
                                    <span className={styles.patternLabel}>Frequency:</span>
                                    <span className={styles.patternValue}>{pattern.frequency}</span>
                                </div>
                            </div>
                            <div className={styles.recommendation}>
                                <AlertTriangle size={16} />
                                <span>{pattern.recommendation}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Search and Filter */}
            <div className={styles.toolbar}>
                <div className={styles.searchBox}>
                    <Search size={20} className={styles.searchIcon} />
                    <input
                        type="text"
                        placeholder="Search drivers by name or ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={styles.searchInput}
                    />
                </div>

                <div className={styles.filterGroup}>
                    <Filter size={20} />
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className={styles.filterSelect}
                    >
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="suspended">Suspended</option>
                        <option value="training">In Training</option>
                    </select>
                </div>
            </div>

            {/* Driver Grid */}
            <div className={styles.driverGrid}>
                {filteredDrivers.map((driver) => {
                    const licenseExpiring = isLicenseExpiringSoon(driver.licenseExpiry);
                    const hasAnomalies = driver.recentAnomalies.length > 0;
                    const needsTraining = driver.trainingPending.length > 0;

                    return (
                        <div
                            key={driver.id}
                            className={`${styles.driverCard} ${selectedDriver?.id === driver.id ? styles.selected : ''}`}
                            onClick={() => setSelectedDriver(driver)}
                        >
                            <div className={styles.driverHeader}>
                                <div className={styles.driverAvatar}>
                                    <User size={32} />
                                </div>
                                <div className={styles.driverInfo}>
                                    <h3>{driver.name}</h3>
                                    <p>{driver.employeeId}</p>
                                </div>
                                <div className={styles.statusBadge} data-status={driver.status}>
                                    {driver.status === 'active' ? <CheckCircle size={20} /> : <XCircle size={20} />}
                                </div>
                            </div>

                            <div className={styles.safetyScoreSection}>
                                <div className={styles.scoreCircle} style={{ borderColor: getSafetyScoreColor(driver.safetyScore) }}>
                                    <div className={styles.scoreValue} style={{ color: getSafetyScoreColor(driver.safetyScore) }}>
                                        {driver.safetyScore}
                                    </div>
                                    <div className={styles.scoreLabel}>Safety Score</div>
                                </div>
                                <div className={styles.scoreRating} style={{ color: getSafetyScoreColor(driver.safetyScore) }}>
                                    {getSafetyScoreLabel(driver.safetyScore)}
                                </div>
                            </div>

                            <div className={styles.driverMetrics}>
                                <div className={styles.metricItem}>
                                    <span className={styles.metricLabel}>Trips</span>
                                    <span className={styles.metricValue}>{driver.totalTrips.toLocaleString()}</span>
                                </div>
                                <div className={styles.metricItem}>
                                    <span className={styles.metricLabel}>Distance</span>
                                    <span className={styles.metricValue}>{driver.totalDistance.toLocaleString()} km</span>
                                </div>
                                <div className={styles.metricItem}>
                                    <span className={styles.metricLabel}>Violations</span>
                                    <span className={`${styles.metricValue} ${driver.speedingViolations > 5 ? styles.warning : ''}`}>
                                        {driver.speedingViolations}
                                    </span>
                                </div>
                            </div>

                            {/* Alerts */}
                            <div className={styles.alertsSection}>
                                {licenseExpiring && (
                                    <div className={styles.alert} data-severity="critical">
                                        <AlertTriangle size={16} />
                                        <span>License expiring soon</span>
                                    </div>
                                )}
                                {hasAnomalies && (
                                    <div className={styles.alert} data-severity={driver.recentAnomalies[0].severity}>
                                        <AlertTriangle size={16} />
                                        <span>{driver.recentAnomalies.length} anomalies detected</span>
                                    </div>
                                )}
                                {needsTraining && (
                                    <div className={styles.alert} data-severity="medium">
                                        <BookOpen size={16} />
                                        <span>{driver.trainingPending.length} training pending</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Driver Details Panel */}
            {selectedDriver && (
                <div className={styles.detailsPanel}>
                    <div className={styles.detailsPanelHeader}>
                        <h2>Driver Details</h2>
                        <button className={styles.closeBtn} onClick={() => setSelectedDriver(null)}>
                            ✕
                        </button>
                    </div>

                    <div className={styles.tabs}>
                        <button
                            className={`${styles.tab} ${activeTab === 'overview' ? styles.active : ''}`}
                            onClick={() => setActiveTab('overview')}
                        >
                            Overview
                        </button>
                        <button
                            className={`${styles.tab} ${activeTab === 'anomalies' ? styles.active : ''}`}
                            onClick={() => setActiveTab('anomalies')}
                        >
                            Anomalies ({selectedDriver.recentAnomalies.length})
                        </button>
                        <button
                            className={`${styles.tab} ${activeTab === 'training' ? styles.active : ''}`}
                            onClick={() => setActiveTab('training')}
                        >
                            Training
                        </button>
                    </div>

                    <div className={styles.tabContent}>
                        {activeTab === 'overview' && (
                            <div className={styles.overviewTab}>
                                <div className={styles.infoSection}>
                                    <h3>Personal Information</h3>
                                    <div className={styles.infoGrid}>
                                        <div className={styles.infoItem}>
                                            <span className={styles.infoLabel}>Employee ID</span>
                                            <span className={styles.infoValue}>{selectedDriver.employeeId}</span>
                                        </div>
                                        <div className={styles.infoItem}>
                                            <span className={styles.infoLabel}>Phone</span>
                                            <span className={styles.infoValue}>{selectedDriver.phone}</span>
                                        </div>
                                        <div className={styles.infoItem}>
                                            <span className={styles.infoLabel}>Email</span>
                                            <span className={styles.infoValue}>{selectedDriver.email}</span>
                                        </div>
                                        <div className={styles.infoItem}>
                                            <span className={styles.infoLabel}>Join Date</span>
                                            <span className={styles.infoValue}>{selectedDriver.joinDate}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.infoSection}>
                                    <h3>License Information</h3>
                                    <div className={styles.infoGrid}>
                                        <div className={styles.infoItem}>
                                            <span className={styles.infoLabel}>License Number</span>
                                            <span className={styles.infoValue}>{selectedDriver.licenseNumber}</span>
                                        </div>
                                        <div className={styles.infoItem}>
                                            <span className={styles.infoLabel}>Class</span>
                                            <span className={styles.infoValue}>{selectedDriver.licenseClass}</span>
                                        </div>
                                        <div className={styles.infoItem}>
                                            <span className={styles.infoLabel}>Expiry Date</span>
                                            <span className={`${styles.infoValue} ${isLicenseExpiringSoon(selectedDriver.licenseExpiry) ? styles.warning : ''}`}>
                                                {selectedDriver.licenseExpiry}
                                                {isLicenseExpiringSoon(selectedDriver.licenseExpiry) && ' ⚠️'}
                                            </span>
                                        </div>
                                        <div className={styles.infoItem}>
                                            <span className={styles.infoLabel}>Assigned Vehicle</span>
                                            <span className={styles.infoValue}>{selectedDriver.assignedVehicle}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.infoSection}>
                                    <h3>Behavior Metrics</h3>
                                    <div className={styles.metricsGrid}>
                                        <div className={styles.behaviorMetric}>
                                            <div className={styles.behaviorLabel}>Speeding Violations</div>
                                            <div className={styles.behaviorValue}>{selectedDriver.speedingViolations}</div>
                                        </div>
                                        <div className={styles.behaviorMetric}>
                                            <div className={styles.behaviorLabel}>Hard Braking</div>
                                            <div className={styles.behaviorValue}>{selectedDriver.hardBrakingEvents}</div>
                                        </div>
                                        <div className={styles.behaviorMetric}>
                                            <div className={styles.behaviorLabel}>Rapid Acceleration</div>
                                            <div className={styles.behaviorValue}>{selectedDriver.rapidAccelerationEvents}</div>
                                        </div>
                                        <div className={styles.behaviorMetric}>
                                            <div className={styles.behaviorLabel}>Idling Time</div>
                                            <div className={styles.behaviorValue}>{selectedDriver.idlingTime}h</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'anomalies' && (
                            <div className={styles.anomaliesTab}>
                                <h3>Recent Anomalies Detected by AI</h3>
                                {selectedDriver.recentAnomalies.length === 0 ? (
                                    <div className={styles.emptyState}>
                                        <CheckCircle size={48} />
                                        <p>No anomalies detected</p>
                                        <span>This driver maintains excellent behavior</span>
                                    </div>
                                ) : (
                                    <div className={styles.anomaliesList}>
                                        {selectedDriver.recentAnomalies.map((anomaly, index) => {
                                            const anomalyInfo = anomalyTypes[anomaly.type] || {};
                                            return (
                                                <div key={index} className={`${styles.anomalyItem} ${styles[anomaly.severity]}`}>
                                                    <div className={styles.anomalyIcon}>{anomalyInfo.icon}</div>
                                                    <div className={styles.anomalyContent}>
                                                        <div className={styles.anomalyHeader}>
                                                            <span className={styles.anomalyType}>{anomalyInfo.label}</span>
                                                            <span className={`${styles.anomalySeverity} ${styles[anomaly.severity]}`}>
                                                                {anomaly.severity}
                                                            </span>
                                                        </div>
                                                        <div className={styles.anomalyDescription}>{anomaly.description}</div>
                                                        <div className={styles.anomalyDate}>{anomaly.date}</div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'training' && (
                            <div className={styles.trainingTab}>
                                <div className={styles.trainingSection}>
                                    <h3>Completed Training</h3>
                                    <div className={styles.trainingList}>
                                        {selectedDriver.trainingCompleted.map((course, index) => (
                                            <div key={index} className={styles.trainingItem}>
                                                <CheckCircle size={20} className={styles.trainingIcon} />
                                                <span>{course}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className={styles.trainingSection}>
                                    <h3>Pending Training</h3>
                                    {selectedDriver.trainingPending.length === 0 ? (
                                        <div className={styles.emptyState}>
                                            <Award size={48} />
                                            <p>All training up to date!</p>
                                        </div>
                                    ) : (
                                        <div className={styles.trainingList}>
                                            {selectedDriver.trainingPending.map((course, index) => (
                                                <div key={index} className={`${styles.trainingItem} ${styles.pending}`}>
                                                    <Calendar size={20} className={styles.trainingIcon} />
                                                    <span>{course}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div className={styles.trainingInfo}>
                                    <div className={styles.trainingInfoItem}>
                                        <span>Last Training:</span>
                                        <strong>{selectedDriver.lastTrainingDate}</strong>
                                    </div>
                                    <div className={styles.trainingInfoItem}>
                                        <span>Next Training Due:</span>
                                        <strong className={new Date(selectedDriver.nextTrainingDue) < new Date() ? styles.overdue : ''}>
                                            {selectedDriver.nextTrainingDue}
                                            {new Date(selectedDriver.nextTrainingDue) < new Date() && ' (Overdue)'}
                                        </strong>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
