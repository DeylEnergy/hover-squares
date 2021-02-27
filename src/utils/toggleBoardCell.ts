import { BoardRow } from "../models";
import flipBinaryValue from "./flipBinaryValue";

export default function toggleBoardCell(
  board: BoardRow[],
  { rowId, columnId }: { rowId: number; columnId: number }
) {
  return board.map((rows, rId: number) =>
    rows.map((columnValue, cId) =>
      rId === rowId && cId === columnId
        ? flipBinaryValue(columnValue)
        : columnValue
    )
  );
}
