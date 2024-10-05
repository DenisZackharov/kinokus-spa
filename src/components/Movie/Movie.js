import React, { useEffect, useState } from 'react';
import axios from '../../api/axiosConfig';
import MoviePoster from '../MoviePoster/MoviePoster';
import { Link, useParams } from 'react-router-dom';
import './Movie.css';

const Movie = () => {
  const { id } = useParams(); // Получаем ID из URL
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`/api/v1/movies/${id}`);
        setMovie(response.data);
      } catch (err) {
        setError('Ошибка при получении данных о фильме');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) {
    return <p>Загрузка данных о фильме...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!movie) {
    return <p>Фильм не найден</p>;
  }

  const { name, poster_url, annotation, description, duration_in_minutes, release_date } = movie.data.attributes;

  return (
    <div className="movie-container">
      <div className="movie-poster">
        <MoviePoster posterUrl={poster_url} title={name} />
      </div>
      <div className="movie-details">
        <h1 className="movie-title">{name}</h1>
        <p className="movie-description"><strong>Описание:</strong> {description}</p>
        <p className="movie-annotation"><strong>Анотация:</strong> {annotation || '-'}</p>
        <p className="movie-duration"><strong>Длительность в минутах:</strong> {duration_in_minutes || '-'}</p>
        <p className="movie-release"><strong>Дата Релиза:</strong> {release_date || '-'}</p>
      </div>
      <h2>
        <Link to={`/`} className="movie-link">
          Назад
        </Link>
      </h2>
    </div>
  );
};

export default Movie;
