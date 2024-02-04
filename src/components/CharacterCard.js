// src/components/CharacterCard.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    removeFavoriteCharacter,
  } from "../store/episodesSlice";
import { useSelector, useDispatch } from "react-redux";


const CharacterCard = ({ id, onToggleFavorite }) => {
    const dispatch = useDispatch();
    const [character, setCharacter] = useState(null);
    const favoriteCharacters = useSelector(
        (state) => state.episodes.favoriteCharacters
      );
  
    useEffect(() => {
        const fetchCharacter = async () => {
          const response = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);
          setCharacter(response.data);
        };
    
        fetchCharacter();
      }, [id]);
      const isFavorite = (id) => favoriteCharacters?.includes(id);
      const handleToggleFavorite = (characterId) => {
        if (isFavorite(characterId)) {
          dispatch(removeFavoriteCharacter(characterId));
        }
      };
  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <p className="text-lg font-semibold mb-2">{character?.name}</p>
      <img src={character?.image} alt={character?.name} className="mx-auto mb-2 rounded-md" />
      <p className="text-sm text-gray-600">Status: {character?.status}</p>
      <p className="text-sm text-gray-600">Species: {character?.species}</p>
      <button
        onClick={() => handleToggleFavorite(character?.id)}
        className={`px-4 py-2 rounded-md flex items-center justify-center transition duration-300 ease-in-out focus:outline-none focus:ring focus:border-blue-300 ${
          isFavorite
            ? 'bg-yellow-400 text-white'
            : 'bg-gray-300 text-gray-800 hover:bg-gray-400'
        }`}
      >
        <i
          className={`fas fa-heart text-xl mr-2 ${
            isFavorite ? 'text-red-500' : 'text-gray-500'
          }`}
        ></i>
        {isFavorite ? 'Favoriden Çıkar' : 'Favori Ekle'}
      </button>
    </div>
  );
};

export default CharacterCard;
