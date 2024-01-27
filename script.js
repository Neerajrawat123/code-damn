const mistakesElement = document.querySelector(".mistakes span b");
const wpmElement = document.querySelector(".wpm span b");
const timeLeftElement = document.querySelector(".time-left span b");
const cpmElement = document.querySelector(".cpm span b");
const textElement = document.querySelector(".typing-text");
const inputElement = document.querySelector("input");
const startBtn = document.querySelector(".start_btn");
const pauseBtn = document.querySelector(".paused_btn");
let maxtime = 6;

init();
function init() {
  inputElement.disabled = true;

  const gameDetails = {
    isGameStarted: false,
    isPaused: false,
    paraObj: [],
    wpm: 0,
    cpm: 0,
    mistakes: 0,
    timeLeft: maxtime,
  };

  const paragraphs = [
    "Let p be a given point in a given curve, and q any other point on it in the neighbourhood of p.Let n be the point of intersection of the normal at p and q . suppose n tends to definite position C as Q tends to P , whether from the right of from the left.",
    "Classy Paragraphs is a Drupal module which gives your Paragraphs a little class. Content creators can easily assign a class to a paragraph to style it according to a controlled list which was defined by the site builder.",
    "Edgy is a Drupal module which provides a couple of templates for Panels and Display Suite to give your designs that edgy look.Views Filter Object is a Drupal module which allows content creators to configure a view via the standard editing interface for any entity. It works particularly well with Paragraphs.",
    "Entity Background is a Drupal module which provides a plugable background solution for adding backgrounds to other objects such as Paragraph Items",
    "Science and technology have revolutionized the world, bringing about remarkable advancements in various fields. From space exploration to medical breakthroughs, the impact of innovation is profound. The quest for knowledge and the application of technology continue to shape the future of humanity.",
    "The beauty of nature is awe-inspiring. From the majestic mountains to the serene lakes, each element contributes to the tapestry of our environment. Take a moment to appreciate the rustling of leaves, the chirping of birds, and the gentle flow of a river – nature's symphony that soothes the soul.",
    "Literature is a gateway to the realms of imagination. Through the written word, authors weave intricate worlds, create memorable characters, and explore the depths of human emotions. Reading allows us to travel through time and space, escaping into the boundless realms of creativity.",
    "Kindness is a force that can transform lives. A simple act of compassion, a genuine smile, or a helping hand has the power to brighten someone's day. In a world that can sometimes be challenging, embracing kindness fosters a sense of connection and makes the journey more meaningful.",
    "Our world is a mosaic of diverse cultures, languages, and traditions. Embracing global diversity enriches our understanding of the human experience. Each culture contributes to the global tapestry, and by appreciating our differences, we can build bridges of understanding and cooperation.",
  ];
  startBtn.addEventListener("click", start);

  let temp = 0;
  function start() {
    if (!gameDetails.isGameStarted) {
      // first display the input element
      inputElement.value = "";
      gameDetails.isGameStarted = true;
     
      initScore(); // initialize the scoreBoard
      generatePara(); // generate the paragraph
      initInput(); // initialze the input
      startTest(); // test logic
      startBtn.style.display = "none";

      function initScore() {
        gameDetails.characters = 0;
        gameDetails.words = 0;
        gameDetails.mistakes = 0;
        gameDetails.timeLeft = maxtime;
        timeLeftElement.textContent = gameDetails.timeLeft;
        mistakesElement.textContent = gameDetails.mistakes;
        wpmElement.textContent = gameDetails.wpm;
        cpmElement.textContent = gameDetails.cpm;
      
  
      }

      function generatePara() {
        textElement.innerHTML = "";
        let ranObj = Math.floor(Math.random() * paragraphs.length);

        gameDetails.paraObj = paragraphs[ranObj].split("");

        gameDetails.paraObj.forEach((element) => {
          let spantag = `<span>${element}</span>`;
          textElement.innerHTML += spantag;
        });
      }

      function initInput() {
        inputElement.disabled = false;
        inputElement.focus(); // change in description
      }

    
      function startTest() {
       
      

          temp++
          let spanArr = document.querySelectorAll(".typing-text span");
          let inputArr = [];
          let keyCount = 0;
          spanArr[keyCount].style.textDecoration = "underline";
          
          function handleKeypress(e) {
          inputArr.push(e.key);
          if (gameDetails.paraObj[keyCount] !== e.key) {
            spanArr[keyCount].classList.add("incorrect");
            gameDetails.mistakes++;
          } else {
            spanArr[keyCount].classList.add("correct");
          }

          updateScore(keyCount, inputArr);
          gameDetails.characters++;
          keyCount++;
          spanArr[keyCount].style.textDecoration = "underline";
          spanArr[keyCount - 1].style.textDecoration = "none";
          if (keyCount === spanArr.length) {
              endGame();
              inputElement.removeEventListener("keypress", handleKeypress);
              isEventListenerActive = false;
            }
        }
        inputElement.addEventListener("keypress", handleKeypress);

        initTimer(); // inittialize the timer
        function initTimer() {
            let interval = setInterval(() => {
                if (gameDetails.timeLeft > 0) {
                  gameDetails.timeLeft--;
                  timeLeftElement.innerHTML = gameDetails.timeLeft;
                } else {
                  clearInterval(interval);
                  inputElement.removeEventListener("keypress", handleKeypress);
                  endGame();
                }
              }, 1000);
            }
    }
    
    /// update score
    
    function updateScore(keyCount, inputArr) {
        mistakesElement.innerHTML = gameDetails.mistakes; // print mistakes
        
        // calculate words typed
        if (keyCount > 1) {
            if (inputArr[keyCount] === " " && inputArr[keyCount - 1] !== " ") {
                gameDetails.words++;
            }
        }
    }
    
    // end game logic
    
    function endGame() {
        isEventListenerActive = false;
        gameDetails.isGameStarted = false;
        inputElement.disabled = true;
        let charPerSec = gameDetails.characters / maxtime;
        let wordPerSec = gameDetails.words / maxtime;
        cpmElement.innerHTML = Math.ceil(charPerSec * 60);
        wpmElement.innerHTML = Math.ceil(wordPerSec * 60);
        startBtn.style.display = "block";
        startBtn.textContent = "Try again";
      }
    }
  }
}
