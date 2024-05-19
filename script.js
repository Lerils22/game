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
      'Examine the cell': 'examine_cell',
      'Call out for help': 'call_for_help'
    }
  },
  examine_cell: {
    text: 'You search the cell and find a loose brick in the wall. Behind it, you discover a hidden passage. Do you explore it?',
    options: {
      'Explore the hidden passage': 'hidden_passage',
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
    text: 'You hide in the shadows and wait for the footsteps to pass. After a tense moment, the coast is clear, and you emerge cautiously from your hiding spot. Unfortunately, you realize you\'ve returned to your cell.',
    options: {
      'Search the cell again': 'examine_cell',
      'Call out for help again': 'call_for_help'
    }
  },
  confront_guard: {
    text: 'You confront the guard who approaches your cell, demanding answers. But the guard is unyielding, and you are overpowered and restrained. Your escape attempt ends in failure.',
    options: {
      'Restart the game': 'restart'
    }
  },
  hidden_passage: {
    text: 'You venture into the hidden passage and find yourself in a network of tunnels beneath the prison. After wandering for what feels like hours, you reach a fork in the path. Which way do you go?',
    options: {
      'Left': 'left_tunnel',
      'Right': 'right_tunnel'
    }
  },
  left_tunnel: {
    text: 'You take the left tunnel, which leads to a dead end. You realize you have no choice but to go back.',
    options: {
      'Return to the fork': 'hidden_passage'
    }
  },
  right_tunnel: {
    text: 'You take the right tunnel and find a ladder leading up to a trapdoor. Do you climb the ladder?',
    options: {
      'Climb the ladder': 'climb_ladder',
      'Stay in the tunnel': 'stay_tunnel'
    }
  },
  stay_tunnel: {
    text: 'You decide to stay in the tunnel, but the air is getting thinner and you start to feel dizzy. You have to make a decision quickly.',
    options: {
      'Climb the ladder': 'climb_ladder',
      'Go back': 'hidden_passage'
    }
  },
  climb_ladder: {
    text: 'You climb the ladder and push open the trapdoor, finding yourself in an abandoned room filled with old furniture. There are two doors: one to the north and one to the south. Which do you choose?',
    options: {
      'North door': 'north_door',
      'South door': 'south_door'
    }
  },
  north_door: {
    text: 'You open the north door and enter a dimly lit hallway. As you proceed, you hear guards talking nearby. You quickly backtrack and close the door.',
    options: {
      'Try the south door': 'south_door',
      'Go back down the ladder': 'right_tunnel'
    }
  },
  south_door: {
    text: 'You open the south door and find yourself in what appears to be a guard\'s break room. Luckily, it\'s empty. You spot another door across the room.',
    options: {
      'Cross the room': 'cross_room',
      'Go back to the trapdoor': 'right_tunnel'
    }
  },
  cross_room: {
    text: 'You cross the room and open the door, finding a staircase leading up. You ascend the stairs and reach another hallway. At the end of the hallway, you see an exit sign.',
    options: {
      'Head towards the exit': 'near_exit',
      'Explore the hallway': 'explore_hallway'
    }
  },
  explore_hallway: {
    text: 'You explore the hallway and find another door. You open it to find a closet full of guard uniforms. Do you put one on?',
    options: {
      'Put on a uniform': 'put_uniform',
      'Ignore the uniforms': 'ignore_uniforms'
    }
  },
  put_uniform: {
    text: 'You put on a guard uniform, hoping to blend in. As you proceed down the hallway, a guard stops you and questions your presence. You realize your mistake too late and are captured.',
    options: {
      'Restart the game': 'restart'
    }
  },
  ignore_uniforms: {
    text: 'You ignore the uniforms and continue exploring. You find another staircase leading up. Do you ascend?',
    options: {
      'Ascend the staircase': 'ascend_staircase',
      'Return to the previous staircase': 'cross_room'
    }
  },
  ascend_staircase: {
    text: 'You ascend the staircase and find yourself in a dimly lit room with a single door. You hear guards approaching. What will you do?',
    options: {
      'Hide in the shadows': 'hide_shadows',
      'Open the door and run': 'open_door_run'
    }
  },
  hide_shadows: {
    text: 'You hide in the shadows and wait for the guards to pass. They eventually leave, and you cautiously open the door to find another hallway. At the end of the hallway, you see another exit sign.',
    options: {
      'Head towards the exit': 'near_exit',
      'Explore the hallway': 'explore_hallway'
    }
  },
  open_door_run: {
    text: 'You open the door and run, but the guards catch up to you quickly. You are captured and your escape attempt ends in failure.',
    options: {
      'Restart the game': 'restart'
    }
  },
  near_exit: {
    text: 'As you head towards the exit, you hear an alarm sound. The guards have been alerted to your presence. You must act quickly.',
    options: {
      'Run for the exit': 'run_exit',
      'Hide and wait': 'hide_exit'
    }
  },
  run_exit: {
    text: 'You sprint towards the exit, dodging guards and evading capture. You burst through the door and find yourself outside, in the fresh air. Freedom is yours!',
    options: {
      'Celebrate your escape': 'celebrate'
    }
  },
  hide_exit: {
    text: 'You hide and wait for the guards to pass, but they find you. You are captured and taken back to your cell. Your escape attempt ends in failure.',
    options: {
      'Restart the game': 'restart'
    }
  },
  celebrate: {
    text: 'Congratulations! You have successfully escaped the prison. Well done!',
    options: {}
  },
  stay_cell: {
    text: 'You decide to stay in the cell and wait for something to happen. Time passes slowly, and despair begins to set in. Your journey ends here.',
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
  }, 1000);
}
}

// Event listener for the start button
startButton.addEventListener('click', () => {
  displayScene('start');
});
