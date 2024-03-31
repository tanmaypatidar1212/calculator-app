// import React, { useState } from 'react';
// import './App.css';

// function App() {
//   const [result, setResult] = useState('');
//   const [currentOperand, setCurrentOperand] = useState('');
//   const [previousOperand, setPreviousOperand] = useState('');
//   const [operation, setOperation] = useState('');

//   const clearResult = () => {
//     setResult('');
//     setCurrentOperand('');
//     setPreviousOperand('');
//     setOperation('');
//   };

//   const addToResult = (value) => {
//     if (value === '.' && currentOperand.includes('.')) return;
//     if (value === '0' && currentOperand === '0') return;

//     setCurrentOperand((currentOperand) => currentOperand + value);
//   };

//   const handleOperation = (op) => {
//     if (currentOperand === '') return;
//     if (previousOperand !== '') {
//       const value = calculate();
//       setResult(value);
//       setPreviousOperand(value);
//       setCurrentOperand('');
//     } else {
//       setPreviousOperand(currentOperand);
//       setCurrentOperand('');
//     }
//     setOperation(op);
//   };

//   const calculateResult = () => {
//     if (currentOperand === '' || previousOperand === '') return;
//     const value = calculate();
//     setResult(value);
//     setPreviousOperand('');
//     setCurrentOperand(value);
//     setOperation('');
//   };

//   const calculate = () => {
//     let result;
//     const prev = parseFloat(previousOperand);
//     const current = parseFloat(currentOperand);
//     if (isNaN(prev) || isNaN(current)) return '';
//     switch (operation) {
//       case '+':
//         result = prev + current;
//         break;
//       case '-':
//         result = prev - current;
//         break;
//       case '*':
//         result = prev * current;
//         break;
//       case '/':
//         result = prev / current;
//         break;
//       default:
//         return '';
//     }
//     return result.toString();
//   };

//   return (
//     <div className="calculator">
//       <div className="result">{result || currentOperand || '0'}</div>
//       <div className="buttons">
//         <button onClick={clearResult}>C</button>
//         <button onClick={() => addToResult('7')}>7</button>
//         <button onClick={() => addToResult('8')}>8</button>
//         <button onClick={() => addToResult('9')}>9</button>
//         <button onClick={() => handleOperation('/')}>÷</button>
//         <button onClick={() => addToResult('4')}>4</button>
//         <button onClick={() => addToResult('5')}>5</button>
//         <button onClick={() => addToResult('6')}>6</button>
//         <button onClick={() => handleOperation('*')}>×</button>
//         <button onClick={() => addToResult('1')}>1</button>
//         <button onClick={() => addToResult('2')}>2</button>
//         <button onClick={() => addToResult('3')}>3</button>
//         <button onClick={() => handleOperation('-')}>-</button>
//         <button onClick={() => addToResult('0')}>0</button>
//         <button onClick={() => addToResult('.')}>.</button>
//         <button onClick={calculateResult}>=</button>
//         <button onClick={() => handleOperation('+')}>+</button>
//       </div>
//     </div>
//   );
// }

// export default App;



import React, { useState } from 'react';
import './App.css';

function App() {
  const [result, setResult] = useState('');
  const [operation, setOperation] = useState('');

  const clearResult = () => {
    setResult('');
    setOperation('');
  };

  const addToResult = (value) => {
    if (value === '.' && result.includes('.') && !result.split(/[+\-*/]/).slice(-1)[0].includes('.')) return;
    if (value === '0' && result === '0') return;

    setResult((prevResult) => prevResult + value);
  };

  const handleOperation = (op) => {
    if (operation !== '') {
      const value = calculate();
      setResult(value);
    }

    setOperation(op);
    setResult((prevResult) => prevResult + op);
  };

  const calculateResult = () => {
    const value = calculate();
    setResult(value);
    setOperation('');
  };

  const calculate = () => {
    const operations = {
      '+': (a, b) => a + b,
      '-': (a, b) => a - b,
      '*': (a, b) => a * b,
      '/': (a, b) => a / b,
    };

    const operands = result.split(/[+\-*/]/);
    const operators = result.split(/\d+\.?\d*/g).filter(Boolean);

    let value = parseFloat(operands[0]);

    for (let i = 1; i < operands.length; i++) {
      const operator = operators[i - 1];
      const operand = parseFloat(operands[i]);
      value = operations[operator](value, operand);
    }

    return isNaN(value) ? 'Error' : value.toString();
  };

  return (
    <div className="calculator">
      <div className="result">{result || '0'}</div>
      <div className="buttons">
        <button onClick={clearResult}>C</button>
        <button onClick={() => addToResult('7')}>7</button>
        <button onClick={() => addToResult('8')}>8</button>
        <button onClick={() => addToResult('9')}>9</button>
        <button onClick={() => handleOperation('/')}>÷</button>
        <button onClick={() => addToResult('4')}>4</button>
        <button onClick={() => addToResult('5')}>5</button>
        <button onClick={() => addToResult('6')}>6</button>
        <button onClick={() => handleOperation('*')}>×</button>
        <button onClick={() => addToResult('1')}>1</button>
        <button onClick={() => addToResult('2')}>2</button>
        <button onClick={() => addToResult('3')}>3</button>
        <button onClick={() => handleOperation('-')}>-</button>
        <button onClick={() => addToResult('0')}>0</button>
        <button onClick={() => addToResult('.')}>.</button>
        <button onClick={calculateResult}>=</button>
        <button onClick={() => handleOperation('+')}>+</button>
      </div>
    </div>
  );
}

export default App;



