const players = [];

function addPlayer(name) {
  players.push({ name, score: 0 });
}

function updateScore(name, score) {
  const player = players.find((p) => p.name === name);
  if (player) {
    player.score = score;
  }
}

function getTopPlayers(count = 3) {
  return players
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map((p) => p.name);
}

// Example usage
addPlayer("Me");
addPlayer("AI");
addPlayer("Boss");
updateScore("Me", 550);
updateScore("AI", 200);
updateScore("Boss", 600);
console.log("Top Players:", getTopPlayers()); 