import "./cell.css";
import type { GameStateValue } from "../types";

type CellPropType = {
  value: GameStateValue;
  onClickCell: () => void;
  classes?: string;
};

const Cell = ({ value, classes, onClickCell }: CellPropType) => {
  return (
    <div className={`cell ${classes ? classes : ""}`} onClick={onClickCell}>
      {value}
    </div>
  );
};

export default Cell;
