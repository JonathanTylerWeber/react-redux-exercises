import { createSlice } from '@reduxjs/toolkit'

export const memeSlice = createSlice({
  name: 'memes',
  initialState: {
    memes: [],
    idCounter: 1
  },
  reducers: {
    addMeme: (state, action) => {
      const newMeme = {
        id: state.idCounter,
        url: action.payload.url,
      };
      state.memes.push(newMeme);
      state.idCounter += 1;
    },
    deleteMeme: (state, action) => {
      state.memes = state.memes.filter(item => item.id !== action.payload)
    }
  },
})

export const { addMeme, deleteMeme } = memeSlice.actions

export const selectMemes = (state) => state.memes.memes

export default memeSlice.reducer
