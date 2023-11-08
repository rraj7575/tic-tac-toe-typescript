import "./cell.css";
import type { GameCellValue } from "../types";

type CellProps = {
  value: GameCellValue;
  onClickCell: () => void;
  classes?: string;
};

const Cell = ({ value, classes, onClickCell }: CellProps) => {
  return (
    <div className={`cell ${classes ? classes : ""}`} onClick={onClickCell}>
      {value}
    </div>
  );
};

export default Cell;
