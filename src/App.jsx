import { useEffect, useState } from "react";

function App() {
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [villages, setVillages] = useState([]);

  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [searchText, setSearchText] = useState("");

  // Load States
  useEffect(() => {
    fetch("http://localhost:3000/states")
      .then((res) => res.json())
      .then((data) => setStates(data))
      .catch((err) => console.log(err));
  }, []);

  // Load Districts
  useEffect(() => {
    if (selectedState !== "") {
      fetch(
        `http://localhost:3000/districts?state=${selectedState}`
      )
        .then((res) => res.json())
        .then((data) => setDistricts(data))
        .catch((err) => console.log(err));
    }
  }, [selectedState]);

  // Search Villages
  const handleSearch = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/search?query=${searchText}&state=${selectedState}`
      );

      const data = await response.json();

      setVillages(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#04195c] flex items-center justify-center p-6">
      <div className="bg-[#1e325f] p-10 rounded-3xl w-full max-w-4xl shadow-2xl">

        <h1 className="text-6xl font-bold text-white text-center mb-10">
          India Village Search
        </h1>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search villages..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full p-4 rounded-xl bg-[#3b3b3b] text-white outline-none text-lg mb-5"
        />

        {/* State Dropdown */}
        <select
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          className="w-full p-4 rounded-xl bg-[#3b3b3b] text-white outline-none text-lg mb-5"
        >
          <option value="">All States</option>

          {states.map((state, index) => (
            <option key={index} value={state.state_name}>
              {state.state_name}
            </option>
          ))}
        </select>

        {/* District Dropdown */}
        <select
          value={selectedDistrict}
          onChange={(e) => setSelectedDistrict(e.target.value)}
          className="w-full p-4 rounded-xl bg-[#3b3b3b] text-white outline-none text-lg mb-5"
        >
          <option value="">All Districts</option>

          {districts.map((district, index) => (
            <option key={index} value={district.district_name}>
              {district.district_name}
            </option>
          ))}
        </select>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white text-lg p-4 rounded-xl transition"
        >
          Search
        </button>

        {/* Results */}
        <div className="mt-8">
          {villages.map((village, index) => (
            <div
              key={index}
              className="bg-[#31497d] p-5 rounded-xl text-white mb-4"
            >
              <p>
                <strong>State:</strong> {village.state_name}
              </p>

              <p>
                <strong>District:</strong> {village.district_name}
              </p>

              <p>
                <strong>Sub District:</strong> {village.sub_district_name}
              </p>

              <p>
                <strong>Village:</strong> {village.area_name}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default App;