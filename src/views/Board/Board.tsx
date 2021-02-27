import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useMainActor } from "../../hooks";
import Row from "./Row";
import { BoardRow } from "../../models";
import { BOARD_SIZE } from "../../constants";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: BOARD_SIZE,
      display: "flex",
      flexDirection: "column",
    },
  })
);

function Board() {
  const [boardState] = useMainActor();

  const classes = useStyles();

  const board = boardState?.context.board ?? [];

  return (
    <div className={classes.root}>
      {board.map((row: BoardRow, rId: number) => {
        return <Row key={`r-${rId + 1}`} row={row} rId={rId} />;
      })}
    </div>
  );
}

export default Board;
