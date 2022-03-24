import React from 'react'
import { ACTIONS } from './App';
import "./styles.css";

const OperationButton = ({dispatch, operation}) => {
  return (
    <button onClick={() => {
      dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: {operation: operation} });
      }}>{operation}</button>
  )
}

export default OperationButton