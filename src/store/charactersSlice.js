// src/store/charactersSlice.js

import { createSlice } from '@reduxjs/toolkit';

const charactersSlice = createSlice({
  name: 'characters',
  initialState: {
    characters: [],
    favorites: [],
  },
  reducers: {
    addCharacterToFavorites: (state, action) => {
      state.favorites.push(action.payload);
    },
    removeCharacterFromFavorites: (state, action) => {
      state.favorites = state.favorites.filter((character) => character.id !== action.payload);
    },
  },
});

export const { addCharacterToFavorites, removeCharacterFromFavorites } = charactersSlice.actions;

export const selectFavorites = (state) => state.characters.favorites;

export default charactersSlice.reducer;
