const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Sample wizard data
let wizards = [
    { id: 1, name: 'Gandalf', type: 'fire', attack: 50, defense: 30, health: 100, energy: 80 },
    { id: 2, name: 'Frosty', type: 'ice', attack: 30, defense: 60, health: 90, energy: 50 },
    { id: 3, name: 'Stormbringer', type: 'storm', attack: 40, defense: 40, health: 80, energy: 20 },
];

// Error handler middleware
function errorHandler(err, req, res, next) {
    console.error(err.stack);
    res.status(500).json({
        error: 'Something went wrong!',
        message: err.message
    });
}

// Wizard Type Check Middleware
function wizardTypeCheck(req, res, next) {
    try {
        const { wizard1, wizard2 } = req.body;
        
        // Apply type-specific boosts
        const typeBoosts = {
            fire: { attack: 1.3, defense: 1.0, speed: 1.0 },
            ice: { attack: 1.0, defense: 1.3, speed: 1.0 },
            storm: { attack: 1.0, defense: 1.0, speed: 1.3 }
        };

        // Validate wizard types
        if (!typeBoosts[wizard1.type] || !typeBoosts[wizard2.type]) {
            throw new Error('Invalid wizard type. Must be fire, ice, or storm.');
        }

        // Store boosts in request object for next middleware
        req.typeBoosts = {
            wizard1: typeBoosts[wizard1.type],
            wizard2: typeBoosts[wizard2.type]
        };

        next();
    } catch (error) {
        next(error);
    }
}

// Health Check Middleware
function healthCheck(req, res, next) {
    try {
        const { wizard1, wizard2 } = req.body;
        const HEALTH_THRESHOLD = 20;
        const PENALTY_MULTIPLIER = 0.7; // 30% reduction

        req.healthModifiers = {
            wizard1: wizard1.health < HEALTH_THRESHOLD ? PENALTY_MULTIPLIER : 1,
            wizard2: wizard2.health < HEALTH_THRESHOLD ? PENALTY_MULTIPLIER : 1
        };

        next();
    } catch (error) {
        next(error);
    }
}

// Magic Energy Level Middleware
function magicEnergyLevel(req, res, next) {
    try {
        const { wizard1, wizard2 } = req.body;
        const ENERGY_THRESHOLD = 30;

        req.spellLevels = {
            wizard1: wizard1.energy >= ENERGY_THRESHOLD ? 'high' : 'basic',
            wizard2: wizard2.energy >= ENERGY_THRESHOLD ? 'high' : 'basic'
        };

        next();
    } catch (error) {
        next(error);
    }
}

// Duel Outcome Logic Middleware
function duelOutcome(req, res, next) {
    try {
        const { wizard1, wizard2 } = req.body;
        const { typeBoosts } = req;
        const { healthModifiers } = req;
        const { spellLevels } = req;

        // Calculate effective power for each wizard
        const wizard1Power = calculateWizardPower(wizard1, typeBoosts.wizard1, healthModifiers.wizard1, spellLevels.wizard1);
        const wizard2Power = calculateWizardPower(wizard2, typeBoosts.wizard2, healthModifiers.wizard2, spellLevels.wizard2);

        // Determine winner
        req.duelResult = {
            winner: wizard1Power > wizard2Power ? wizard1.name : wizard2.name,
            wizard1Power,
            wizard2Power
        };

        next();
    } catch (error) {
        next(error);
    }
}

// Helper function to calculate wizard power
function calculateWizardPower(wizard, typeBoost, healthModifier, spellLevel) {
    let basePower = (wizard.attack * typeBoost.attack + wizard.defense * typeBoost.defense) * healthModifier;
    return spellLevel === 'high' ? basePower * 1.5 : basePower;
}

// Routes
app.post('/duel', wizardTypeCheck, healthCheck, magicEnergyLevel, duelOutcome, (req, res) => {
    res.status(200).json({
        message: 'Duel processed',
        outcome: `${req.duelResult.winner} wins!`,
        details: {
            wizard1Power: req.duelResult.wizard1Power,
            wizard2Power: req.duelResult.wizard2Power,
            spellLevels: req.spellLevels
        }
    });
});

app.put('/wizards/upgrade', (req, res) => {
    try {
        const { id, strength, agility, wisdom } = req.body;
        const wizard = wizards.find(w => w.id === id);
        
        if (!wizard) {
            return res.status(404).json({ error: 'Wizard not found' });
        }

        // Update stats
        wizard.attack += strength || 0;
        wizard.defense += wisdom || 0;
        
        res.status(200).json({
            message: 'Wizard stats upgraded',
            wizard
        });
    } catch (error) {
        next(error);
    }
});

app.get('/wizards', (req, res) => {
    try {
        res.status(200).json(wizards);
    } catch (error) {
        next(error);
    }
});

// Apply the error handler middleware
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});