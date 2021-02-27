import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useMainActor } from "../../hooks";
import { BoardRow } from "../../models";
// import "./Row.css";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      width: "100%",
      flexGrow: 1,
    },
    column: {
      display: "flex",
      outline: "1px solid #b3b3b3",
      flexGrow: 1,
      cursor: "pointer",
      transition: "background ease-in-out 0.2s",
    },
  })
);

interface RowProps {
  row: BoardRow;
  rId: number;
}

const HOVERED_COLOR = "#303f9f";

function Row({ row, rId }: RowProps) {
  const [, sendBoardActor] = useMainActor();

  const classes = useStyles();

  const handleMouseOver = (cId: number) => {
    sendBoardActor({
      type: "SELECT_CELL",
      payload: {
        rowId: rId,
        columnId: cId,
      },
    });
  };

  return (
    <div className={classes.root}>
      {row.map((column, cId: number) => (
        <div
          key={`${rId}-${cId}`}
          className={classes.column}
          style={{
            background: column ? HOVERED_COLOR : "white",
          }}
          onMouseEnter={() => handleMouseOver(cId)}
        >
          &nbsp;
        </div>
      ))}
    </div>
  );
}

export default Row;
