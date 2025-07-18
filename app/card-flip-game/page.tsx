'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const CARD_VALUES = ['🐶', '🐱', '🦊', '🐻', '🐼', '🦁', '🐸', '🐵'];
const getShuffledCards = () => {
  const cards = [...CARD_VALUES, ...CARD_VALUES]
    .map((value, i) => ({ id: i, value, flipped: false, matched: false }))
    .sort(() => Math.random() - 0.5);
  return cards;
};

export default function CardFlipGame() {
  const [cards, setCards] = useState(getShuffledCards());
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [lock, setLock] = useState(false);
  const [matches, setMatches] = useState(0);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    if (flippedIndices.length === 2) {
      setLock(true);
      setMoves(m => m + 1);
      const [i1, i2] = flippedIndices;
      if (cards[i1].value === cards[i2].value) {
        setTimeout(() => {
          setCards(prev => prev.map((card, idx) =>
            idx === i1 || idx === i2 ? { ...card, matched: true } : card
          ));
          setFlippedIndices([]);
          setLock(false);
          setMatches(m => m + 1);
        }, 700);
      } else {
        setTimeout(() => {
          setCards(prev => prev.map((card, idx) =>
            idx === i1 || idx === i2 ? { ...card, flipped: false } : card
          ));
          setFlippedIndices([]);
          setLock(false);
        }, 900);
      }
    }
  }, [flippedIndices, cards]);

  const handleCardClick = (idx: number) => {
    if (lock || cards[idx].flipped || cards[idx].matched) return;
    setCards(prev => prev.map((card, i) => i === idx ? { ...card, flipped: true } : card));
    setFlippedIndices(prev => [...prev, idx]);
  };

  const handleRestart = () => {
    setCards(getShuffledCards());
    setFlippedIndices([]);
    setLock(false);
    setMatches(0);
    setMoves(0);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 py-8 px-2">
      <div className="w-full max-w-md mb-4">
        <Link href="/" className="text-blue-700 hover:underline text-sm">&larr; Home</Link>
      </div>
      <h1 className="text-3xl font-bold mb-2 text-blue-800">Card Flip Memory Game</h1>
      <div className="flex flex-col sm:flex-row gap-4 items-center mb-6">
        <div className="text-gray-700">Matches: <span className="font-bold">{matches} / {CARD_VALUES.length}</span></div>
        <div className="text-gray-700">Moves: <span className="font-bold">{moves}</span></div>
        <button onClick={handleRestart} className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 transition font-semibold">Restart</button>
      </div>
      <div className="grid grid-cols-4 gap-4 mb-6 max-w-lg w-full">
        {cards.map((card, idx) => (
          <div
            key={card.id}
            className="perspective[800px]"
          >
            <button
              className="w-20 h-28 sm:w-24 sm:h-32 rounded-lg shadow-lg flex items-center justify-center text-3xl sm:text-4xl font-bold transition-all duration-300 bg-transparent border-none focus:outline-none cursor-pointer group"
              onClick={() => handleCardClick(idx)}
              disabled={card.flipped || card.matched || lock}
              tabIndex={0}
              aria-label={card.flipped || card.matched ? card.value : 'Hidden card'}
            >
              <div className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d ${card.flipped || card.matched ? 'rotate-y-0' : 'rotate-y-180'}`} style={{ transformStyle: 'preserve-3d' }}>
                {/* Card Front */}
                <div className="absolute inset-0 flex items-center justify-center bg-white border-2 border-blue-500 rounded-lg backface-hidden text-4xl" style={{ backfaceVisibility: 'hidden', zIndex: 2 }}>
                  {card.value}
                </div>
                {/* Card Back */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-blue-300 rounded-lg backface-hidden text-2xl text-white rotate-y-180" style={{ backfaceVisibility: 'hidden', zIndex: 1 }}>
                  ❓
                </div>
              </div>
            </button>
          </div>
        ))}
      </div>
      {matches === CARD_VALUES.length && <div className="text-green-600 font-bold mt-2 text-xl animate-bounce">🎉 You won in {moves} moves!</div>}
    </div>
  );
} 