import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    characters: [],
  },
  reducers: {
    addFavorite: (state, action) => {
      if (state.characters.length < 10) {
        state.characters.push(action.payload);
      }
    },
    removeFavorite: (state, action) => {
      state.characters = state.characters.filter((character) => character.id !== action.payload);
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export const selectAllFavorites = (state) => state.favorites.characters;

export default favoritesSlice.reducer;
