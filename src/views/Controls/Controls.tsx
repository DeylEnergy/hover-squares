import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { useMainActor } from "../../hooks";
import PickMode from "./PickMode";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      alignItems: "baseline",
    },
    button: {
      marginLeft: theme.spacing(1),
      position: "relative",
      top: -2,
    },
  })
);

function Controls() {
  const [mainActorState, sendMainActor] = useMainActor();

  const classes = useStyles();

  const handleSelect = React.useCallback(
    (e: React.ChangeEvent<{ value: unknown }>) => {
      sendMainActor({
        type: "SELECT_MODE",
        payload: {
          mode: e.target.value as string,
        },
      });
    },
    [sendMainActor]
  );

  const handleStart = () => {
    sendMainActor("START");
  };

  const modes = React.useMemo(() => {
    return Object.keys(mainActorState?.context?.modes || {});
  }, [mainActorState?.context?.modes]);

  return (
    <div className={classes.root}>
      <PickMode
        mode={mainActorState?.context.mode || ""}
        modes={modes}
        handleSelect={handleSelect}
      />
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        onClick={handleStart}
      >
        Start
      </Button>
    </div>
  );
}

export default React.memo(Controls);
