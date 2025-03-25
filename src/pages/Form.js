import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Form = () => {
    const nameRef = useRef(null);
    const blockRef = useRef(null);
    const statusRef = useRef(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newFailure = {
            name: nameRef.current.value,
            block: blockRef.current.value,
            status: statusRef.current.value,
        };

        try {
            const response = await axios.post("http://localhost:5000/failures", newFailure, {
                headers: { "Content-Type": "application/json" }
            });
            console.log("Добавленная поломка:", response.data);
            navigate('/');
        } catch (error) {
            console.error("Ошибка создания:", error);
        }
    };

    return (
        <div style={{ backgroundColor: "#0A192F", minHeight: "100vh", color: "white", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <form onSubmit={handleSubmit} style={{ background: "#112240", padding: "20px", borderRadius: "10px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", width: "300px" }}>
                <h2 style={{ textAlign: "center", marginBottom: "15px" }}>Добавить поломку</h2>
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
                    Добавить
                </button>
            </form>
        </div>
    );
};

export default Form;