//Global Variables
//Todo add global variables
var startBtn = document.querySelector("#start-button");
var currentQuestion = 0;
var currentTime = 90;
   
//Lists of questions, multiple choice questions, and the answer as an array
var answerArray = [
    ['This is the first question?','yes','no','maybe','all of the above','1'],
    ['this is the second question?', 'I guess', 'ask again later', 'outlook bad', 'outlook good', '4']
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
    var currentTime = 10;
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
        if (x !== answer[5]) {
           console.log("Wrong");
           currentTime = currentTime - 5;
           //ensures score can't be negative
           if (currentTime >= 0) {
               elem.innerHTML = currentTime;
           } else {
               elem.innerHTML = 0;
           };
        };

        //Moves on to the next question or if done with last question ends the game
        currentQuestion++;
        if (currentQuestion < answerArray.length) {
            codeQuiz(answerArray[currentQuestion]);    
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
        };

        //Puts end text onto page    
        document.querySelector(".win-container").style.display = "block";
    };
};

//Event listener on start button
startBtn.addEventListener ("click", gameInitialization ());
