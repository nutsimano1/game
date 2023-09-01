    document.addEventListener('DOMContentLoaded', function () {
    const startButton = document.getElementById('start');
    const scoreElement = document.getElementById('score');
    const firstOperandInput = document.getElementById('op1');
    const scOperandInput = document.getElementById('op2');
    const userInput = document.getElementById('answer');
    const answerButton = document.getElementById('answerButton');
    const rsText = document.getElementById('rsText');

    const operatorRadioButtons = document.getElementsByName('operator');
    const selectedText = document.getElementById('selectedText');

    let score = 0;
    let questionCount = 0;
    let selectedOperator = "+";
    let canGenerateQuestion = false;

    function generateQuestion() {
        if (canGenerateQuestion) {
          firstOperandInput.value = Math.floor(Math.random() * 10);
          scOperandInput.value = Math.floor(Math.random() * 10);
        }
    }

    function checkAnswer() {
        if (userInput.value === '') {
          rsText.textContent = 'Please fill in the answer.';
          rsText.classList.remove('correct', 'wrong');
          rsText.classList.add('empty');
            return;
        }

        const no1 = parseFloat(firstOperandInput.value);
        const no2 = parseFloat(scOperandInput.value);
        const answer = parseFloat(userInput.value);

        const precision = 2;
        const correctAnswer = (selectedOperator === 'add') ? (no1 + no2) :
                             (selectedOperator === 'subtract') ? (no1 - no2) :
                             (selectedOperator === 'multiply') ? (no1 * no2) :
                             (selectedOperator === 'divide') ? (no1 / no2) : 0;
        const correctAnswerRounded = correctAnswer.toFixed(precision);
        const answerRounded = answer.toFixed(precision);

        if (answerRounded === correctAnswerRounded) {
          rsText.textContent = 'The answer is correct!';
          rsText.classList.remove('empty', 'wrong');
          rsText.classList.add('correct');
            score++;
            scoreElement.textContent =  ` ( ${score} / ${questionCount} )`;
        } else {
          rsText.textContent = 'Wrong answer. Try answer again.';
          rsText.classList.remove('empty', 'correct');
          rsText.classList.add('wrong');
        }

        questionCount++;
        generateQuestion();
        userInput.value = '';
        scoreElement.textContent =  `( ${score} / ${questionCount} )`;
    }

    start.addEventListener('click', function () {
        score = 0;
        questionCount = 1;
        scoreElement.textContent = ' SCORE';
        canGenerateQuestion = true;
        generateQuestion();
        rsText.textContent = '';
        setDefaultOperator();
    });

    function setDefaultOperator() {
      operatorRadioButtons[0].checked = true;
        selectedOperator = operatorRadioButtons[0].value;
        selectedText.textContent = '+';
    }

    for (let i = 0; i < operatorRadioButtons.length; i++) {
      operatorRadioButtons[i].addEventListener('change', function () {
            selectedOperator = operatorRadioButtons[i].value;
            selectedText.textContent = operatorRadioButtons[i].nextSibling.textContent.trim();

            if (userInput.value !== '') {
                generateQuestion();
                rsText.textContent = '';
            }
        });
    }

    answerButton.addEventListener('click', checkAnswer);

    setDefaultOperator();

    generateQuestion();
});