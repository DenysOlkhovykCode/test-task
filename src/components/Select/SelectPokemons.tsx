import React, { useState, useEffect } from "react";
import { FieldError } from "react-hook-form";
import axios from "axios";
import Select from "./Select";
import List from "./List";

interface SelectPokemonsProps {
  selectedPokemons: string[];
  setSelectedPokemons: React.Dispatch<React.SetStateAction<string[]>>;
  error?: FieldError;
  pokemonLimit: number;
}

// Custom hook to fetch Pokémon data from the API
const usePokemons = () => {
  const [pokemons, setPokemons] = useState<string[]>([]);
  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0")
      .then((response) => {
        setPokemons(response.data.results.map((element: { name: string }) => element.name));
      })
      .catch((error) => {
        console.error("Error fetching pokemons:", error);
      });
  }, []);

  return pokemons;
};

const SelectPokemons: React.FC<SelectPokemonsProps> = ({
  selectedPokemons,
  setSelectedPokemons,
  error,
  pokemonLimit,
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const pokemons = usePokemons();

  const placeholder = selectedPokemons.length < pokemonLimit ? "Search Pokémon" : "";

  const selectPokemon = (pokemon: string) => {
    if (selectedPokemons.length < pokemonLimit && !selectedPokemons.includes(pokemon)) {
      setSelectedPokemons((prev) => [...prev, pokemon]);
    }
    setInputValue("");
  };

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <div className="w-full max-w-md">
      {/* Label for the Pokémon selection */}
      <label className="block font-semibold">Select your Pokemons:</label>

      {/* Select component for displaying selected Pokemon */}
      <Select
        elements={selectedPokemons}
        setElements={setSelectedPokemons}
        inputValue={inputValue}
        setInputValue={setInputValue}
        limit={pokemonLimit}
      />

      {/* Display a list of filtered Pokemon if there is input and matching results */}
      {placeholder && inputValue && filteredPokemons.length > 0 && (
        <List elements={filteredPokemons} onSelect={selectPokemon} />
      )}

      {/* Display error message if validation fails */}
      {error && selectedPokemons.length < pokemonLimit && (
        <p className="text-red-500">{error.message}</p>
      )}
    </div>
  );
};

export default SelectPokemons;
