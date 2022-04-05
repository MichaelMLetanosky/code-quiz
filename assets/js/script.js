//Global Variables
//Todo add global variables
var startBtn = document.querySelector("#start-button");
var currentQuestion = 0;
var currentTime = 90
   
//Lists of questions as an array
var answerArray = [
    ['This is the first question?','yes','no','maybe','all of the above','1'],
    ['this is the second question?', 'I guess', 'ask again later', 'outlook bad', 'outlook good', '4']
];

//Starts game using the first question
function gameInitialization () {
    //Test that function can be called
    console.log("Ready set go!");
    
    //Timer
    var currentTime = 10;
    var elem = document.querySelector("#timer");
    elem.innerHTML = currentTime;
    
    var timerId = setInterval(countdown, 1000);
    
    function countdown() {
      if (currentTime == 0) {
        clearTimeout(timerId);
        playerEnd();
      } else {
        currentTime--;
        elem.innerHTML = currentTime;
      }
    }

    //Hides introduction and start button
    document.querySelector(".intro-box").style.display = "none";
    document.querySelector("#start-button").style.display = "none";

    currentQuestion = 0;
}

//Function for populating the quiz question and answers from the array
function codeQuiz(x) {
    console.log("Here a question");

    //Sets first item of given array as the question text
    document.querySelector(".question").textContent = x[0];

    //Sets second through second from last item of array as answer buttons in a single column
    for (let i=1; i < x.length - 1; i++) {
        var answer = document.querySelector("[data-number='" + i + "']");
        answer.textContent = x[i];
        answer.style.display = "block";
        };
};

//Checks answer then moves to next question
function checkOne (x) {
    //To look at current questions array
    let answer = answerArray[currentQuestion];

    //Checks the pressed button against the stored answer
    if (x !== answer[5]) {
        console.log("Wrong");
    };

    //Moves on to the next question
    currentQuestion++;
    if (currentQuestion < answerArray.length) {
        codeQuiz(answerArray[currentQuestion]);    
    } else {
        playerEnd ();
    };
};

//Ends the game
function playerEnd() {
    console.log("Thanks for playing!");

    //Clears out the question and answer areas
    document.querySelector(".question").textContent = "";

    for (let i=1; i < 5; i++) {
        var answer = document.querySelector("[data-number='" + i + "']");
        answer.textContent = "";
    };

    //Puts win text onto page    
    document.querySelector(".win-container").style.display = "block";
};

//Event listener on start button
startBtn.addEventListener ("click", function(){
    gameInitialization ();
    codeQuiz(answerArray[currentQuestion]);
});

//Event listener for answer buttons
document.addEventListener('click', (e) => {
    let element = e.target;
    let dataNumb = e.target.getAttribute("data-number");
    if(element.className == "answerButton") {
        checkOne(dataNumb);
    };
});

console.log("Initialized");