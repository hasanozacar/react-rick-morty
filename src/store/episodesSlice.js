import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk ile bütün bölümleri getiren fonksiyon
export const fetchEpisodes = createAsyncThunk('episodes/fetchEpisodes', async (page) => {
  const response = await axios.get(`https://rickandmortyapi.com/api/episode?page=${page}`);
  return response.data;
});

export const fetchCharacterDetails = async (characterUrls) => {
    try {
      const characterPromises = characterUrls.map(async (characterUrl) => {
        const response = await fetch(characterUrl);
        const characterData = await response.json();
        return characterData;
      });
  
      const characters = await Promise.all(characterPromises);
      return characters;
    } catch (error) {
      console.error("Error fetching character details:", error);
      return [];
    }
};

export const selectEpisode = (state, episodeId) => {
    return state.episodes.episodes.results.find((episode) => episode.id === Number(episodeId));
  };
const episodesSlice = createSlice({
  name: 'episodes',
  initialState: {
    episodes: { results: [] },
    status: 'idle',
    error: null,
    favoriteCharacters: [],
  },
  reducers: {
    addFavoriteCharacter: (state, action) => {
        if (state.favoriteCharacters.length < 10) {
          state.favoriteCharacters.push(action.payload);
        } else {
          // Favori karakter sayısı 10'u geçtiğinde uyarı mesajı gösterilebilir
          console.log("Favori karakter ekleme sayısını aştınız. Başka bir karakteri favorilerden çıkarmalısınız.");
        }
      },
      // Favori karakteri kaldırmak için reducer
      removeFavoriteCharacter: (state, action) => {
        if (state.favoriteCharacters.length>0) {
            state.favoriteCharacters= state.favoriteCharacters.filter(character => character !== action.payload);
        }
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEpisodes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEpisodes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.episodes = action.payload;
      })
      .addCase(fetchEpisodes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { addFavoriteCharacter, removeFavoriteCharacter } = episodesSlice.actions;
export const selectAllEpisodes = (state) => state.episodes.episodes;
export const selectEpisodeById = (state, episodeId) =>
  state.episodes.episodes.results.find((episode) => episode.id === parseInt(episodeId));

// Yeni eklenen fonksiyon
export const selectCharacters = (state, searchTerm) => {
  const episodes = state.episodes.episodes.results || [];
  const filteredCharacters = episodes.flatMap((episode) => episode.characters);
  if (searchTerm) {
    return filteredCharacters.filter((character) =>
      character.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  return filteredCharacters;
};

export default episodesSlice.reducer;
