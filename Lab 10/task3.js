const express = require('express');
const app = express();
const PORT = process.env.PORT || 3002;

// Middleware to parse JSON requests
app.use(express.json());

// Sample player data
let players = [
    { id: 1, name: 'Hero', strength: 80, agility: 60, wisdom: 70, experience: 200, resources: { gold: 500, potions: 3 }, questStatus: 'pending' },
    { id: 2, name: 'Rogue', strength: 60, agility: 90, wisdom: 50, experience: 150, resources: { gold: 300, potions: 1 }, questStatus: 'pending' },
    { id: 3, name: 'Mage', strength: 50, agility: 40, wisdom: 100, experience: 250, resources: { gold: 700, potions: 5 }, questStatus: 'pending' },
];

// Quest difficulty configurations
const QUEST_REQUIREMENTS = {
    easy: {
        minSkillLevel: 50,
        minExperience: 100,
        resourceCost: { gold: 100, potions: 1 },
        rewards: { gold: 200, experience: 50 }
    },
    moderate: {
        minSkillLevel: 70,
        minExperience: 150,
        resourceCost: { gold: 200, potions: 2 },
        rewards: { gold: 400, experience: 100 }
    },
    hard: {
        minSkillLevel: 90,
        minExperience: 200,
        resourceCost: { gold: 300, potions: 3 },
        rewards: { gold: 600, experience: 150 }
    }
};

// Error handler middleware
function errorHandler(err, req, res, next) {
    console.error('Error:', err);
    res.status(500).json({
        message: 'An error occurred',
        error: err.message
    });
}

// Skill Level Check Middleware
function skillLevelCheck(req, res, next) {
    try {
        const { playerId, questDifficulty } = req.body;
        const player = players.find(p => p.id === playerId);
        
        if (!player) {
            return res.status(404).json({ message: 'Player not found' });
        }

        const requirements = QUEST_REQUIREMENTS[questDifficulty];
        if (!requirements) {
            return res.status(400).json({ message: 'Invalid quest difficulty' });
        }

        // Store player and requirements for subsequent middleware
        req.player = player;
        req.requirements = requirements;

        // Calculate average skill level
        const avgSkillLevel = (player.strength + player.agility + player.wisdom) / 3;
        req.skillBonus = avgSkillLevel >= requirements.minSkillLevel ? 
            (avgSkillLevel - requirements.minSkillLevel) / 100 : 0;

        next();
    } catch (error) {
        next(error);
    }
}

// Experience Level Check Middleware
function experienceLevelCheck(req, res, next) {
    try {
        const { player, requirements } = req;

        if (player.experience < requirements.minExperience) {
            req.questStatus = 'failed';
            req.failureReason = 'Insufficient experience';
            return next();
        }

        // Calculate experience bonus
        req.experienceBonus = (player.experience - requirements.minExperience) / 1000;
        next();
    } catch (error) {
        next(error);
    }
}

// Resource Availability Check Middleware
function resourceAvailabilityCheck(req, res, next) {
    try {
        if (req.questStatus === 'failed') return next();

        const { player, requirements } = req;
        const { resourceCost } = requirements;

        // Check if player has enough resources
        if (player.resources.gold < resourceCost.gold || 
            player.resources.potions < resourceCost.potions) {
            req.questStatus = 'failed';
            req.failureReason = 'Insufficient resources';
            return next();
        }

        // Calculate resource efficiency bonus
        req.resourceBonus = (player.resources.gold / resourceCost.gold - 1) * 0.1;
        next();
    } catch (error) {
        next(error);
    }
}

// Final Quest Outcome Middleware
function finalQuestOutcome(req, res, next) {
    try {
        if (req.questStatus === 'failed') {
            req.finalOutcome = {
                status: 'failed',
                reason: req.failureReason
            };
            return next();
        }

        // Calculate success chance and rewards
        const successChance = 0.7 + req.skillBonus + req.experienceBonus + req.resourceBonus;
        const isSuccessful = Math.random() < successChance;

        if (isSuccessful) {
            const { rewards, resourceCost } = req.requirements;
            
            // Apply bonuses to rewards
            const bonusMultiplier = 1 + req.skillBonus + req.experienceBonus;
            const finalRewards = {
                gold: Math.round(rewards.gold * bonusMultiplier),
                experience: Math.round(rewards.experience * bonusMultiplier)
            };

            // Update player resources and experience
            req.player.resources.gold += finalRewards.gold - resourceCost.gold;
            req.player.resources.potions -= resourceCost.potions;
            req.player.experience += finalRewards.experience;

            req.finalOutcome = {
                status: 'success',
                rewards: finalRewards,
                bonuses: {
                    skill: req.skillBonus,
                    experience: req.experienceBonus,
                    resource: req.resourceBonus
                }
            };
        } else {
            req.finalOutcome = {
                status: 'failed',
                reason: 'Quest attempt unsuccessful',
                successChance: Math.round(successChance * 100) + '%'
            };
        }

        next();
    } catch (error) {
        next(error);
    }
}

// Routes
app.post('/complete-quest', skillLevelCheck, experienceLevelCheck, resourceAvailabilityCheck, finalQuestOutcome, (req, res) => {
    res.status(200).json({
        message: 'Quest completion processed',
        ...req.finalOutcome
    });
});

app.put('/players/upgrade-stats', (req, res) => {
    try {
        const { id, strength, agility, wisdom } = req.body;
        const player = players.find(p => p.id === id);
        
        if (!player) {
            return res.status(404).json({ message: 'Player not found' });
        }

        // Update stats
        if (strength) player.strength += strength;
        if (agility) player.agility += agility;
        if (wisdom) player.wisdom += wisdom;

        res.status(200).json({
            message: 'Player stats upgraded',
            player
        });
    } catch (error) {
        next(error);
    }
});

app.get('/players', (req, res) => {
    try {
        res.status(200).json(players);
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