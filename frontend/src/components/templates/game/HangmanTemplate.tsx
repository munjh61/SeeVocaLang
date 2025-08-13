import { useState } from "react";

type HangmanDrawingProps = {
  wrongGuesses: number;
};

const HangmanDrawing = ({ wrongGuesses }: HangmanDrawingProps) => {
  return (
    <div className="flex flex-col items-center">
      {/* 틀 */}
      <svg height="200" width="200" className="mb-4">
        {/* 기둥 */}
        <line x1="20" y1="180" x2="100" y2="180" stroke="black" strokeWidth="4" />
        <line x1="60" y1="20" x2="60" y2="180" stroke="black" strokeWidth="4" />
        <line x1="60" y1="20" x2="140" y2="20" stroke="black" strokeWidth="4" />
        <line x1="140" y1="20" x2="140" y2="50" stroke="black" strokeWidth="4" />
        
        {/* 머리 */}
        {wrongGuesses > 0 && <circle cx="140" cy="70" r="20" stroke="black" strokeWidth="4" fill="none" />}
        {/* 몸 */}
        {wrongGuesses > 1 && <line x1="140" y1="90" x2="140" y2="140" stroke="black" strokeWidth="4" />}
        {/* 왼팔 */}
        {wrongGuesses > 2 && <line x1="140" y1="100" x2="110" y2="120" stroke="black" strokeWidth="4" />}
        {/* 오른팔 */}
        {wrongGuesses > 3 && <line x1="140" y1="100" x2="170" y2="120" stroke="black" strokeWidth="4" />}
        {/* 왼다리 */}
        {wrongGuesses > 4 && <line x1="140" y1="140" x2="110" y2="170" stroke="black" strokeWidth="4" />}
        {/* 오른다리 */}
        {wrongGuesses > 5 && <line x1="140" y1="140" x2="170" y2="170" stroke="black" strokeWidth="4" />}
      </svg>
    </div>
  );
};

export  function HangmanTemplate() {
  const word = "HELLO";
  const [guesses, setGuesses] = useState<string[]>([]);
  const wrongGuesses = guesses.filter(letter => !word.includes(letter)).length;

  const handleGuess = (letter: string) => {
    if (!guesses.includes(letter)) {
      setGuesses([...guesses, letter]);
    }
  };

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  return (
    <div className="flex flex-col items-center p-6 gap-6 max-w-lg mx-auto">
      {/* 그림 + 단어 */}
      <div className="flex flex-col items-center gap-4">
        <HangmanDrawing wrongGuesses={wrongGuesses} />

        {/* 단어 표시 */}
        <div className="flex gap-2 text-3xl font-bold tracking-widest">
          {word.split("").map((letter, index) => (
            <span key={index} className="border-b-4 border-black min-w-[30px] text-center">
              {guesses.includes(letter) ? letter : ""}
            </span>
          ))}
        </div>
      </div>

      {/* 알파벳 버튼 */}
      <div className="grid grid-cols-7 gap-2">
        {alphabet.map(letter => (
          <button
            key={letter}
            onClick={() => handleGuess(letter)}
            disabled={guesses.includes(letter)}
            className={`w-12 h-12 text-lg font-bold rounded-lg border-2 border-gray-700
              ${guesses.includes(letter) ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"}`}
          >
            {letter}
          </button>
        ))}
      </div>
    </div>
  );
}
