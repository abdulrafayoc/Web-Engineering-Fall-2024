const express = require('express');
const app = express();
const port = 2001;

app.use(express.json());

// Mock database for Rangers and Teams
let rangers = [
  { name: 'Jason', color: 'Red', specialAbility: 'Leadership', powerLevel: 85 },
  { name: 'Trini', color: 'Yellow', specialAbility: 'Agility', powerLevel: 80 },
  { name: 'Billy', color: 'Blue', specialAbility: 'Intelligence', powerLevel: 90 },
  { name: 'Zack', color: 'Black', specialAbility: 'Strength', powerLevel: 82 },
  { name: 'Kimberly', color: 'Pink', specialAbility: 'Acrobatics', powerLevel: 78 }
];

let teams = [];

// Helper function to calculate team power level
const calculateTeamPowerLevel = (teamMembers) => {
  return teamMembers.reduce((total, ranger) => total + ranger.powerLevel, 0);
};

// GET /rangers
app.get('/rangers', (req, res) => {
  if (rangers.length === 0) {
    return res.status(404).json({ message: 'No Rangers found in the database' });
  }
  res.json(rangers.map(({ name, color, specialAbility }) => ({ name, color, specialAbility })));
});

// POST /teams
app.post('/teams', (req, res) => {
  const { teamName, rangerNames } = req.body;

  if (!teamName || !rangerNames || !Array.isArray(rangerNames)) {
    return res.status(400).json({ message: 'Invalid request. Team name and list of Rangers are required.' });
  }

  if (teams.find(team => team.name === teamName)) {
    return res.status(400).json({ message: 'Team name already exists.' });
  }

  const teamMembers = [];
  for (const rangerName of rangerNames) {
    const ranger = rangers.find(r => r.name === rangerName && !teams.some(t => t.members.includes(r)));
    if (!ranger) {
      return res.status(400).json({ message: `Ranger ${rangerName} not found or already in a team.` });
    }
    teamMembers.push(ranger);
  }

  const newTeam = {
    name: teamName,
    members: teamMembers,
    powerLevel: calculateTeamPowerLevel(teamMembers)
  };

  teams.push(newTeam);
  res.status(201).json(newTeam);
});

// GET /teams/:teamName
app.get('/teams/:teamName', (req, res) => {
  const team = teams.find(t => t.name === req.params.teamName);
  if (!team) {
    return res.status(404).json({ message: `Team ${req.params.teamName} not found.` });
  }
  res.json(team);
});

// DELETE /teams/:teamName
app.delete('/teams/:teamName', (req, res) => {
  const teamIndex = teams.findIndex(t => t.name === req.params.teamName);
  if (teamIndex === -1) {
    return res.status(404).json({ message: `Team ${req.params.teamName} not found.` });
  }
  teams.splice(teamIndex, 1);
  res.json({ message: `Team ${req.params.teamName} has been disbanded.` });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Handle 404 for undefined routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(port, () => {
  console.log(`Power Rangers Team Assembly API listening at http://localhost:${port}`);
});