import React from "react";
import { ACTION } from "./App";

export default function DigitButton({ despatch, digit }) {
  return (
    <button
      onClick={() => {
        despatch({ type: ACTION.ADD_DIGIT, payload: { digit } });
      }}
    >
      {digit}
    </button>
  );
}
