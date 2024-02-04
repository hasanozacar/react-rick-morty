import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CharactersPage from './components/CharactersPage';
import EpisodeDetailPage from './components/EpisodeDetailPage';
import FavoritesPage from './components/FavoritesPage';
import CharacterDetailPage from './components/CharacterDetailPage';
import HomePage from './components/HomePage';
import AppBar from './components/AppBar';

import './styles/tailwind.css'

const AppRouter = () => {
  return (
    <Router>
        <AppBar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/characters" element={<CharactersPage />} />
        <Route path="/characters/:id" element={<CharacterDetailPage />} />
        <Route path="/episode/:episodeId" element={<EpisodeDetailPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
