// src/components/CharacterCard.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Notification from './Notification'; // Notification component'ını ekledik

const CharacterCard = ({ id, onToggleFavorite, isFavorite }) => {
  const [character, setCharacter] = useState(null);
  const favoriteCharacters = useSelector((state) => state.episodes.favoriteCharacters);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const fetchCharacter = async () => {
      const response = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);
      setCharacter(response.data);
    };

    fetchCharacter();
  }, [id]);

  const handleRemoveFavorite = () => {
    // Kullanıcıya onay mesajı göster
    const userConfirmed = window.confirm('Bu karakteri favorilerden çıkarmak istediğinizden emin misiniz?');
    
    if (userConfirmed) {
      onToggleFavorite(character?.id);
      setShowNotification(true);
    }
  };

  const handleNotificationClose = () => {
    setShowNotification(false);
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      {showNotification && (
        <Notification type={"warning"} message="Favori karakter başarıyla kaldırıldı." onClose={handleNotificationClose} />
      )}
      <p className="text-lg font-semibold mb-2">{character?.name}</p>
      <img src={character?.image} alt={character?.name} className="mx-auto mb-2 rounded-md" />
      <p className="text-sm text-gray-600">Status: {character?.status}</p>
      <p className="text-sm text-gray-600">Species: {character?.species}</p>
      <button
        onClick={isFavorite ? handleRemoveFavorite : onToggleFavorite}
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
