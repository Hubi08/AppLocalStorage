const displayExpression = document.querySelector(
  '.calculator__display-expression'
);
const displayResult = document.querySelector('.calculator__display-result');

// numbers btn
const numberButtons = document.querySelectorAll('.light-btn');
const operators = document.querySelectorAll('.grey-btn');
// clear btn
const clearButton = document.querySelector('.clearAll');

// equal btn
const equalSign = document.querySelector('#operator--sign-equal');

let result = '';
let resultShowEval;
let currentNumber = '';
let displayNumber = '';
let displaySign = '';

const showResult = () => {
  const calculatedValue = eval(currentNumber || null);
  if (displayExpression.innerHTML.includes('=')) {
    return;
  }
  resultShowEval = calculatedValue;
  result = displayExpression.innerHTML;

  displayExpression.innerHTML = `${result} =`;
  displayResult.innerHTML = calculatedValue;
};

const checkOperatorSign = (operatorSign) => {
  if (operatorSign === '+') {
    displaySign = operatorSign;
    currentNumber += operatorSign;
    displayExpression.innerHTML += displaySign;
  }

  if (operatorSign === '-') {
    displaySign = operatorSign;
    currentNumber += operatorSign;
    displayExpression.innerHTML += displaySign;
  }

  if (operatorSign === 'x') {
    displaySign = operatorSign;
    const cleanOperator = operatorSign.replace('x', '*');
    currentNumber += cleanOperator;
    displayExpression.innerHTML += displaySign;
  }

  if (operatorSign === '÷') {
    displaySign = operatorSign;
    const cleanOperator = operatorSign.replace('÷', '/');
    currentNumber += cleanOperator;
    displayExpression.innerHTML += displaySign;
  }
};

numberButtons.forEach((numberButton) => {
  numberButton.addEventListener('click', (e) => {
    const number = e.target.dataset.number;

    if (displayExpression.innerHTML === '' && number.includes('.')) {
      return;
    }
    if (displayExpression.innerHTML.includes('.') && number.includes('.')) {
      return;
    }

    //logic
    currentNumber += number;
    displayExpression.innerHTML += number;
  });
});

operators.forEach((operator) => {
  operator.addEventListener('click', (e) => {
    const operatorSign = e.target.innerHTML.trim();

    if (
      displayExpression.innerHTML === '' ||
      displayExpression.innerHTML.includes(operatorSign)
    ) {
      return;
    }

    if (result) {
      displayExpression.innerHTML = resultShowEval;
    }
    checkOperatorSign(operatorSign);
  });
});

equalSign.addEventListener('click', () => {
  showResult();
});

clearButton.addEventListener('click', () => {
  result = '';
  mathSign = '';
  currentNumber = '';
  displayExpression.innerHTML = '';
  displayResult.innerHTML = '';
});
