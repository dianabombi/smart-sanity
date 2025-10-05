import React from 'react';
import NavBar from './layout/NavBar';
import Footer from './layout/Footer';
import Breadcrumbs from './ui/Breadcrumbs';

const References = () => {

  // const projects = [
  //   {
  //     title: "Hotel Grandezza Bratislava",
  //     description: "120 hotelových kúpeľní",
  //     year: "2023"
  //   },
  //   {
  //     title: "Wellness AquaRelax",
  //     description: "Kompletné wellness vybavenie",
  //     year: "2023"
  //   },
  //   {
  //     title: "Rezidencia Zlaté Piesky",
  //     description: "8 luxusných kúpeľní",
  //     year: "2022"
  //   },
  //   {
  //     title: "Bytový dom Slnečnica",
  //     description: "45 bytových kúpeľní",
  //     year: "2022"
  //   },
  //   {
  //     title: "Reštaurácia U Tomáša",
  //     description: "Komerčné sanitárne zariadenia",
  //     year: "2023"
  //   },
  //   {
  //     title: "Rodinné domy Nitra",
  //     description: "25+ rodinných kúpeľní",
  //     year: "2021-2023"
  //   }
  // ];

  // const renderStars = (rating) => {
  //   return Array.from({ length: 5 }, (_, index) => (
  //     <span
  //       key={index}
  //       className={`text-xl ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
  //     >
  //       ★
  //     </span>
  //   ));
  // };

  return (
    <div className="min-h-screen bg-black">
      <NavBar />
      
      {/* Breadcrumbs */}
      <div className="pt-4 px-4 sm:px-6 lg:px-8">
        <Breadcrumbs />
      </div>
      
      <div className="container mx-auto px-4 py-12">
        {/* Empty content area */}
        <div className="min-h-[60vh]">
          {/* Content will be added here later */}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default References;
