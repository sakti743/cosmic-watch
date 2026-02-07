const express = require('express');
const router = express.Router();

// Helper function to generate a random ID/Designation
const generateDesignation = () => {
    const years = ['2023', '2024', '2025', '2026'];
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return `${years[Math.floor(Math.random() * years.length)]} ${letters[Math.floor(Math.random() * 26)]}${letters[Math.floor(Math.random() * 26)]}`;
};

router.get('/feed', (req, res) => {
    const automatedAsteroids = [];
    const count = Math.floor(Math.random() * 5) + 8; // Generates 8 to 12 asteroids

    for (let i = 0; i < count; i++) {
        const velocity = Math.floor(Math.random() * 150000) + 10000;
        const diameter = Math.floor(Math.random() * 800) + 10;
        const isHazardous = diameter > 140 && Math.random() > 0.5;
        
        // Automated Risk Algorithm
        let riskScore = Math.floor((velocity / 15000) + (diameter / 10));
        if (isHazardous) riskScore += 30;
        riskScore = Math.min(99, Math.max(2, riskScore));

        automatedAsteroids.push({
            id: Math.random().toString(36).substr(2, 9).toUpperCase(),
            name: `NEO-${generateDesignation()}`,
            velocity: `${velocity.toLocaleString()} KM/H`,
            size: `${diameter} Meters`,
            riskScore: riskScore,
            isHazardous: isHazardous,
            distance: `${(Math.random() * 10).toFixed(2)}M KM`
        });
    }

    console.log(`🤖 Auto-Generator: Synthesized ${count} new orbital objects.`);
    res.json(automatedAsteroids);
});

module.exports = router;