// ==UserScript==
// @name Custom Google Homepage with Timer and Guess the Number
// @namespace https://greasyfork.org/users/1129625
// @version 3.3
// @description Customize the Google homepage by adding buttons, a color changer feature, social media buttons, a timer, and a Guess the Number game.
// @include     https://www.google.com/
// @exclude     https://www.google.com/search*
// @match *https://www.google.com/?gws_rd=ssl*
// @match        *://www.google.co.uk/*
// @match        *://www.google.ca/*
// @match        *://www.google.fr/*
// @match        *://www.google.de/*
// @match        *://www.google.it/*
// @match        *://www.google.es/*
// @match        *://www.google.se/*
// @match        *://www.google.nl/*
// @match        *://www.google.no/*
// @match        *://www.google.dk/*
// @match        *://www.google.fi/*
// @match        *://www.google.be/*
// @match        *://www.google.ch/*
// @match        *://www.google.at/*
// @match        *://www.google.ru/*
// @match        *://www.google.com.br/*
// @match        *://www.google.com.mx/*
// @match        *://www.google.com.ar/*
// @match        *://www.google.co.jp/*
// @match        *://www.google.co.kr/*
// @match        *://www.google.com.au/*
// @match        *://www.google.com.hk/*
// @match        *://www.google.co.in/*
// @match        *://www.google.co.id/*
// @match        *://www.google.com.sg/*
// @match        *://www.google.com.my/*
// @match        *://www.google.co.th/*
// @match        *://www.google.com.ph/*
// @match        *://www.google.com.vn/*
// @match        *://www.google.com.sa/*
// @match        *://www.google.ae/*
// @match        *://www.google.co.il/*
// @match        *://www.google.com.tr/*
// @match        *://www.google.co.za/*
// @grant none
// @license MIT
// ==/UserScript==

(function () {
  'use strict';

  // Function to create a button element
  function createButton(text, url) {
    var button = document.createElement('a');
    button.textContent = text;
    button.href = url;
    button.style.marginRight = '10px';
    button.style.cursor = 'pointer';
    return button;
  }

  // Function to create a button element with a color wheel
  function createButtonWithColorWheel(text, url) {
    var buttonContainer = document.createElement('div');
    buttonContainer.style.display = 'flex';
    buttonContainer.style.alignItems = 'center';

    var button = document.createElement('a');
    button.textContent = text;
    button.href = url;
    button.style.marginRight = '10px';
    button.style.cursor = 'pointer';

    var colorWheelContainer = document.createElement('div');
    colorWheelContainer.style.marginRight = '10px';

    var colorWheel = document.createElement('input');
    colorWheel.type = 'color';
    colorWheel.style.cursor = 'pointer';
    colorWheel.addEventListener('input', function (event) {
      document.body.style.backgroundColor = event.target.value;
    });

    colorWheelContainer.appendChild(colorWheel);

    buttonContainer.appendChild(button);
    buttonContainer.appendChild(colorWheelContainer);

    return buttonContainer;
  }

  // Function to create the Color Changer button
  function createColorChangerButton() {
    var button = document.createElement('button');
    button.textContent = 'Change Color';
    button.style.marginRight = '10px';
    button.style.cursor = 'pointer';
    button.addEventListener('click', function () {
      var color = prompt(
        "Select a color:\n1. Blue\n2. Red\n3. Green\n4. Yellow\n5. Purple\n6. Orange\n7. Pink\n8. Teal\n9. Gray\n10. Brown\n11. SkyBlue\n12. Cyan\n13. Magenta\n14. Lime\n15. Indigo\n16. Olive\n17. Silver\n18. Maroon\n19. Navy\n20. Custom Color"
      );

      if (color !== null) {
        var colors = [
          'blue', 'red', 'green', 'yellow', 'purple', 'orange', 'pink', 'teal', 'gray', 'brown',
          'skyblue', 'cyan', 'magenta', 'lime', 'indigo', 'olive', 'silver', 'maroon', 'navy'
        ];
        if (color >= 1 && color <= 19) {
          document.body.style.backgroundColor = colors[color - 1];
        } else if (color == 20) {
          showCustomColor();
        } else {
          alert("Invalid selection. Please choose a valid option.");
        }
      }
    });

    return button;
  }

  // Function to show the custom color prompt
  function showCustomColor() {
    var customColor = prompt("Enter a custom color (HEX or RGB):");
    if (customColor !== null) {
      document.body.style.backgroundColor = customColor;
    }
  }

  // Function to create the Random Number button
  function createRandomNumberButton() {
    var button = document.createElement('button');
    button.textContent = 'Random Number';
    button.style.marginRight = '10px';
    button.style.cursor = 'pointer';
    button.addEventListener('click', function () {
      var randomNumber = Math.floor(Math.random() * 101);
      alert('Random Number: ' + randomNumber);
    });

    return button;
  }

  // Function to create the New Fact button
  function createNewFactButton() {
    var button = document.createElement('button');
    button.textContent = 'New Fact';
    button.style.marginRight = '10px';
    button.style.cursor = 'pointer';
    button.addEventListener('click', function () {
      var currentDay = new Date().getDate();
      var fact = getFactOfTheDay(currentDay);
      alert('Fact of the Day: ' + fact);
    });

    return button;
  }

  // Function to get the fact of the day based on the current day
  function getFactOfTheDay(day) {
    if (isNaN(day)) {
      day = 1;
    }

    var facts = [
'The Earth is the third planet from the Sun.',
    'Water covers about 71% of the Earth\'s surface.',
    'The Great Wall of China is visible from space.',
    'The human body is made up of approximately 60% water.',
    'The speed of light is approximately 299,792,458 meters per second.',
    'The largest ocean on Earth is the Pacific Ocean.',
    'The Eiffel Tower is located in Paris, France.',
    'The Statue of Liberty was a gift from France to the United States.',
    'The Mona Lisa was painted by Leonardo da Vinci.',
    'The planet Mars is also known as the "Red Planet".',
    'Mount Everest is the highest mountain in the world.',
    'The Amazon rainforest is the largest tropical rainforest on Earth.',
    'The Nile River is the longest river in the world.',
    'The Taj Mahal is located in Agra, India.',
    'The Great Barrier Reef is the largest coral reef system in the world.',
    'The Colosseum is located in Rome, Italy.',
    'The Sahara Desert is the largest hot desert in the world.',
    'The Sydney Opera House is located in Sydney, Australia.',
    'The polar bear is the largest species of bear.',
    'The moon is approximately 384,400 kilometers away from Earth.',
    'The Statue of Liberty\'s full name is "Liberty Enlightening the World".',
    'The Leaning Tower of Pisa is located in Pisa, Italy.',
    'The pyramids of Giza were built as tombs for the pharaohs.',
    'The Arctic is home to the North Pole.',
    'The Mediterranean Sea is connected to the Atlantic Ocean.',
    'The Galapagos Islands are located in the Pacific Ocean.',
    'The Golden Gate Bridge is located in San Francisco, California.',
    'The kangaroo is a marsupial native to Australia.',
    'The Vatican City is the smallest independent state in the world.',
    'The Red Sea is known for its diverse marine life.',
    'The Hollywood sign is located in Los Angeles, California.',
    ];

    // Get the fact corresponding to the current day
    var factIndex = (day - 1) % facts.length;
    return facts[factIndex];
  }

  // Function to create the Timer element
  function createTimerElement() {
    var timerElement = document.createElement('div');
    timerElement.style.position = 'fixed';
    timerElement.style.top = '50%';
    timerElement.style.left = '10px';
    timerElement.style.transform = 'translateY(-50%)';
    timerElement.style.backgroundColor = '#fff';
    timerElement.style.padding = '10px';
    timerElement.style.borderRadius = '5px';
    timerElement.style.fontSize = '18px';
    timerElement.style.fontWeight = 'bold';
    timerElement.style.zIndex = '9999';
    timerElement.textContent = '00:00:00';

    return timerElement;
  }

  // Function to create the Guess the Number game elements
  function createGuessTheNumberElements() {
    var guessContainer = document.createElement('div');
    guessContainer.style.position = 'fixed';
    guessContainer.style.top = '50%';
    guessContainer.style.left = '1165px';
    guessContainer.style.transform = 'translateY(-50%)';
    guessContainer.style.backgroundColor = '#fff';
    guessContainer.style.padding = '10px';
    guessContainer.style.borderRadius = '5px';
    guessContainer.style.fontSize = '18px';
    guessContainer.style.fontWeight = 'bold';
    guessContainer.style.zIndex = '9999';

    var guessLabel = document.createElement('p');
    guessLabel.textContent = 'Guess the Number (0-100)';
    guessContainer.appendChild(guessLabel);

    var attemptsLabel = document.createElement('p');
    attemptsLabel.textContent = 'Attempts left:';
    guessContainer.appendChild(attemptsLabel);

    var inputField = document.createElement('input');
    inputField.type = 'number';
    guessContainer.appendChild(inputField);

    var submitButton = document.createElement('button');
    submitButton.textContent = 'Submit Guess';
    submitButton.style.cursor = 'pointer';
    submitButton.style.marginTop = '5px';
    submitButton.addEventListener('click', function () {
      checkGuess(parseInt(inputField.value));
    });
    guessContainer.appendChild(submitButton);

    return guessContainer;
  }

  // Function to create the message container for Guess the Number game
  function createMessageContainer() {
    var messageContainer = document.createElement('div');
    messageContainer.style.marginTop = '10px';
    return messageContainer;
  }

  // Create the Start button
  var startButton = document.createElement('button');
  startButton.textContent = 'Start';
  startButton.style.marginRight = '10px';
  startButton.style.cursor = 'pointer';
  startButton.style.position = 'absolute';
  startButton.style.left = '32px';
  startButton.style.top = '312px';
  startButton.addEventListener('click', function () {
    startTimer();
  });

  // Create the Pause button
  var pauseButton = document.createElement('button');
  pauseButton.textContent = 'Pause';
  pauseButton.style.marginRight = '10px';
  pauseButton.style.cursor = 'pointer';
  pauseButton.style.position = 'absolute';
  pauseButton.style.left = '72px';
  pauseButton.style.top = '312px';
  pauseButton.addEventListener('click', function () {
    pauseTimer();
  });

  // Create the Reset button
  var resetButton = document.createElement('button');
  resetButton.textContent = 'Reset';
  resetButton.style.cursor = 'pointer';
  resetButton.style.position = 'absolute';
  resetButton.style.left = '122px';
  resetButton.style.top = '312px';
  resetButton.addEventListener('click', function () {
    resetTimer();
  });

  // Find the Google Apps button
  var appsButton = document.querySelector('a.gb_d');
  if (appsButton) {
    // Create the color changer button
    var changeColorButton = createColorChangerButton();
    changeColorButton.style.marginRight = '10px';
    changeColorButton.style.cursor = 'pointer';

    // Replace the Google Apps button with the color changer button
    appsButton.parentNode.replaceChild(changeColorButton, appsButton);
  }

  // Find the About button
  var aboutButton = document.querySelector('a[href*="about.google"]');
  if (aboutButton) {
    // Replace the About button with the YouTube button
    var youtubeButton = createButton('YouTube', 'https://www.youtube.com');
    aboutButton.parentNode.replaceChild(youtubeButton, aboutButton);
  }

  // Find the Store button
  var storeButton = document.querySelector('a[href*="store.google.com"]');
  if (storeButton) {
    // Replace the Store button with the Twitch button and color wheel
    var twitchButton = createButtonWithColorWheel('Twitch', 'https://www.twitch.tv');
    storeButton.parentNode.replaceChild(twitchButton, storeButton);
  }

  // Find the Images button
  var imagesButton = document.querySelector('a[href*="google.com/imghp"]');
  if (imagesButton) {
    // Replace the Images button with the Discord button
    var discordButton = createButton('Discord', 'https://www.discord.com/app');
    imagesButton.parentNode.replaceChild(discordButton, imagesButton);
  }

  // Create the Reddit button
  var redditButton = createButton('Reddit', 'https://www.reddit.com');
  redditButton.style.marginRight = '10px';
  redditButton.style.cursor = 'pointer';

  // Create the Twitter button
  var twitterButton = createButton('Twitter', 'https://www.twitter.com');
  twitterButton.style.marginRight = '10px';
  twitterButton.style.cursor = 'pointer';

  // Create the Instagram button
  var instagramButton = createButton('Instagram', 'https://www.instagram.com');
  instagramButton.style.marginRight = '10px';
  instagramButton.style.cursor = 'pointer';

  // Create the Facebook button
  var facebookButton = createButton('Facebook', 'https://www.facebook.com');
  facebookButton.style.marginRight = '10px';
  facebookButton.style.cursor = 'pointer';

  // Create the Random Number button
  var randomNumberButton = createRandomNumberButton();
  randomNumberButton.style.marginRight = '10px';
  randomNumberButton.style.cursor = 'pointer';

  // Create the New Fact button
  var newFactButton = createNewFactButton();
  newFactButton.style.marginRight = '10px';
  newFactButton.style.cursor = 'pointer';

  // Find the color wheel container
  var colorWheelContainer = document.querySelector('div[style="margin-right: 10px;"]');
  if (colorWheelContainer) {
    // Insert the Reddit button after the color wheel container
    colorWheelContainer.parentNode.insertBefore(redditButton, colorWheelContainer.nextSibling);

    // Insert the Twitter button after the Reddit button
    redditButton.parentNode.insertBefore(twitterButton, redditButton.nextSibling);

    // Insert the Instagram button after the Twitter button
    twitterButton.parentNode.insertBefore(instagramButton, twitterButton.nextSibling);

    // Insert the Facebook button after the Instagram button
    instagramButton.parentNode.insertBefore(facebookButton, instagramButton.nextSibling);

    // Insert the Random Number button after the Facebook button
    facebookButton.parentNode.insertBefore(randomNumberButton, facebookButton.nextSibling);

    // Insert the New Fact button after the Random Number button
    randomNumberButton.parentNode.insertBefore(newFactButton, randomNumberButton.nextSibling);
  }

  // Create the Timer element
  var timerElement = createTimerElement();
  document.body.appendChild(timerElement);

  // Create the Guess the Number elements
  var guessContainer = createGuessTheNumberElements();
  document.body.appendChild(guessContainer);

  // Create the message container for Guess the Number
  var messageContainer = createMessageContainer();
  document.body.appendChild(messageContainer);

  var timerInterval;
  var startTime;

  var randomNumber;
  var remainingAttempts = 6;

  // Function to update the timer
  function updateTimer() {
    var currentTime = new Date().getTime();
    var elapsedTime = currentTime - startTime;
    var hours = Math.floor(elapsedTime / (1000 * 60 * 60)).toString().padStart(2, '0');
    var minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
    var seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000).toString().padStart(2, '0');

    timerElement.textContent = hours + ':' + minutes + ':' + seconds;
  }

  // Function to start the timer
  function startTimer() {
    if (!timerInterval) {
      startTime = new Date().getTime();
      timerInterval = setInterval(updateTimer, 1000);
    }
  }

  // Function to pause the timer
  function pauseTimer() {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
  }

  // Function to reset the timer
  function resetTimer() {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
    timerElement.textContent = '00:00:00';
  }

  // Function to show the hint popup with remaining attempts
  function showHintPopup(hint) {
    var popup = document.createElement('div');
    popup.style.position = 'fixed';
    popup.style.top = '50%';
    popup.style.left = 'calc(50% - 100px)';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.backgroundColor = '#fff';
    popup.style.padding = '10px';
    popup.style.borderRadius = '5px';
    popup.style.fontSize = '18px';
    popup.style.fontWeight = 'bold';
    popup.style.zIndex = '9999';
    popup.textContent = hint + ' (Attempts left: ' + remainingAttempts + ')';

    document.body.appendChild(popup);

    setTimeout(function () {
      document.body.removeChild(popup);
    }, 2000);
  }

  // Function to check the guess in the Guess the Number game
  function checkGuess(guess) {
    if (remainingAttempts > 0) {
      if (isNaN(guess) || guess < 0 || guess > 100) {
        messageContainer.textContent = 'Please enter a valid number between 0 and 100.';
      } else {
        remainingAttempts--;
        messageContainer.textContent = 'Attempts left: ' + remainingAttempts;

        if (guess === randomNumber) {
          messageContainer.textContent = 'Congratulations! You guessed the correct number.';
          guessContainer.style.display = 'none';
        } else if (remainingAttempts === 0) {
          messageContainer.textContent = 'Game Over. The correct number was: ' + randomNumber;
          guessContainer.style.display = 'none';
        } else if (guess < randomNumber) {
          showHintPopup('Higher');
        } else {
          showHintPopup('Lower');
        }

        // Add the guessed number to the history container
        addToGuessHistory(guess);
      }
    }
  }

  // Function to create the Guess History container
  function createGuessHistoryContainer() {
    var guessHistoryContainer = document.createElement('div');
    guessHistoryContainer.style.position = 'fixed';
    guessHistoryContainer.style.top = '50%';
    guessHistoryContainer.style.left = '1100px';
    guessHistoryContainer.style.transform = 'translateY(-50%)';
    guessHistoryContainer.style.backgroundColor = '#fff';
    guessHistoryContainer.style.padding = '10px';
    guessHistoryContainer.style.borderRadius = '5px';
    guessHistoryContainer.style.fontSize = '18px';
    guessHistoryContainer.style.fontWeight = 'bold';
    guessHistoryContainer.style.zIndex = '9999';
    guessHistoryContainer.textContent = 'Guess History:\n';

    return guessHistoryContainer;
  }

  // Create the Guess History container
  var guessHistoryContainer = createGuessHistoryContainer();
  document.body.appendChild(guessHistoryContainer);

  // Function to add the guessed number to the history container
  function addToGuessHistory(guess) {
    guessHistoryContainer.textContent += guess + ', ';
  }

  // Generate the initial random number for the Guess the Number game
  randomNumber = Math.floor(Math.random() * 101);

  // Create the Start/Pause/Reset buttons container
  var timerButtonsContainer = document.createElement('div');
  timerButtonsContainer.style.display = 'flex';
  timerButtonsContainer.style.alignItems = 'center';
  timerButtonsContainer.style.marginTop = '10px';

  // Insert the Start/Pause/Reset buttons container after the color wheel container
  if (colorWheelContainer) {
    colorWheelContainer.parentNode.insertBefore(timerButtonsContainer, colorWheelContainer.nextSibling);
  }

  // Add the Start button to the container
  timerButtonsContainer.appendChild(startButton);

  // Add the Pause button to the container
  timerButtonsContainer.appendChild(pauseButton);

  // Add the Reset button to the container
  timerButtonsContainer.appendChild(resetButton);

  // Remove the unwanted div with class "KxwPGc SSwjIe"
  const unwantedDiv = document.querySelector('div.KxwPGc.SSwjIe');
  if (unwantedDiv) {
    unwantedDiv.remove();
  }

  // Attach scroll event listener to lock the timer in place
  window.addEventListener('scroll', function () {
    var topOffset = '10px'; // Adjust this value if needed
    timerElement.style.top = 'calc(50% + ' + topOffset + ' - ' + window.scrollY + 'px)';
  });
})();
