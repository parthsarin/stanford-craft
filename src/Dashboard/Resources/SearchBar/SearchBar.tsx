interface Props {
  onUpdate: (search: string) => void;
}

const SearchBar = ({ onUpdate }: Props) => {
  return (
    <input
      type="text"
      placeholder="🔎 search for resources"
      className="mb-4 w-full h-10 px-4 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-gray-400"
      onChange={(e) => onUpdate(e.target.value)}
    />
  ) 
};

export default SearchBar;