import { useEffect, useState } from 'react'
import './index.css'
import { PokemonCards } from './PokemonCard'

export const Pokemon = () => {

  const [pokemon, setPokemon] = useState([])  
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState("")

  const API = 'https://pokeapi.co/api/v2/pokemon?limit=50'

  const fetchPokemon = async () => {
    try {
      const res = await fetch(API)
      const data = await res.json()

      const detailedPokemonData = data.results.map(async (curPokemon) => {
        const res = await fetch(curPokemon.url)
        const data = await res.json()
        return data
      })

      const detailedResponse = await Promise.all(detailedPokemonData)
      setPokemon(detailedResponse) 
      setLoading(false)  
    } catch (error) {
      console.log(error)
      setLoading(false)
      setError(error)
    }
  }

  useEffect(() => {
    fetchPokemon()
  }, [])

    const filteredPokemon = pokemon.filter((curPokemon) =>
    curPokemon.name.toLowerCase().includes(search.toLowerCase())
  )


  if(loading)
  {
    return (
      <div>
        <h1>Loading.......</h1>
      </div>
    )
  }

   if(error)
  {
    return (
      <div>
        <h1>{error.message}</h1>
      </div>
    )
  }
  return (
    <>
      <header><h1>Hello, Pokemon again</h1></header>
      <div className='pokemon-search'>
        <input type="text" placeholder='search pokemon' value={search} onChange={(e)=> setSearch(e.target.value)}/>
      </div>
      <ul className="cards">
        {filteredPokemon.length > 0 ? (
          filteredPokemon.map((curPokemon) => (
            <PokemonCards key={curPokemon.id} pokemonData={curPokemon}/>
          ))
        ) : (
          <h2>No Pokémon Found 😢</h2>
        )}
      </ul>
     
    </>
  )
}