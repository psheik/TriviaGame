$(document).ready(function() {
    
    //set global variables
    var questInterval;
    var numCorrect = 0;
    var numWrong = 0;
    var numNoAns = 0;
    var questTracker = 0; 
    var wasStartClicked = false;  
    var eachQuest = "";    
    var currAns = "";
    //variables keep track of current question
    var flagsArray = [];
    var optionsArray = [];
    //variables to display time remaining
    var timer = 30;
    var userPick = "";
    
    //game data bank
    var questBank = [
                {"Where was Google founded?": {"Menlo Park":1, "Palo Alto":0, "Sunnyvale":0, "Mountain View":0}}
            , {"What year was Tesla Founded?": {"2001":1, "2002":0, "2003":1, "2004":0}}
            , {"Who founded Nintendo?": {"Masujiro Hashimoto":0, "Rokuro Aoyama":0, "Fusajiro Yamauchi":1, "Yoshisuke Aikawa":0}}
            , {"Where did Steve Jobs attend high school?": {"Fremont High School":0, "Lynbrook High School":0, "Cupertino High School":0, "Homestead High School":1}}
            , {"When was the iPhone invented?": {"2005":0, "2006":0, "2007":1, "2008":0}}
            , {"What kind of technology does Akai produce?": {"Cellular Technology":0, "Music Technology":1, "Automotive Technology":0, "Medical Technology":0}}
            , {"Which company sold the most televisions in 2018?": {"Samsung":1, "Sony":0, "Vizio":0, "LG":0}}
    ];

    var questGif = ['<iframe src="https://giphy.com/embed/yPyyu2nqaYbiU" width="480" height="350" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>',
    '<iframe src="https://giphy.com/embed/WM7JfExEKvTsQ" width="480" height="264" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>', 
    '<iframe src="https://giphy.com/embed/euAnOkLGWtdHG" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>',
    '<iframe src="https://giphy.com/embed/p6z2lHvl4Da4U" width="480" height="313" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>',
    '<iframe src="https://giphy.com/embed/26n79t82lmj989iAE" width="480" height="350" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>',
    '<iframe src="https://giphy.com/embed/UUgxQ0Fhh63aXFWjsT" width="360" height="350" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>',
    '<iframe src="https://giphy.com/embed/AMnVrhl9INK1O" width="480" height="350" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>'
    ];
    
    //resets game
    function resetGame(){
        numCorrect = 0;
        numWrong = 0;
        questTracker = 0;
        wasStartClicked = false;
        eachQuest = "";
        currAns = "";
        userOptPick = "";
        optionArray = [];
        flagsArray = [];
        timer = 30;
    }
    
    //update current question
    function getCurrQuest() {
        var questArray = Object.keys(questBank[questTracker]); 
        eachQuest = questArray[0];
        console.log(eachQuest);
    }
    
    //update options for current question
    function getCurrOptions() {
        var optionsAndFlagArray = Object.values(questBank[questTracker]);
        var optionsAndFlagObj = optionsAndFlagArray[0];
        optionsArray = Object.keys(optionsAndFlagObj);
        flagsArray = Object.values(optionsAndFlagObj);
        //get current answer for question
        console.log(flagsArray);
        console.log(optionsArray);
    }
    
    //store answer for the current question
    function getCurrAns() {
        for (var i = 0; i < flagsArray.length; i++) {
            if (flagsArray[i] === 1) {
                currAns = optionsArray[i];
            }
        }
    }

    //create questions and answer choices
    function questLayout() {
        getCurrQuest();
        getCurrOptions();
        userPick = "";
        //clear contents of div holding questions and answer choices
        $("#quest-container").empty();
        //page layout for questions and answer choices
        var timeDisp = $("<p id='timer'></p>").text("Time Remaining: " + timer + " Seconds");
        var questDisp = $("<p id= 'each-quest'></p>").text(eachQuest);
        console.log(timeDisp.text());
        console.log(questDisp.text());
        var optDivs = $("<div class='options-view'></div>");
        //buttons for answer choices
        for (var i = 0; i < optionsArray.length; i++) { 
            var buttn = $("<button>");
            buttn.addClass("btn-options");
            buttn.text(optionsArray[i]);
            optDivs.append(buttn);
        }
        //timer, questions, and answer choices added to question container
        $("#quest-container").append(timeDisp, "<br/>", questDisp, optDivs);
    }
    
    //tracks the amount ot time alloted to each question.
    function countDown() {
        if (timer > 0) {
            timer--;
            $("#timer").text("Time Remaining: " + timer + " Seconds");
        }
    //fixes display if no user answer
        else if (timer === 0 && userPick === ""){
            noUserAnswer();
        } 
    }
    
    function noUserAnswer() {
        clearInterval(questInterval);
        dispAnswerMessg("");
        questTracker++;
        //Go to next question after 4 seconds
        if (questTracker < questBank.length) {
            setTimeout(dispQuest, 4000);
        }
        else {
            setTimeout(resultDisp, 4000);
        }
    }

    //30 seconds allowed per question
    function dispQuest() {
        timer = 30;
        //remove start button before showing questions
        if (wasStartClicked) {
            $("#start-btn").remove();
        }
        //display next question and answer choices
        questLayout();
        questInterval = setInterval(countDown, 500); 
    }
    
    //function displays the appropriate answer message for 4 seconds
    function dispAnswerMessg(uOpt) {
        //get current answer
        getCurrAns();
        //remove elements containing answer choicesand questions
        $("#each-quest").remove();
        $(".btn-options").remove();
        if (uOpt === "") {
            //message if user runs out of time on question
            var ansStatus = $("<p id='timedOut-status'></p>").text("Out of Time!");
            var ansMessg = $("<p id='correct-ans'></p>").text("The correct answer was: " + currAns);
            var ansGif = $(questGif[questTracker]);
            $("#quest-container").append(ansStatus, ansMessg, ansGif);
            //update number of questions not answered
            numNoAns++;
        }
        else if (uOpt === currAns) {
            //message for right answers
            var ansStatus = $("<p id='correct-ans'></p>").text("Correct!");
            var ansGif = $(questGif[questTracker]);
            $("#quest-container").append(ansStatus, ansGif);
            //update number of answers right
            numCorrect++;
        }
        else if (uOpt !== currAns) {
            //message for wrong answers
            var ansStatus = $("<p id='wrong-status'></p>").text("Nope!");
            var ansMessg = $("<p id='correct-ans'></p>").text("The correct answer was: " + currAns);
            var ansGif = $(questGif[questTracker]);
            $("#quest-container").append(ansStatus, ansMessg, ansGif);
            //update number of answers wrong
            numWrong++;
        }
        
    }
    //shows result at end of the game
    function resultDisp() {
    //remove all #quest-container content, except time
    $("#timedOut-status").remove();
    $("#correct-ans").remove();
    $("#wrong-status").remove();
    $(".giphy-embed").remove();
    //elements that display results
    var resMessg = $("<p id='res-messg'></p>").text("All done, heres how you did!");
    var rightAns = $("<p id='right-ans'></p>").text("Correct Answers: " + numCorrect);
    var wrongAns = $("<p id='wrong-ans'></p>").text("Incorrect Answers: " + numWrong);
    var noAns = $("<p id='no-ans'></p>").text("Unanswered: " + numNoAns);
    var buttn = $("<button>");
    buttn.addClass("start-buttons");
    buttn.text("Start Over?");
    $("#quest-container").append(resMessg, rightAns, wrongAns, noAns, buttn);
    }
    
    //click event to start button
    $("#game-container").on("click", ".start-buttons", function(){
        console.log($("#quest-container").text());
        //reset game 
        resetGame();
        if (wasStartClicked === false) {
            wasStartClicked = true;
            //display questions and options
            dispQuest();
            console.log("star-timer is: " + timer);
            //click event for answer user picks
            $("#quest-container").on("click", ".btn-options", function(){
                clearInterval(questInterval);
                userPick = $(this).text();
                console.log(userPick);
                console.log("btn-timer is: " + timer);
                dispAnswerMessg(userPick);
                //update tracker for next question
                questTracker++;
                if (questTracker < questBank.length) {
                    
                    //display question after 4 seconds
                    setTimeout(dispQuest, 4000);
                    console.log("start*****-timer is: " + timer);
                }
                else {
                    //display the results of the game after 4 seconds
                    setTimeout(resultDisp, 4000);
                }
            });
        } 
    });
    });
    