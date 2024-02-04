import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEpisodes, selectAllEpisodes, selectCharacters } from '../store/episodesSlice';
import Pagination from './Pagination';
import { Link } from 'react-router-dom';

const CharactersPage = () => {
  const dispatch = useDispatch();
  const episodesData = useSelector(selectAllEpisodes);
  const filteredCharacters = useSelector((state) => selectCharacters(state, searchTerm));

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchEpisodes(currentPage));
  }, [dispatch, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const episodes = episodesData || { results: [] };

  return (
    <div className="container mx-auto my-8 text-center">
      <h2 className="text-3xl font-semibold mb-4">Characters Page</h2>
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
        {filteredCharacters.map((character) => (
          <div key={character.id} className="bg-white p-4 rounded-md shadow-md">
            <p className="text-lg font-semibold mb-2">{character.name}</p>
            <Link to={`/character/${character.id}`} className="text-blue-500 hover:underline">
              View Details
            </Link>
          </div>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={episodes.info ? episodes.info.pages : 1}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default CharactersPage;
