import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { useMainActor, useSmallDisplay } from "../../hooks";
import { throttle, getHoveredList } from "../../utils";
import { SelectedCell, BoardRow } from "../../models";
import VirtualizedList from "./VirtualizedList";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    headline: {
      margin: 0,
      marginTop: `${theme.spacing(3) - 2}px`,
    },
  })
);

const HOVERED_LIST_DELAY_MS = 166;

function HoveredList() {
  const [hoveredList, setList] = React.useState<SelectedCell[]>([]);

  const [boardState] = useMainActor();

  const isSmallDisplay = useSmallDisplay();

  const classes = useStyles();

  const board = boardState?.context.board;

  const updateHoveredList = React.useMemo(() => {
    // optimization in order to wisely propagate updates
    return throttle((board: BoardRow[]) => {
      if (!board) {
        return;
      }
      const list = getHoveredList(board);
      setList(list);
    }, HOVERED_LIST_DELAY_MS);
  }, []);

  React.useEffect(() => {
    updateHoveredList(board);
  }, [board, updateHoveredList]);

  if (isSmallDisplay && !hoveredList.length) {
    return null;
  }

  return (
    <>
      <Typography variant="h6" component="h2" className={classes.headline}>
        Hover squares({hoveredList.length})
      </Typography>
      <VirtualizedList list={hoveredList} />
    </>
  );
}

export default HoveredList;
