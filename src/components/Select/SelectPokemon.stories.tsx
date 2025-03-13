import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import SelectPokemons from "./SelectPokemons";

export default {
  title: "Select",
  component: SelectPokemons,
};
type FormData = {
  firstName: string;
  lastName: string;
  pokemons: string;
};

export const Default = () => {
  const {
    register,
    setValue,
    formState: { errors },
    trigger,
  } = useForm<FormData>();
  const [selectedPokemons, setSelectedPokemons] = useState<string[]>(["a", "b", "c", "d"]);

  useEffect(() => {
    setValue("pokemons", selectedPokemons[0]);
    trigger("pokemons");
  }, [selectedPokemons, setValue, trigger]);

  register("pokemons", {
    validate: () => selectedPokemons.length === 4 || `Select exactly ${4} pokemons`,
  });

  return (
    <SelectPokemons
      selectedPokemons={selectedPokemons}
      setSelectedPokemons={setSelectedPokemons}
      error={errors.pokemons}
      pokemonLimit={4}
    />
  );
};
