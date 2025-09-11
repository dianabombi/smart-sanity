import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Entrance from './components/Entrance';
import WhoWeAre from './components/WhoWeAre';
import CategoryGallery from './components/CategoryGallery';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/entrance" element={<Entrance />} />
          <Route path="/who-we-are" element={<WhoWeAre />} />
          <Route path="/category/:category" element={<CategoryGallery />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
