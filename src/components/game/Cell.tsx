import {GameStateValue} from './TicTacToe'
import React from "react";
import './cell.css'


type CellPropType = {
    value: GameStateValue,
    onClickCell: () => void,
    classes?: string
}


const Cell:React.FC<CellPropType> = ({value, classes, onClickCell}) => {
    return (<div className={`cell ${classes ? classes : ''}`} onClick={onClickCell}>
        {value}
    </div>)
}

export default Cell