import React, { useState } from 'react';
import Modal from './Modal';
import PropTypes from 'prop-types';

// это собственный хук
function useInputValue(defaultValue = '') {
  const [value, setValue] = useState(defaultValue);
  return {
    bind: {
      value,
      onChange: event => setValue(event.target.value)
    },
    getValue: () => value,
    clear: () => setValue('')
  }
}

function AddTodo({ onCreate, reorder }) {
  const inputProps = useInputValue();

  function submitHandler(event) {
    event.preventDefault();
    if (inputProps.getValue().trim()) {
      onCreate(inputProps.getValue());
    }
    inputProps.clear()
  }

  return (
    <div className="panel">
      <form onSubmit={submitHandler}>
        <input {...inputProps.bind} placeholder="new task..."/>
        <button className="add-btn" type="submit">Add</button>
      </form>
      <button className="reorder-btn" onClick={reorder}>Reorder</button>
      <Modal />
    </div>
  )
}

AddTodo.propTypes = {
  onCreate: PropTypes.func.isRequired
}

export default AddTodo;