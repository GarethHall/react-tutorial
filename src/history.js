import React from 'react';
import { connect } from 'react-redux'

class History extends React.Component {

    moves() {
        return this.props.history.map((step, move) => {
            const desc = move ?
                'Go to move #' + move :
                'Go to game start';
            return (
                <li key={move}>
                    <button onClick={() => this.props.historyJump(move)}>{desc}</button>
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

const mapStateToProps = state => {
    return {
        history : state.board.history,
        status: state.board.history[state.board.stepNumber].status
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      historyJump : step => dispatch({
        type : 'HISTORY_JUMP',
        step : step
      })
    }
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(History)
