import React, { useState } from 'react';
import { format } from 'date-fns';
import './App.css';
import Display from './DIsplay';
import CalcButton from './CalcButton';
import HistoryPanel from './HistoryPanel';

interface HistoryItem {
  expression: string;
  time: string;
}

const App: React.FC = () => {
  const [input, setInput] = useState<string>('0');
  const [previousNum, setPreviousNum] = useState<string>('');
  const [operator, setOperator] = useState<string>('');
  const [lastCalcTime, setLastCalcTime] = useState<string>('Never');
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const handleNum = (val: string) => {
    if (input === '0' && val !== '.') setInput(val);
    else if (!(val === '.' && input.includes('.'))) setInput(input + val);
  };

  const handleOp = (op: string) => {
    setOperator(op);
    setPreviousNum(input);
    setInput('0');
  };

  const calculate = () => {

    if (!operator || !previousNum) return;

    const current = parseFloat(input);
    const prev = parseFloat(previousNum);

    if (isNaN(prev) || isNaN(current)) return;

    let result = 0;

    if (operator === '+') result = prev + current;
    if (operator === '-') result = prev - current;
    if (operator === '*') result = prev * current;
    if (operator === '/') result = current !== 0 ? prev / current : 0;

    const time = format(new Date(), 'HH:mm:ss');

    const expression = `${prev} ${operator} ${current} = ${result}`;

    setHistory([{ expression, time }, ...history]);

    setLastCalcTime(time);
    setInput(String(result));
    setPreviousNum('');
    setOperator('');
  };

  const clear = () => {
    setInput('0');
    setPreviousNum('');
    setOperator('');
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <div className="app-container">

      <div className="layout">

        {/* Calculator */}
        <div className="calculator">

          <h1 className="app-title">Calculator</h1>

          <Display
            previous={previousNum}
            op={operator}
            current={input}
            time={lastCalcTime}
          />

          <div className="keypad">
            <button className="btn clear" onClick={clear}>C</button>
            <CalcButton label="/" className="btn operator" onClick={handleOp} />

            <CalcButton label="7" className="btn" onClick={handleNum} />
            <CalcButton label="8" className="btn" onClick={handleNum} />
            <CalcButton label="9" className="btn" onClick={handleNum} />
            <CalcButton label="*" className="btn operator" onClick={handleOp} />

            <CalcButton label="4" className="btn" onClick={handleNum} />
            <CalcButton label="5" className="btn" onClick={handleNum} />
            <CalcButton label="6" className="btn" onClick={handleNum} />
            <CalcButton label="-" className="btn operator" onClick={handleOp} />

            <CalcButton label="1" className="btn" onClick={handleNum} />
            <CalcButton label="2" className="btn" onClick={handleNum} />
            <CalcButton label="3" className="btn" onClick={handleNum} />
            <CalcButton label="+" className="btn operator" onClick={handleOp} />

            <CalcButton label="0" className="btn zero" onClick={handleNum} />
            <CalcButton label="." className="btn" onClick={handleNum} />
            <button className="btn equals" onClick={calculate}>=</button>
          </div>
        </div>

        {/* History Panel */}
       <HistoryPanel
          history={history}
          clearHistory={clearHistory}
        />

      </div>
    </div>
  );
};

export default App;