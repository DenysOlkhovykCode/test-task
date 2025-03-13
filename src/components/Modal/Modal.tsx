import React, { useState, useEffect } from "react";
import axios from "axios";

interface ModalProps {
  selectedPokemons: string[];
  setIsShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const usePokemons = (selectedPokemons: string[]) => {
  const [pokemonsImages, setPokemonsImages] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Loading state for images
  const [error, setError] = useState<string | null>(null); // Error state for handling errors

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      setError(null); // Reset previous errors
      try {
        const images = await Promise.all(
          selectedPokemons.map(async (name) => {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
            return response.data.sprites.front_default; // Get pokemon image
          })
        );
        setPokemonsImages(images); // Set images once fetched
      } catch (error) {
        setError("Error fetching pokemons!");
      } finally {
        setLoading(false); // End loading after fetching
      }
    };

    fetchImages();
  }, [selectedPokemons]);

  return { pokemonsImages, loading, error };
};

const Modal: React.FC<ModalProps> = ({ selectedPokemons, setIsShowModal }) => {
  const { pokemonsImages, loading, error } = usePokemons(selectedPokemons); // Destructure hook result

  if (loading) {
    return <div className="text-center text-lg">Loading...</div>; // Display loading state
  }

  if (error) {
    return <div className="text-center text-lg text-red-500">{error}</div>; // Display error message
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg p-6  w-60 shadow-lg relative">
        <button
          className="absolute top-5 right-5 text-gray-500 hover:text-gray-700"
          onClick={() => setIsShowModal(false)}
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4">Your team</h2>
        <div className="space-y-2">
          {pokemonsImages.map((element, id) => (
            <div
              key={id}
              className="border-2 border-dashed h-24 border-gray-300 p-1 rounded-lg text-gray-400 flex justify-center"
            >
              <img src={element} alt={selectedPokemons[id]} />
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center mt-4">
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={() => setIsShowModal(false)}
          >
            Cancel
          </button>
          <button
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
            onClick={() => setIsShowModal(false)}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
export default Modal;
