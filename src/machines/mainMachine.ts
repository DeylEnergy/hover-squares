import { Machine, assign } from "xstate";
import { makeBoard, toggleBoardCell } from "../utils";
import { BoardModes, BoardRow } from "../models";

interface MainMachineSchema {
  states: {
    fetchingModes: {};
    fetchFailed: {};
    notStarted: {};
    settingBoard: {};
    ready: {};
  };
}

export interface MainMachineContext {
  modes?: BoardModes;
  mode: string;
  board: BoardRow[];
  error: string;
}

type SelectModeEvent = {
  type: "SELECT_MODE";
  payload: {
    mode: string;
  };
};

type StartEvent = {
  type: "START";
};

type SelectCellEvent = {
  type: "SELECT_CELL";
  payload: {
    rowId: number;
    columnId: number;
  };
};

export type MainMachineEvents = SelectModeEvent | StartEvent | SelectCellEvent;

export const mainMachine = Machine<
  MainMachineContext,
  MainMachineSchema,
  MainMachineEvents
>(
  {
    id: "main",
    initial: "fetchingModes",
    context: {
      mode: "",
      modes: undefined,
      board: [],
      error: "",
    },
    states: {
      fetchingModes: {
        invoke: {
          src: "fetchModes",
          onDone: [
            {
              cond: "hasModes",
              target: "notStarted",
              actions: ["setModes", "setDefaultMode"],
            },
          ],
          onError: {
            target: "fetchFailed",
            actions: "setError",
          },
        },
      },
      fetchFailed: {},
      notStarted: {
        on: {
          SELECT_MODE: {
            target: "notStarted",
            actions: "setMode",
          },
          START: "settingBoard",
        },
      },
      settingBoard: {
        always: {
          target: "ready",
          actions: "setBoard",
        },
      },
      ready: {
        on: {
          SELECT_MODE: {
            actions: "setMode",
          },
          SELECT_CELL: {
            actions: "setSelectedCell",
          },
          START: "settingBoard",
        },
      },
    },
  },
  {
    actions: {
      setModes: assign({
        modes: (_, event: any) => event.data,
      }),
      setDefaultMode: assign({
        mode: (_, event: any) => Object.keys(event.data)[0],
      }),
      setMode: assign({
        mode: (_, event: any) => event.payload.mode,
      }),
      setBoard: assign({
        board: (ctx) => {
          // @ts-ignore
          const gridSize = ctx.modes?.[ctx.mode].field;
          return makeBoard(gridSize);
        },
      }),
      setSelectedCell: assign({
        board: (ctx, event: any) => {
          const { rowId, columnId } = event.payload;
          return toggleBoardCell(ctx.board, { rowId, columnId });
        },
      }),
      setError: assign({
        error: (_, event: any) => event.data,
      }),
    },
    guards: {
      hasModes: (_, event: any) =>
        Boolean(Object.keys(event?.data ?? {}).length),
    },
    services: {
      fetchModes: () =>
        fetch("http://demo1030918.mockable.io/").then((res) => res.json()),
    },
  }
);
