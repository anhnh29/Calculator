import { useReducer } from "react";
import "./styles.css";
import DigitButton from "./DigitButton";
import OperationButton from './OperationButton';

export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  RESULT: "result",
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currentCalculator: payload.digit,
          overwrite: false
        }
      }
      if (payload.digit === '0' && state.currentCalculator === '0') {
        return state
      }
      if (payload.digit === '.' && state.currentCalculator.includes('.')) {
        return state
      }
      return {
        ...state,
        currentCalculator: `${state?.currentCalculator || ""}${payload.digit}`,
      };
    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentCalculator == null && state.preCalculator == null) {
        return state
      }
      if (state.preCalculator == null) {
        return {
          ...state,
          preCalculator: state.currentCalculator,
          currentCalculator: null,
          operation: payload.operation
        }
      }
      if (state.currentCalculator == null ) {
        return {
          ...state,
          operation: payload.operation
        }
      }
      return {
        ...state,
        operation: payload.operation,
        currentCalculator: null,
        preCalculator: calculatorValue(state)
      };
    case ACTIONS.CLEAR: 
      return {}
    case ACTIONS.RESULT:
      if (state.preCalculator == null || state.currentCalculator == null , state.operation == null) {
        return state
      }
      return {
        ...state,
        preCalculator: null,
        operation: null,
        currentCalculator: calculatorValue(state),
        overwrite: true
      }
    case ACTIONS.DELETE_DIGIT:
      if (state.currentCalculator == null) {
        return state
      }
      return {
        ...state,
        currentCalculator: state.currentCalculator.slice(0, -1)
      }

    default: return null;
  }
};

const calculatorValue = ({ preCalculator, currentCalculator, operation }) => {
  const pre = parseFloat(preCalculator);
  const current = parseFloat(currentCalculator);
  if (isNaN(pre) || isNaN(current)) {
    return 
  }
  let result=''
  switch (operation) {
    case '+':
      result = pre + current;
      break
    case '-':
      result = pre - current;
      break
    case '*':
      result = pre * current;
      break
    case '÷':
      result = pre / current;
      break
    default: return null;
  }
  return result
}

function App() {
  const [{ currentCalculator, preCalculator, operation }, dispatch] = useReducer(reducer, {});
  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="pre-calculator">
          {preCalculator} {operation}
        </div>
        <div className="current-calculator">{currentCalculator}</div>
      </div>
      <button className="span-two" onClick={() => {
        dispatch({type: ACTIONS.CLEAR})
      }}>AC</button>
      <button onClick={() => {
        dispatch({type: ACTIONS.DELETE_DIGIT })
      }}>DEL</button>
      <OperationButton operation="÷" dispatch={dispatch} />
      <DigitButton dispatch={dispatch} digit="1" />
      <DigitButton dispatch={dispatch} digit="2" />
      <DigitButton dispatch={dispatch} digit="3" />
      <OperationButton operation="*" dispatch={dispatch} />
      <DigitButton dispatch={dispatch} digit="4" />
      <DigitButton dispatch={dispatch} digit="5" />
      <DigitButton dispatch={dispatch} digit="6" />
      <OperationButton operation="+" dispatch={dispatch} />
      <DigitButton dispatch={dispatch} digit="7" />
      <DigitButton dispatch={dispatch} digit="8" />
      <DigitButton dispatch={dispatch} digit="9" />
      <OperationButton operation="-" dispatch={dispatch} />
      <DigitButton dispatch={dispatch} digit='.' />
      <DigitButton dispatch={dispatch} digit="0" />
      <button className="span-two" onClick={() => {
        dispatch({type: ACTIONS.RESULT})
      }}>=</button>
    </div>
  );
}

export default App;
