// src/components/AppBar.js

import React from 'react';
import { Link } from 'react-router-dom';

const AppBar = () => {
  return (
    <div className="bg-gray-800 p-4 flex">
      <Link to="/" className="text-white mr-4">Episodes</Link>
      <Link to="/favorites" className="text-white">Favorites</Link>
    </div>
  );
};

export default AppBar;
