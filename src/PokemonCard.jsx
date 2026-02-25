export const PokemonCards = ({ pokemonData }) => {
  return (
    <li className="pokemon-card">
      <figure>
        <img
          src={pokemonData.sprites.other.dream_world.front_default}
          alt={pokemonData.name}
        />
      </figure>

      <h2 className="pokemon-name">{pokemonData.name}</h2>

      <div className="types">
        {pokemonData.types.map((typeInfo) => (
          <span key={typeInfo.type.name} className="type">
            {typeInfo.type.name}
          </span>
          
        ))}
      </div>

       <div className="grid-two-cols">
        <p className="pokemon-info">
          Height: <span>{pokemonData.height / 10} m</span>
        </p>

        <p className="pokemon-info">
          Weight: <span>{pokemonData.weight / 10} kg</span>
        </p>
      </div>
      

    </li>
  );
};