// backend/services/riskEngine.js
const calculateRiskScore = (asteroid) => {
    const size = asteroid.estimated_diameter.meters.estimated_diameter_max;
    const velocity = asteroid.close_approach_data[0].relative_velocity.kilometers_per_hour;
    const distance = asteroid.close_approach_data[0].miss_distance.kilometers;

    // Custom Formula: (Size * Velocity) / Distance (Example)
    const score = (size * (velocity / 10000)) / (distance / 1000000);
    return Math.min(Math.round(score), 100); // Normalize to 100
};