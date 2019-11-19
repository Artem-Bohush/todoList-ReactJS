import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Contex from '../contex';

function TodoItem({ todo, index, completeTask }) {
  const contex = useContext(Contex);
  const classes = [];
  if (todo.completed === true) {
    classes.push('done')
  }

  return (
    <li className="todo-item">
      <div className={classes.join(' ')}>
        <input type="checkbox" checked={todo.completed} onChange={() => completeTask(todo.id)} />
        <span className="todo-id">{index + 1}</span>
        <span className="todo-title">{todo.title}</span>
      </div>
      <button onClick={() => contex.removeTodo(todo.id)}>&times;</button>
    </li>
  )
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  index: PropTypes.number,
  completeTask: PropTypes.func.isRequired
}

export default TodoItem;