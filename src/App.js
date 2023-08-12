import { useState, useEffect } from 'react';
import './App.css';
import searchIcon from './search.svg'
import MovieCard from './MovieCard'

const API_URL = 'http://www.omdbapi.com?apikey=aa30ce76';

const movie =
{
    "Title": "Avengers: Infinity War",
    "Year": "2018",
    "imdbID": "tt4154756",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg"
}

const App = () => {

    const [movies, setMovies] = useState([]);
    const [searchTearm, setSearchTearm] = useState('');


    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
        setMovies(data.Search);
    }

    useEffect(() => {
        searchMovies('Doctor Strange');
    }, [])

    return (
        <div className="app">
            <h1>The Fullness Theatre</h1>

            <div className="search">
                <input
                    placeholder='Search for movies'
                    value={searchTearm}
                    onChange={(e) => setSearchTearm(e.target.value)}
                />

                <img
                    src={searchIcon}
                    alt="Search"
                    onClick={() => searchMovies(searchTearm)}
                />
            </div>

            {
                movies?.length > 0
                    ? (
                        <div className="container">
                            {movies.map((movie) => (
                                <MovieCard movie={movie} />
                            ))}
                        </div>
                    ) : (
                        <div className="empty">
                            <h2>No Movies Found</h2>
                        </div>
                    )
            }
        </div>

    );
}

export default App;