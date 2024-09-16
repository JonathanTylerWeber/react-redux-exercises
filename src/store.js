import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import memeReducer from './memeSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    memes: memeReducer,
  },
});
