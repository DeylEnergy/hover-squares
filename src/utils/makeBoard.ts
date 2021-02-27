import makeBoardRow from "./makeBoardRow";

export default function makeBoard(size: number) {
  return Array(size).fill(makeBoardRow(size));
}
