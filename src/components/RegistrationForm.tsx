import React, { useState } from "react";
import { useForm } from "react-hook-form";
import InputText from "./Input/InputText";
import SelectPokemons from "./Select/SelectPokemons";
import Modal from "./Modal/Modal";
import SubmitButton from "./Button/SubmitButton";

type FormData = {
  firstName: string;
  lastName: string;
  pokemons: string;
};

const RegistrationForm: React.FC = () => {
  const [selectedPokemons, setSelectedPokemons] = useState<string[]>([]);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const pokemonLimit = 4;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = () => {
    setIsShowModal(true);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 mt-14 rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold text-center mb-4">Pokemon Trainer Registration</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* First Name input */}
        <InputText
          label="First Name:"
          name="firstName"
          register={register}
          error={errors.firstName}
        />
        {/* Last Name input */}
        <InputText label="Last Name:" name="lastName" register={register} error={errors.lastName} />

        <SelectPokemons
          selectedPokemons={selectedPokemons}
          setSelectedPokemons={setSelectedPokemons}
          error={errors.pokemons}
          pokemonLimit={pokemonLimit}
        />
        <SubmitButton
          register={register}
          statement={selectedPokemons.length === pokemonLimit}
          message={`Select exactly ${pokemonLimit} pokemons`}
        />
      </form>

      {/* Modal to show selected Pokémon */}
      {isShowModal && <Modal selectedPokemons={selectedPokemons} setIsShowModal={setIsShowModal} />}
    </div>
  );
};

export default RegistrationForm;
