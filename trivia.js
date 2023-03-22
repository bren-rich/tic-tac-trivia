const quiz = document.getElementById("quiz");
const answerElements = document.querySelectorAll(".answer");
const questionElement = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitButton = document.getElementById("submit");
let currentQuiz = 0;
let score = 0;
let currentQuestion = {};
let availableQuestions = [];


// Pull in questions from API and store results in array
fetch('https://opentdb.com/api.php?amount=5&type=multiple')
    .then(response => {
        return response.json();
    })
    .then(trivia => {
        console.log(trivia.results);
        availableQuestions = trivia.results.map(loaded => {
            const formatQuest = {
                question: loaded.question
            };

            const ansChoices = [...loaded.incorrect_answers];
            formatQuest.correct = Math.floor(Math.random() * 3) + 1;
            ansChoices.splice(formatQuest.correct -1, 0, loaded.correct_answer);

            ansChoices.forEach((choice, index) => {
                formatQuest[(index+1)] = choice;
            })
            return formatQuest;
        });
        console.log(availableQuestions)
    })
    .catch(error => {
        console.log(error);
    })
    
    
    
// function getNewQuestion() {
//     // get a random question from available 
//     // const questionIndex = Math.floor(Math.random() * availableQuestions.length);
//     // increment question index/seen
//     currentQuestion = availableQuestions[currentQuiz];
//     // display question and choices
//     questionElement.innerText = currentQuestion.question;
//     a_text.innerText = currentQuestion[1];
//     b_text.innerText = currentQuestion[2];
//     c_text.innerText = currentQuestion[3];
//     d_text.innerText = currentQuestion[4];
//     console.log(a_text.innerText)
//     currentQuiz++;
// }


const deselectAnswers = () => {
    answerElements.forEach((answer) => (answer.checked = false));
};

const getSelected = () => {
    let answer;
    answerElements.forEach((answerElement) => {
        if (answerElement.checked) {
            answer = answerElement.id;
        }
    });
    return answer;
};

const loadQuiz = () => {
    deselectAnswers();
    // const currentQuestion = availableQuestions[currentQuiz];
    // questionElement.innerText = currentQuestion.question;
    // a_text.innerText = currentQuestion.a;
    // b_text.innerText = currentQuestion.b;
    // c_text.innerText = currentQuestion.c;
    // d_text.innerText = currentQuestion.d;
    currentQuestion = availableQuestions[currentQuiz];
    console.log(availableQuestions[currentQuiz])
    // display question and choices
    //questionElement.innerText = currentQuestion.question;
    // a_text.innerText = currentQuestion[1];
    // b_text.innerText = currentQuestion[2];
    // c_text.innerText = currentQuestion[3];
    // d_text.innerText = currentQuestion[4];
    // console.log(a_text.innerText)

};

loadQuiz();
    
submitButton.addEventListener("click", () => {
    const answer = getSelected();
    if (answer) {
        if (answer === availableQuestions[currentQuiz].correct) {
            score++;
            currentQuiz++;
            if (currentQuiz < availableQuestions.length) {
                loadQuiz();
            } else {
            quiz.innerHTML = `<h2>You answered ${score}/${availableQuestions.length} questions correctly</h2><button onclick="history.go(0)">Play Again</button>`
            }
        }
    }
});

