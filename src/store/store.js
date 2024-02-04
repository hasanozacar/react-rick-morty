import { configureStore } from '@reduxjs/toolkit';
import episodesReducer from '../store/episodesSlice';
import favoritesReducer from '../store/favoritesSlice';
import notificationReducer from '../store/notificationSlice';

const store = configureStore({
  reducer: {
    episodes: episodesReducer,
    favorites: favoritesReducer,
    notification: notificationReducer,
  },
});

export default store;
