import { configureStore } from '@reduxjs/toolkit';
import episodesReducer from '../store/episodesSlice';
import favoritesReducer from '../store/favoritesSlice';

const store = configureStore({
  reducer: {
    episodes: episodesReducer,
    favorites: favoritesReducer,
  },
});

export default store;
