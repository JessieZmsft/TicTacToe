import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Board() {
  const [squares, nextSquares] = useState(Array(9).fill(null));

  function handleClick(i){
    const nextSquare = squares.slice();
    nextSquare[i] = 'X';
    nextSquares(nextSquare);
  }

  return (
    <>
      {[0,3,6].map((rowStart) => (
        <div className="board-row">
          {/* {squares.slice(rowStart, rowStart + 3).map((value, i) => (
            <Square key={rowStart + i} value={value} onSquareClick={() => handleClick(rowStart + i)} />
          ))} */}
          {[0,1,2].map((i) => (
            <Square value={squares[rowStart+i]} onSquareClick={() => handleClick(rowStart+i)} />
          ))}
        </div>
      ))}
    </>
  );
}
