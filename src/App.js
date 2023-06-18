import './App.css';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import Conten from './components/Content';
import Aside from './components/Aside';
import Header from './components/Header';
import Footer from './components/Footer';
import Profile from './components/Profile';
import Home from './components/Home';
import { useAuth0 } from '@auth0/auth0-react';

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
      <Profile />
      <Aside /> 
      <Footer />

    </div>
  );
}

export default App;
