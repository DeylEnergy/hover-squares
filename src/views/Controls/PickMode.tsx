import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: `${theme.spacing(1)}px 0`,
      minWidth: 120,
      flexGrow: 1,
    },
  })
);

interface PickModeProps {
  mode: string;
  modes: string[];
  handleSelect: (e: React.ChangeEvent<{ value: unknown }>) => void;
}

function PickMode({ mode, modes, handleSelect }: PickModeProps) {
  const classes = useStyles();

  return (
    <FormControl className={classes.formControl}>
      <InputLabel>Pick mode</InputLabel>
      <Select value={mode} onChange={handleSelect}>
        {modes.map((mode: string) => (
          <MenuItem key={mode} value={mode}>
            {mode}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default React.memo(PickMode);
