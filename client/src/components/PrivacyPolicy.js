import React, { useState, useEffect } from 'react';
import Layout from './layout/Layout';
import NavBar from './layout/NavBar';

const PrivacyPolicy = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after mount
    setTimeout(() => {
      setVisible(true);
    }, 100);
  }, []);

  return (
    <Layout>
      <NavBar />
      
      <div className="min-h-screen bg-black pb-8">
        <div className="w-full max-w-5xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12 pt-8">
            <h1 className={`text-4xl md:text-5xl font-bold text-gray-300 mb-6 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{
              transition: 'all 0.8s ease-out',
              transitionDelay: '0.2s'
            }}>
              Ochrana osobných údajov
            </h1>
            <p className={`text-lg text-gray-400 max-w-3xl mx-auto ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{
              transition: 'all 0.8s ease-out',
              transitionDelay: '0.4s'
            }}>
              Informácie o spracovaní osobných údajov v súlade s GDPR
            </p>
          </div>

          {/* Content Card */}
          <div className={`bg-white/5 border border-white/10 backdrop-blur-sm rounded-lg p-8 md:p-12 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{
            transition: 'all 0.8s ease-out',
            transitionDelay: '0.6s'
          }}>
            <div className="space-y-8 text-gray-300">
              
              {/* Section 1 */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-200 mb-4">1. Prevádzkovateľ osobných údajov</h2>
                <div className="space-y-2 text-gray-400 leading-relaxed">
                  <p><strong className="text-gray-300">Názov spoločnosti:</strong> Smart Sanit s.r.o.</p>
                  <p><strong className="text-gray-300">Sídlo:</strong> Továrenská 14, 811 09 Bratislava, Slovenská republika</p>
                  <p><strong className="text-gray-300">IČO:</strong> 2122180918</p>
                  <p><strong className="text-gray-300">DIČ:</strong> [doplniť DIČ]</p>
                  <p><strong className="text-gray-300">Zapísaná:</strong> Obchodný register Okresného súdu Bratislava I, oddiel: Sro, vložka č. [doplniť]</p>
                  <p><strong className="text-gray-300">Kontakt:</strong> dusan.drinka@smartsanit.sk, +421 948 882 376</p>
                </div>
              </section>

              {/* Section 2 */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-200 mb-4">2. Účel a právny základ spracovania osobných údajov</h2>
                <div className="space-y-4 text-gray-400 leading-relaxed">
                  <p>Vaše osobné údaje spracovávame na nasledovné účely:</p>
                  
                  <div className="ml-4 space-y-3">
                    <div>
                      <h3 className="font-semibold text-gray-300 mb-2">Vybavenie žiadostí a ponúk</h3>
                      <p><strong>Právny základ:</strong> Oprávnený záujem prevádzkovateľa (čl. 6 ods. 1 písm. f) GDPR) alebo plnenie zmluvy (čl. 6 ods. 1 písm. b) GDPR)</p>
                      <p><strong>Spracovávané údaje:</strong> Meno, priezvisko, email, telefónne číslo, obsah správy</p>
                      <p><strong>Doba uchovávania:</strong> 3 roky od poslednej komunikácie</p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-300 mb-2">Marketingová komunikácia</h3>
                      <p><strong>Právny základ:</strong> Súhlas dotknutej osoby (čl. 6 ods. 1 písm. a) GDPR)</p>
                      <p><strong>Spracovávané údaje:</strong> Email, meno</p>
                      <p><strong>Doba uchovávania:</strong> Do odvolania súhlasu</p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-300 mb-2">Plnenie zákonných povinností</h3>
                      <p><strong>Právny základ:</strong> Plnenie právnej povinnosti (čl. 6 ods. 1 písm. c) GDPR)</p>
                      <p><strong>Spracovávané údaje:</strong> Údaje potrebné pre daňové a účtovné účely</p>
                      <p><strong>Doba uchovávania:</strong> V súlade s príslušnými právnymi predpismi (napr. 10 rokov podľa zákona o účetníctve)</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 3 */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-200 mb-4">3. Príjemcovia a spracovatelia osobných údajov</h2>
                <div className="space-y-4 text-gray-400 leading-relaxed">
                  <p>Vaše osobné údaje môžu byť poskytnuté nasledovným kategóriám príjemcov a spracovateľov:</p>
                  
                  <div className="ml-4 space-y-3">
                    <div>
                      <h3 className="font-semibold text-gray-300 mb-2">Zmluvní spracovatelia</h3>
                      <p>S nasledovnými spracovateľmi máme uzatvorené zmluvy o spracovaní osobných údajov v súlade s čl. 28 GDPR:</p>
                      <ul className="list-disc list-inside ml-4 space-y-1 mt-2">
                        <li>Poskytovatelia webhostingu a cloudových služieb (Vercel, Supabase)</li>
                        <li>Poskytovatelia IT služieb a technickej podpory</li>
                        <li>Poskytovatelia e-mailovej komunikácie</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-300 mb-2">Ďalší príjemcovia</h3>
                      <ul className="list-disc list-inside ml-4 space-y-1">
                        <li>Účtovní a daňoví poradcovia</li>
                        <li>Orgány verejnej moci v prípade, že to vyžaduje zákon</li>
                        <li>Naši obchodní partneri pri realizácii projektov (len s vaším výslovným súhlasom)</li>
                      </ul>
                    </div>
                  </div>
                  
                  <p className="mt-4">Všetci spracovatelia sú zmluvne zaviazaní dodržiavať bezpečnosť a dôvernosť vašich údajov. Osobné údaje neprenášame do tretích krajín mimo EÚ/EHP.</p>
                </div>
              </section>

              {/* Section 4 */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-200 mb-4">4. Vaše práva</h2>
                <div className="space-y-2 text-gray-400 leading-relaxed">
                  <p>V súvislosti so spracovaním vašich osobných údajov máte nasledujúce práva:</p>
                  <ul className="list-disc list-inside ml-4 space-y-2 mt-2">
                    <li><strong className="text-gray-300">Právo na prístup</strong> – máte právo získať informácie o tom, aké vaše osobné údaje spracovávame</li>
                    <li><strong className="text-gray-300">Právo na opravu</strong> – môžete požiadať o opravu nesprávnych alebo neaktuálnych údajov</li>
                    <li><strong className="text-gray-300">Právo na vymazanie</strong> ("právo byť zabudnutý") – za určitých podmienok môžete požiadať o vymazanie vašich údajov</li>
                    <li><strong className="text-gray-300">Právo na obmedzenie spracovania</strong> – môžete požiadať o obmedzenie spracovania vašich údajov</li>
                    <li><strong className="text-gray-300">Právo na prenosnosť údajov</strong> – môžete získať vaše údaje v štruktúrovanom formáte</li>
                    <li><strong className="text-gray-300">Právo namietať</strong> – môžete namietať proti spracovaniu založenom na oprávnenom záujme</li>
                    <li><strong className="text-gray-300">Právo odvolať súhlas</strong> – ak spracovanie vychádza zo súhlasu, môžete ho kedykoľvek odvolať</li>
                    <li><strong className="text-gray-300">Právo podať sťažnosť</strong> – máte právo podať sťažnosť na dozorný orgán:
                      <div className="ml-6 mt-2 text-sm">
                        <p className="font-semibold text-gray-300">Úrad na ochranu osobných údajov Slovenskej republiky</p>
                        <p>Hraničná 12, 820 07 Bratislava 27</p>
                        <p>Tel.: +421 2 3231 3214</p>
                        <p>E-mail: statny.dozor@pdp.gov.sk</p>
                        <p>Web: <a href="https://www.dataprotection.gov.sk" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white underline">www.dataprotection.gov.sk</a></p>
                      </div>
                    </li>
                  </ul>
                </div>
              </section>

              {/* Section 5 */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-200 mb-4">5. Bezpečnosť osobných údajov</h2>
                <div className="space-y-2 text-gray-400 leading-relaxed">
                  <p>Prijímame primerané technické a organizačné opatrenia na zabezpečenie ochrany vašich osobných údajov pred neoprávneným prístupom, zneužitím, stratou alebo zničením. Tieto opatrenia zahŕňajú:</p>
                  <ul className="list-disc list-inside ml-4 space-y-2 mt-2">
                    <li>Šifrovanie dát pri prenose (SSL/TLS)</li>
                    <li>Zabezpečený prístup k databázam</li>
                    <li>Pravidelnú kontrolu bezpečnostných systémov</li>
                    <li>Obmedzený prístup k osobným údajom len pre oprávnených zamestnancov</li>
                  </ul>
                </div>
              </section>

              {/* Section 6 */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-200 mb-4">6. Súbory cookies a súhlasový mechanizmus</h2>
                <div className="space-y-4 text-gray-400 leading-relaxed">
                  <p>Naša webová stránka používa cookies na zlepšenie vášho používateľského zážitku. Cookies sú malé textové súbory, ktoré sa ukladajú vo vašom prehliadači.</p>
                  
                  <div className="mt-4 space-y-3">
                    <div>
                      <h3 className="font-semibold text-gray-300">Nevyhnutné cookies</h3>
                      <p><strong>Právny základ:</strong> Oprávnený záujem (čl. 6 ods. 1 písm. f) GDPR)</p>
                      <p>Tieto cookies sú nevyhnutné pre základné fungovanie webovej stránky (napr. bezpečnostné funkcie, nastavenia) a nemôžu byť vypnuté. Nevyžadujú súhlas.</p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-300">Analytické a marketingové cookies</h3>
                      <p><strong>Právny základ:</strong> Súhlas (čl. 6 ods. 1 písm. a) GDPR)</p>
                      <p>Používame analytické cookies na pochopenie správania návštevníkov a zlepšenie našej webovej stránky. Marketingové cookies používame na cielené zobrazenie obsahu.</p>
                      <p className="font-semibold text-gray-300 mt-2">Súhlasový mechanizmus (opt-in):</p>
                      <p>Pri prvej návšteve webovej stránky sa vám zobrazí cookie lišta, kde môžete:</p>
                      <ul className="list-disc list-inside ml-4 space-y-1 mt-1">
                        <li>Prijať všetky cookies</li>
                        <li>Odmietnuť nepovinné cookies</li>
                        <li>Nastaviť vlastné preferencie pre jednotlivé kategórie</li>
                      </ul>
                      <p className="mt-2">Analytické a marketingové cookies používame len po získaní vášho výslovného súhlasu.</p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-300">Správa cookies</h3>
                      <p>Svoj súhlas môžete kedykoľvek odvolať a zmeniť nastavenia cookies:</p>
                      <ul className="list-disc list-inside ml-4 space-y-1 mt-1">
                        <li>V nastaveniach cookie lišty na našej webovej stránke</li>
                        <li>V nastaveniach vášho internetového prehliadača</li>
                        <li>Kontaktovaním nás na dusan.drinka@smartsanit.sk</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 7 */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-200 mb-4">7. Automatizované rozhodovanie a profilovanie</h2>
                <div className="space-y-2 text-gray-400 leading-relaxed">
                  <p>Nepoužívame automatizované rozhodovanie ani profilovanie, ktoré by mohlo mať právne účinky alebo významný vplyv na vašu osobu.</p>
                </div>
              </section>

              {/* Section 8 - NEW */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-200 mb-4">8. Záznamy o spracovateľských činnostiach</h2>
                <div className="space-y-2 text-gray-400 leading-relaxed">
                  <p>V súlade s čl. 30 GDPR vedieme internú evidenciu všetkých spracovateľských činností osobných údajov. Táto evidencia obsahuje:</p>
                  <ul className="list-disc list-inside ml-4 space-y-1 mt-2">
                    <li>Účely spracovania</li>
                    <li>Kategórie dotknutých osôb a osobných údajov</li>
                    <li>Kategórie príjemcov</li>
                    <li>Lehoty na vymazanie</li>
                    <li>Technické a organizačné bezpečnostné opatrenia</li>
                  </ul>
                  <p className="mt-4">Tieto záznamy sú k dispozícii na požiadanie dozorného orgánu v prípade kontroly.</p>
                </div>
              </section>

              {/* Section 9 */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-200 mb-4">9. Kontakt pre záležitosti týkajúce sa ochrany údajov</h2>
                <div className="space-y-2 text-gray-400 leading-relaxed">
                  <p>V prípade akýchkoľvek otázok týkajúcich sa spracovania vašich osobných údajov alebo uplatnenia vašich práv nás môžete kontaktovať:</p>
                  <div className="ml-4 mt-4 space-y-1">
                    <p><strong className="text-gray-300">Email:</strong> dusan.drinka@smartsanit.sk</p>
                    <p><strong className="text-gray-300">Telefón:</strong> +421 948 882 376</p>
                    <p><strong className="text-gray-300">Adresa:</strong> Továrenská 14, 811 09 Bratislava</p>
                  </div>
                </div>
              </section>

              {/* Section 10 */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-200 mb-4">10. Zmeny v zásadách ochrany osobných údajov</h2>
                <div className="space-y-2 text-gray-400 leading-relaxed">
                  <p>Vyhradzujeme si právo aktualizovať tieto zásady ochrany osobných údajov. O akýchkoľvek podstatných zmenách vás budeme informovať prostredníctvom našej webovej stránky alebo emailom.</p>
                </div>
              </section>

              {/* Footer */}
              <section className="pt-6 border-t border-gray-700">
                <p className="text-sm text-gray-500">
                  <strong className="text-gray-400">Posledná aktualizácia:</strong> {new Date().toLocaleDateString('sk-SK', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Tieto zásady sú v súlade s Nariadením Európskeho parlamentu a Rady (EÚ) 2016/679 (GDPR) a zákonom č. 18/2018 Z. z. o ochrane osobných údajov.
                </p>
              </section>

            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
