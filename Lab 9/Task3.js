const express = require('express');
const app = express();
const port = 2002;

app.use(express.json());

// Data structures
let stationInfo = {
    name: 'Starbase Alpha',
    description: 'A cutting-edge facility for research, trade, and interstellar diplomacy.',
    capacity: 1000,
    currentPopulation: 850
};

let inhabitants = [
    { name: 'Zorax', species: 'Zorgon', purpose: 'Research', assignedQuarters: 'A12', accessLevel: 'scientist' },
    { name: 'Tira', species: 'Human', purpose: 'Diplomat', assignedQuarters: 'B5', accessLevel: 'diplomat' }
];

let resources = [
    { name: 'Oxygen', currentQuantity: 5000, maxCapacity: 10000, criticalityLevel: 'medium' },
    { name: 'Water', currentQuantity: 2000, maxCapacity: 5000, criticalityLevel: 'high' }
];

let researchProjects = [
    { projectName: 'Dark Matter Experiment', status: 'ongoing', leadResearcher: 'Dr. Zorax', allocatedResources: '500 energy units', priorityLevel: 'high' }
];

let securityProtocols = {
    accessLevels: ['citizen', 'scientist', 'diplomat', 'security'],
    restrictedAreas: ['Research Lab', 'Armory'],
    emergencyProcedures: ['Lockdown', 'Evacuation']
};

let maintenanceSchedule = [
    { task: 'Airlock inspection', scheduledFor: '2024-11-01', assignedCrew: 'Team Alpha', priority: 'high' }
];

// Routes

// GET /station-info - Return general information about the space station
app.get('/station-info', (req, res) => {
    res.json(stationInfo);
});

// GET /inhabitants - Return a list of all current inhabitants
app.get('/inhabitants', (req, res) => {
    res.json(inhabitants);
});

// PUT /station-info - Update general information about the space station
app.put('/station-info', (req, res) => {
    const { name, description, capacity } = req.body;

    if (capacity && capacity < stationInfo.currentPopulation) {
        return res.status(400).send({ message: 'New capacity cannot be lower than current population.' });
    }

    if (name) stationInfo.name = name;
    if (description) stationInfo.description = description;
    if (capacity) stationInfo.capacity = capacity;

    res.json(stationInfo);
});

// PUT /inhabitants/:name - Update information for a specific inhabitant
app.put('/inhabitants/:name', (req, res) => {
    const inhabitantName = req.params.name;
    const { purpose, assignedQuarters, accessLevel } = req.body;

    const inhabitant = inhabitants.find(i => i.name.toLowerCase() === inhabitantName.toLowerCase());
    if (!inhabitant) {
        return res.status(404).send({ message: 'Inhabitant not found' });
    }

    if (purpose) inhabitant.purpose = purpose;
    if (assignedQuarters) inhabitant.assignedQuarters = assignedQuarters;
    if (accessLevel) {
        // Assume access verification process here
        const requesterAccess = req.headers['x-access-level'];  // Simulated requester access level via headers
        if (requesterAccess !== 'security' && requesterAccess !== 'admin') {
            return res.status(403).send({ message: 'Insufficient permissions to change access level' });
        }
        inhabitant.accessLevel = accessLevel;
    }

    res.json(inhabitant);
});

// PUT /resources/:resourceName - Update the quantity and properties of a specific resource
app.put('/resources/:resourceName', (req, res) => {
    const resourceName = req.params.resourceName;
    const { currentQuantity, maxCapacity, criticalityLevel } = req.body;

    const resource = resources.find(r => r.name.toLowerCase() === resourceName.toLowerCase());
    if (!resource) {
        return res.status(404).send({ message: 'Resource not found' });
    }

    if (currentQuantity !== undefined) resource.currentQuantity = currentQuantity;
    if (maxCapacity !== undefined) resource.maxCapacity = maxCapacity;
    if (criticalityLevel) resource.criticalityLevel = criticalityLevel;

    res.json(resource);
});

// PUT /research-projects/:projectName - Update the status, details, or resource allocation of a specific research project
app.put('/research-projects/:projectName', (req, res) => {
    const projectName = req.params.projectName;
    const { status, leadResearcher, allocatedResources, priorityLevel } = req.body;

    const project = researchProjects.find(p => p.projectName.toLowerCase() === projectName.toLowerCase());
    if (!project) {
        return res.status(404).send({ message: 'Research project not found' });
    }

    if (status) project.status = status;
    if (leadResearcher) project.leadResearcher = leadResearcher;
    if (allocatedResources) project.allocatedResources = allocatedResources;
    if (priorityLevel) project.priorityLevel = priorityLevel;

    res.json(project);
});

// PUT /security-protocols - Update the station's security protocols
app.put('/security-protocols', (req, res) => {
    const { accessLevels, restrictedAreas, emergencyProcedures } = req.body;

    if (accessLevels) securityProtocols.accessLevels = accessLevels;
    if (restrictedAreas) securityProtocols.restrictedAreas = restrictedAreas;
    if (emergencyProcedures) securityProtocols.emergencyProcedures = emergencyProcedures;

    res.json(securityProtocols);
});

// PUT /maintenance-schedule - Update the station's maintenance schedule
app.put('/maintenance-schedule', (req, res) => {
    const { task, scheduledFor, assignedCrew, priority } = req.body;

    let maintenanceTask = maintenanceSchedule.find(m => m.task === task);
    if (!maintenanceTask) {
        return res.status(404).send({ message: 'Maintenance task not found' });
    }

    if (scheduledFor) maintenanceTask.scheduledFor = scheduledFor;
    if (assignedCrew) maintenanceTask.assignedCrew = assignedCrew;
    if (priority) maintenanceTask.priority = priority;

    res.json(maintenanceTask);
});

// Error handling for unsupported routes
app.use((req, res) => {
    res.status(404).send({ message: 'Route not found' });
});

// Start the server
app.listen(port, () => {
    console.log(`Galactic Space Station API is running at http://localhost:${port}`);
});
