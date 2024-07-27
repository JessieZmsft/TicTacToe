import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({xIsNext, squares, onPlay}) {
  function handleClick(i){
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquare = squares.slice();
    if (xIsNext) {
      nextSquare[i] = 'X';
    } else {
    nextSquare[i] = 'O';
    }
    onPlay(nextSquare);
  }

  const winner = calculateWinner(squares);
  let status;
  if(winner){
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
      <div className="status">{status}</div>
      {[0,3,6].map((rowStart) => (
        <div className="board-row">
          {[0,1,2].map((i) => (
            <Square value={squares[rowStart+i]} onSquareClick={() => handleClick(rowStart+i)} />
          ))}
        </div>
      ))}
    </>
  );
}

export default function Game() {
  const [ history, setHistory ] = useState([Array(9).fill(null)]);
  const [ currentMove, setCurrentMove ] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }
  
  function jumpTo(nextMove){
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, index) => {
    let description;
    if(index == currentMove){
      return <div>You are at move #{index}</div>
    } else if(index > 0){
      description = "Go to move #" + index;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={index}>
        <button onClick={() => jumpTo(index)}>{description}</button>
      </li>
    )
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(sq) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  console.log(sq);
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (sq[a] && (sq[a] === sq[b]) && (sq[a] === sq[c])) {
      return sq[a];
    }
  }
  return null;
}