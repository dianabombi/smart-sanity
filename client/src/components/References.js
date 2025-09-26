import React from 'react';
import NavBar from './layout/NavBar';
import Footer from './layout/Footer';
import Breadcrumbs from './ui/Breadcrumbs';

const References = () => {
  const testimonials = [
    {
      id: 1,
      name: "Ing. Peter Novák",
      company: "Hotel Grandezza, Bratislava",
      role: "Technický riaditeľ",
      text: "Smart Sanit nám kompletne zrekonštruoval kúpeľne vo všetkých 120 izbách nášho hotela. Profesionalita, kvalita materiálov a dodržanie termínov boli na najvyššej úrovni. Naši hostia si pochvaľujú modernú a funkčnú kúpeľňu.",
      rating: 5,
      project: "Kompletná rekonštrukcia hotelových kúpeľní"
    },
    {
      id: 2,
      name: "Mária Kováčová",
      company: "Rodinný dom, Nitra",
      role: "Majiteľka",
      text: "Vždy som snívala o luxusnej kúpeľni a Smart Sanit mi tento sen splnil. Od návrhu až po realizáciu všetko prebehlo hladko. Kvalita práce je vynikajúca a cena bola férová. Odporúčam každému!",
      rating: 5,
      project: "Dizajnová kúpeľňa s wellness prvkami"
    },
    {
      id: 3,
      name: "Mgr. Ján Svoboda",
      company: "Wellness centrum AquaRelax",
      role: "Prevádzkovateľ",
      text: "Pre naše wellness centrum sme potrebovali špičkové sanitárne vybavenie. Smart Sanit nám dodal prémiové značky ako Grohe a Villeroy & Boch. Ich poradenstvo a servis sú na profesionálnej úrovni.",
      rating: 5,
      project: "Wellness centrum - sanitárne vybavenie"
    },
    {
      id: 4,
      name: "Ing. arch. Elena Bartošová",
      company: "Bartošová Design Studio",
      role: "Architektka",
      text: "Spolupráca so Smart Sanit je vždy bezproblémová. Majú skvelý výber moderných sanitárnych prvkov a dokážu realizovať aj tie najnáročnejšie dizajnové požiadavky. Sú mojím prvým partnerom pre sanitárne projekty.",
      rating: 5,
      project: "Luxusné rezidencia - 8 kúpeľní"
    },
    {
      id: 5,
      name: "Tomáš Hudák",
      company: "Reštaurácia U Tomáša, Košice",
      role: "Majiteľ",
      text: "Smart Sanit nám zrealizoval sanitárne zariadenia pre našu reštauráciu. Všetko je funkčné, hygienické a estetické. Personál bol profesionálny a práce dokončili presne v dohodnutom termíne.",
      rating: 5,
      project: "Komerčné sanitárne zariadenia"
    },
    {
      id: 6,
      name: "Ing. Miroslav Čech",
      company: "Bytový dom Slnečnica",
      role: "Správca nehnuteľnosti",
      text: "Rekonštrukcia kúpeľní v našom bytovom dome prebehla bez problémov. Smart Sanit koordinoval práce s obyvateľmi, dodržal rozpočet a termíny. Kvalita materiálov a práce je vynikajúca.",
      rating: 5,
      project: "Rekonštrukcia 45 bytových kúpeľní"
    }
  ];

  const projects = [
    {
      title: "Hotel Grandezza Bratislava",
      description: "120 hotelových kúpeľní",
      year: "2023"
    },
    {
      title: "Wellness AquaRelax",
      description: "Kompletné wellness vybavenie",
      year: "2023"
    },
    {
      title: "Rezidencia Zlaté Piesky",
      description: "8 luxusných kúpeľní",
      year: "2022"
    },
    {
      title: "Bytový dom Slnečnica",
      description: "45 bytových kúpeľní",
      year: "2022"
    },
    {
      title: "Reštaurácia U Tomáša",
      description: "Komerčné sanitárne zariadenia",
      year: "2023"
    },
    {
      title: "Rodinné domy Nitra",
      description: "25+ rodinných kúpeľní",
      year: "2021-2023"
    }
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`text-xl ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
      >
        ★
      </span>
    ));
  };

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
