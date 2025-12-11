// Dummy vehicle fleet data
export const vehicles = [
    { id: 1, name: 'Truck #14', type: 'truck', capacity: 5000, currentLoad: 4200, status: 'active', fuelType: 'diesel' },
    { id: 2, name: 'Van #07', type: 'van', capacity: 2000, currentLoad: 1800, status: 'active', fuelType: 'diesel' },
    { id: 3, name: 'Truck #22', type: 'truck', capacity: 5000, currentLoad: 3500, status: 'active', fuelType: 'diesel' },
    { id: 4, name: 'Van #15', type: 'van', capacity: 2000, currentLoad: 1200, status: 'active', fuelType: 'diesel' },
    { id: 5, name: 'Truck #09', type: 'truck', capacity: 5000, currentLoad: 4800, status: 'active', fuelType: 'diesel' },
    { id: 6, name: 'Van #03', type: 'van', capacity: 2000, currentLoad: 1500, status: 'maintenance', fuelType: 'diesel' },
    { id: 7, name: 'Truck #18', type: 'truck', capacity: 5000, currentLoad: 3900, status: 'active', fuelType: 'diesel' },
    { id: 8, name: 'Van #11', type: 'van', capacity: 2000, currentLoad: 1700, status: 'active', fuelType: 'diesel' },
    { id: 9, name: 'EV Truck #01', type: 'truck', capacity: 4000, currentLoad: 2800, status: 'active', fuelType: 'electric' },
    { id: 10, name: 'EV Van #02', type: 'van', capacity: 1500, currentLoad: 1100, status: 'active', fuelType: 'electric' },
];

// Delivery locations in Malaysia (Klang Valley area)
export const deliveryLocations = [
    { name: 'TCS Warehouse KL', lat: 3.1390, lng: 101.6869, type: 'warehouse' },
    { name: 'Petaling Jaya', lat: 3.1073, lng: 101.6670, type: 'delivery' },
    { name: 'Shah Alam', lat: 3.0733, lng: 101.5185, type: 'delivery' },
    { name: 'Subang Jaya', lat: 3.0437, lng: 101.5874, type: 'delivery' },
    { name: 'Klang', lat: 3.0333, lng: 101.4500, type: 'delivery' },
    { name: 'Puchong', lat: 3.0333, lng: 101.6167, type: 'delivery' },
    { name: 'Cheras', lat: 3.0833, lng: 101.7500, type: 'delivery' },
    { name: 'Ampang', lat: 3.1500, lng: 101.7667, type: 'delivery' },
    { name: 'Kepong', lat: 3.2167, lng: 101.6333, type: 'delivery' },
    { name: 'Setapak', lat: 3.2000, lng: 101.7167, type: 'delivery' },
    { name: 'Bangsar', lat: 3.1333, lng: 101.6667, type: 'delivery' },
    { name: 'Mont Kiara', lat: 3.1667, lng: 101.6500, type: 'delivery' },
    { name: 'Damansara', lat: 3.1500, lng: 101.6167, type: 'delivery' },
    { name: 'Cyberjaya', lat: 2.9167, lng: 101.6500, type: 'delivery' },
    { name: 'Putrajaya', lat: 2.9264, lng: 101.6964, type: 'delivery' },
];

// Sample routes with waypoints
export const sampleRoutes = [
    {
        id: 1,
        name: 'Route A - West Corridor',
        waypoints: [
            { lat: 3.1390, lng: 101.6869, name: 'TCS Warehouse KL', order: 0 },
            { lat: 3.1073, lng: 101.6670, name: 'Petaling Jaya', order: 1 },
            { lat: 3.0733, lng: 101.5185, name: 'Shah Alam', order: 2 },
            { lat: 3.0437, lng: 101.5874, name: 'Subang Jaya', order: 3 },
            { lat: 3.0333, lng: 101.4500, name: 'Klang', order: 4 },
        ],
        distance: 68.5,
        fuelConsumption: 13.5,
        co2: 36.1,
        time: 250, // minutes
        areaCovered: 450,
        loadUtilization: 85,
    },
    {
        id: 2,
        name: 'Route B - South Corridor',
        waypoints: [
            { lat: 3.1390, lng: 101.6869, name: 'TCS Warehouse KL', order: 0 },
            { lat: 3.0333, lng: 101.6167, name: 'Puchong', order: 1 },
            { lat: 3.0833, lng: 101.7500, name: 'Cheras', order: 2 },
            { lat: 2.9167, lng: 101.6500, name: 'Cyberjaya', order: 3 },
            { lat: 2.9264, lng: 101.6964, name: 'Putrajaya', order: 4 },
        ],
        distance: 72.3,
        fuelConsumption: 14.2,
        co2: 38.0,
        time: 265,
        areaCovered: 520,
        loadUtilization: 78,
    },
    {
        id: 3,
        name: 'Route C - North Corridor',
        waypoints: [
            { lat: 3.1390, lng: 101.6869, name: 'TCS Warehouse KL', order: 0 },
            { lat: 3.2167, lng: 101.6333, name: 'Kepong', order: 1 },
            { lat: 3.2000, lng: 101.7167, name: 'Setapak', order: 2 },
            { lat: 3.1500, lng: 101.7667, name: 'Ampang', order: 3 },
        ],
        distance: 45.8,
        fuelConsumption: 9.2,
        co2: 24.6,
        time: 180,
        areaCovered: 320,
        loadUtilization: 92,
    },
];

// Current metrics data
export const metricsData = {
    areaCovered: 2450, // km²
    areaCoveredTrend: 12, // % increase
    loadUtilization: 87, // %
    loadUtilizationTrend: 5, // % increase
    fuelEfficiency: 8.2, // L/100km
    fuelEfficiencyTrend: -15, // % (negative is good - reduction)
    co2Saved: 3.2, // tons
    co2SavedTrend: 18, // % increase in savings
    activeVehicles: 9,
    totalDeliveries: 156,
    onTimeRate: 94.5, // %
};

// Optimization priorities
export const optimizationPriorities = [
    { value: 'balanced', label: 'Balanced (Distance + Fuel + Time)' },
    { value: 'fuel', label: 'Minimize Fuel Consumption' },
    { value: 'distance', label: 'Shortest Distance' },
    { value: 'time', label: 'Fastest Route' },
    { value: 'carbon', label: 'Lowest Carbon Emissions' },
];

// Emission factors (kg CO2 per liter)
export const emissionFactors = {
    diesel: 2.68,
    gasoline: 2.31,
    cng: 1.94,
    electric: 0.5, // kg CO2 per kWh (grid-dependent)
};

// Default optimization parameters
export const defaultParameters = {
    startLocation: 'TCS Warehouse KL',
    destinations: ['Petaling Jaya', 'Shah Alam', 'Subang Jaya', 'Klang'],
    loadCapacity: 5000,
    currentLoad: 3500,
    areaCoverage: 500,
    priority: 'balanced',
    vehicleType: 'truck',
    fuelType: 'diesel',
};

// Driver data with behavior metrics
export const drivers = [
    {
        id: 1,
        name: 'Ahmad bin Hassan',
        employeeId: 'DRV-001',
        licenseNumber: 'D1234567',
        licenseExpiry: '2025-12-15',
        licenseClass: 'GDL',
        phone: '+60 12-345 6789',
        email: 'ahmad.hassan@ecotrace.com',
        joinDate: '2022-01-15',
        assignedVehicle: 'Truck #14',
        status: 'active',
        safetyScore: 92,
        totalTrips: 1245,
        totalDistance: 45678,
        totalHours: 2340,
        speedingViolations: 3,
        hardBrakingEvents: 12,
        rapidAccelerationEvents: 8,
        idlingTime: 45,
        nightDriving: 234,
        trainingCompleted: ['Defensive Driving', 'Eco-Driving', 'Safety Protocols'],
        trainingPending: [],
        lastTrainingDate: '2024-10-15',
        nextTrainingDue: '2025-01-15',
        recentAnomalies: [
            { date: '2024-11-28', type: 'speeding', severity: 'medium', description: 'Exceeded speed limit by 15 km/h on Highway E1' },
            { date: '2024-11-25', type: 'hard_braking', severity: 'low', description: 'Hard braking event detected at 14:23' },
        ],
    },
    {
        id: 2,
        name: 'Siti Nurhaliza',
        employeeId: 'DRV-002',
        licenseNumber: 'D2345678',
        licenseExpiry: '2026-03-20',
        licenseClass: 'GDL',
        phone: '+60 12-456 7890',
        email: 'siti.nurhaliza@ecotrace.com',
        joinDate: '2021-06-10',
        assignedVehicle: 'Van #07',
        status: 'active',
        safetyScore: 98,
        totalTrips: 2156,
        totalDistance: 67890,
        totalHours: 3245,
        speedingViolations: 0,
        hardBrakingEvents: 3,
        rapidAccelerationEvents: 2,
        idlingTime: 28,
        nightDriving: 145,
        trainingCompleted: ['Defensive Driving', 'Eco-Driving', 'Safety Protocols', 'Advanced Route Planning'],
        trainingPending: [],
        lastTrainingDate: '2024-11-10',
        nextTrainingDue: '2025-02-10',
        recentAnomalies: [],
    },
    {
        id: 3,
        name: 'Kumar Selvam',
        employeeId: 'DRV-003',
        licenseNumber: 'D3456789',
        licenseExpiry: '2025-01-10',
        licenseClass: 'GDL',
        phone: '+60 12-567 8901',
        email: 'kumar.selvam@ecotrace.com',
        joinDate: '2023-03-22',
        assignedVehicle: 'Truck #22',
        status: 'active',
        safetyScore: 78,
        totalTrips: 845,
        totalDistance: 32145,
        totalHours: 1567,
        speedingViolations: 15,
        hardBrakingEvents: 28,
        rapidAccelerationEvents: 22,
        idlingTime: 67,
        nightDriving: 312,
        trainingCompleted: ['Defensive Driving', 'Safety Protocols'],
        trainingPending: ['Eco-Driving', 'Advanced Safety Training'],
        lastTrainingDate: '2024-03-15',
        nextTrainingDue: '2024-12-01',
        recentAnomalies: [
            { date: '2024-11-29', type: 'speeding', severity: 'high', description: 'Exceeded speed limit by 28 km/h on NKVE' },
            { date: '2024-11-29', type: 'rapid_acceleration', severity: 'medium', description: 'Multiple rapid acceleration events detected' },
            { date: '2024-11-27', type: 'excessive_idling', severity: 'medium', description: 'Engine idling for 45 minutes' },
            { date: '2024-11-26', type: 'hard_braking', severity: 'high', description: 'Emergency braking at high speed' },
        ],
    },
    {
        id: 4,
        name: 'Lee Wei Ming',
        employeeId: 'DRV-004',
        licenseNumber: 'D4567890',
        licenseExpiry: '2024-11-30',
        licenseClass: 'GDL',
        phone: '+60 12-678 9012',
        email: 'lee.weiming@ecotrace.com',
        joinDate: '2022-08-05',
        assignedVehicle: 'Van #15',
        status: 'suspended',
        safetyScore: 65,
        totalTrips: 1034,
        totalDistance: 38765,
        totalHours: 1876,
        speedingViolations: 22,
        hardBrakingEvents: 35,
        rapidAccelerationEvents: 30,
        idlingTime: 89,
        nightDriving: 456,
        trainingCompleted: ['Defensive Driving'],
        trainingPending: ['Eco-Driving', 'Safety Protocols', 'Advanced Safety Training'],
        lastTrainingDate: '2023-11-20',
        nextTrainingDue: '2024-02-20',
        recentAnomalies: [
            { date: '2024-11-28', type: 'license_expiry', severity: 'critical', description: 'License expires in 2 days - immediate action required' },
            { date: '2024-11-27', type: 'speeding', severity: 'high', description: 'Exceeded speed limit by 35 km/h' },
            { date: '2024-11-26', type: 'fatigue', severity: 'high', description: 'Driving for 6 hours without break' },
        ],
    },
    {
        id: 5,
        name: 'Fatimah Abdullah',
        employeeId: 'DRV-005',
        licenseNumber: 'D5678901',
        licenseExpiry: '2026-08-15',
        licenseClass: 'GDL',
        phone: '+60 12-789 0123',
        email: 'fatimah.abdullah@ecotrace.com',
        joinDate: '2021-11-12',
        assignedVehicle: 'Truck #09',
        status: 'active',
        safetyScore: 95,
        totalTrips: 1876,
        totalDistance: 56234,
        totalHours: 2789,
        speedingViolations: 1,
        hardBrakingEvents: 5,
        rapidAccelerationEvents: 4,
        idlingTime: 32,
        nightDriving: 189,
        trainingCompleted: ['Defensive Driving', 'Eco-Driving', 'Safety Protocols', 'Advanced Route Planning'],
        trainingPending: [],
        lastTrainingDate: '2024-10-20',
        nextTrainingDue: '2025-01-20',
        recentAnomalies: [
            { date: '2024-11-20', type: 'hard_braking', severity: 'low', description: 'Single hard braking event' },
        ],
    },
];

// Anomaly types and their severity levels
export const anomalyTypes = {
    speeding: { label: 'Speed Violation', icon: '🚨', color: '#ef4444' },
    hard_braking: { label: 'Hard Braking', icon: '⚠️', color: '#f59e0b' },
    rapid_acceleration: { label: 'Rapid Acceleration', icon: '⚡', color: '#f59e0b' },
    excessive_idling: { label: 'Excessive Idling', icon: '⏱️', color: '#3b82f6' },
    fatigue: { label: 'Driver Fatigue', icon: '😴', color: '#ef4444' },
    license_expiry: { label: 'License Expiry', icon: '📋', color: '#dc2626' },
    route_deviation: { label: 'Route Deviation', icon: '🗺️', color: '#f59e0b' },
    night_driving: { label: 'Excessive Night Driving', icon: '🌙', color: '#3b82f6' },
};

// Training courses available
export const trainingCourses = [
    {
        id: 1,
        name: 'Defensive Driving',
        duration: '8 hours',
        validity: '12 months',
        description: 'Advanced defensive driving techniques and hazard awareness',
        mandatory: true,
    },
    {
        id: 2,
        name: 'Eco-Driving',
        duration: '4 hours',
        validity: '12 months',
        description: 'Fuel-efficient driving techniques and carbon reduction strategies',
        mandatory: true,
    },
    {
        id: 3,
        name: 'Safety Protocols',
        duration: '6 hours',
        validity: '12 months',
        description: 'Company safety procedures and emergency response',
        mandatory: true,
    },
    {
        id: 4,
        name: 'Advanced Route Planning',
        duration: '4 hours',
        validity: '24 months',
        description: 'GPS navigation and optimal route selection',
        mandatory: false,
    },
    {
        id: 5,
        name: 'Advanced Safety Training',
        duration: '12 hours',
        validity: '12 months',
        description: 'Comprehensive safety training for high-risk scenarios',
        mandatory: false,
    },
];

// AI-detected anomaly patterns
export const anomalyPatterns = [
    {
        id: 1,
        pattern: 'Consistent Speeding',
        driversAffected: ['Kumar Selvam', 'Lee Wei Ming'],
        frequency: 'High',
        recommendation: 'Immediate safety training and speed monitoring required',
        severity: 'high',
    },
    {
        id: 2,
        pattern: 'License Expiry Risk',
        driversAffected: ['Lee Wei Ming'],
        frequency: 'Critical',
        recommendation: 'Suspend driver until license renewal completed',
        severity: 'critical',
    },
    {
        id: 3,
        pattern: 'Training Overdue',
        driversAffected: ['Kumar Selvam', 'Lee Wei Ming'],
        frequency: 'Medium',
        recommendation: 'Schedule mandatory training sessions within 7 days',
        severity: 'medium',
    },
    {
        id: 4,
        pattern: 'Excessive Idling',
        driversAffected: ['Kumar Selvam', 'Lee Wei Ming'],
        frequency: 'Medium',
        recommendation: 'Eco-driving training and idle time monitoring',
        severity: 'medium',
    },
];

// Safety score thresholds
export const safetyScoreThresholds = {
    excellent: 90,
    good: 75,
    fair: 60,
    poor: 0,
};
