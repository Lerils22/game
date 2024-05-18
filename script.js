const storyElement = document.getElementById('story');
const startButton = document.getElementById('start-btn');

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
      'Restart the game': 'start'
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
      'Restart the game': 'start'
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
    options: {
      'Restart the game': 'start'
    }
  },
  stay_cell: {
    text: 'You decide to stay in the cell and wait for something to happen. Time passes slowly, and despair begins to set in. Your journey ends here.',
    options: {
      'Restart the game': 'start'
    }
  },
  search_exit: {
    text: 'You cautiously make your way through the corridors, avoiding guards as best you can. You reach a junction with two paths. Which way will you go?',
    options: {
      'Left': 'left_path',
      'Right': 'right_path'
    }
  },
  find_footsteps: {
    text: 'You follow the sound of the footsteps, hoping to find an ally. Instead, you come face to face with a guard. Caught off guard, you are swiftly overpowered. Your escape attempt ends in failure.',
    options: {
      'Restart the game': 'start'
    }
  },
  left_path: {
    text: 'You take the left path and find yourself in a room full of guards. They quickly spot you and you are captured. Your escape attempt ends in failure.',
    options: {
      'Restart the game': 'start'
    }
  },
  right_path: {
    text: 'You take the right path and find an unlocked door leading outside. You are now in the prison yard, but the way to freedom is still fraught with danger. What will you do?',
    options: {
      'Head to the main gate': 'main_gate',
      'Climb over the fence': 'climb_fence'
    }
  },
  main_gate: {
    text: 'You run towards the main gate, but it is heavily guarded. You are quickly spotted and captured. Your escape attempt ends in failure.',
    options: {
      'Restart the game': 'start'
    }
  },
  climb_fence: {
    text: 'You climb over the fence and drop to the other side. You are now outside the prison, but freedom is still not guaranteed. What will you do?',
    options: {
      'Run towards the forest': 'forest_escape',
      'Head towards the nearby town': 'town_escape'
    }
  },
  forest_escape: {
    text: 'You run into the forest, the sounds of the prison fading behind you. The forest is dark and full of dangers, but you press on. Eventually, you find a hidden path that leads to freedom. You are finally free.',
    options: {}
  },
  town_escape: {
    text: 'You head towards the nearby town, hoping to find help. As you approach, you see guards patrolling the area. You try to sneak past them, but are spotted and captured. Your escape attempt ends in failure.',
    options: {
      'Restart the game': 'start'
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
      displayScene(optionScene);
    });
    storyElement.appendChild(button);
    
    hasOptions = true; // Set flag to true if at least one option is available
  }
  
  // Hide the start button if options are available
  if (hasOptions) {
    startButton.style.display = 'none';
  } else {
    // No options available, close window after 5 seconds
    setTimeout(() => {
      window.close();
    }, 5000);
  }
}

// Event listener for the start button
startButton.addEventListener('click', () => {
  displayScene('start');
});
