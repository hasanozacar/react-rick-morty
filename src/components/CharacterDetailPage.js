// src/components/CharacterDetailPage.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './CharacterDetailPage.css'; // Stil dosyasını ekledik

const CharacterDetailPage = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      const response = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);
      setCharacter(response.data);
    };

    fetchCharacter();
  }, [id]);

  if (!character) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto my-8">
      <div className="card">
        <div className="card-header text-center">
          <h2 className="text-3xl">{character.name}</h2>
        </div>
        <div className="card-content">
          <img src={character.image} alt={character.name} className="mx-auto rounded-md mb-2" />
          <p className="mb-2">Status: {character.status}</p>
          <p className="mb-2">Species: {character.species}</p>
          <p className="mb-2">Gender: {character.gender}</p>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetailPage;
