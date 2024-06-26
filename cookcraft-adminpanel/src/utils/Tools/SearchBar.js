const SearchBar = ({ handleSearch }) => {
  return (
    <div className="flex items-center space-x-4">
      <input
        type="text"
        placeholder="Search repositories..."
        className="border border-gray-300 px-3 py-2 rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => handleSearch(e.target.value)}
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
        Search
      </button>
    </div>
  );
};

export default SearchBar;
