import React, { useEffect } from 'react';
import '../css/App.css';
import TodoList from './TodoList';
import Contex from '../contex';
import Loader from './Loader';


const Panel = React.lazy(() => import('./Panel'));

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
    todos.unshift(
      {
        id: todos.length + 1,
        completed: false,
        title: title
      }
    );
    setTodos(todos.concat());
  }

  function reorder() {
    console.log(todos);
    setTodos(todos
      .filter(todo => !todo.completed)
      .concat(todos.filter(todo => todo.completed)))
  }

  return (
    <Contex.Provider value={{ removeTodo }}>
      <div className="wrapper">
        <h1>TODOList</h1>
        <React.Suspense fallback={<p>Loading...</p>}>
          <Panel onCreate={addTodo} reorder={reorder} />
        </React.Suspense>
        {loading ? <Loader /> : todos.length ?
          (<TodoList todos={todos} completeTask={completeTask} />) : (<p>No todos!</p>)}
      </div>
    </Contex.Provider>
  );
}

export default App;
