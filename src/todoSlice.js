import { createSlice } from '@reduxjs/toolkit'

export const todoSlice = createSlice({
  name: 'list',
  initialState: {
    todos: [],
    idCounter: 1
  },
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: state.idCounter,
        text: action.payload.text,
      };
      state.todos.push(newTodo);
      state.idCounter += 1;
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter(item => item.id !== action.payload)
    }
  },
})

export const { addTodo, deleteTodo } = todoSlice.actions

export const selectTodos = (state) => state.list.todos

export default todoSlice.reducer
