import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Detail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [failure, setFailure] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/failures/${id}`)
            .then(response => setFailure(response.data))
            .catch(error => console.error("Ошибка загрузки:", error));
    }, [id]);

    const nameRef = useRef(null);
    const blockRef = useRef(null);
    const statusRef = useRef(null);

    useEffect(() => {
        if (failure) {
            nameRef.current.value = failure.name;
            blockRef.current.value = failure.block;
            statusRef.current.value = failure.status;
        }
    }, [failure]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        const updatedFailure = {
            name: nameRef.current.value,
            block: blockRef.current.value,
            status: statusRef.current.value,
        };

        try {
            const response = await axios.put(`http://localhost:5000/failures/${id}`, updatedFailure, {
                headers: { "Content-Type": "application/json" }
            });
            console.log("Обновленная поломка:", response.data);
            navigate('/');
        } catch (error) {
            console.error("Ошибка обновления:", error);
        }
    };

    return failure ? (
        <div style={{ backgroundColor: "#0A192F", minHeight: "100vh", color: "white", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <form onSubmit={handleUpdate} style={{ background: "#112240", padding: "20px", borderRadius: "10px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", width: "300px" }}>
                <h2 style={{ textAlign: "center", marginBottom: "15px" }}>Редактировать поломку</h2>
                <label style={{ display: "block", marginBottom: "10px" }}>
                    Название:
                    <input type="text" ref={nameRef} required style={{ width: "100%", padding: "8px", marginTop: "5px", borderRadius: "5px", border: "none" }} />
                </label>
                <label style={{ display: "block", marginBottom: "10px" }}>
                    Блок:
                    <input type="text" ref={blockRef} required style={{ width: "100%", padding: "8px", marginTop: "5px", borderRadius: "5px", border: "none" }} />
                </label>
                <label style={{ display: "block", marginBottom: "15px" }}>
                    Статус:
                    <input type="text" ref={statusRef} required style={{ width: "100%", padding: "8px", marginTop: "5px", borderRadius: "5px", border: "none" }} />
                </label>
                <button type="submit" style={{ width: "100%", padding: "10px", backgroundColor: "#64ffda", color: "#0A192F", fontWeight: "bold", borderRadius: "5px", border: "none", cursor: "pointer" }}>
                    Сохранить
                </button>
            </form>
        </div>
    ) : <p style={{ color: "white", textAlign: "center", marginTop: "20px" }}>Загрузка...</p>;
};

export default Detail;