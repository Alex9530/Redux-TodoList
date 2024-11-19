import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      state.push(action.payload);
    },
    removeTodo: (state, action) => {
      return state.filter(todo => todo.id !== action.payload);
    },
    editStatus: (state, action) => {
      const task = state.find(todo => todo.id == action.payload)
      if (task) {
        task.status = !task.status 
      }
    }
  },
});

export const { addTodo, removeTodo, editStatus } = todoSlice.actions;
export default todoSlice.reducer;
