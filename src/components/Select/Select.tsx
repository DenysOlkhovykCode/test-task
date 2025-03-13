type SelectProps = {
  elements: string[];
  setElements: React.Dispatch<React.SetStateAction<string[]>>;
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  limit: number;
};

const Select: React.FC<SelectProps> = ({
  elements,
  setElements,
  inputValue,
  setInputValue,
  limit,
}) => {
  const placeholder = elements.length < limit ? "Search Pokémon" : "";

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value); // Update search query
  };

  const deselectElement = (pokemon: string) => {
    setElements((prev) => prev.filter((item) => item !== pokemon)); // Remove selected pokemon from list
  };

  return (
    <div className="flex flex-wrap items-center gap-1 border rounded-lg p-2">
      {elements.map((element, index) => (
        <div
          key={index}
          className="flex items-center bg-gray-200 rounded-full px-2.5 py-0.5 text-sm text-gray-900"
        >
          {element}
          <button
            onClick={() => deselectElement(element)}
            className="ml-2 text-lg text-gray-500 hover:text-red-500"
          >
            ×
          </button>
        </div>
      ))}
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="flex-1 outline-none px-2 py-1 text-sm"
        hidden={elements.length === limit}
      />
    </div>
  );
};
export default Select;
