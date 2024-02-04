// src/components/FavoritesPage.js

import React from 'react';
import { useSelector } from 'react-redux';
import { selectCharacters } from '../store/episodesSlice';
import CharacterCard from './CharacterCard';
import AppBar from './AppBar';

const FavoritesPage = () => {
  const favoriteCharacters = useSelector(
    (state) => state.episodes.favoriteCharacters
  );
  return (
    <div>
      <div className="container mx-auto my-8">
        <h2 className="text-3xl font-semibold mb-4">Favorite Characters</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {favoriteCharacters.map((character) => (
            <CharacterCard favoriteCharacters={favoriteCharacters} key={character} id={character} isFavorite={true} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FavoritesPage;
