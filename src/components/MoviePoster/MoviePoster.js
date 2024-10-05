import React from 'react';
import './MoviePoster.css';


const MoviePoster = ({ posterUrl, title }) => {
  const imgSrc = `${process.env.REACT_APP_API_HOST}${posterUrl}`

  return (
    <div className="movie-poster">
      {posterUrl ? (
        <img
          src={imgSrc}
          alt={`Постер фильма ${title}`}
          style={{ width: '200px', height: '300px', objectFit: 'cover' }}
        />
      ) : (
        <p>Постер отсутствует</p>
      )}
    </div>
  );
};

export default MoviePoster;
