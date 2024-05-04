import { useState } from "react";
import SearchBar from "../../../utils/Tools/SearchBar";
import Button from "../../../utils/Buttons/Button";
import RespositoryCard from "../../../utils/Cards/RespositoryCard";
const Repositories = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (search) => {
    setSearchTerm(search);
    // Implement your search functionality here
  };

  return (
    <div className="text-black">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl">Repositories</h1>
        <SearchBar handleSearch={handleSearch} />
      </div>
      <hr />
      <div>
        <div className="mt-4">
          <Button text="Create Project" />
        </div>
        <div>
          <RespositoryCard />
        </div>
      </div>
    </div>
  );
};

export default Repositories;
