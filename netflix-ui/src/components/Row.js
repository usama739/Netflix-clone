import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Row.css';
import { TMDB_API_KEY, TMDB_URL } from '../utils/constants'
import IconButton from "@material-ui/core/IconButton";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";


const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(fetchUrl);
      setMovies(response.data.results);
    };
    fetchData();
  }, [fetchUrl]);


  function handleWatchLaterClick(movie) {
    const baseURL = 'http://localhost:3001';                /// server is listening on port 3001 ///

    // Make a POST request to the backend API endpoint
    axios.post(`${baseURL}/watch-later`, movie)
    .then((response) => {
      console.log(response.data); // Optional: Handle the response
    })
    .catch((error) => {
      console.error(error); // Optional: Handle the error
    });
    
  }

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row-posters">
        
        {movies.map((movie) => (
          <div className="poster-container">
            <img className={`row-poster ${isLargeRow && 'row_posterLarge'}`} key={movie.id}  
              src={`https://image.tmdb.org/t/p/w500/${isLargeRow ?  movie.poster_path : movie.backdrop_path}`} 
              alt={movie.name}
              onClick={async () => {
                const response = await fetch(
                  `${TMDB_URL}/movie/${movie.id}/videos?api_key=${TMDB_API_KEY}`
                );
                const data = await response.json();
                const trailer = data.results.find((result) =>
                    result.type === "Trailer" && result.site === "YouTube"
                );
                if (trailer) {
                  const trailerUrl = `https://www.youtube.com/watch?v=${trailer.key}`;
                  window.open(trailerUrl, "_blank");
                }
              }}
            />
           
           <IconButton
              className="watch-later-button"
              onClick={() => handleWatchLaterClick(movie)}
            >
              <PlaylistAddIcon />
            </IconButton>

          </div>
          

        ))}
      </div>

    </div>
  );
};

export default Row;
