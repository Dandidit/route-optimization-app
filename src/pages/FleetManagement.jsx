import { useState } from 'react';
import { Search, Filter, Truck, Zap, Fuel, MapPin, Calendar, AlertCircle, CheckCircle, Wrench } from 'lucide-react';
import { vehicles } from '../data/dummyData';
import styles from './FleetManagement.module.css';

export default function FleetManagement() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [selectedVehicle, setSelectedVehicle] = useState(null);

    // Filter vehicles based on search and status
    const filteredVehicles = vehicles.filter(vehicle => {
        const matchesSearch = vehicle.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all' || vehicle.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    // Calculate fleet statistics
    const activeCount = vehicles.filter(v => v.status === 'active').length;
    const maintenanceCount = vehicles.filter(v => v.status === 'maintenance').length;
    const avgUtilization = Math.round(
        vehicles.reduce((sum, v) => sum + (v.currentLoad / v.capacity) * 100, 0) / vehicles.length
    );
    const evCount = vehicles.filter(v => v.fuelType === 'electric').length;

    const getStatusIcon = (status) => {
        switch (status) {
            case 'active':
                return <CheckCircle size={20} className={styles.statusIconActive} />;
            case 'maintenance':
                return <Wrench size={20} className={styles.statusIconMaintenance} />;
            default:
                return <AlertCircle size={20} className={styles.statusIconInactive} />;
        }
    };

    const getVehicleIcon = (type) => {
        return type === 'truck' ? '🚚' : '🚐';
    };

    const getFuelIcon = (fuelType) => {
        return fuelType === 'electric' ? <Zap size={16} /> : <Fuel size={16} />;
    };

    return (
        <div className={styles.page}>
            {/* Header */}
            <div className={styles.header}>
                <h1>🚚 Fleet Management</h1>
                <p>Monitor and manage your entire vehicle fleet</p>
            </div>

            {/* Fleet Statistics */}
            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <div className={styles.statIcon}>🚗</div>
                    <div className={styles.statContent}>
                        <div className={styles.statValue}>{vehicles.length}</div>
                        <div className={styles.statLabel}>Total Vehicles</div>
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statIcon}>✅</div>
                    <div className={styles.statContent}>
                        <div className={styles.statValue}>{activeCount}</div>
                        <div className={styles.statLabel}>Active</div>
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statIcon}>🔧</div>
                    <div className={styles.statContent}>
                        <div className={styles.statValue}>{maintenanceCount}</div>
                        <div className={styles.statLabel}>In Maintenance</div>
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statIcon}>📊</div>
                    <div className={styles.statContent}>
                        <div className={styles.statValue}>{avgUtilization}%</div>
                        <div className={styles.statLabel}>Avg Utilization</div>
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statIcon}>⚡</div>
                    <div className={styles.statContent}>
                        <div className={styles.statValue}>{evCount}</div>
                        <div className={styles.statLabel}>Electric Vehicles</div>
                    </div>
                </div>
            </div>

            {/* Search and Filter Bar */}
            <div className={styles.toolbar}>
                <div className={styles.searchBox}>
                    <Search size={20} className={styles.searchIcon} />
                    <input
                        type="text"
                        placeholder="Search vehicles by name..."
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
                        <option value="maintenance">Maintenance</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>
            </div>

            {/* Vehicle Grid */}
            <div className={styles.vehicleGrid}>
                {filteredVehicles.map((vehicle) => {
                    const utilization = (vehicle.currentLoad / vehicle.capacity) * 100;

                    return (
                        <div
                            key={vehicle.id}
                            className={`${styles.vehicleCard} ${selectedVehicle?.id === vehicle.id ? styles.selected : ''}`}
                            onClick={() => setSelectedVehicle(vehicle)}
                        >
                            <div className={styles.vehicleHeader}>
                                <div className={styles.vehicleIconLarge}>{getVehicleIcon(vehicle.type)}</div>
                                <div className={styles.vehicleInfo}>
                                    <h3 className={styles.vehicleName}>{vehicle.name}</h3>
                                    <div className={styles.vehicleType}>
                                        {vehicle.type.charAt(0).toUpperCase() + vehicle.type.slice(1)}
                                    </div>
                                </div>
                                <div className={styles.statusBadge}>
                                    {getStatusIcon(vehicle.status)}
                                    <span>{vehicle.status}</span>
                                </div>
                            </div>

                            <div className={styles.vehicleDetails}>
                                <div className={styles.detailRow}>
                                    <span className={styles.detailLabel}>
                                        <Truck size={16} />
                                        Capacity
                                    </span>
                                    <span className={styles.detailValue}>{vehicle.capacity.toLocaleString()} kg</span>
                                </div>

                                <div className={styles.detailRow}>
                                    <span className={styles.detailLabel}>
                                        <MapPin size={16} />
                                        Current Load
                                    </span>
                                    <span className={styles.detailValue}>{vehicle.currentLoad.toLocaleString()} kg</span>
                                </div>

                                <div className={styles.detailRow}>
                                    <span className={styles.detailLabel}>
                                        {getFuelIcon(vehicle.fuelType)}
                                        Fuel Type
                                    </span>
                                    <span className={styles.detailValue}>
                                        {vehicle.fuelType === 'electric' ? 'Electric' : 'Diesel'}
                                    </span>
                                </div>
                            </div>

                            <div className={styles.utilizationSection}>
                                <div className={styles.utilizationHeader}>
                                    <span>Load Utilization</span>
                                    <span className={styles.utilizationPercent}>{utilization.toFixed(1)}%</span>
                                </div>
                                <div className={styles.progressBar}>
                                    <div
                                        className={styles.progressFill}
                                        style={{
                                            width: `${utilization}%`,
                                            background: utilization > 90 ? '#ef4444' : utilization > 70 ? '#f59e0b' : '#10b981'
                                        }}
                                    ></div>
                                </div>
                            </div>

                            <div className={styles.vehicleActions}>
                                <button className={styles.actionBtn}>
                                    <MapPin size={16} />
                                    Track
                                </button>
                                <button className={styles.actionBtn}>
                                    <Calendar size={16} />
                                    Schedule
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {filteredVehicles.length === 0 && (
                <div className={styles.emptyState}>
                    <div className={styles.emptyIcon}>🔍</div>
                    <h3>No vehicles found</h3>
                    <p>Try adjusting your search or filter criteria</p>
                </div>
            )}

            {/* Selected Vehicle Details Panel */}
            {selectedVehicle && (
                <div className={styles.detailsPanel}>
                    <div className={styles.detailsPanelHeader}>
                        <h2>Vehicle Details</h2>
                        <button
                            className={styles.closeBtn}
                            onClick={() => setSelectedVehicle(null)}
                        >
                            ✕
                        </button>
                    </div>

                    <div className={styles.detailsPanelContent}>
                        <div className={styles.detailsSection}>
                            <div className={styles.detailsVehicleHeader}>
                                <div className={styles.detailsVehicleIcon}>{getVehicleIcon(selectedVehicle.type)}</div>
                                <div>
                                    <h3>{selectedVehicle.name}</h3>
                                    <p className={styles.detailsVehicleType}>
                                        {selectedVehicle.type.charAt(0).toUpperCase() + selectedVehicle.type.slice(1)}
                                    </p>
                                </div>
                            </div>

                            <div className={styles.detailsGrid}>
                                <div className={styles.detailsItem}>
                                    <div className={styles.detailsItemLabel}>Status</div>
                                    <div className={styles.detailsItemValue}>
                                        {getStatusIcon(selectedVehicle.status)}
                                        <span>{selectedVehicle.status}</span>
                                    </div>
                                </div>

                                <div className={styles.detailsItem}>
                                    <div className={styles.detailsItemLabel}>Capacity</div>
                                    <div className={styles.detailsItemValue}>
                                        {selectedVehicle.capacity.toLocaleString()} kg
                                    </div>
                                </div>

                                <div className={styles.detailsItem}>
                                    <div className={styles.detailsItemLabel}>Current Load</div>
                                    <div className={styles.detailsItemValue}>
                                        {selectedVehicle.currentLoad.toLocaleString()} kg
                                    </div>
                                </div>

                                <div className={styles.detailsItem}>
                                    <div className={styles.detailsItemLabel}>Fuel Type</div>
                                    <div className={styles.detailsItemValue}>
                                        {getFuelIcon(selectedVehicle.fuelType)}
                                        <span>{selectedVehicle.fuelType === 'electric' ? 'Electric' : 'Diesel'}</span>
                                    </div>
                                </div>

                                <div className={styles.detailsItem}>
                                    <div className={styles.detailsItemLabel}>Utilization</div>
                                    <div className={styles.detailsItemValue}>
                                        {((selectedVehicle.currentLoad / selectedVehicle.capacity) * 100).toFixed(1)}%
                                    </div>
                                </div>

                                <div className={styles.detailsItem}>
                                    <div className={styles.detailsItemLabel}>Vehicle ID</div>
                                    <div className={styles.detailsItemValue}>#{selectedVehicle.id}</div>
                                </div>
                            </div>
                        </div>

                        <div className={styles.detailsActions}>
                            <button className={styles.primaryBtn}>
                                <MapPin size={18} />
                                Track Location
                            </button>
                            <button className={styles.secondaryBtn}>
                                <Calendar size={18} />
                                Schedule Maintenance
                            </button>
                            <button className={styles.secondaryBtn}>
                                <Truck size={18} />
                                Assign Route
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
