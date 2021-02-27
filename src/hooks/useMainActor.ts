import React from "react";
import { Interpreter, ActorRef, State, Sender } from "xstate";
import { useActor } from "@xstate/react";
import { MainMachineContext, MainMachineEvents } from "../machines/mainMachine";

type ActorContextType =
  | Interpreter<MainMachineContext, any, MainMachineEvents>
  | unknown;

export const MainActorContext = React.createContext<ActorContextType>(
  undefined
);

export function useMainActor(): [
  State<MainMachineContext, MainMachineEvents>,
  Sender<MainMachineEvents>
] {
  const actorRef = React.useContext(
    MainActorContext
  ) as ActorRef<MainMachineEvents>;

  // TODO: fix to proper return type of the actor
  // @ts-ignore
  return useActor(actorRef);
}
