export function handleSideEffects(state) {
  switch (state) {
    case "playing":
      startMusic();
      spawnEnemies();
      resetLevel();
      break;
    case "gameover":
      stopMusic();
      break;
    case "menu":
      cleanUp();
      break;
    // ...
  }
}

function startMusic() {
  // Play background music
}

function stopMusic() {
  // Stop music
}

function spawnEnemies() {
  // Init enemy logic
}

function resetLevel() {
  // Reset or load level data
}

function cleanUp() {
  // Clear timers, intervals, state, etc.
}
