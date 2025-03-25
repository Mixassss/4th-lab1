import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/failures")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => console.error("Ошибка загрузки данных:", error));
  }, []);

  const deleteFailure = (id) => {
    axios.delete(`http://localhost:5000/failures/${id}`)
      .then(() => {
        setData((prevData) => prevData.filter((failure) => failure.id !== id));
      })
      .catch((error) => console.error("Ошибка удаления:", error));
  };

  return (
    <div style={{ backgroundColor: "#0A192F", minHeight: "100vh", color: "white", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
      <div style={{ background: "#112240", padding: "20px", borderRadius: "10px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", width: "400px", textAlign: "center" }}>
        <h1 style={{ marginBottom: "15px" }}>Список поломок</h1>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {data.map((failure) => (
            <li key={failure.id} style={{ marginBottom: "10px", padding: "10px", background: "#233554", borderRadius: "5px", display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "column" }}>
              <Link to={`/detail/${failure.id}`} style={{ color: "#64ffda", textDecoration: "none", fontWeight: "bold" }}>{failure.name}</Link>
              <p style={{ color: failure.status === "Устранена" ? "#64ffda" : "#ff6b6b", margin: "5px 0" }}>{failure.status}</p>
              <p style={{ color: "#f4a261", margin: "5px 0" }}>Блок: {failure.block}</p>
              <button onClick={() => deleteFailure(failure.id)} style={{ padding: "5px 10px", backgroundColor: "#ff6b6b", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>Удалить</button>
            </li>
          ))}
        </ul>
        <Link to="/add" style={{ display: "inline-block", marginTop: "10px", padding: "10px 15px", backgroundColor: "#64ffda", color: "#0A192F", fontWeight: "bold", borderRadius: "5px", textDecoration: "none" }}>Добавить поломку</Link>
      </div>
    </div>
  );
};

export default Home;