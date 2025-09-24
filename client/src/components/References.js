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
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Referencie
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Naši spokojní zákazníci sú našou najlepšou vizitkou. Prečítajte si, čo hovoria o našich službách a realizovaných projektoch.
          </p>
        </div>

        {/* Statistics Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          <div className="text-center bg-gray-900 border border-gray-700 p-6 rounded-lg shadow-lg">
            <div className="text-3xl font-bold text-white mb-2">500+</div>
            <div className="text-gray-300">Realizovaných projektov</div>
          </div>
          <div className="text-center bg-gray-900 border border-gray-700 p-6 rounded-lg shadow-lg">
            <div className="text-3xl font-bold text-white mb-2">15+</div>
            <div className="text-gray-300">Rokov skúseností</div>
          </div>
          <div className="text-center bg-gray-900 border border-gray-700 p-6 rounded-lg shadow-lg">
            <div className="text-3xl font-bold text-white mb-2">98%</div>
            <div className="text-gray-300">Spokojnosť zákazníkov</div>
          </div>
          <div className="text-center bg-gray-900 border border-gray-700 p-6 rounded-lg shadow-lg">
            <div className="text-3xl font-bold text-white mb-2">24/7</div>
            <div className="text-gray-300">Servisná podpora</div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            Čo hovoria naši zákazníci
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-gray-900 border border-gray-700 p-6 rounded-lg shadow-lg hover:shadow-xl hover:border-gray-600 transition-all">
                <div className="flex items-center mb-4">
                  {renderStars(testimonial.rating)}
                </div>
                
                <p className="text-gray-300 mb-6 italic leading-relaxed">
                  "{testimonial.text}"
                </p>
                
                <div className="border-t border-gray-700 pt-4">
                  <div className="font-semibold text-white">{testimonial.name}</div>
                  <div className="text-sm text-gray-400">{testimonial.role}</div>
                  <div className="text-sm text-gray-300 font-medium">{testimonial.company}</div>
                  <div className="text-xs text-gray-400 mt-2 bg-gray-800 px-2 py-1 rounded">
                    {testimonial.project}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Projects Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            Vybrané projekty
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div key={index} className="bg-gray-900 border border-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg hover:border-gray-600 transition-all">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold text-white text-lg">{project.title}</h3>
                  <span className="text-sm text-gray-300 bg-gray-800 px-2 py-1 rounded">
                    {project.year}
                  </span>
                </div>
                <p className="text-gray-400">{project.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gray-900 border border-gray-700 text-white p-12 rounded-lg">
          <h2 className="text-3xl font-bold mb-4">
            Chcete byť našou ďalšou referenciou?
          </h2>
          <p className="text-xl mb-8 text-gray-300">
            Kontaktujte nás a spoločne vytvoríme vašu vysnívanú kúpeľňu
          </p>
          <button 
            onClick={() => window.location.href = '/contact'}
            className="bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
          >
            Kontaktovať nás
          </button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default References;
