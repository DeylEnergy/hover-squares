import { SelectedCell, BoardRow } from "../models";

export default function getHoveredColumns(row: BoardRow, rowId: number) {
  return row.reduce(
    (totalCells: SelectedCell[], currentColumn, columnId: number) =>
      currentColumn
        ? [...totalCells, { rowPlace: rowId + 1, columnPlace: columnId + 1 }]
        : totalCells,
    []
  );
}
