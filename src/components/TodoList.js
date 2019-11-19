import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

function TodoList(props) {
  return (
    <ul className="todo-list">
      {props.todos.map((todo, index) => {
        return <TodoItem todo={todo} 
                          index={index} 
                          completeTask={props.completeTask} 
                          key={todo.id} />
      })}
    </ul>
  )
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  completeTask: PropTypes.func.isRequired
}

export default TodoList;