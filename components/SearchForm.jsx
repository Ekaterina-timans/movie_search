import { useState } from "react";
import styles from '../components/Movie.module.css';

export default function SearchForm(){
    const [searchValue, setSearchValue] = useState('');
    const [movies, setMovies] = useState([]);
    const [showMovies, setShowMovies] = useState(false);

    const apiKey = 'a2b07930';

    const getInfo = () => {
        fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${searchValue}`)
          .then((response) => response.json())
          .then((data) => setMovies(data.Search || []))
          .catch((error) => console.error('Ошибка при получении данных:', error));
      };

    const searchClick = () => {
        setShowMovies(true);
        getInfo();
    };

      return (
        <div>
          <h1 className={styles.titleText}>Поиск фильма по названию</h1>
          <input className={styles.inputText} type="search" value={searchValue} onChange={(e) => setSearchValue(e.target.value)}/>&nbsp;
          <button className={styles.btnSearch} onClick={searchClick}>Найти</button>
          <div className={styles.form}>
            {movies.map((movie) => (
              <a href={`https://www.imdb.com/title/${movie.imdbID}`} target="_blank" key={movie.imdbID}>
                <div className={styles.movie}>
                  <h2>{movie.Title} ({movie.Year})</h2>
                  <img src={movie.Poster} alt={movie.Title} />
                </div>
              </a>
            ))}
          </div>
        </div>
      );
};
