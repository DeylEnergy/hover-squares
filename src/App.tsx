import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import { useMachine } from "@xstate/react";
import { mainMachine } from "./machines/mainMachine";
import { Controls } from "./views/Controls";
import { Board } from "./views/Board";
import { HoveredList } from "./views/HoveredList";
import { MainActorContext, useSmallDisplay } from "./hooks";
import { BOARD_SIZE } from "./constants";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    warning: {
      width: "100%",
      height: 24,
      position: "absolute",
      top: 0,
      left: 0,
      background: "red",
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    logo: {
      fontFamily: "'Lobster', cursive",
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(1),
    },
    content: {
      display: "flex",
    },
    interactive: {
      display: "flex",
      flexDirection: "column",
      width: BOARD_SIZE,
    },
    outline: {
      display: "flex",
      flexDirection: "column",
      height: "100%",
      marginLeft: 16,
      width: 250,
    },
    outlineSmallDisplay: {
      marginLeft: 0,
      width: BOARD_SIZE,
      marginBottom: theme.spacing(2),
    },
  })
);

function App() {
  const [state, , service] = useMachine(mainMachine);

  const classes = useStyles();

  const isSmallDisplay = useSmallDisplay();

  return (
    <MainActorContext.Provider value={service}>
      <div className={classes.root}>
        {state.matches("fetchFailed") && (
          <div className={classes.warning}>{state?.context.error}</div>
        )}
        <Typography variant="h3" component="h1" className={classes.logo}>
          HoverSquares
        </Typography>
        <div
          className={classes.content}
          style={{ flexDirection: isSmallDisplay ? "column" : "row" }}
        >
          <div className={classes.interactive}>
            <Controls />
            {state.matches("ready") && <Board />}
          </div>
          <div
            className={clsx(classes.outline, {
              [classes.outlineSmallDisplay]: isSmallDisplay,
            })}
          >
            {<HoveredList />}
          </div>
        </div>
      </div>
    </MainActorContext.Provider>
  );
}

export default App;
