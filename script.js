let currentOperandElement = document.getElementById('currentOperand');
let previousOperandElement = document.getElementById('previousOperand');

let currentInput = '0';
let previousInput = '';
let operator = null;
let shouldResetScreen = false;

function updateDisplay() {
  currentOperandElement.innerText = currentInput;
  if (operator !== null) {
    previousOperandElement.innerText = `${previousInput} ${getOperatorSymbol(operator)}`;
  } else {
    previousOperandElement.innerText = '';
  }
}

function getOperatorSymbol(op) {
  if (op === '*') return '×';
  if (op === '/') return '÷';
  if (op === '-') return '−';
  return op;
}

function appendNumber(number) {
  if (currentInput === '0' || shouldResetScreen) {
    resetScreen();
  }
  if (number === '.' && currentInput.includes('.')) return;
  currentInput += number;
  updateDisplay();
}

function resetScreen() {
  currentInput = '';
  shouldResetScreen = false;
}

function clearDisplay() {
  currentInput = '0';
  previousInput = '';
  operator = null;
  shouldResetScreen = false;
  updateDisplay();
}

function deleteLast() {
  if (shouldResetScreen) return;
  if (currentInput.length === 1 || (currentInput.length === 2 && currentInput.startsWith('-'))) {
    currentInput = '0';
  } else {
    currentInput = currentInput.slice(0, -1);
  }
  updateDisplay();
}

function appendOperator(op) {
  if (operator !== null && !shouldResetScreen) {
    calculate();
  }
  previousInput = currentInput;
  operator = op;
  shouldResetScreen = true;
  updateDisplay();
}

function calculate() {
  if (operator === null || shouldResetScreen) return;

  let result;
  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);

  if (isNaN(prev) || isNaN(current)) return;

  switch (operator) {
    case '+':
      result = prev + current;
      break;
    case '-':
      result = prev - current;
      break;
    case '*':
      result = prev * current;
      break;
    case '/':
      if (current === 0) {
        alert("Tidak bisa membagi dengan nol!");
        clearDisplay();
        return;
      }
      result = prev / current;
      break;
    case '%':
      result = (prev * current) / 100;
      break;
    default:
      return;
  }

  // Menjaga presisi angka desimal
  currentInput = Math.round(result * 100000000) / 100000000 + '';
  operator = null;
  previousInput = '';
  shouldResetScreen = true;
  updateDisplay();
}