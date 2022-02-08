import React, { useReducer } from "react";
import "./App.css";
import DigitButton from "./DigitButton";
import OperationButton from "./OperationButton";

export const ACTION = {
  ADD_DIGIT: "add_digit",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  CHOOSE_OPERATION: "choose-operation",
  EVALUATE: "evaluate",
};

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTION.ADD_DIGIT:
      if (state.overWrite)
        return { ...state, currentOperand: payload.digit, overWrite: false };
      if (payload.digit === "0" && state.currentOperand === "0") return state;
      if (payload.digit === "." && state.currentOperand.includes("."))
        return state;
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      };
      break;
    case ACTION.CLEAR:
      return {};
      break;
    case ACTION.CHOOSE_OPERATION:
      if (state.currentOperand == null)
        return { ...state, operation: payload.operation };

      if (state.previousOperand == null)
        return {
          ...state,
          previousOperand: state.currentOperand,
          currentOperand: null,
          operation: payload.operation,
        };
      return {
        ...state,
        previousOperand: evaluate(state),
        currentOperand: null,
        operation: payload.operation,
      };
      break;
    case ACTION.EVALUATE:
      if (
        state.currentOperand == null ||
        state.previousOperand == null ||
        state.operation == null
      )
        return state;
      return {
        ...state,
        overWrite: true,
        previousOperand: null,
        operation: null,
        currentOperand: evaluate(state),
      };
      break;
    case ACTION.DELETE_DIGIT:
      if (state.overWrite)
        return { ...state, overWrite: false, currentOperand: null };
      if (state.currentOperand == null) return state;
      if (state.currentOperand.length === 1)
        return { ...state, currentOperand: null };
      return { ...state, currentOperand: state.currentOperand.slice(0, -1) };
      break;
    default:
      break;
  }
}

const INTEGER_FORMATER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
});

function formatOperant(operant) {
  if (operant == null) return;

  const [integer, decimal] = operant.toString().split(".");
  if (decimal == null) return INTEGER_FORMATER.format(integer);
  return `${INTEGER_FORMATER.format(integer)}.${decimal}`;
}

function evaluate({ currentOperand, previousOperand, operation }) {
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) return "";
  let computation = "";
  switch (operation) {
    case "+":
      computation = prev + current;
      break;
    case "-":
      computation = prev - current;
      break;
    case "×":
      computation = prev * current;
      break;
    case "÷":
      computation = prev / current;
      break;

    default:
      computation = "";
      break;
  }
  return computation;
}

export default function App() {
  const [{ currentOperand, previousOperand, operation }, despatch] = useReducer(
    reducer,
    { currentOperand: null, previousOperand: null, operation: null }
  );

  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">
          {previousOperand} {operation}
        </div>
        <div className="current-operand">{formatOperant(currentOperand)}</div>
      </div>

      <button
        className="span-two"
        onClick={() => {
          despatch({ type: ACTION.CLEAR });
        }}
      >
        AC
      </button>
      <button
        onClick={() => {
          despatch({ type: ACTION.DELETE_DIGIT });
        }}
      >
        DEL
      </button>

      <OperationButton operation="÷" despatch={despatch} />
      <DigitButton digit="1" despatch={despatch} />
      <DigitButton digit="2" despatch={despatch} />
      <DigitButton digit="3" despatch={despatch} />
      <OperationButton operation="×" despatch={despatch} />
      <DigitButton digit="4" despatch={despatch} />
      <DigitButton digit="5" despatch={despatch} />
      <DigitButton digit="6" despatch={despatch} />
      <OperationButton operation="+" despatch={despatch} />
      <DigitButton digit="7" despatch={despatch} />
      <DigitButton digit="8" despatch={despatch} />
      <DigitButton digit="9" despatch={despatch} />
      <OperationButton operation="-" despatch={despatch} />
      <DigitButton digit="." despatch={despatch} />
      <DigitButton digit="0" despatch={despatch} />

      <button
        className="span-two"
        onClick={() => {
          despatch({ type: ACTION.EVALUATE });
        }}
      >
        =
      </button>
    </div>
  );
}
