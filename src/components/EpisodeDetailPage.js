import React, { useState, useMemo, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom'; 
import {
  selectEpisode,
  selectCharacters,
  addFavoriteCharacter,
  removeFavoriteCharacter,
} from "../store/episodesSlice";
import Pagination from "./Pagination";
import Notification from './Notification'; 

const EpisodeDetailPage = () => {
  const { episodeId } = useParams();
  const episode = useSelector((state) => selectEpisode(state, episodeId));
  const charactersData = useSelector((state) => selectCharacters(state));
  const dispatch = useDispatch();
  const favoriteCharacters = useSelector(
    (state) => state.episodes.favoriteCharacters
  );
  const charactersPerPage = 10;

  const [currentPage, setCurrentPage] = useState(1);
  const [characters, setCharacters] = useState();
  const [notification, setNotification] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  useEffect(() => {
    if (episode?.characters.length > 0) {
      fetchCharacterDetails(episode.characters);
    }
  }, [episode]);

  const fetchCharacterDetails = async (characterUrls) => {
    try {
      const characterPromises = characterUrls.map(async (characterUrl) => {
        const response = await fetch(characterUrl);
        const characterData = await response.json();
        return characterData;
      });

      const characters = await Promise.all(characterPromises);
      setCharacters(characters);
    } catch (error) {
      console.error("Error fetching character details:", error);
      return null;
    }
  };

  const handleCloseNotification = () => {
    setNotification(null);
  };


  const isFavorite = (characterId) => favoriteCharacters.includes(characterId);

  const handleToggleFavorite = (characterId) => {
    if (isFavorite(characterId)) {
      dispatch(removeFavoriteCharacter(characterId));
    } else {
      // Favori karakter sayısı 10'u geçtiğinde uyarı mesajı gösterilebilir
      if (favoriteCharacters.length < 10) {
        dispatch(addFavoriteCharacter(characterId));
      } else {
        setNotification({
          message: 'Favori karakter ekleme sayısını aştınız. Başka bir karakteri çıkarmalısınız.',
          type: 'error',
        });
      }
    }
  };

  // Karakter adına veya özelliklere göre filtreleme yapacak fonksiyon
  const filterCharacters = (character) => {
    if (!character || !character.name) {
      return false;
    }
    return (
      character.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      character.species.toLowerCase().includes(searchTerm.toLowerCase()) ||
      character.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Filtrelenmiş ve sayfalanmış karakterleri alacak fonksiyon
  const paginatedCharacters = useMemo(() => {
    const filteredCharacters = characters
      ? characters.filter(filterCharacters)
      : [];
    const indexOfLastCharacter = currentPage * charactersPerPage;
    const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;
    return filteredCharacters.slice(
      indexOfFirstCharacter,
      indexOfLastCharacter
    );
  }, [episode, characters, currentPage, searchTerm]);

  // Toplam sayfa sayısını hesaplayan fonksiyon
  const totalPageCount = useMemo(() => {
    const filteredCharacters = characters
      ? characters.filter(filterCharacters)
      : [];
    return Math.ceil(filteredCharacters.length / charactersPerPage);
  }, [episode, characters, searchTerm]);

  return (
    <div className="container mx-auto my-8">
               {notification?.message && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={handleCloseNotification}
        />
      )}
      <h2 className="text-3xl font-semibold mb-4">
        {episode ? episode.name : "Bölüm Bulunamadı"}
      </h2>
      {episode && (
        <div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Karakter adı veya özelliklere göre ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {paginatedCharacters.map((character) => (
              <Link key={character.id} to={`/characters/${character.id}`}>
   <div
                key={character.id}
                className="bg-white p-4 rounded-md shadow-md"
              >
                <p className="text-lg font-semibold mb-2">{character.name}</p>
                <img
                  src={character.image}
                  alt={character.name}
                  className="mx-auto mb-2 rounded-md"
                />
                <p className="text-sm text-gray-600">
                  Status: {character.status}
                </p>
                <p className="text-sm text-gray-600">
                  Species: {character.species}
                </p>
                <button
                     onClick={(e) => {
                      e.preventDefault(); // Sayfaya geçişi engelle
                      handleToggleFavorite(character.id);
                    }}
                  className={`px-4 py-2 rounded-md flex items-center justify-center transition duration-300 ease-in-out focus:outline-none focus:ring focus:border-blue-300 ${
                    isFavorite(character.id)
                      ? "bg-yellow-400 text-white"
                      : "bg-gray-300 text-gray-800 hover:bg-gray-400"
                  }`}
                >
                  <i
                    className={`fas fa-heart text-xl mr-2 ${
                      isFavorite(character.id)
                        ? "text-red-500"
                        : "text-gray-500"
                    }`}
                  ></i>
                  {isFavorite(character.id)
                    ? "Favorilerden Çıkar"
                    : "Favori Ekle"}
                </button>
              </div>
              </Link>
           
            ))}
          </div>
          <div className="mt-4">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPageCount}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EpisodeDetailPage;
