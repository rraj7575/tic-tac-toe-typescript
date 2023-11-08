import Cell from "../cell/Cell";
import type { GameCellValue } from "../types";
import "./row.css";

type RowProps = {
  rowColums: { index: number; className: string }[];
  getCellValue: (cellNo: number) => GameCellValue;
  onClickCell: (index: number) => void;
};

export function Row({ rowColums, getCellValue, onClickCell }: RowProps) {
  return (
    <div className="row">
      {rowColums.map((rowDetails) => {
        const { index, className } = rowDetails;
        return (
          <Cell
            value={getCellValue(index)}
            classes={className}
            onClickCell={() => onClickCell(index)}
          />
        );
      })}
    </div>
  );
}
