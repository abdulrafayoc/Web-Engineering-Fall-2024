const express = require('express');
const app = express();
const PORT = process.env.PORT || 3003;

// Middleware to parse JSON requests
app.use(express.json());

// Sample data for the rescue organization
let resources = {
    teamMembers: 5,
    vehicles: 2,
    equipment: 10
};

// Error handler middleware
function errorHandler(err, req, res, next) {
    res.status(500).json({ message: 'An error occurred', error: err.message });
}

// Animal Type Check Middleware
function animalTypeCheck(req, res, next) {
    const { animalType } = req.body;
    const validAnimalTypes = ['bird', 'mammal', 'reptile'];

    if (!validAnimalTypes.includes(animalType)) {
        return res.status(400).json({ message: 'Invalid animal type' });
    }

    req.missionData = { animalType };  // Add animalType to missionData for further processing
    next();
}

// Severity Level Check Middleware
function severityLevelCheck(req, res, next) {
    const { severity } = req.body;
    const validSeverities = ['mild', 'moderate', 'severe'];

    if (!validSeverities.includes(severity)) {
        return res.status(400).json({ message: 'Invalid severity level' });
    }

    req.missionData.severity = severity;  // Add severity to missionData
    next();
}

// Resource Availability Check Middleware
function resourceAvailabilityCheck(req, res, next) {
    const severity = req.missionData.severity;

    const resourcesNeeded = {
        mild: { teamMembers: 1, vehicles: 1, equipment: 2 },
        moderate: { teamMembers: 3, vehicles: 1, equipment: 5 },
        severe: { teamMembers: 5, vehicles: 2, equipment: 8 }
    };

    const requiredResources = resourcesNeeded[severity];

    if (
        resources.teamMembers >= requiredResources.teamMembers &&
        resources.vehicles >= requiredResources.vehicles &&
        resources.equipment >= requiredResources.equipment
    ) {
        req.missionData.resourcesAvailable = true;
    } else {
        req.missionData.resourcesAvailable = false;
    }

    next();
}

// Mission Outcome Determination Middleware
function missionOutcomeDetermination(req, res, next) {
    const { resourcesAvailable, severity } = req.missionData;

    if (!resourcesAvailable) {
        req.missionData.outcome = 'unsuccessful due to lack of resources';
    } else if (severity === 'severe') {
        req.missionData.outcome = 'delayed due to high severity';
    } else {
        req.missionData.outcome = 'success';
    }

    next();
}

// Rescue Mission Route
app.post('/rescue-mission', 
    animalTypeCheck, 
    severityLevelCheck, 
    resourceAvailabilityCheck, 
    missionOutcomeDetermination, 
    (req, res) => {
        res.status(200).json({
            message: 'Rescue mission processed',
            outcome: req.missionData.outcome
        });
    }
);

// Apply the error handler middleware
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
