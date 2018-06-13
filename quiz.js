function registerHandlers() {
  $('.quiz-form').on('submit', '#question', handleSubmit);
  $('.quiz-form').on('click', '.next', handleNext);
  $('.quiz-form').on('click', '.start-button', handleStart);
  $('.quiz-form').on('click', '.restart-button', handleRestart);
}

//
let score = 0;
let questionNumber = 0;
//...

function generateQuiz() {
	if (questionNumber < DATA.length) {
	return `<div class="question">
    <form id="question">
    <fieldset role="radiogroup" name="multiple-choice-question-form">
    <legend class="border"><h2>${DATA[questionNumber].question}</h2></legend>    
    <label class="answer-option">    
    <input type="radio" value="${DATA[questionNumber].answer[0]}" name="answer" required>
    <span class="option">${DATA[questionNumber].answer[0]}</span>
    </label>
    <label class="answer-option">
    <input type="radio" value="${DATA[questionNumber].answer[1]}" name="answer" required>
    <span class="option">${DATA[questionNumber].answer[1]}</span>
    </label>
    <label class="answer-option">
    <input type="radio" value="${DATA[questionNumber].answer[2]}" name="answer" required>
    <span class="option">${DATA[questionNumber].answer[2]}</span>
    </label>
    <label class="answer-option">
    <input type="radio" value="${DATA[questionNumber].answer[3]}" name="answer" required>
    <span class="option">${DATA[questionNumber].answer[3]}</span>
    </label>
    <button type="submit" class="submit-answer">Submit</button>
    </fieldset>
    </form>
    </div>`;
	} 
	else {
		renderResult();
		$('.question-number').text(10);
		// document.querySelector('.question-number').innerText(10);
	}
}

function renderNext() {
 	const next = '<div class="next-div"><button class="next">Next</button></div>';
 	$('.quiz-form').append(next);
}

function handleNext (event) {
	// Handles the click of 'next' button following a correct or incorrect response.
	incrementQuestionNumber();
	renderQuestion();
}

function renderRestart () {
	//creates button to restart the quiz
	const restart = '<div class="next-div"><button class="restart-button">Restart</button></div>';
	$('.quiz-form').append(restart);
	}

function handleRestart () {
	const start = '<div class="start-div"><h1>Assess your financial and investing knowledge</h1><button type="submit" class="start-button">Start Quiz</button></div>'
	$('ul').remove();
	$('.quiz-form').html(start);
	reset();

}

function reset() {
	questionNumber = 0;
	score = 0;
}

function handleStart(event) {
	// Starts the quiz when the 'start quiz' button is clicked.
		renderQuestion();
		$('.header-right').html('<ul><li>Question #: <span class="break"><span class="question-number">1</span> of 10</li></span><li>Score:<span class="initial-score"> 0</span><span class="score"></span></li></ul>');	
}

	
function renderQuestion() {
	// Renders quiz question.
	const quiz = generateQuiz();
	$('.quiz-form').html(quiz);
}

	
function handleSubmit(event) {
	// Handles submission of selected answer for quiz question.
	// if correctAnswer is equal to the submitted answer, then return '"correct"...next button' otherwise return '"Incorrect", explanation, & next button'
    event.preventDefault();    

    let selected = $('input:checked');
    let answer = selected.val();
    let correctAnswer = `${DATA[questionNumber].correctAnswer}`; 

    if (answer === correctAnswer) {
      ifCorrect();
    } else {
      ifIncorrect();
    }    
}

function incrementQuestionNumber() {
	questionNumber ++;
	$('.question-number').text(questionNumber+1);
}

function ifCorrect() {
	updateScore();
	let correct = '<div class="if-correct"><i class="fas fa-check"><span class="clip">correct check mark</span></i> Correct!</div>'
	$('.quiz-form').html(correct);
	renderNext();
}

function ifIncorrect() {
	let feedback = `<div class="feedback"><div class="incorrect"><i class="fas fa-times-circle"><span class="clip">"X" symbol for incorrect</span></i> Incorrect!</div><div><span class="best-answer">The best answer was: </span>${DATA[questionNumber].correctAnswer}</div></div>`
	$('.quiz-form').html(feedback);
	renderNext();
}	

function updateScore() {
	score++;
	$('.initial-score').text(` ${score}`);
}

function renderResult() {
	console.log('result ran')
	//generates response based on number correct
	let result;
	if ( score > 9 ) {
		result = '<div class="result"><div class="congrats">Congratulations!</div> You have demonstrated a high level of personal finance and investing expertise to help you succeed financially in life!</div>';
	}
	else if ( score > 7) {
		result = '<div class="result"><div class="congrats">Congratulations!</div> You have demonstrated above average personal financial expertise to help you succeed financially in life! However, additional knowledge never hurts.</div>'
	}
	else if ( score > 5) {
		result = '<div class="result"><div class="congrats">Congratulations!</div> You have demonstrated a moderate level of personal financial expertise, but it would not be a bad idea to do some additional research.</div>'
	}
	else if ( score == 5) {
		result = '<div class="result">You have demonstrated a mediocre level of expertise and would recommend growing your personal financial and investing knowledge.</div>'
	}
	else {
		result = '<div class="result">You have demonstrated a low level of personal financial and investing expertise. It is highly advised to grow your knowledge of value investing and see the world from a new paradigm. Warren Buffet would recommend reading <span class="book">The Intelligent Investor </span> by Benjamin Graham. Vanguard tends to produce very objective financial research. Morningstar.com is also a good source of information.</div>'
	}

	$('.quiz-form').html(result);
	renderRestart();
}

// when the page loads, call `registerHandlers`
$(registerHandlers);

