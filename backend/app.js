const express = require('express');
const cors = require('cors');
// Import route files
const authRoutes = require('./routes/auth');
const asteroidRoutes = require('./routes/asteroids');

const app = express();

// 1. Global Middlewares
app.use(cors()); // Allows frontend on port 3000 to reach backend on 5001
app.use(express.json()); // Essential: Lets server read the 'Body' from Postman/Frontend

// 2. API Routes
// Map auth logic to /api/auth (Register/Login)
app.use('/api/auth', authRoutes);

// Map asteroid logic to /api/asteroids (NASA Data/Risk Engine)
app.use('/api/asteroids', asteroidRoutes);

// 3. Health Check (Test if server is up by visiting http://localhost:5001/)
app.get('/', (req, res) => {
    res.json({ status: "Satellite Uplink Active", system: "Cosmic Watch v1.0" });
});

// 4. Global Error Handler (Prevents the '500' crash from showing as a blank page)
app.use((err, req, res, next) => {
    console.error("SYSTEM ERROR:", err.stack);
    res.status(500).json({ msg: "Internal Satellite Failure", error: err.message });
});

// 5. Start Server
const PORT = 5001;
app.listen(PORT, () => {
    console.log(`🚀 COSMIC BACKEND LAUNCHED ON PORT ${PORT}`);
    console.log(`🔗 Auth: http://localhost:${PORT}/api/auth`);
    console.log(`🔗 Data: http://localhost:${PORT}/api/asteroids/feed`);
});