import React, { useEffect, useState } from 'react';
import Todos from './components/Todos';

function App() {

  const dataFromLocalStorage = JSON.parse(localStorage.getItem('Tasks')) || [];

  const [todo, setTodo] = useState("");
  const [allTodos, setAllTodos] = useState(dataFromLocalStorage);

  const inputTodo = (event) => {
    setTodo(event.target.value);
  };

  const addTodo = () => {
    if (todo !== "") {
      setAllTodos([...allTodos, todo]);
    };
    setTodo("");
  };

  const deleteTodo = (id) => {
    const filteredItems = allTodos.filter((todoItem, index) => {
      return index !== id;
    });
    setAllTodos(filteredItems);
  };

  const updateTodo = (id) => {
    const filteredItem = allTodos.filter((todoItem, index) => {
      return index == id;
    });
    setTodo(filteredItem);
    deleteTodo(id);
  }

  useEffect(() => {
    localStorage.setItem('Tasks', JSON.stringify(allTodos))
  }, [allTodos]);


  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-6 mx-auto bg-white rounded-4 p-3 mt-5">
          <h2 className='text-center mb-4'>My Todos</h2>
          <div className="d-flex gap-4 mb-4">
            <input
              type="text"
              name='add-todo'
              className='form-control shadow-none text-capitalize'
              placeholder='Enter New Task'
              value={todo}
              onChange={inputTodo} />
            <button onClick={addTodo} className='btn btn-warning px-3 fw-bold shadow-none'>Add</button>
          </div>
          <ul className='list-group'>
            {
              allTodos.map((todoItem, index) => {
                return <Todos todoItem={todoItem} key={index} id={index} deleteTodo={deleteTodo} updateTodo={updateTodo} />;
              })
            }
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
