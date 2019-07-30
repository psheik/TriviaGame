var triviaQuestions = [{
	question: "Where was Google founded?",
	answerList: ["Sunnyvale", "Menlo Park", "Palo Alto", "Mountain View"],
	answer: 1
},{
	question: "When was Tesla Founded?",
	answerList: ["2003", "2004", "2005", "2006"],
	answer: 0
},{
	question: "Who founded Nintendo?",
	answerList: ["Fusajiro Yamauchi", "Masujiro Hashimoto", "Rokuro Aoyama", "Yoshisuke Aikawa"],
	answer: 0
},{
	question: "Where did Steve Jobs attend high school?",
	answerList: ["Fremont High School", "Lynbrook High School", "Homestead High School", "Cupertino High School"],
	answer: 2
},{
	question: "When was the iPhone invented?",
	answerList: ["2004", "2005", "2006", "2007"],
	answer: 3
},{
	question: "What kind of technology does Akai produce?",
	answerList: ["Music Technology", "Automotive Technology", "Cellular", "Medical Technology"],
	answer: 0
},{
	question: "Which company sold the most televisions in 2018?",
	answerList: ["Sony", "Samsung", "LG", "Vizio"],
	answer: 1
}];

var gifArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7'];
var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;
var messages = {
	correct: "Correct!",
	incorrect: "Nope!",
	endTime: "Out of time!",
	finished: "Let's see how well you did!"
}

$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	answered = true;
	
	//Creates new questions and answers
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	//clicker function to pause time and show new answer choices
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

//creates timer
function countdown(){
	seconds = 30;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + ' seconds');
	answered = true;
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + ' seconds');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); 
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	$('#gif').html('<img src = "assets/images/'+ gifArray[currentQuestion] +'.gif">');
	//checks response for accuracy or timeout
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 4000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 4000);
	}	
}

//removes data to avoid repeats
function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}