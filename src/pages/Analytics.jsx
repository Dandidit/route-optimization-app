import { useState } from 'react';
import { Brain, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Zap, Leaf, Route, Fuel, Clock } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styles from './Analytics.module.css';

// AI Insights Data
const carbonTrendData = [
    { month: 'Jan', emissions: 450, target: 400 },
    { month: 'Feb', emissions: 420, target: 380 },
    { month: 'Mar', emissions: 380, target: 360 },
    { month: 'Apr', emissions: 350, target: 340 },
    { month: 'May', emissions: 320, target: 320 },
    { month: 'Jun', emissions: 290, target: 300 },
];

const routeEfficiencyData = [
    { day: 'Mon', efficiency: 85, optimized: 92 },
    { day: 'Tue', efficiency: 88, optimized: 94 },
    { day: 'Wed', efficiency: 82, optimized: 90 },
    { day: 'Thu', efficiency: 90, optimized: 95 },
    { day: 'Fri', efficiency: 87, optimized: 93 },
    { day: 'Sat', efficiency: 91, optimized: 96 },
    { day: 'Sun', efficiency: 89, optimized: 94 },
];

const fuelTypeDistribution = [
    { name: 'Diesel', value: 70, color: '#ef4444' },
    { name: 'Electric', value: 20, color: '#10b981' },
    { name: 'Hybrid', value: 10, color: '#f59e0b' },
];

const aiRecommendations = [
    {
        id: 1,
        type: 'success',
        icon: CheckCircle,
        title: 'Route Optimization Success',
        description: 'ML-optimized routes have reduced total distance by 18.5% this month, saving 2,450 km and 245 liters of fuel.',
        impact: 'High',
        savings: 'RM 612.50',
    },
    {
        id: 2,
        type: 'warning',
        icon: AlertTriangle,
        title: 'Peak Hour Inefficiency Detected',
        description: 'Vehicles operating during 8-10 AM experience 23% lower efficiency. Consider shifting 3 routes to off-peak hours.',
        impact: 'Medium',
        potential: '15% efficiency gain',
    },
    {
        id: 3,
        type: 'info',
        icon: Zap,
        title: 'EV Fleet Expansion Recommended',
        description: 'Analysis shows 40% of routes are under 80km. Switching to EVs for these routes could reduce emissions by 35%.',
        impact: 'High',
        potential: '4.2 tons CO₂/month',
    },
    {
        id: 4,
        type: 'success',
        icon: Leaf,
        title: 'Carbon Offset Achievement',
        description: 'Your fleet has achieved carbon neutrality for 45% of routes through optimization. On track for 60% by year-end.',
        impact: 'High',
        achievement: '2.4 tons saved',
    },
];

const performanceMetrics = [
    { label: 'On-Time Delivery', value: 94.5, target: 95, trend: 'up' },
    { label: 'Fuel Efficiency', value: 8.2, target: 8.0, trend: 'down', unit: 'L/100km' },
    { label: 'Route Adherence', value: 91.3, target: 90, trend: 'up' },
    { label: 'Vehicle Utilization', value: 87.2, target: 85, trend: 'up' },
];

export default function Analytics() {
    const [selectedPeriod, setSelectedPeriod] = useState('month');

    return (
        <div className={styles.page}>
            {/* Header */}
            <div className={styles.header}>
                <div className={styles.headerContent}>
                    <h1>🧠 AI-Powered Analytics</h1>
                    <p>Intelligent insights and recommendations for EcoTrace Logistics</p>
                </div>
                <div className={styles.periodSelector}>
                    <button
                        className={`${styles.periodBtn} ${selectedPeriod === 'week' ? styles.active : ''}`}
                        onClick={() => setSelectedPeriod('week')}
                    >
                        Week
                    </button>
                    <button
                        className={`${styles.periodBtn} ${selectedPeriod === 'month' ? styles.active : ''}`}
                        onClick={() => setSelectedPeriod('month')}
                    >
                        Month
                    </button>
                    <button
                        className={`${styles.periodBtn} ${selectedPeriod === 'year' ? styles.active : ''}`}
                        onClick={() => setSelectedPeriod('year')}
                    >
                        Year
                    </button>
                </div>
            </div>

            {/* Performance Metrics */}
            <div className={styles.metricsGrid}>
                {performanceMetrics.map((metric, index) => (
                    <div key={index} className={styles.metricCard}>
                        <div className={styles.metricHeader}>
                            <span className={styles.metricLabel}>{metric.label}</span>
                            {metric.trend === 'up' ? (
                                <TrendingUp className={styles.trendUp} size={20} />
                            ) : (
                                <TrendingDown className={styles.trendDown} size={20} />
                            )}
                        </div>
                        <div className={styles.metricValue}>
                            {metric.value}
                            {metric.unit || '%'}
                        </div>
                        <div className={styles.metricTarget}>
                            Target: {metric.target}{metric.unit || '%'}
                        </div>
                        <div className={styles.progressBar}>
                            <div
                                className={styles.progressFill}
                                style={{
                                    width: `${(metric.value / metric.target) * 100}%`,
                                    background: metric.value >= metric.target ? '#10b981' : '#f59e0b'
                                }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts Section */}
            <div className={styles.chartsGrid}>
                {/* Carbon Emissions Trend */}
                <div className={styles.chartCard}>
                    <div className={styles.chartHeader}>
                        <h3>
                            <Leaf size={24} />
                            Carbon Emissions Trend
                        </h3>
                        <span className={styles.chartSubtitle}>Monthly CO₂ emissions (kg)</span>
                    </div>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={carbonTrendData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                            <XAxis dataKey="month" stroke="#94a3b8" />
                            <YAxis stroke="#94a3b8" />
                            <Tooltip
                                contentStyle={{
                                    background: '#1e293b',
                                    border: '1px solid #334155',
                                    borderRadius: '8px',
                                    color: '#e2e8f0'
                                }}
                            />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="emissions"
                                stroke="#ef4444"
                                strokeWidth={3}
                                dot={{ fill: '#ef4444', r: 6 }}
                                name="Actual Emissions"
                            />
                            <Line
                                type="monotone"
                                dataKey="target"
                                stroke="#10b981"
                                strokeWidth={3}
                                strokeDasharray="5 5"
                                dot={{ fill: '#10b981', r: 6 }}
                                name="Target"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                    <div className={styles.chartInsight}>
                        <CheckCircle size={16} className={styles.insightIcon} />
                        <span>35% reduction achieved vs. January baseline</span>
                    </div>
                </div>

                {/* Route Efficiency */}
                <div className={styles.chartCard}>
                    <div className={styles.chartHeader}>
                        <h3>
                            <Route size={24} />
                            Route Efficiency Comparison
                        </h3>
                        <span className={styles.chartSubtitle}>Current vs ML-Optimized (%)</span>
                    </div>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={routeEfficiencyData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                            <XAxis dataKey="day" stroke="#94a3b8" />
                            <YAxis stroke="#94a3b8" />
                            <Tooltip
                                contentStyle={{
                                    background: '#1e293b',
                                    border: '1px solid #334155',
                                    borderRadius: '8px',
                                    color: '#e2e8f0'
                                }}
                            />
                            <Legend />
                            <Bar dataKey="efficiency" fill="#3b82f6" name="Current" radius={[8, 8, 0, 0]} />
                            <Bar dataKey="optimized" fill="#10b981" name="AI-Optimized" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                    <div className={styles.chartInsight}>
                        <Zap size={16} className={styles.insightIcon} />
                        <span>Average 5.2% efficiency improvement with ML optimization</span>
                    </div>
                </div>

                {/* Fuel Type Distribution */}
                <div className={styles.chartCard}>
                    <div className={styles.chartHeader}>
                        <h3>
                            <Fuel size={24} />
                            Fleet Fuel Type Distribution
                        </h3>
                        <span className={styles.chartSubtitle}>Current fleet composition</span>
                    </div>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={fuelTypeDistribution}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, value }) => `${name}: ${value}%`}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {fuelTypeDistribution.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    background: '#1e293b',
                                    border: '1px solid #334155',
                                    borderRadius: '8px',
                                    color: '#e2e8f0'
                                }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className={styles.chartInsight}>
                        <Leaf size={16} className={styles.insightIcon} />
                        <span>20% electric fleet - target 40% by Q4 2025</span>
                    </div>
                </div>
            </div>

            {/* AI Recommendations */}
            <div className={styles.recommendationsSection}>
                <div className={styles.sectionHeader}>
                    <h2>
                        <Brain size={28} />
                        AI-Powered Recommendations
                    </h2>
                    <p>Actionable insights generated by machine learning analysis</p>
                </div>

                <div className={styles.recommendationsGrid}>
                    {aiRecommendations.map((rec) => {
                        const Icon = rec.icon;
                        return (
                            <div key={rec.id} className={`${styles.recommendationCard} ${styles[rec.type]}`}>
                                <div className={styles.recHeader}>
                                    <Icon size={24} className={styles.recIcon} />
                                    <div className={styles.recHeaderText}>
                                        <h3>{rec.title}</h3>
                                        <span className={`${styles.impactBadge} ${styles[rec.impact.toLowerCase()]}`}>
                                            {rec.impact} Impact
                                        </span>
                                    </div>
                                </div>
                                <p className={styles.recDescription}>{rec.description}</p>
                                <div className={styles.recFooter}>
                                    {rec.savings && (
                                        <div className={styles.recMetric}>
                                            <span className={styles.recMetricLabel}>Savings:</span>
                                            <span className={styles.recMetricValue}>{rec.savings}</span>
                                        </div>
                                    )}
                                    {rec.potential && (
                                        <div className={styles.recMetric}>
                                            <span className={styles.recMetricLabel}>Potential:</span>
                                            <span className={styles.recMetricValue}>{rec.potential}</span>
                                        </div>
                                    )}
                                    {rec.achievement && (
                                        <div className={styles.recMetric}>
                                            <span className={styles.recMetricLabel}>Achievement:</span>
                                            <span className={styles.recMetricValue}>{rec.achievement}</span>
                                        </div>
                                    )}
                                </div>
                                <button className={styles.actionBtn}>View Details</button>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Security Status Section */}
            <div className={styles.securitySection}>
                <div className={styles.sectionHeader}>
                    <h2>
                        🔒 Security Status
                    </h2>
                    <p>Real-time security monitoring and compliance</p>
                </div>

                <div className={styles.securityGrid}>
                    {/* Main Security Card */}
                    <div className={styles.securityMainCard}>
                        <div className={styles.securityHeader}>
                            <div className={styles.securityIcon}>🔒</div>
                            <div className={styles.securityHeaderText}>
                                <h3>System Security</h3>
                                <div className={styles.securityStatus}>
                                    <CheckCircle size={20} className={styles.securityStatusIcon} />
                                    <span>All Systems Secure</span>
                                </div>
                            </div>
                        </div>
                        <p className={styles.securityDescription}>
                            All GPS data streams are encrypted and secure. Zero security incidents detected.
                            Authentication tokens verified for all active sessions.
                        </p>
                        <div className={styles.securityScore}>
                            <div className={styles.scoreCircle}>
                                <div className={styles.scoreValue}>100%</div>
                                <div className={styles.scoreLabel}>Security Score</div>
                            </div>
                        </div>
                    </div>

                    {/* Security Details */}
                    <div className={styles.securityDetailsCard}>
                        <h3 className={styles.securityDetailsTitle}>Security Details</h3>
                        <div className={styles.securityDetailsList}>
                            <div className={styles.securityDetailItem}>
                                <div className={styles.detailItemHeader}>
                                    <span className={styles.detailItemLabel}>Encryption Status</span>
                                    <CheckCircle size={16} className={styles.detailItemIcon} />
                                </div>
                                <div className={styles.detailItemValue}>TLS/HTTPS Active</div>
                                <div className={styles.detailItemDesc}>End-to-end encryption for all data transmission</div>
                            </div>

                            <div className={styles.securityDetailItem}>
                                <div className={styles.detailItemHeader}>
                                    <span className={styles.detailItemLabel}>Authentication</span>
                                    <CheckCircle size={16} className={styles.detailItemIcon} />
                                </div>
                                <div className={styles.detailItemValue}>All Tokens Valid</div>
                                <div className={styles.detailItemDesc}>OAuth 2.0 and JWT token verification active</div>
                            </div>

                            <div className={styles.securityDetailItem}>
                                <div className={styles.detailItemHeader}>
                                    <span className={styles.detailItemLabel}>Privacy Protection</span>
                                    <CheckCircle size={16} className={styles.detailItemIcon} />
                                </div>
                                <div className={styles.detailItemValue}>Trip-Only Tracking</div>
                                <div className={styles.detailItemDesc}>GPS data collected only during active trips</div>
                            </div>

                            <div className={styles.securityDetailItem}>
                                <div className={styles.detailItemHeader}>
                                    <span className={styles.detailItemLabel}>Security Incidents</span>
                                    <CheckCircle size={16} className={styles.detailItemIcon} />
                                </div>
                                <div className={styles.detailItemValue}>0 (Last 30 days)</div>
                                <div className={styles.detailItemDesc}>No security breaches or unauthorized access</div>
                            </div>

                            <div className={styles.securityDetailItem}>
                                <div className={styles.detailItemHeader}>
                                    <span className={styles.detailItemLabel}>Data Compliance</span>
                                    <CheckCircle size={16} className={styles.detailItemIcon} />
                                </div>
                                <div className={styles.detailItemValue}>GDPR & PDPA Compliant</div>
                                <div className={styles.detailItemDesc}>Full compliance with data protection regulations</div>
                            </div>

                            <div className={styles.securityDetailItem}>
                                <div className={styles.detailItemHeader}>
                                    <span className={styles.detailItemLabel}>Firewall Status</span>
                                    <CheckCircle size={16} className={styles.detailItemIcon} />
                                </div>
                                <div className={styles.detailItemValue}>Active & Updated</div>
                                <div className={styles.detailItemDesc}>Real-time threat detection and prevention</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Security Badges */}
                <div className={styles.securityBadges}>
                    {/* <div className={styles.securityBadge}>
                        <CheckCircle size={24} />
                        <div className={styles.badgeContent}>
                            <div className={styles.badgeTitle}>ISO 27001</div>
                            <div className={styles.badgeDesc}>Certified</div>
                        </div>
                    </div> */}
                    {/* <div className={styles.securityBadge}>
                        <CheckCircle size={24} />
                        <div className={styles.badgeContent}>
                            <div className={styles.badgeTitle}>SOC 2 Type II</div>
                            <div className={styles.badgeDesc}>Compliant</div>
                        </div>
                    </div>
                    <div className={styles.securityBadge}>
                        <CheckCircle size={24} />
                        <div className={styles.badgeContent}>
                            <div className={styles.badgeTitle}>GDPR</div>
                            <div className={styles.badgeDesc}>Compliant</div>
                        </div>
                    </div>
                    <div className={styles.securityBadge}>
                        <CheckCircle size={24} />
                        <div className={styles.badgeContent}>
                            <div className={styles.badgeTitle}>256-bit AES</div>
                            <div className={styles.badgeDesc}>Encryption</div>
                        </div>
                    </div> */}
                </div>
            </div>

            {/* Key Insights Summary */}
            <div className={styles.insightsSummary}>
                <h2>📊 Key Insights Summary</h2>
                <div className={styles.insightsGrid}>
                    <div className={styles.insightItem}>
                        <Clock size={32} className={styles.insightItemIcon} />
                        <div className={styles.insightItemContent}>
                            <h4>Time Savings</h4>
                            <p className={styles.insightValue}>127 hours</p>
                            <p className={styles.insightDesc}>saved this month through route optimization</p>
                        </div>
                    </div>

                    <div className={styles.insightItem}>
                        <Fuel size={32} className={styles.insightItemIcon} />
                        <div className={styles.insightItemContent}>
                            <h4>Fuel Efficiency</h4>
                            <p className={styles.insightValue}>15.6%</p>
                            <p className={styles.insightDesc}>improvement in fuel consumption per km</p>
                        </div>
                    </div>

                    <div className={styles.insightItem}>
                        <Leaf size={32} className={styles.insightItemIcon} />
                        <div className={styles.insightItemContent}>
                            <h4>Carbon Reduction</h4>
                            <p className={styles.insightValue}>2.4 tons</p>
                            <p className={styles.insightDesc}>CO₂ emissions prevented this month</p>
                        </div>
                    </div>

                    <div className={styles.insightItem}>
                        <TrendingUp size={32} className={styles.insightItemIcon} />
                        <div className={styles.insightItemContent}>
                            <h4>Cost Savings</h4>
                            <p className={styles.insightValue}>RM 3,250</p>
                            <p className={styles.insightDesc}>total operational cost reduction</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
