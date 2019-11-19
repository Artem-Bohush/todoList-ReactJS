import React, { useState } from 'react';
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

function AddTodo({ onCreate }) {
  const inputProps = useInputValue('');

  function submitHandler(event) {
    event.preventDefault();
    if (inputProps.getValue().trim()) {
      onCreate(inputProps.getValue());
    }
    inputProps.clear()
  }

  return (
    <form onSubmit={submitHandler}>
      <input {...inputProps.bind} />
      <button type="submit">Add</button>
    </form>
  )
}

AddTodo.propTypes = {
  onCreate: PropTypes.func.isRequired
}

export default AddTodo;