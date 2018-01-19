import React from 'react';
import Board from './board.js';
import History from "./history";

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                status: 'Next player: X'
            }],
            xIsNext: true,
            stepNumber: 0,
        };
    }

    calculateWinner(squares) {
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

    handleJump(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    handleClick(i) {
        const current = this.state.history[this.state.stepNumber];

        if (current.gameOver || current.squares[i]) {
            return;
        }

        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const squares = history[history.length - 1].squares.slice();

        squares[i] = this.state.xIsNext ? 'X' : 'O';
        const winner = this.calculateWinner(squares);

        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'O' : 'X');
        }

        this.setState({
            history: history.concat([{
                squares: squares,
                status: status,
                gameOver: !!winner
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    render() {
        const current = this.state.history[this.state.stepNumber];

        return (
            <div>
                <Board
                    squares={current.squares}
                    onClick={(i) => this.handleClick(i)}
                />
                <History
                    status={current.status}
                    history={this.state.history}
                    onJump={(move) => this.handleJump(move)}
                />
            </div>
        );
    }
}

export default Game;