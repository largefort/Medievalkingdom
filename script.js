// Global Game State
let gameState = {
  gold: 100,
  silver: 0,
  bronze: 0,
  food: 500,
  iron: 100,
  wood: 100,
  stone: 100,
  population: 10,
  happiness: 50,
  buildings: {
    farm: 0,
    mine: 0,
    lumbermill: 0,
    quarry: 0,
    barracks: 0
  },
  army: {
    spearmen: 0,
    archers: 0,
    knights: 0
  },
  sound: true,
  notifications: true
};

// Save Game State to localStorage
function saveGameState() {
  localStorage.setItem('medievalKingdomGameState', JSON.stringify(gameState));
  ons.notification.toast('Game saved!', { timeout: 2000 });
}

// Load Game State from localStorage
function loadGameState() {
  const savedState = localStorage.getItem('medievalKingdomGameState');
  if (savedState) {
    gameState = JSON.parse(savedState);
    updateUI();
    ons.notification.toast('Game loaded!', { timeout: 2000 });
  } else {
    ons.notification.alert('No saved game found.');
  }
}

// Update UI elements based on game state
function updateUI() {
  // Kingdom Page
  document.getElementById('gold').textContent = `${gameState.gold} Gold, ${gameState.silver} Silver, ${gameState.bronze} Bronze`;
  document.getElementById('food').textContent = gameState.food;
  document.getElementById('iron').textContent = gameState.iron;
  document.getElementById('wood').textContent = gameState.wood;
  document.getElementById('stone').textContent = gameState.stone;
  document.getElementById('population').textContent = gameState.population;
  document.getElementById('happiness').textContent = gameState.happiness + '%';

  // Army Page
  document.getElementById('spearmen').textContent = gameState.army.spearmen;
  document.getElementById('archers').textContent = gameState.army.archers;
  document.getElementById('knights').textContent = gameState.army.knights;

  // Resources Page
  document.getElementById('resource-gold').textContent = gameState.gold;
  document.getElementById('resource-silver').textContent = gameState.silver;
  document.getElementById('resource-bronze').textContent = gameState.bronze;
  document.getElementById('resource-food').textContent = gameState.food;
  document.getElementById('resource-iron').textContent = gameState.iron;
  document.getElementById('resource-wood').textContent = gameState.wood;
  document.getElementById('resource-stone').textContent = gameState.stone;

  // Settings Page
  document.getElementById('sound-toggle').checked = gameState.sound;
  document.getElementById('notifications-toggle').checked = gameState.notifications;
}

// Event Listeners for Kingdom Page
document.addEventListener('init', function(event) {
  const page = event.target;

  if (page.id === 'kingdom-page') {
    // Build Farm
    page.querySelector('.build-farm').addEventListener('click', () => {
      if (gameState.gold >= 50) {
        gameState.gold -= 50;
        gameState.buildings.farm += 1;
        gameState.food += 100;
        saveGameState();
        updateUI();
      } else {
        ons.notification.alert('Not enough gold!');
      }
    });

    // Build Mine
    page.querySelector('.build-mine').addEventListener('click', () => {
      if (gameState.gold >= 75) {
        gameState.gold -= 75;
        gameState.buildings.mine += 1;
        gameState.iron += 50;
        saveGameState();
        updateUI();
      } else {
        ons.notification.alert('Not enough gold!');
      }
    });

    // Build Lumber Mill
    page.querySelector('.build-lumbermill').addEventListener('click', () => {
      if (gameState.gold >= 60) {
        gameState.gold -= 60;
        gameState.buildings.lumbermill += 1;
        gameState.wood += 50;
        saveGameState();
        updateUI();
      } else {
        ons.notification.alert('Not enough gold!');
      }
    });

    // Build Quarry
    page.querySelector('.build-quarry').addEventListener('click', () => {
      if (gameState.gold >= 70) {
        gameState.gold -= 70;
        gameState.buildings.quarry += 1;
        gameState.stone += 50;
        saveGameState();
        updateUI();
      } else {
        ons.notification.alert('Not enough gold!');
      }
    });

    // Build Barracks
    page.querySelector('.build-barracks').addEventListener('click', () => {
      if (gameState.gold >= 100) {
        gameState.gold -= 100;
        gameState.buildings.barracks += 1;
        saveGameState();
        updateUI();
      } else {
        ons.notification.alert('Not enough gold!');
      }
    });

    // Collect Taxes
    page.querySelector('#collect-tax').addEventListener('click', () => {
      gameState.gold += gameState.population * 2;
      saveGameState();
      updateUI();
    });

    // Defend Kingdom
    page.querySelector('#defend-kingdom').addEventListener('click', () => {
      kingdomUnderAttack();
    });

    // Hire Workers
    page.querySelector('.hire-workers').addEventListener('click', () => {
      if (gameState.gold >= 10) {
        gameState.gold -= 10;
        gameState.population += 5;
        saveGameState();
        updateUI();
      } else {
        ons.notification.alert('Not enough gold!');
      }
    });
  }
});

// Event Listeners for Army Page
document.addEventListener('init', function(event) {
  const page = event.target;

  if (page.id === 'army-page') {
    // Train Spearmen
    page.querySelector('.train-spearmen').addEventListener('click', () => {
      if (gameState.gold >= 10 && gameState.iron >= 5 && gameState.food >= 2) {
        gameState.gold -= 10;
        gameState.iron -= 5;
        gameState.food -= 2;
        gameState.army.spearmen += 1;
        saveGameState();
        updateUI();
      } else {
        ons.notification.alert('Not enough resources!');
      }
    });

    // Train Archers
    page.querySelector('.train-archers').addEventListener('click', () => {
      if (gameState.gold >= 15 && gameState.wood >= 5 && gameState.food >= 3) {
        gameState.gold -= 15;
        gameState.wood -= 5;
        gameState.food -= 3;
        gameState.army.archers += 1;
        saveGameState();
        updateUI();
      } else {
        ons.notification.alert('Not enough resources!');
      }
    });

    // Train Knights
    page.querySelector('.train-knights').addEventListener('click', () => {
      if (gameState.gold >= 30 && gameState.iron >= 10 && gameState.food >= 5) {
        gameState.gold -= 30;
        gameState.iron -= 10;
        gameState.food -= 5;
        gameState.army.knights += 1;
        saveGameState();
        updateUI();
      } else {
        ons.notification.alert('Not enough resources!');
      }
    });

    // Deploy Army
    page.querySelector('#deploy-army').addEventListener('click', () => {
      if (gameState.army.spearmen > 0 || gameState.army.archers > 0 || gameState.army.knights > 0) {
        ons.notification.alert('Your army is ready to defend the kingdom!');
      } else {
        ons.notification.alert('No units available for defense!');
      }
    });
  }
});

// Event Listeners for Resources Page
document.addEventListener('init', function(event) {
  const page = event.target;

  if (page.id === 'resources-page') {
    // Increase Farm Production
    page.querySelector('.increase-farm').addEventListener('click', () => {
      gameState.food += 50;
      saveGameState();
      updateUI();
    });

    // Increase Mine Production
    page.querySelector('.increase-mine').addEventListener('click', () => {
      gameState.iron += 25;
      saveGameState();
      updateUI();
    });

    // Increase Lumber Mill Production
    page.querySelector('.increase-lumbermill').addEventListener('click', () => {
      gameState.wood += 25;
      saveGameState();
      updateUI();
    });

    // Increase Quarry Production
    page.querySelector('.increase-quarry').addEventListener('click', () => {
      gameState.stone += 25;
      saveGameState();
      updateUI();
    });

    // Currency Conversion
    page.querySelector('#convert-currency').addEventListener('click', () => {
      if (gameState.silver >= 100) {
        gameState.gold += 1;
        gameState.silver -= 100;
      } else if (gameState.bronze >= 100) {
        gameState.silver += 1;
        gameState.bronze -= 100;
      } else {
        ons.notification.alert('Not enough currency for conversion!');
      }
      saveGameState();
      updateUI();
    });
  }
});

// Event Listeners for Settings Page
document.addEventListener('init', function(event) {
  const page = event.target;

  if (page.id === 'settings-page') {
    // Toggle Sound
    page.querySelector('#sound-toggle').addEventListener('change', (event) => {
      gameState.sound = event.target.checked;
      saveGameState();
    });

    // Toggle Notifications
    page.querySelector('#notifications-toggle').addEventListener('change', (event) => {
      gameState.notifications = event.target.checked;
      saveGameState();
    });

    // Save Game
    page.querySelector('#save-game').addEventListener('click', saveGameState);

    // Load Game
    page.querySelector('#load-game').addEventListener('click', loadGameState);
  }
});

// Function to handle the "Kingdom Under Attack" event
function kingdomUnderAttack() {
  // Logic for kingdom defense, which could be expanded upon
  const attackPower = Math.floor(Math.random() * 50) + 50; // Random attack strength
  const defensePower = gameState.army.spearmen * 10 + gameState.army.archers * 20 + gameState.army.knights * 50;

  if (defensePower >= attackPower) {
    ons.notification.alert('Your kingdom defended the attack successfully!');
  } else {
    ons.notification.alert('Your kingdom was overrun!');
    // Reduce resources or population as a penalty
    gameState.population = Math.max(0, gameState.population - Math.floor(Math.random() * 5 + 5));
    gameState.food = Math.max(0, gameState.food - Math.floor(Math.random() * 50 + 50));
    gameState.gold = Math.max(0, gameState.gold - Math.floor(Math.random() * 20 + 20));
  }

  saveGameState();
  updateUI();
}

// Initialize UI on first load
document.addEventListener('DOMContentLoaded', updateUI);
