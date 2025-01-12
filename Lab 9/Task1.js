const express = require('express');
const app = express();
const port =2000;

app.use(express.json());

// Mock database for Beyblades
let beyblades = [
  { name: 'Dragoon', attackPower: 80, defensePower: 60, specialMove: 'Starblast Attack' },
  { name: 'Dranzer', attackPower: 75, defensePower: 65, specialMove: 'Blazing Gig Tempest' },
  { name: 'Driger', attackPower: 70, defensePower: 70, specialMove: 'Tiger Claw' },
];

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// GET /beyblades
app.get('/beyblades', (req, res) => {
  if (beyblades.length === 0) {
    return res.status(404).json({ message: 'No Beyblades found in the database' });
  }
  res.json(beyblades);
});

// GET /beyblades/:name
app.get('/beyblades/:name', (req, res) => {
  const beyblade = beyblades.find(b => b.name.toLowerCase() === req.params.name.toLowerCase());
  if (beyblade) {
    res.json(beyblade);
  } else {
    res.status(404).json({ message: `Beyblade ${req.params.name} not found` });
  }
});

// POST /battle
app.post('/battle', (req, res) => {
  const { beyblade1, beyblade2 } = req.body;

  if (!beyblade1 || !beyblade2) {
    return res.status(400).json({ message: 'Both Beyblade names are required' });
  }

  const b1 = beyblades.find(b => b.name.toLowerCase() === beyblade1.toLowerCase());
  const b2 = beyblades.find(b => b.name.toLowerCase() === beyblade2.toLowerCase());

  if (!b1) {
    return res.status(404).json({ message: `Beyblade ${beyblade1} not found` });
  }
  if (!b2) {
    return res.status(404).json({ message: `Beyblade ${beyblade2} not found` });
  }

  const b1Score = b1.attackPower + b1.defensePower;
  const b2Score = b2.attackPower + b2.defensePower;

  let winner, loser;
  if (b1Score > b2Score) {
    winner = b1;
    loser = b2;
  } else if (b2Score > b1Score) {
    winner = b2;
    loser = b1;
  } else {
    return res.json({ result: 'Draw', battleDetails: `${b1.name} vs ${b2.name}: It's a tie!` });
  }

  res.json({
    winner: winner.name,
    loser: loser.name,
    battleDetails: `${winner.name} defeated ${loser.name} using ${winner.specialMove}!`
  });
});

// PUT /beyblades/:name/upgrade
app.put('/beyblades/:name/upgrade', (req, res) => {
  const { stat, amount } = req.body;
  const beyblade = beyblades.find(b => b.name.toLowerCase() === req.params.name.toLowerCase());

  if (!beyblade) {
    return res.status(404).json({ message: `Beyblade ${req.params.name} not found` });
  }

  if (!stat || !amount) {
    return res.status(400).json({ message: 'Both stat and amount are required for upgrade' });
  }

  if (stat === 'attack') {
    beyblade.attackPower += amount;
  } else if (stat === 'defense') {
    beyblade.defensePower += amount;
  } else {
    return res.status(400).json({ message: 'Invalid stat to upgrade. Use "attack" or "defense".' });
  }

  res.json(beyblade);
});

// Handle 404 for undefined routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(port, () => {
  console.log(`Beyblade Battle Arena API listening at http://localhost:${port}`);
});