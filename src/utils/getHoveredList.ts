import { SelectedCell, BoardRow } from "../models";
import getHoveredColumns from "./getHoveredColumns";

export default function getHoveredList(board: BoardRow[]) {
  return board.reduce(
    (total: SelectedCell[], row, rowId: number) => [
      ...total,
      ...getHoveredColumns(row, rowId),
    ],
    []
  );
}
