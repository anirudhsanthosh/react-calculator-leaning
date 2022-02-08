import React from "react";
import { ACTION } from "./App";

export default function OperationButton({ despatch, operation }) {
  return (
    <button
      onClick={() => {
        despatch({ type: ACTION.CHOOSE_OPERATION, payload: { operation } });
      }}
    >
      {operation}
    </button>
  );
}
