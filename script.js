const storyElement = document.getElementById('story');
const startButton = document.getElementById('start-btn');
const counterElement = document.getElementById('counter');
const popupElement = document.getElementById('popup');
const congratsSound = document.getElementById('congrats-sound');

let restartCount = 0;

// Story object
const story = {
  start: {
    text: 'You wake up in a dimly lit prison cell, disoriented and confused. The air is thick with the stench of sweat and despair. What will you do?',
    options: {
      'Examine the cell for clues': 'examine_cell',
      'Call out for help': 'call_for_help'
    }
  },
  examine_cell: {
    text: 'You search the cell and find a loose brick in the wall. Behind it, you discover a hidden passage. Do you explore it?',
    options: {
      'Explore the hidden passage': 'escape_plan',
      'Stay in the cell': 'stay_cell'
    }
  },
  call_for_help: {
    text: 'You call out for help, but your cries echo unanswered in the empty corridors. Suddenly, you hear footsteps approaching. What will you do?',
    options: {
      'Hide and wait': 'hide_wait',
      'Confront whoever is coming': 'confront_guard'
    }
  },
  hide_wait: {
    text: 'You hide in the shadows and wait for the footsteps to pass. After a tense moment, the coast is clear, and you emerge cautiously from your hiding spot. What will you do next?',
    options: {
      'Search for an exit': 'search_exit',
      'Try to find the source of the footsteps': 'find_footsteps'
    }
  },
  confront_guard: {
    text: 'You confront the guard who approaches your cell, demanding answers. But the guard is unyielding, and you are overpowered and restrained. Your escape attempt ends in failure.',
    options: {
      'Restart the game': 'restart'
    }
  },
  escape_plan: {
    text: 'You venture into the hidden passage and find yourself in a network of tunnels beneath the prison. As you explore, you encounter other prisoners who offer to help with your escape. What will you do?',
    options: {
      'Accept their assistance': 'accept_assistance',
      'Proceed alone': 'proceed_alone'
    }
  },
  accept_assistance: {
    text: 'You join forces with the other prisoners and work together to overcome obstacles, evade guards, and outsmart the security systems. But tensions rise as the escape plan becomes more risky. What will you do?',
    options: {
      'Maintain trust and cooperation': 'trust_cooperation',
      'Betray your allies for personal gain': 'betray_allies'
    }
  },
  proceed_alone: {
    text: 'You choose to proceed alone, trusting in your own skills and instincts. Though the path is perilous, you manage to evade detection and reach the outer walls of the prison. Freedom is within reach. What will you do?',
    options: {
      'Climb the walls to freedom': 'climb_walls',
      'Search for another way out': 'search_another_way'
    }
  },
  trust_cooperation: {
    text: 'You maintain trust and cooperation with your fellow prisoners, working together to overcome every obstacle in your path. As you reach the exit, you share a moment of triumph and solidarity. Your journey ends in freedom.',
    options: {}
  },
  betray_allies: {
    text: 'You betray your allies, seizing an opportunity for personal gain. But your actions lead to chaos and betrayal among the group. In the end, you find yourself alone and surrounded by enemies. Your journey ends in betrayal and isolation.',
    options: {
      'Restart the game': 'restart'
    }
  },
  climb_walls: {
    text: 'You muster all your strength and agility to climb the walls of the prison. With every muscle straining, you reach the top and gaze out into the night. Freedom beckons, but the journey is far from over.',
    options: {
      'Make your way through the forest': 'forest_escape',
      'Head towards the nearby town': 'town_escape'
    }
  },
  search_another_way: {
    text: 'You search for another way out, exploring the perimeter of the prison for any weaknesses or vulnerabilities. After a thorough search, you discover a hidden passage that leads to freedom. Your journey ends with a daring escape.',
    options: {}
  },
  stay_cell: {
    text: 'You decide to stay in the cell and wait for something to happen. Time passes slowly, and despair begins to set in. Your journey ends here.',
    options: {
      'Restart the game': 'restart'
    }
  },
  search_exit: {
    text: 'You search for an exit and find a door slightly ajar. You carefully make your way through, only to be caught by a guard. Your escape attempt ends in failure.',
    options: {}
  },
  find_footsteps: {
    text: 'You follow the sound of the footsteps and discover a group of guards. They capture you and your escape attempt ends in failure.',
    options: {
      'Restart the game': 'restart'
    }
  },
  forest_escape: {
    text: 'You make your way through the forest, evading patrols and navigating through the dense undergrowth. After hours of trekking, you finally reach safety. Congratulations!',
    options: {}
  },
  town_escape: {
    text: 'You head towards the nearby town, blending in with the townsfolk and finding refuge in a safe house but You were caught.YOU FAILED!',
    options: {
      'Restart the game': 'restart'
    }
  },
  restart: {
    text: 'You have restarted the game. Good luck!',
    options: {
      'Begin the adventure': 'start'
    }
  }
};

// Function to display a scene
function displayScene(scene) {
  const sceneData = story[scene];
  storyElement.innerHTML = `<p>${sceneData.text}</p>`;
  
  let hasOptions = false; // Flag to track if options are available
  
  // Loop through each option and create a button for it
  for (const [optionText, optionScene] of Object.entries(sceneData.options)) {
    const button = document.createElement('button');
    button.textContent = optionText;
    button.addEventListener('click', () => {
      if (optionScene === 'restart') {
        restartCount++;
        counterElement.textContent = `Restarts: ${restartCount}`;
        displayScene('start');
      } else {
        displayScene(optionScene);
      }
    });
    storyElement.appendChild(button);
    
    hasOptions = true; // Set flag to true if at least one option is available
  }
  
  // Hide the start button if options are available
if (hasOptions) {
  startButton.style.display = 'none';
} else {
  // If no options are available, wait 5 seconds, then display popup and sound for 2 seconds before closing the window
  setTimeout(() => {
    popupElement.style.display = 'block';
    congratsSound.play();
    setTimeout(() => {
      window.close();
    }, 3000);
  }, 5000);
}
}

// Event listener for the start button
startButton.addEventListener('click', () => {
  displayScene('start');
});
