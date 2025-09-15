import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Entrance from './components/Entrance';
import WhoWeAre from './components/WhoWeAre';
import Contact from './components/Contact';
import Brands from './components/Brands';
import CategoryGallery from './components/CategoryGallery';
import CookieConsent from './components/ui/CookieConsent';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/components" element={<Entrance />} />
          <Route path="/who-we-are" element={<WhoWeAre />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/brands" element={<Brands />} />
          <Route path="/components/category/:category" element={<CategoryGallery />} />
        </Routes>
        <CookieConsent />
      </div>
    </Router>
  );
}

export default App;
