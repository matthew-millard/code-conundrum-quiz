var questions = [
	{
		question: 'Which array method is used to add a value to the end of an array?',
		answers: [
			{ answer: 'push()', correct: true },
			{ answer: 'shift()', correct: false },
			{ answer: 'pop()', correct: false },
			{ answer: 'unshift()', correct: false },
		],
	},
	{
		question: 'True or false. Function expressions get hoisted?',
		answers: [
			{ answer: 'True', correct: false },
			{ answer: 'False', correct: true },
		],
	},
]

var startButton = document.querySelector('.js-button')
var timerDisplay = document.querySelector('.js-timer')
var questionElement = document.querySelector('.js-question')
var questionIndex = 0
var score = 0
var time = 60

function startQuiz() {
	startButton.classList.add('display-none')
	questionElement.classList.remove('display-none')
	timer()
	nextQuestion()
}

// Set next question
function nextQuestion() {
	questionElement.innerHTML = ''
	var questionTitle = document.createElement('h2')
	var question = document.createElement('h3')
	questionElement.appendChild(questionTitle)
	questionElement.appendChild(question)
	questionTitle.innerText = `Question ${questionIndex + 1}`
	question.innerText = questions[questionIndex].question
	// Generate answers
	var answers = questions[questionIndex].answers
	console.log(answers)
	for (var i = 0; i < answers.length; i++) {
		var answerButton = document.createElement('button')
		answerButton.classList.add('button')
		answerButton.classList.add('answer-button')
		answerButton.innerText = answers[i].answer

		if (answers[i].correct) {
			answerButton.setAttribute('data-correct', 'true')
		} else {
			answerButton.setAttribute('data-correct', 'false')
		}

		questionElement.appendChild(answerButton)
		answerButton.addEventListener('click', selectedAnswer)
	}
}

function selectedAnswer(e) {
	answerSelected = e.target
	var answeredCorrect = answerSelected.getAttribute('data-correct')
	var answeredIncorrect = answerSelected.getAttribute('data-correct')
	checkAnswer(answeredCorrect, answeredIncorrect)
}

function displayNextButton() {
	var nextButton = document.createElement('button')
	nextButton.innerText = 'Next'
	nextButton.classList.add('button')
	nextButton.classList.add('next-button')
	questionElement.appendChild(nextButton)
	nextButton.addEventListener('click', nextQuestion)
}

function checkAnswer(correct, incorrect) {
	if (correct === 'true') {
		answerSelected.classList.add('correct')
		var message = document.createElement('span')
		message.innerText = 'That is correct!'
		message.classList.add('answer-message')
		questionElement.appendChild(message)
		score = score + 1
		questionIndex = questionIndex + 1
		displayNextButton()
	} else if (incorrect) {
		answerSelected.classList.add('incorrect')
		time = time - 5
	}
}

function timer() {
	setInterval(() => {
		displayTimer()
		if (time > 0) {
			time = time - 1
			console.log(time)
		} else {
			clearInterval()
		}
	}, 1000)
}

function displayTimer() {
	timerDisplay.innerText = `Timer: ${time}s`
}

// Start Quiz Event
startButton.addEventListener('click', startQuiz)
