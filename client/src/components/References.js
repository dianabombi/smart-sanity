import React, { useState, useEffect } from 'react';
import NavBar from './layout/NavBar';
import Footer from './layout/Footer';
import ApiService from '../services/api';

const References = () => {
  const [references, setReferences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [selectedReferenceImages, setSelectedReferenceImages] = useState(null);

  useEffect(() => {
    loadReferences();
  }, []);

  const loadReferences = async () => {
    try {
      setLoading(true);
      
      // Load fallback references immediately for fast display
      const fallbackReferences = ApiService.getFallbackReferences ? ApiService.getFallbackReferences() : [];
      setReferences(fallbackReferences);
      setLoading(false);
      
      // Start animation after content is loaded
      setTimeout(() => {
        setVisible(true);
      }, 400);
      
      // Try to load from API with timeout in background
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('API timeout')), 2000)
      );
      
      try {
        const result = await Promise.race([
          ApiService.getReferences(),
          timeoutPromise
        ]);
        
        if (result.success && result.references.length > 0) {
          setReferences(result.references);
        }
      } catch (apiError) {
        console.log('API failed or timed out, keeping fallback references:', apiError.message);
      }
      
    } catch (error) {
      console.error('Error loading references:', error);
      const fallbackReferences = ApiService.getFallbackReferences ? ApiService.getFallbackReferences() : [];
      setReferences(fallbackReferences);
      setLoading(false);
    }
  };

  const openImageGallery = (reference) => {
    if (reference.images && reference.images.length > 0) {
      setSelectedReferenceImages(reference);
    }
  };

  const closeImageGallery = () => {
    setSelectedReferenceImages(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black">
        <NavBar />
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-white">Načítavam referencie...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <NavBar />
      
      {/* Header Section */}
      <div className="pt-8 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className={`text-4xl md:text-5xl font-bold text-gray-400 mb-6 tracking-wide ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{
            transition: 'all 0.8s ease-out',
            transitionDelay: '0.2s'
          }}>
            Referencie
          </h1>
          <p className={`text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{
            transition: 'all 0.8s ease-out',
            transitionDelay: '0.4s'
          }}>
            Naše úspešne realizované projekty a spokojní klienti sú našou najlepšou vizitkou.
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        {references.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {references.map((reference, index) => (
              <div 
                key={reference.id} 
                className={`group bg-white/5 border border-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/10 hover:border-blue-500/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/20 ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transition: 'all 0.8s ease-out',
                  transitionDelay: `${0.6 + index * 0.1}s`
                }}
              >
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-white mb-2">{reference.title}</h3>
                  <p className="text-gray-300 text-sm mb-3">{reference.description}</p>
                  
                  <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
                    <span className="font-medium">{reference.year}</span>
                    {reference.location && <span>{reference.location}</span>}
                  </div>
                  
                  {reference.client && (
                    <p className="text-sm text-gray-500">Klient: {reference.client}</p>
                  )}
                  
                  {reference.images && reference.images.length > 0 && (
                    <div className="mt-4">
                      <button
                        onClick={() => openImageGallery(reference)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Zobraziť obrázky ({reference.images.length})
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-500 mb-4">
              <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-400 mb-2">Žiadne referencie</h3>
            <p className="text-gray-500">Referencie sa načítavaju...</p>
          </div>
        )}
      </div>

      {/* Image Gallery Modal */}
      {selectedReferenceImages && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gray-800 border-b border-gray-700 p-6 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">{selectedReferenceImages.title}</h2>
                <p className="text-gray-400">{selectedReferenceImages.description}</p>
                <div className="flex gap-4 text-sm text-gray-500 mt-2">
                  <span>{selectedReferenceImages.year}</span>
                  {selectedReferenceImages.location && <span>{selectedReferenceImages.location}</span>}
                  {selectedReferenceImages.client && <span>Klient: {selectedReferenceImages.client}</span>}
                </div>
              </div>
              <button
                onClick={closeImageGallery}
                className="text-gray-400 hover:text-white text-2xl font-bold"
              >
                ×
              </button>
            </div>

            {/* Images Grid */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {selectedReferenceImages.images.map((image, index) => (
                  <div key={index} className="aspect-square bg-gray-900 rounded-lg overflow-hidden">
                    <img
                      src={image.url || image.dataUrl || image.src}
                      alt={image.originalName || `Reference image ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="w-full h-full bg-gray-700 flex items-center justify-center text-gray-400" style={{ display: 'none' }}>
                      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Close Button */}
            <div className="sticky bottom-0 bg-gray-800 border-t border-gray-700 p-6 text-center">
              <button
                onClick={closeImageGallery}
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors"
              >
                Zavrieť galériu
              </button>
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default References;
