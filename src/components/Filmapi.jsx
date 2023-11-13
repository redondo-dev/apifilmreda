
import React, { useState } from 'react';
import axios from 'axios';

const FilmApi = () => {
  const [texteValue, setTexteValue] = useState('');
  const [movies, setMovies] = useState([]);

  const handleButtonClick = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.get('https://online-movie-database.p.rapidapi.com/auto-complete', {
            params: { q: texteValue },
            headers: {
              'X-RapidAPI-Key': '856f171907msh02972d94c5c32c9p198b57jsn011056d02f2f',
              'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
            }
          });
          
      const data = response.data.d;
      const movieList = data.map((item) => {
        const name = item.l;
        const poster = item.i.imageUrl;
        const year = item.y;
        const rank = item.rank;
        const title = item.q;
        const actor = item.s;

        return (
          <li key={name}>
            <img src={poster} alt={name} />
            <h2>Genre: {title}</h2>
            <h2>Titre: {name}</h2>
            <h2>Acteurs: {actor}</h2>
            <h3>Année de sortie: {year}</h3>
            <h4>Classement: {rank}</h4>
          </li>
        );
      });

      setMovies(movieList);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input
        type="text"
        id="texte"
        placeholder='Cherchez votre film preferé'
        value={texteValue}
        onChange={(e) => setTexteValue(e.target.value)}
      />
      <button onClick={handleButtonClick} id="btn">
        Clicker ici
      </button>
      <ul className="movies">{movies}</ul>
    </div>
  );
};

export default FilmApi;
