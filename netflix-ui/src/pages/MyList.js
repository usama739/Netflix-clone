import React, { useEffect, useState } from 'react'
import { TMDB_API_KEY, TMDB_URL } from '../utils/constants'
import Navbar from '../components/Navbar';
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import './MyList.css'

export default function MyList() {

    const [movies, setMovies] = useState([]);
    const baseURL = 'http://localhost:3001';                /// server is listening on port 3001 ///


    useEffect(() => {
        // Fetch the movies from the server
        fetch(`${baseURL}/my-list`)
        .then((response) => response.json())
        .then((data) => setMovies(data))
        .catch((error) => console.error('Error fetching movies:', error));
    }, []);


    const handleDeleteMovie = (movieId) => {
        // Perform the delete operation for the movie with the given movieId
        fetch(`${baseURL}/delete-movie/${movieId}`, {
          method: 'DELETE',
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {

              // If the movie is successfully deleted from the database,
              // update the movies state to remove the deleted movie
              setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== movieId));
            
            } else {
              console.error('Error deleting movie:', data.error);
            }
          })
          .catch((error) => console.error('Error deleting movie:', error));
      };
    

  return (

    <div className='myListContainer'>
        <Navbar />
        <div className='myList'>
            
      <div className="row-posters">

            {movies.map((movie) => (
                <div className="poster-container">
                    <img className="row-poster" key={movie.id}  
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

                    <IconButton className='deleteIcon' onClick={() => handleDeleteMovie(movie.id)}>
                        <DeleteIcon />
                    </IconButton>
                </div>

            ))}

            </div>
         </div>
    </div>
   
  )
}
