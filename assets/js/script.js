//Global Variables
//Todo add global variables
var startBtn = document.querySelector("#start-button");
var currentQuestion = 0;
var currentTime = 90;
   
//Lists of questions, multiple choice questions, and the answer as an array
var answerArray = [
    ['Commonly used data types DO NOT include:','strings','booleans','alerts','numbers','3'],
    ['The condition in an if / else statement is enclosed within ______.', 'quotes', 'curly braces', 'parentheses', 'square brackets', '3'],
    ['Arrays in JavaScript can be used to store ______.', 'numbers and strings', 'other arrays', 'booleans', 'all of the above', '4'],
    ['String values must be enclosed with _______ when being assinged to variables', 'commas', 'curly braces', 'quotes', 'parentheses', '2'],
    ['A very useful tool used during development and debugging for printing content to the debugger is:', 'JavaScript', 'terminal/bash', 'for loops', 'console.log', '4']
];

//Starts game
function gameInitialization () {
    //Hides introduction and start button
    document.querySelector(".intro-box").style.display = "none";
    document.querySelector("#start-button").style.display = "none";

    //Makes event listener for answer buttons
    document.addEventListener('click', (e) => {
        let element = e.target;
        let dataNumb = e.target.getAttribute("data-number");
        if(element.className == "answerButton") {
            checkAnswer(dataNumb);
        };
    });

    //Starts Timer
    var currentTime = 90;
    var elem = document.querySelector("#timer");
    elem.innerHTML = currentTime;
    
    var timerId = setInterval(countdown, 1000);
    
    //Checks to see if timer has run out
    function countdown() {
      if (currentTime == 0) {
        playerEnd();
      } else {
        currentTime--;
        elem.innerHTML = currentTime;
        document.querySelector("#wrong").style.display = "none"
        document.querySelector("#right").style.display = "none"
      };
    };

    //Function for populating the quiz question and answers from the array
    function displayQuestion(x) {
        //Sets first item of given array as the question text on html
        document.querySelector(".question").textContent = x[0];

        //Sets second through second from last item of array as answer buttons in a single column
        for (let i=1; i < x.length - 1; i++) {
            var answer = document.querySelector("[data-number='" + i + "']");
            answer.textContent = x[i];
            answer.style.display = "block";
        };
    };

    //Reset currentQuestion to start game at first question
    currentQuestion = 0;
    displayQuestion (answerArray[currentQuestion]);

    //Checks answer then moves to next question
    function checkAnswer (x) {
        //To look at current questions array
        let answer = answerArray[currentQuestion];

        //Checks the pressed button against the stored answer and subtracts time if incorrect
        if (x !== answer[5] && currentTime >= 5) {
               currentTime = currentTime - 5;
               document.querySelector("#wrong").style.display = "block"
           } else if (x !== answer[5]) {
               currentTime = 0
           } else {
                document.querySelector("#right").style.display = "block"
        };
        
        elem.innerHTML = currentTime;

        //Moves on to the next question or if done with last question ends the game
        currentQuestion++;
        if (currentQuestion < answerArray.length) {
            displayQuestion(answerArray[currentQuestion]);    
        } else {
            playerEnd ();
        };
    };

    //Ends the game
    function playerEnd() {
        //Stops the timer
        clearInterval(timerId);

        //Clears out the question and answer areas
        document.querySelector(".question").textContent = "";

        for (let i=1; i < 5; i++) {
            var answer = document.querySelector("[data-number='" + i + "']");
            answer.textContent = "";
            answer.style.display = "none";
        };

        document.querySelector("#wrong").style.display = "none"
        document.querySelector("#right").style.display = "none"

        //Puts end text onto page    
        document.querySelector(".win-container").style.display = "block";
        document.querySelector("#score").innerHTML = currentTime
    };
};

//Event listener on start button
startBtn.addEventListener ("click", gameInitialization);

console.log ("initial")