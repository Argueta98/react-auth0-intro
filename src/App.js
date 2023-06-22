import './App.css';
import ShowPlayGame from './components/ShowPlayGame';
import Header from './components/Header';
import Footer from './components/Footer';
import Profile from './components/Profile';
import Home from './components/Home';
import { useAuth0 } from '@auth0/auth0-react';
import Buscador from './components/Buscador';

function App() {
  const {isAuthenticated, isLoading} =useAuth0();

  if(isLoading) return <h1>Loading ...</h1>
  return (
    <div className="App">
      {
        isAuthenticated ? 
        <Header />
        : 
        <Home />
      }
      <ShowPlayGame />
      <Buscador />
      
    
      <Footer />

    </div>
  );
}

export default App;
