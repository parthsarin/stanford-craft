interface Props {
  onUpdate: (search: string) => void;
}

const SearchBar = ({ onUpdate }: Props) => {
  return (
    <input
      type="text"
      placeholder="🔎 search for resources"
      className="input mb-8 w-full h-40 px-10 focus:outline-none focus:border-fog"
      onChange={(e) => onUpdate(e.target.value)}
      aria-label="Search for resources"
    />
  );
};

export default SearchBar;
