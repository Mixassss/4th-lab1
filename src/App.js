import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Form from './pages/Form';

const App = () => {
  const [data, setData] = useState([]);

  const loadData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/cars");
      setData(response.data);
      console.log("Данные загружены:", response.data);
    } catch (error) {
      console.error("Ошибка запроса:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home data={data} loadData={loadData} />} />
        <Route path="/detail/:id" element={<Detail loadData={loadData} />} />
        <Route path="/add" element={<Form onAdd={loadData} />} />
      </Routes>
    </Router>
  );
};

export default App;