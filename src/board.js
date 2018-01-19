import React from 'react';
import { connect } from 'react-redux'

function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    renderSquare(squareIndex) {
        return (
            <Square
                key={squareIndex}
                value={this.props.squares[squareIndex]}
                onClick={() => this.props.makePlay(squareIndex)}
            />
        );
    }

    boardRow(rowIndex) {
        let squares = [0, 1, 2].map(i => this.renderSquare(i + (rowIndex * 3)));

        return (
            <div key={rowIndex} className="board-row">
                {squares}
            </div>
        )
    }

    render() {
        let rows = [0, 1, 2].map(i => this.boardRow(i));

        return (
            <div className="game-board">
                <div>
                    {rows}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        squares : state.board.history[state.board.stepNumber].squares
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      makePlay : squareIndex => dispatch({
        type : 'MAKE_PLAY',
        squareIndex : squareIndex
      })
    }
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Board)