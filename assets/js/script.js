//Global Variables
var startBtn = document.querySelector("#start-button");
var highscoresBtn = document.querySelector("#highscore");
var submitBtn = document.querySelector("#submit");
var currentQuestion = 0;
var currentTime = 50;
   
//Array of an array of questions, multiple choice questions, and the answer
var answerArray = [
    ['Commonly used data types DO NOT include:','strings','booleans','alerts','numbers','3'],
    ['The condition in an if / else statement is enclosed within ______.', 'quotes', 'curly braces', 'parentheses', 'square brackets', '3'],
    ['Arrays in JavaScript can be used to store ______.', 'numbers and strings', 'other arrays', 'booleans', 'all of the above', '4'],
    ['String values must be enclosed with _______ when being assinged to variables', 'commas', 'curly braces', 'quotes', 'parentheses', '3'],
    ['A very useful tool used during development and debugging for printing content to the debugger is:', 'JavaScript', 'terminal/bash', 'for loops', 'console.log', '4']
];

//Starts game
function gameInitialization () {
    //Hides introduction and start button and clears screen
    clearScreen ();

    //Makes event listener for answer buttons
    document.addEventListener('click', (e) => {
        let element = e.target;
        let dataNumb = e.target.getAttribute("data-number");
        if(element.className == "answerButton") {
            checkAnswer(dataNumb);
        };
    });

    //Starts Timer
    currentTime = 50;
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
        document.querySelector("#wrong").style.display = "none";
        document.querySelector("#right").style.display = "none";
      };
    };

    //Function for populating the quiz question and answers from the array
    function displayQuestion(x) {
        //Sets first item of given array as the question text on html
        document.querySelector(".question").textContent = x[0];

        //Sets second through second-from-last item of array as answer buttons in a single column
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
        if (x !== answer[5] && currentTime >= 10) {
               currentTime = currentTime - 10;
               document.querySelector("#wrong").style.display = "block";
           } else if (x !== answer[5]) {
               currentTime = 0;
           } else {
                document.querySelector("#right").style.display = "block";
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
        //Stops the timer and clears the screen
        clearInterval(timerId);
        clearScreen();

        //Puts end text onto page    
        document.querySelector(".win-container").style.display = "block";
        document.querySelector("#score").innerHTML = currentTime;
    };
};


//Clears Screen of items
function clearScreen () {
    //Clears intro section and start button
    document.querySelector(".intro-box").style.display = "none";
    document.querySelector("#start-button").style.display = "none"; 
    
    //Clears question and answers
    document.querySelector(".question").textContent = "";
    for (let i=1; i < 5; i++) {
        var answer = document.querySelector("[data-number='" + i + "']");
        answer.textContent = "";
        answer.style.display = "none";
    };

    //Clears right and wrong messages and ending message
    document.querySelector("#wrong").style.display = "none";
    document.querySelector("#right").style.display = "none";
    document.querySelector(".win-container").style.display = "none";
};

//Submits user name
function submit (event) {
    event.preventDefault();
    //Gathers name and score and puts into an array
    var submitName = document.getElementById('name').value;
    var submitScore = currentTime;
    var submitArr = [submitName, submitScore];

    //Checks if leaderboard is populated and time is better than 5th place
    if (JSON.parse(localStorage.getItem("score5")) != null && 
        currentTime > JSON.parse(localStorage.getItem("score5"))[1]) {

        //If it's good enough for the leader board it sorts scores into correct spots            
        localStorage.setItem ("score5", JSON.stringify(submitArr));

        for (let i = 4; i > 0; i--) {
            if (currentTime > JSON.parse(localStorage.getItem("score" + i))[1]) {
                localStorage.setItem("score" + (i + 1), localStorage.getItem("score" + i));
                localStorage.setItem("score" + i, JSON.stringify(submitArr));
            };
        };
    } else if (JSON.parse(localStorage.getItem("score1")) != null) {
        //Checks to see if there is anything on the leaderboard
        //If there are, it sorts board
        for (let i = 4; i > 0; i--) {
            if (JSON.parse(localStorage.getItem("score" + i)) != null && 
                currentTime > JSON.parse(localStorage.getItem("score" + i))[1]) {

                localStorage.setItem("score" + (i + 1), localStorage.getItem("score" + i));
                localStorage.setItem("score" + i, JSON.stringify(submitArr));
            } else if (JSON.parse(localStorage.getItem("score" + i)) != null) {
                localStorage.setItem("score" + (i+1), JSON.stringify(submitArr));
                i = 0;
            };
        };
    } else {
        //If there are no items on leader board it adds it to top spot
        localStorage.setItem ("score1", JSON.stringify(submitArr));
    }

    //Shows highscores
    highscores();
};

//Shows users the highscores
function highscores () {
    //Clears the main area of page
    clearScreen ();

    //Hides text in header and displays highscore table
    document.querySelector("#highscore").style.display = "none";
    document.querySelector("h3").style.display = "none";
    document.querySelector(".highscore-container").style.display = "block";

    //Populates highscore table from local storage
    for (let i=1; i<6; i++) {
        //Checks that the localStorage has a value
        if (JSON.parse(localStorage.getItem("score" + i) != null)) {
            //Parses stored string into an array
            var scores = JSON.parse(localStorage.getItem("score" + i));
            //Inserts row, then two cells with info from stored array
            let row = document.getElementById("highscore-body").insertRow();
            let name = row.insertCell(0);
            let score = row.insertCell(1);
            name.innerHTML = scores[0];
            score.innerHTML = scores[1];
        };    
    };
};

//Event listeners
startBtn.addEventListener ("click", gameInitialization);
highscoresBtn.addEventListener ("click", highscores);
submitBtn.addEventListener ("click", submit);
