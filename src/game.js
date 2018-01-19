import React from 'react';
import Board from './board.js';
import History from "./history.js";

export default class Game extends React.Component {
    render() {
        return (
            <div>
                <Board/>
                <History/>
            </div>
        );
    }
}