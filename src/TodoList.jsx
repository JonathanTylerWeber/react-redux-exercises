import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, deleteTodo, selectTodos } from './todoSlice';

export default function TodoList() {

  const todos = useSelector(selectTodos);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    todo: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTodo({ text: formData.todo }));
    setFormData({ todo: '' })
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };


  return (
    <>
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='todo' >New Todo:</label>
        <input
          type='text'
          name='todo'
          id='todo'
          required
          value={formData.todo}
          onChange={handleChange}
        />
        <button >Submit</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <div key={todo.id}>
            <li> {todo.text} </li>
            <p onClick={() => handleDelete(todo.id)}> X </p>
          </div>

        ))}
      </ul>
    </>
  )
}