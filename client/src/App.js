import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Entrance from './components/Entrance';
import WhoWeAre from './components/WhoWeAre';
import Contact from './components/Contact';
import Brands from './components/Brands';
import BrandDetail from './components/BrandDetail';
import CategoryGallery from './components/CategoryGallery';
import References from './components/References';
import ReferenceGallery from './components/ReferenceGallery';
import Inspirations from './components/Inspirations';
import PrivacyPolicy from './components/PrivacyPolicy';
import Admin from './components/Admin';
import CookieConsent from './components/ui/CookieConsent';
import ScrollToTop from './components/ScrollToTop';

function App() {
  console.log('App component rendering...');
  
  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/what-we-offer" element={<Entrance />} />
          <Route path="/who-we-are" element={<WhoWeAre />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/brands" element={<Brands />} />
          <Route path="/brands/:brandId" element={<BrandDetail />} />
          <Route path="/references" element={<References />} />
          <Route path="/references/:referenceId" element={<ReferenceGallery />} />
          <Route path="/inspirations" element={<Inspirations />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/components/category/:category" element={<CategoryGallery />} />
          <Route path="/admin/*" element={<Admin />} />
        </Routes>
        <CookieConsent />
      </div>
    </Router>
  );
}

export default App;
