document.addEventListener('DOMContentLoaded', () => {
    const beforeScreen = document.querySelector('.before');
    const resultScreen = document.querySelector('.result');
    const buttons = document.querySelectorAll('.btn');
    const clearButton = document.querySelector('.calculate');

    let currentInput = '';
    let previousInput = '';
    let operator = null;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.textContent;

            if (button.classList.contains('num') || button.classList.contains('comma')) {
                handleNumber(value);
            } else if (button.classList.contains('op') || button.classList.contains('plus')) {
                handleOperator(value);
            } else if (button.classList.contains('equals')) {
                handleEquals();
            }
        });
    });

    clearButton.addEventListener('click', () => {
        clearCalculator();
    });

    function handleNumber(num) {
        if (num === '.' && currentInput.includes('.')) return;
        currentInput += num;
        updateDisplay();
    }

    function handleOperator(op) {
        if (currentInput === '') return;
        if (previousInput !== '') {
            handleEquals();
        }
        operator = op;
        previousInput = currentInput;
        currentInput = '';
        updateDisplay();
    }

    function handleEquals() {
        if (currentInput === '' || previousInput === '' || operator === null) return;

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
            case 'x':
                result = prev * current;
                break;
            case '/':
                result = prev / current;
                break;
            default:
                return;
        }

        currentInput = result.toString();
        previousInput = '';
        operator = null;
        updateDisplay();
    }

    function clearCalculator() {
        currentInput = '';
        previousInput = '';
        operator = null;
        updateDisplay();
    }

    function updateDisplay() {
        if (operator) {
            beforeScreen.textContent = `${previousInput} ${operator}`;
        } else {
            beforeScreen.textContent = '';
        }
        resultScreen.textContent = currentInput;
    }
});