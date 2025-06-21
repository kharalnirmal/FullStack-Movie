import React, { useEffect, useState } from 'react'
import Search from './components/Search'
import Spinner from './components/Spinner'
import MoviesCards from './components/MoviesCards';

const App = () => {

  const API_BASE_URL = "https://api.themoviedb.org/3/discover/movie";
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const API_OPTIONS = {
    method :"GET",
    headers: {
      accept:"application/json",
      Authorization: `Bearer ${API_KEY}`
    }
  }
   const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [moviesList, setMoviesList] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  // useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm])

  const fetchMovies = async (query = "")=>{
    setIsLoading(true);
    setErrorMessage('');
    try{
      const endpoint = query?
      `${API_BASE_URL}/search/movie?query=${query}`:`${API_BASE_URL}?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);  
  if(!response.ok){
      throw new Error("Error fetching movies");
    }
 const data = await response.json();
 if(data.Response==="false"){
 setErrorMessage(data.Error ||  "failed to fetch movies");
 setMoviesList([]);
 return;
    }
    setMoviesList(data.results || []);

    }catch(error){
      console.log(`Error fetching movies: ${error.message}`)
      setErrorMessage("Error fetching movies. Please try again later.")
    }
    finally{
      setIsLoading(false);
    }
  }
  useEffect(() => {
  fetchMovies(searchTerm);

  },[searchTerm])
  return (
    <main>
    <div className='pattern'/>
    <div className="wrapper">
      <header>
        <img src="hero.png" alt="hero.png" />
        <h1>Find <span className='text-gradient'>movies</span> You'll enjoy without hassle</h1>
     <p><Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} /></p>
      </header>
      <section  className='all-movies'>
        <h2 className='mt-10 '>All Movies</h2>
        {isLoading ? (<Spinner />) : errorMessage ? (<p className="text-red-500">{errorMessage}</p>) : (
          <ul>
            {moviesList.map((movie) => (
              <MoviesCards key={movie.id} movie={movie} />
            ))}
          </ul>
        )}
      </section>
    </div>
    </main>
  )
}

export default App