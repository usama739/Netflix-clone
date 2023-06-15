import React, { useState } from "react";
import './Search.css'
import axios from "axios";
import Navbar from '../components/Navbar';
import { TMDB_API_KEY, TMDB_URL } from '../utils/constants'
import IconButton from "@material-ui/core/IconButton";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";



export default function Search() {
  const [movies, setMovies] = useState([]);

  const searchMovies = async (e) => {
    const name = e.target.value;
    console.log(name);
    try {
      const response = await axios.get(
        `${TMDB_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${name}`
      );
      setMovies(response.data.results);
    } catch (error) {
      console.error(error);
    }
  };
  console.log(movies)

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
    <div className="searchbodyunique">
      <Navbar />
      <div className="mysearchlist">

      <input className="searchbar" type="text"  onChange={searchMovies} placeholder="Search movies..." />

        <div className="row-posters">
          {movies.map((movie) => (
            <div className="poster-container">
              <img className='row-poster' key={movie.id}  
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} 
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


    </div>

      
  );
};
