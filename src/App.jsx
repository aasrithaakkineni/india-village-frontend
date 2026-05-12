import { useEffect, useState } from "react";

export default function App() {
  const [health, setHealth] = useState("Checking...");
  const [villages, setVillages] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/health")
      .then((res) => res.json())
      .then((data) => {
        setHealth(data.message);
      })
      .catch(() => {
        setHealth("Backend not connected");
      });
  }, []);

  const searchVillages = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/autocomplete?search=${search}`
      );

      const data = await response.json();
      setVillages(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0f172a",
        color: "white",
        padding: "40px",
        fontFamily: "Arial",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontSize: "50px",
          marginBottom: "10px",
        }}
      >
        India Village API Dashboard
      </h1>

      <p
        style={{
          textAlign: "center",
          color: "#94a3b8",
          marginBottom: "40px",
        }}
      >
        Professional frontend dashboard for your API project
      </p>

      <div
        style={{
          backgroundColor: "#1e293b",
          padding: "20px",
          borderRadius: "12px",
          marginBottom: "30px",
        }}
      >
        <h2>Backend Status</h2>

        <p
          style={{
            color: "#22c55e",
            fontWeight: "bold",
          }}
        >
          {health}
        </p>
      </div>

      <div
        style={{
          backgroundColor: "#1e293b",
          padding: "20px",
          borderRadius: "12px",
          marginBottom: "30px",
        }}
      >
        <h2>Search Villages</h2>

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginTop: "20px",
          }}
        >
          <input
            type="text"
            placeholder="Enter village name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              flex: 1,
              padding: "12px",
              borderRadius: "8px",
              border: "none",
              fontSize: "16px",
            }}
          />

          <button
            onClick={searchVillages}
            style={{
              backgroundColor: "#3b82f6",
              color: "white",
              border: "none",
              padding: "12px 20px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Search
          </button>
        </div>
      </div>

      <div
        style={{
          backgroundColor: "#1e293b",
          padding: "20px",
          borderRadius: "12px",
        }}
      >
        <h2>Search Results</h2>

        {villages.length === 0 ? (
          <p style={{ color: "#94a3b8" }}>No villages found</p>
        ) : (
          villages.map((village, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "#334155",
                padding: "15px",
                borderRadius: "10px",
                marginTop: "15px",
              }}
            >
              <h3>{village.area_name}</h3>

              <p>State: {village.state_name}</p>

              <p>District: {village.district_name}</p>

              <p>Subdistrict: {village.sub_district_name}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}