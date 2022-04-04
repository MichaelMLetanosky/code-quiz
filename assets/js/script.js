//Global Variables
//Todo
var startBtn = document.querySelector("#start-button")

//Script
//Todo Create function that starts game
function codeQuiz() {
    //Test that function can be called
    console.log("Ready set go!");
    
    //Todo starts timer
    
    //Todo hides introduction and start button
    var introLossCont = document.querySelector(".intro-loss-container");

    introLossCont.style.display = "none";
    
    //Todo displays question
    var question = document.querySelector(".question");

    question.textContent = "This is the first question?";
    
    //Todo displays 4 answers as button
    var listAnswer = document.querySelector(".answers");
    var answerArray = ['yes','no','maybe','all of the above'];
    var answer = document.createElement("li");

    function printBtn() {
        for (var i=0; i < answerArray.length; i++) {
            var btn = document.createElement("button");
            var t = document.createTextNode(answerArray[i]);
            btn.appendChild(t);
            btn.style.display = "block";
            document.body.appendChild(btn);
        };
    };

    printBtn();

};

//Event listener on start button
startBtn.addEventListener ("click", codeQuiz);

console.log("Initialized");