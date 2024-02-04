import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEpisodes, selectAllEpisodes } from '../store/episodesSlice';
import Pagination from './Pagination';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const dispatch = useDispatch();
  const episodesData = useSelector(selectAllEpisodes);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchEpisodes(currentPage));
  }, [dispatch, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const episodes = episodesData || { episodes: [] };

  return (
    <div className="container mx-auto my-8">
      <h2 className="text-3xl font-semibold mb-4 text-center">Rick and Morty Episodes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        { episodes?.results.map((episode) => (
          <div key={episode.id} className="bg-blue-100 p-4 rounded-md">
            <p className="text-lg font-semibold mb-2">Episode {episode.id}</p>
            <Link to={`/episode/${episode.id}`} className="text-blue-500 hover:underline">
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

export default HomePage;
