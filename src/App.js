import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchI from './components/Search';
import AddFavourite from './components/AddFavorites';
import RemoveFavourites from './components/RemoveFavourites';
import Navbar from './components/Navbar';


function App() {
  const [movies, setMovies] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [favorite, setFavorite] = useState([])
  
  const getMovieRequest = async () => {
    const url = `https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${searchValue}&page=1`;
    const APi_KEY = process.env.REACT_APP_API_KEY;

    const response = await fetch(url,
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
          'X-API-KEY': APi_KEY
        }
      }
    );
    const responseJson = await response.json();
    setMovies(responseJson.films);
  }
  useEffect(() => {
    getMovieRequest(searchValue);// eslint-disable-next-line 
  }, [searchValue])

  useEffect(()=>{
    const favoriteMov = JSON.parse(localStorage.getItem('movie'))
    setFavorite(favoriteMov)
  },[])

  const AddFavouriteMovie = (movie) => {
    const newFavoriteList = [...favorite, movie];
    setFavorite(newFavoriteList)
    saveStorage(newFavoriteList)
  }
  const removeFavouritesMovie = (movie) => {
    const newFavoriteList = favorite.filter(
      (favorite) => favorite.filmId !== movie.filmId
    )
    setFavorite(newFavoriteList)
    saveStorage(newFavoriteList)
  }
  const saveStorage = (items) => {
    localStorage.setItem('movie',JSON.stringify(items))
  }
  return (
    <>
    <Navbar heading='Кинонюх'/>
    <div className='container-fluid movie-app'>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading='Фильмы' />
        <SearchI searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className='row'>
        <MovieList movies={movies}  handleFavorteiClick={AddFavouriteMovie} favoriComponent={AddFavourite} />
      </div>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading='Избранные' />
      </div>
      <div className='row'>
        <MovieList movies={favorite} handleFavorteiClick={removeFavouritesMovie} favoriComponent={RemoveFavourites} />
      </div>
    </div>
    </>
  );
}

export default App;
