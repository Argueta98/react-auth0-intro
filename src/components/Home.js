import React from 'react'
import { useAuth0,  } from '@auth0/auth0-react';

function Home() {
    const {loginWithRedirect} = useAuth0();
  return (
    <div
    style={{
        backgroundImage: 'url("https://img.freepik.com/vector-premium/banner-videojuegos-fondo-juego-cibernetico_705714-77.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        color: 'white',
      }}
    >
        <h1>BIENVENIDOS PLAYGAME</h1>
        <p>Aquí puedes  buscar tu videojuego favorito.</p>
        <button onClick={() => loginWithRedirect()} className="btn btn-danger">CREAR TU CUENTA</button>
        <p>--------------------------------------------------------------------------------------------</p>
        <button onClick={() => loginWithRedirect()} className="btn btn-primary">INICIAR SECION</button>
    </div>
  )
}

export default Home
