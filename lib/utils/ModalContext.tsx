"use client";
import { createContext, useReducer } from "react";

const ModalReducer = (state: any, action: { type: any; payload: any }) => {
  switch (action.type) {
    case "SHOW":
      return {
        modal: true,
      };
    case "HIDE":
      return {
        modal: false,
      };
    default:
      return { ...state };
  }
};

interface initial {
  modal: boolean;
  dispatch: any;
}
const INITIAL_STATE: initial = {
  modal: false,
  dispatch: () => {},
};

export const ModalContext = createContext(INITIAL_STATE);

export const ModalContextProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(ModalReducer, INITIAL_STATE);
  return (
    <ModalContext.Provider
      value={{
        modal: state.modal,
        dispatch,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
