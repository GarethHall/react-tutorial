import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Game from './game.js';
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux';

let calculateWinner = function (squares) {
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
};

let boardReducer = (state = {}, action) => {
    switch (action.type) {
        case 'MAKE_PLAY':

            const current = state.history[state.stepNumber];

            if (current.gameOver || current.squares[action.squareIndex]) {
                return state;
            }

            const history = state.history.slice(0, state.stepNumber + 1);
            const squares = history[history.length - 1].squares.slice();

            squares[action.squareIndex] = state.xIsNext ? 'X' : 'O';

            const winner = calculateWinner(squares);

            let status;
            if (winner) {
                status = 'Winner: ' + winner;
            } else {
                status = 'Next player: ' + (state.xIsNext ? 'O' : 'X');
            }

            return {
                history: history.concat([{
                    squares: squares,
                    status: status,
                    gameOver: !!winner
                }]),
                stepNumber: history.length,
                xIsNext: !state.xIsNext,
            }
        case 'HISTORY_JUMP':
            let ns = {
                ...state,
                stepNumber: action.step,
                xIsNext: (action.step % 2) === 0,
            };
            console.log(action);
            console.log(state);
            console.log(ns);

            return ns;
        default:
            return state
    }
};

let intialState = {
    board: {
        history: [{
            squares: Array(9).fill(null),
            status: 'Next player: X'
        }],
        xIsNext: true,
        stepNumber: 0,
    }
};

let store = createStore(combineReducers({ board: boardReducer }), intialState);

ReactDOM.render(
    <Provider store={store} >
        <Game />
    </Provider>,
    document.getElementById('root')
);