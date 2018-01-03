import React from 'react';

function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    boardRow(i) {
        let squares = [0, 1, 2].map(j => this.renderSquare(j + (i * 3)));

        return (
            <div key={i} className="board-row">
                {squares}
            </div>
        )
    }

    render() {
        let rows = [0, 1, 2].map(i => this.boardRow(i));

        return (
            <div>
                {rows}
            </div>
        );
    }
}

export default Board;