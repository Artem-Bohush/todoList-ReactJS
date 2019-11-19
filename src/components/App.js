import React, { useEffect } from 'react';
import '../css/App.css';
import TodoList from './TodoList';
import Contex from '../contex';
import Loader from './Loader';
import Modal from '../modal/Modal';

const AddTodo = React.lazy(() => import('./AddTodo'));

function App() {
  const [todos, setTodos] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  //когда DOM деревого готово, тогда выполняется код этой функции
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .then(response => response.json())
      .then(todos => {
        setTimeout(() => {
          setTodos(todos);
          setLoading(false);
        }, 1500)
      })
  }, [])

  function completeTask(id) {
    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo
      })
    )
  }

  function removeTodo(id) {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  function addTodo(title) {
    setTodos(todos.concat([
      {
        id: todos.length + 1,
        completed: false,
        title: title
      }
    ]))
  }

  return (
    <Contex.Provider value={{ removeTodo: removeTodo }}>
      <div className="wrapper">
        <h1>TODOList</h1>
        <Modal/>
        <React.Suspense fallback={<p>Loading...</p>}>
          <AddTodo onCreate={addTodo} />
        </React.Suspense>
        {loading ? <Loader /> : todos.length ?
          (<TodoList todos={todos} completeTask={completeTask} />) : (<p>No todos!</p>)}
      </div>
    </Contex.Provider>
  );
}

export default App;
