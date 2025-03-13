type ListProps = {
  elements: string[];
  onSelect: (element: string) => void;
};

const List: React.FC<ListProps> = ({ elements, onSelect }) => (
  <ul className="bg-white shadow-lg mt-1 rounded-md max-h-28 overflow-y-auto w-full z-10">
    {elements.map((element) => (
      <li
        key={element}
        className="cursor-pointer text-sm text-blue-600 hover:bg-gray-200 p-2"
        onClick={() => onSelect(element)}
      >
        {element}
      </li>
    ))}
  </ul>
);

export default List;
