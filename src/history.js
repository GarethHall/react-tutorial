import React from 'react';

class History extends React.Component {

    moves() {
        return this.props.history.map((step, move) => {
            const desc = move ?
                'Go to move #' + move :
                'Go to game start';
            return (
                <li key={move}>
                    <button onClick={() => this.props.onJump(move)}>{desc}</button>
                </li>
            );
        })
    };

    render() {
        return (
            <div className="game-info">
                <div>{this.props.status}</div>
                <ol>{this.moves()}</ol>
            </div>
        );
    }
}

export default History;