import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import ListItem from "@material-ui/core/ListItem";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import { SelectedCell } from "../../models";
import { useSmallDisplay } from "../../hooks";
import { BOARD_SIZE } from "../../constants";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      marginTop: `${theme.spacing(1.5) - 1}px`,
    },
    chip: {
      width: "100%",
    },
  })
);

interface VirtualizedListProps {
  list: SelectedCell[];
}

function VirtualizedList({ list }: VirtualizedListProps) {
  const isSmallDisplay = useSmallDisplay();

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <FixedSizeList
        height={BOARD_SIZE}
        width={isSmallDisplay ? BOARD_SIZE : 200}
        itemSize={40}
        itemCount={list.length}
      >
        {(props: ListChildComponentProps) => {
          const { index, style } = props;

          const { rowPlace, columnPlace } = list[index];

          return (
            <ListItem style={style} key={index} disableGutters>
              <Chip
                label={`row: ${rowPlace} column: ${columnPlace}`}
                className={classes.chip}
              />
            </ListItem>
          );
        }}
      </FixedSizeList>
    </div>
  );
}

export default React.memo(VirtualizedList);
