import React, { useEffect, useState } from 'react';
import axios from '../../api/axiosConfig';
import MoviePoster from '../MoviePoster/MoviePoster';
import { Link } from 'react-router-dom';
import './MoviesList.css';

const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Функция для получения данных о фильмах
    const fetchMovies = async () => {
      try {
        const response = await axios.get('/api/v1/movies');
        setMovies(response.data);
      } catch (err) {
        setError('Ошибка при получении данных о фильмах');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []); // Пустой массив зависимостей означает, что эффект выполнится только один раз после монтирования компонента

  if (loading) {
    return <p>Загрузка фильмов...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="movies-list">
      <h1 className="movies-list__header">Список Фильмов</h1>
      {movies.length === 0 ? (
        <p>Фильмы не найдены.</p>
      ) : (
        <ul className="movies-list__container">
          {movies.data.map((movie) => (
            <li key={movie.id} className="movies-list__item">
              <MoviePoster posterUrl={movie.attributes.poster_url} title={movie.attributes.name} />
              <div className="movie-info">
                <h2 className="movie-title">
                  <Link to={`/movies/${movie.id}`} className="movie-link">
                    {movie.attributes.name}
                  </Link>
                </h2>
                <p className="movie-description">{movie.attributes.description}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MoviesList;