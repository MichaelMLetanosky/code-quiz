//Global Variables
//Todo
var startBtn = document.querySelector("#start-button")
   
//Lists of questions as an array
var answerArray = ['This is the first question?','yes','no','maybe','all of the above','1'];

//Script
//Todo Create function that starts game
function codeQuiz(x) {
    //Test that function can be called
    console.log("Ready set go!");
    
    //Todo starts timer
    
    //Hides introduction and start button
    document.querySelector(".intro-loss-container").style.display = "none";

    //Adds text to body to display questions and 4 answers as button appropriate buttons
    //Sets first item of given array as the question text
    document.querySelector(".question").textContent = x[0];

    //Sets second through second from last item of array as answer buttons in a single column
    for (let i=1; i < x.length - 1; i++) {
        var answer = document.querySelector("[data-number='" + i + "']");
        answer.textContent = x[i];
        answer.style.display = "block";
        }
};

//Event listener on start button
startBtn.addEventListener ("click", function(){
    codeQuiz(answerArray)
});

console.log("Initialized");