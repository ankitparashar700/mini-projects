'use client';

import { useState } from 'react';
import Link from 'next/link';

const buttons = [
  ['7', '8', '9', '/'],
  ['4', '5', '6', '*'],
  ['1', '2', '3', '-'],
  ['0', '.', '=', '+'],
  ['C']
];

export default function Calculator() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleClick = (val: string) => {
    if (val === 'C') {
      setInput('');
      setResult('');
    } else if (val === '=') {
      try {
        // eslint-disable-next-line no-eval
        const evalResult = eval(input);
        setResult(evalResult.toString());
      } catch {
        setResult('Error');
      }
    } else {
      setInput(input + val);
      setResult('');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-8 px-2">
      <div className="w-full max-w-xs mb-4">
        <Link href="/" className="text-blue-700 hover:underline text-sm">&larr; Home</Link>
      </div>
      <h1 className="text-3xl font-bold mb-6 text-blue-800">Calculator</h1>
      <div className="bg-white rounded shadow p-6 flex flex-col items-center w-full max-w-xs">
        <div className="w-full mb-4">
          <div className="bg-gray-100 rounded text-right px-3 py-2 text-xl font-mono min-h-[2.5rem]">{input || '0'}</div>
          <div className="text-right text-lg text-blue-700 font-semibold min-h-[1.5rem]">{result}</div>
        </div>
        <div className="grid grid-cols-4 gap-3 w-full">
          {buttons.flat().map((btn, i) => (
            <button
              key={i}
              className={
                `rounded-lg shadow-md text-xl font-bold py-4 transition-all active:scale-95 ` +
                (btn === '=' ? 'bg-blue-600 text-white col-span-1' :
                 btn === 'C' ? 'bg-red-500 text-white col-span-4' :
                 ['+', '-', '*', '/'].includes(btn) ? 'bg-gray-200 text-blue-700' :
                 'bg-gray-100 text-gray-900')
              }
              style={{ gridColumn: btn === 'C' ? 'span 4' : undefined }}
              onClick={() => handleClick(btn)}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
} 