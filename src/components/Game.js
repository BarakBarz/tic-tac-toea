import React, { useReducer } from 'react';
import Board from './Board';

const reducer = (state, action) => {
  switch (action.type) {
    case 'JUMP':
      return {
        ...state,
        xIsNext: action.payload.step % 2 === 0,
        history: state.history.slice(0, action.payload.step + 1),
      }; // remove previous history since step a user clicked

    case 'MOVE':
      return {
        ...state,
        history: state.history.concat({
          squares: action.payload.squares,
        }),
        xIsNext: !state.xIsNext,
      };

    default:
      return state;
  }
};

export default function Game() {
  const [state, dispatch] = useReducer(reducer, {
    xIsNext: true,
    history: [{ squares: Array(9).fill(null) }],
  });
  const { xIsNext, history } = state;

  const jumpTo = (step) => {
    dispatch({ type: 'JUMP', payload: { step } });
  };

  const handleClick = (i) => {
    const currentSquares = history[history.length - 1]; // get last element
    const squares = currentSquares.squares.slice();
    const winner = calculateWinner(squares);
    if (winner || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? 'X' : 'O';
    dispatch({ type: 'MOVE', payload: { squares } });
  };

  const currentSquares = history[history.length - 1];
  const winner = calculateWinner(currentSquares.squares);

  const gameStatus = winner
    ? winner === 'D'
      ? 'Draw'
      : 'winner is ' + winner
    : 'Next player is ' + (xIsNext ? 'X' : 'O');

  const moves = history.map((step, move) => {
    const description = move ? 'Go to #' + move : 'Start the Game';

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });
  const squares = Array(9).fill(null);

  return (
    <>
      <div className='game-board'>
        <Board
          onClick={(i) => handleClick(i)}
          squares={currentSquares.squares}
        />
      </div>
      <div className='game-info'>
        <div>{gameStatus}</div>
        <ul>{moves}</ul>
      </div>
    </>
  );
}

const calculateWinner = (square) => {
  return null;
};
