import React, { useEffect, useState } from 'react'
import Search from './components/Search'

const App = () => {

  const API_BASE_URL = "https://api.themoviedb.org/3/discover/movie";
  const API_KEY = process.env.TMDB_API_KEY;
  const API_OPTIONS = {
    method :"GET",
    headers: {
      accept:"application/json",
      Authorization: `Bearer ${API_KEY}`
    }
  }
  const [searchTerm, setSearchTerm] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const fetchMovies = async ()=>{
    try{
      const response = await fetch(API_BASE_URL, API_OPTIONS)
      const data = await response.json()
      console.log(data)
    }catch(error){
      console.log(`Error fetching movies: ${error.message}`)
      setErrorMessage("Error fetching movies. Please try again later.")
    }
  }
  useEffect(() => {
   

  },[])
  return (
    <main>
    <div className='pattern'/>
    <div className="wrapper">
      <header>
        <img src="hero.png" alt="hero.png" />
        <h1>Find <span className='text-gradient'>movies</span> You'll enjoy without hassle</h1>
      <p><Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} /></p>
      </header>
      <section>
        
      </section>
    </div>
    </main>
  )
}

export default App