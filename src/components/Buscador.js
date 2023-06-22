import React, { useState } from "react";
import axios from "axios";

const Buscador = ({ onBuscar }) => {
 

  const [videojuegos, setVideojuegos] = useState([]);
  const [id, setId] = useState("");
  const [query, setQuery] = useState("");
  const [data, setData] = useState(null);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token ="eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjJmNHcwNkJPMXFGdTI0UlFFMEhiXyJ9.eyJuaWNrbmFtZSI6Impob2phaXJhbWFycXVlei45OSIsIm5hbWUiOiJqaG9qYWlyYW1hcnF1ZXouOTlAZ21haWwuY29tIiwicGljdHVyZSI6Imh0dHBzOi8vcy5ncmF2YXRhci5jb20vYXZhdGFyL2QwNzI4NDkzYzQ2Y2Q4OWUyZWFjMDJiMTU0YTJkNDU5P3M9NDgwJnI9cGcmZD1odHRwcyUzQSUyRiUyRmNkbi5hdXRoMC5jb20lMkZhdmF0YXJzJTJGamgucG5nIiwidXBkYXRlZF9hdCI6IjIwMjMtMDYtMjJUMTU6NDU6MzguNTQzWiIsImVtYWlsIjoiamhvamFpcmFtYXJxdWV6Ljk5QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczovL2Rldi1hYmJ5dGVjaC51cy5hdXRoMC5jb20vIiwiYXVkIjoienE1dUVKeTR3SHp3bmRtWTZxUjhBOTZWbm9mWXlsQzYiLCJpYXQiOjE2ODc0NDg3MzgsImV4cCI6MTY4NzQ4NDczOCwic3ViIjoiYXV0aDB8NjQ4OTNjMzBjYjcxMzgzY2U5NWJkYmQ0In0.E-0YlJwYCjfr3TSgAW536E02KYfpR2guSMxK3SC1xvpVOjX6c85zIKgiA1f2ILMr3xdcHjyJS4H2k5E6KtaqOmjLebEROu_sQt-n26jZudwllIp-66IJi9F4At9JzOpKbDemhZK-Bkn3JUyCeGkkWTnjWCKqsdYSJDk5eE1lP4YCVRw6M-6smSVlnII0CvSPStPKQxmOf6GKzQAz6QpuA4BIrtKIjeIZ5vdfKshT_w6jFOKI6NXQF8dF9vSNl_3PD6IyTd8cx51Dx6trjYpCw-HC1I9i8DE5nnG8CEUFfeWIellnyox41MFcmsa4McgFZoAtahSCIXVjHWqH-34LeQ";
      const url =`https://et1awybnrd.execute-api.us-east-1.amazonaws.com/dev/${query}`;
      const response = await axios.get(url, {
        headers: {
            Authorization: `Bearer ${token}`
        }
      });
      const data = response.data;
      onBuscar(data);
    } catch (error) {
      console.error("Error al buscar los datos:", error);
    }
  };

  return (
    <div>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Buscar..."
        value={query}
        onChange={handleInputChange}
      />
      <button type="submit">Buscar</button>
    </form>

        {data && (
            <div>
            <h2>Resultados:</h2>
            <ul>
                {data.map((item) => (
                <li key={item.id}>{item.nombre}</li>
                ))}
            </ul>
            </div>
        )}

</div>
  );
};

export default Buscador;
