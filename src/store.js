import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import memeReducer from './memeSlice';
import todoReducer from './todoSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    memes: memeReducer,
    list: todoReducer
  },
});
