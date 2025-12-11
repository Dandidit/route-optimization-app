import { emissionFactors } from '../data/dummyData';

/**
 * Calculate distance between two coordinates using Haversine formula
 * @param {Object} point1 - { lat, lng }
 * @param {Object} point2 - { lat, lng }
 * @returns {number} - Distance in kilometers
 */
export function calculateDistance(point1, point2) {
    const R = 6371; // Earth's radius in km
    const dLat = toRad(point2.lat - point1.lat);
    const dLng = toRad(point2.lng - point1.lng);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(point1.lat)) * Math.cos(toRad(point2.lat)) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance;
}

function toRad(degrees) {
    return degrees * (Math.PI / 180);
}

/**
 * Calculate total route distance
 * @param {Array} waypoints - Array of {lat, lng} objects
 * @returns {number} - Total distance in km
 */
export function calculateRouteDistance(waypoints) {
    let totalDistance = 0;
    for (let i = 0; i < waypoints.length - 1; i++) {
        totalDistance += calculateDistance(waypoints[i], waypoints[i + 1]);
    }
    return totalDistance;
}

/**
 * Calculate fuel consumption based on distance, load, and vehicle type
 * @param {number} distance - Distance in km
 * @param {number} load - Load in kg
 * @param {number} capacity - Vehicle capacity in kg
 * @param {string} vehicleType - 'truck' or 'van'
 * @returns {number} - Fuel consumption in liters
 */
export function calculateFuel(distance, load, capacity, vehicleType = 'truck') {
    // Base fuel consumption (L/100km)
    const baseFuelConsumption = vehicleType === 'truck' ? 12 : 8;

    // Load factor (increases fuel consumption)
    const loadFactor = 1 + (load / capacity) * 0.3; // Up to 30% increase at full load

    // Calculate fuel
    const fuelPer100km = baseFuelConsumption * loadFactor;
    const totalFuel = (distance / 100) * fuelPer100km;

    return totalFuel;
}

/**
 * Calculate CO2 emissions
 * @param {number} fuelConsumption - Fuel consumption in liters
 * @param {string} fuelType - 'diesel', 'gasoline', 'cng', or 'electric'
 * @returns {number} - CO2 emissions in kg
 */
export function calculateCO2(fuelConsumption, fuelType = 'diesel') {
    const emissionFactor = emissionFactors[fuelType] || emissionFactors.diesel;
    return fuelConsumption * emissionFactor;
}

/**
 * Calculate estimated time for route
 * @param {number} distance - Distance in km
 * @param {number} stops - Number of delivery stops
 * @returns {number} - Time in minutes
 */
export function calculateTime(distance, stops) {
    const avgSpeed = 45; // km/h (accounting for city traffic)
    const stopTime = 15; // minutes per stop

    const drivingTime = (distance / avgSpeed) * 60; // Convert to minutes
    const totalStopTime = stops * stopTime;

    return Math.round(drivingTime + totalStopTime);
}

/**
 * Calculate area coverage (simplified approximation)
 * @param {Array} waypoints - Array of {lat, lng} objects
 * @returns {number} - Approximate area in km²
 */
export function calculateAreaCoverage(waypoints) {
    if (waypoints.length < 3) return 0;

    // Find bounding box
    const lats = waypoints.map(p => p.lat);
    const lngs = waypoints.map(p => p.lng);

    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLng = Math.min(...lngs);
    const maxLng = Math.max(...lngs);

    // Calculate approximate area
    const latDistance = calculateDistance(
        { lat: minLat, lng: minLng },
        { lat: maxLat, lng: minLng }
    );
    const lngDistance = calculateDistance(
        { lat: minLat, lng: minLng },
        { lat: minLat, lng: maxLng }
    );

    return latDistance * lngDistance;
}

/**
 * Optimize route using simple nearest neighbor algorithm
 * @param {Object} params - Optimization parameters
 * @returns {Object} - Optimized route data
 */
export function optimizeRoute(params) {
    const {
        startLocation,
        destinations,
        loadCapacity,
        currentLoad,
        areaCoverage,
        priority,
        vehicleType = 'truck',
        fuelType = 'diesel',
    } = params;

    // In a real implementation, this would use advanced algorithms
    // For now, we'll simulate optimization with improved metrics

    // Simulate optimization improvements based on priority
    const improvements = {
        balanced: { distance: 0.12, fuel: 0.15, time: 0.10 },
        fuel: { distance: 0.08, fuel: 0.22, time: 0.05 },
        distance: { distance: 0.18, fuel: 0.12, time: 0.08 },
        time: { distance: 0.10, fuel: 0.10, time: 0.18 },
        carbon: { distance: 0.15, fuel: 0.20, time: 0.12 },
    };

    const improvement = improvements[priority] || improvements.balanced;

    // Base metrics (current route)
    const baseDistance = 160.8;
    const baseFuel = calculateFuel(baseDistance, currentLoad, loadCapacity, vehicleType);
    const baseCO2 = calculateCO2(baseFuel, fuelType);
    const baseTime = calculateTime(baseDistance, destinations.length);
    const baseArea = 450;

    // Optimized metrics
    const optimizedDistance = baseDistance * (1 - improvement.distance);
    const optimizedFuel = baseFuel * (1 - improvement.fuel);
    const optimizedCO2 = calculateCO2(optimizedFuel, fuelType);
    const optimizedTime = baseTime * (1 - improvement.time);
    const optimizedArea = baseArea * 1.15; // Better coverage

    // Calculate savings
    const distanceSaved = baseDistance - optimizedDistance;
    const fuelSaved = baseFuel - optimizedFuel;
    const co2Saved = baseCO2 - optimizedCO2;
    const timeSaved = baseTime - optimizedTime;

    // Calculate cost savings (assuming RM 2.50 per liter)
    const costSaved = fuelSaved * 2.50;

    return {
        current: {
            distance: baseDistance,
            fuel: baseFuel,
            co2: baseCO2,
            time: baseTime,
            area: baseArea,
            loadUtilization: (currentLoad / loadCapacity) * 100,
        },
        optimized: {
            distance: optimizedDistance,
            fuel: optimizedFuel,
            co2: optimizedCO2,
            time: optimizedTime,
            area: optimizedArea,
            loadUtilization: (currentLoad / loadCapacity) * 100,
        },
        savings: {
            distance: distanceSaved,
            fuel: fuelSaved,
            co2: co2Saved,
            time: timeSaved,
            cost: costSaved,
            distancePercent: (distanceSaved / baseDistance) * 100,
            fuelPercent: (fuelSaved / baseFuel) * 100,
            co2Percent: (co2Saved / baseCO2) * 100,
            timePercent: (timeSaved / baseTime) * 100,
        },
    };
}

/**
 * Format number with commas
 */
export function formatNumber(num, decimals = 0) {
    return num.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Format time in minutes to hours and minutes
 */
export function formatTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = Math.round(minutes % 60);
    return `${hours}h ${mins}min`;
}
