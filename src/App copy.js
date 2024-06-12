import './App.css';

import { useState } from 'react';

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
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

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

/**
 *

 Step 1 ： 分析函数调用关系

 Game
 |
 |---> Board
 |       |
 |       |---> Square (x9)
 |       |
 |       |---> handleClick
 |               |
 |               |---> calculateWinner
 |               |
 |               |---> onPlay
 |                       |
 |                       |---> handlePlay
 |
 |---> jumpTo


 Step 2: 组件布局（比较简单） The Render Tree
 从最顶层开始 ，直接看 jsx return 的组件




 Step 3: 一个点击动作的流程
 User Clicks a Square:

 The user clicks a button rendered by the Square component.
 The onSquareClick function (passed down from the Board component) is called.

 onSquareClick Calls handleClick:

 In the Board component, onSquareClick is defined as a call to the handleClick function with the index of the clicked square.
 The handleClick function is executed.

 handleClick in Board Component:

 handleClick first checks if there is already a winner or if the square is already filled by calling calculateWinner and checking the squares array. If either condition is true, the function returns early.
 If the square is empty and there is no winner, a new array (nextSquares) is created as a copy of the current squares array.
 Depending on the value of xIsNext, it sets the clicked square (nextSquares[i]) to 'X' or 'O'.
 The onPlay function (passed down from the Game component) is called with nextSquares as the argument.

 onPlay in Game Component:

 The onPlay function is defined in the Game component as handlePlay.
 handlePlay creates a new history array (nextHistory) by slicing the current history up to the current move and appending nextSquares.
 setHistory is called with nextHistory to update the state with the new history of moves.
 setCurrentMove is called with the new length of nextHistory minus one to update the current move to the latest move.

 State Updates and Re-Rendering:

 React re-renders the Game component with the updated state.
 The Game component calculates xIsNext based on the updated currentMove.
 The currentSquares is set to the latest move in the history.
 The Board component is re-rendered with the updated squares (now currentSquares) and the new value of xIsNext.

 Rendering Updated Board:

 The Board component re-renders the Square components with the updated values.
 The status message is updated to show the next player or the winner if one exists.

 */

