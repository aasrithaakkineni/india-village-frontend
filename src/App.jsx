import { useState } from "react";
import "./App.css";

export default function App() {

  const [search, setSearch] = useState("");
  const [villages, setVillages] = useState([]);

  const searchVillages = async () => {

    try {

      const response = await fetch(
        `http://localhost:3000/autocomplete?search=${search}`
      );

      const data = await response.json();

      console.log(data);

      setVillages(data);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#071739",
        minHeight: "100vh",
        padding: "40px",
        color: "white",
        fontFamily: "Arial",
      }}
    >

      <h1
        style={{
          textAlign: "center",
          fontSize: "60px",
          marginBottom: "40px",
        }}
      >
        India Village API Dashboard
      </h1>

      <div
        style={{
          backgroundColor: "#1b2a49",
          padding: "30px",
          borderRadius: "20px",
          maxWidth: "1000px",
          margin: "auto",
        }}
      >

        <h2 style={{ textAlign: "center" }}>
          Search Villages
        </h2>

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginTop: "20px",
          }}
        >

          <input
            type="text"
            placeholder="Search villages..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              flex: 1,
              padding: "15px",
              borderRadius: "10px",
              border: "none",
              fontSize: "16px",
            }}
          />

          <button
            onClick={searchVillages}
            style={{
              backgroundColor: "#2563eb",
              color: "white",
              border: "none",
              padding: "15px 25px",
              borderRadius: "10px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Search
          </button>

        </div>
      </div>

      <div
        style={{
          backgroundColor: "#1b2a49",
          padding: "30px",
          borderRadius: "20px",
          maxWidth: "1000px",
          margin: "30px auto",
        }}
      >

        <h2 style={{ textAlign: "center" }}>
          Search Results
        </h2>

        {villages.length === 0 ? (
          <p style={{ textAlign: "center" }}>
            No villages found
          </p>
        ) : (
          villages.map((village, index) => (

            <div
              key={index}
              style={{
                backgroundColor: "#334155",
                padding: "15px",
                borderRadius: "10px",
                marginTop: "10px",
              }}
            >

              <h3>{village.area_name}</h3>

              <p>
                State: {village.state_name}
              </p>

              <p>
                District: {village.district_name}
              </p>

              <p>
                Subdistrict: {village.sub_district_name}
              </p>

            </div>

          ))
        )}

      </div>

    </div>
  );
}