// src/components/FavoritesPage.js

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFavoriteCharacter } from '../store/episodesSlice';
import CharacterCard from './CharacterCard';

const FavoritesPage = () => {
  const dispatch = useDispatch();
  const favoriteCharacters = useSelector((state) => state.episodes.favoriteCharacters);

  const handleRemoveFavorite = (characterId) => {
    dispatch(removeFavoriteCharacter(characterId));
  };

  return (
    <div>
      <div className="container mx-auto my-8">
        <h2 className="text-3xl font-semibold mb-4">Favorite Characters</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {favoriteCharacters.map((characterId) => (
            <CharacterCard
              key={characterId}
              id={characterId}
              onToggleFavorite={handleRemoveFavorite}
              isFavorite={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FavoritesPage;
