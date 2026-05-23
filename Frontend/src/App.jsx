import React from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import Feed from './pages/Feed';
import CreatePost from './pages/CreatePost';
import MeshBackground from './components/MeshBackground';
import './App.css';

const Navigation = () => {
  const location = useLocation();
  
  return (
    <header className="navbar">
      <Link to="/" className="logo-container">
        <div className="logo-icon"></div>
        <h1>PostBin</h1>
      </Link>
      
      <nav className="nav-links">
        <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
          Feed
        </Link>
        <Link to="/create" className={`nav-link ${location.pathname === '/create' ? 'active' : ''}`}>
          + New Post
        </Link>
      </nav>
    </header>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <div className="app-container">
        <MeshBackground />
        <div className="content-layer">
          <Navigation />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Feed />} />
              <Route path="/create" element={<CreatePost />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;