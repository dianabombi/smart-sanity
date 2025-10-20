// 🚨 EMERGENCY BRANDS SERVICE FOR CLIENT MEETING
// Simple localStorage-based solution that works immediately

class EmergencyBrandsService {
  constructor() {
    this.storageKey = 'emergency_client_meeting_brands';
    this.initializeEmergencyBrands();
  }

  // Initialize with fallback brands if nothing exists
  initializeEmergencyBrands() {
    const existing = localStorage.getItem(this.storageKey);
    if (!existing) {
      const fallbackBrands = this.getFallbackBrands();
      localStorage.setItem(this.storageKey, JSON.stringify(fallbackBrands));
      console.log('🚨 EMERGENCY: Initialized brands in localStorage');
    }
  }

  // Get brands from localStorage
  getBrands() {
    try {
      const brands = localStorage.getItem(this.storageKey);
      if (brands) {
        const parsedBrands = JSON.parse(brands);
        console.log('✅ EMERGENCY: Loaded', parsedBrands.length, 'brands from localStorage');
        return { success: true, brands: parsedBrands, source: 'localStorage' };
      }
    } catch (error) {
      console.error('❌ EMERGENCY: localStorage error:', error);
    }
    
    // Fallback
    const fallbackBrands = this.getFallbackBrands();
    return { success: true, brands: fallbackBrands, source: 'fallback' };
  }

  // Update brand logo
  updateBrandLogo(brandId, logoFile) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const logoDataUrl = reader.result;
          
          // Get current brands
          const current = localStorage.getItem(this.storageKey);
          let brands = current ? JSON.parse(current) : this.getFallbackBrands();
          
          // Update the specific brand
          brands = brands.map(brand => {
            if (brand.id === brandId || brand.name === brandId || brand.order === brandId) {
              console.log(`🚨 EMERGENCY: Updated logo for ${brand.name}`);
              return { ...brand, logo: logoDataUrl };
            }
            return brand;
          });
          
          // Save back to localStorage
          localStorage.setItem(this.storageKey, JSON.stringify(brands));
          console.log('✅ EMERGENCY: Logo saved successfully!');
          
          resolve({
            success: true,
            logoUrl: logoDataUrl,
            message: 'Logo úspešne aktualizované!'
          });
        } catch (error) {
          console.error('❌ EMERGENCY: Update error:', error);
          resolve({
            success: false,
            message: 'Chyba pri aktualizácii loga'
          });
        }
      };
      reader.readAsDataURL(logoFile);
    });
  }

  // Update brand data (name, category, description, etc.)
  updateBrand(brandId, updateData) {
    try {
      // Get current brands
      const current = localStorage.getItem(this.storageKey);
      let brands = current ? JSON.parse(current) : this.getFallbackBrands();
      
      // Find and update the specific brand
      let updatedBrand = null;
      brands = brands.map(brand => {
        if (brand.id === brandId || brand.name === brandId || brand.order === brandId) {
          updatedBrand = { ...brand, ...updateData };
          console.log(`🚨 EMERGENCY: Updated brand ${brand.name}:`, updateData);
          return updatedBrand;
        }
        return brand;
      });
      
      if (updatedBrand) {
        // Save back to localStorage
        localStorage.setItem(this.storageKey, JSON.stringify(brands));
        console.log('✅ EMERGENCY: Brand data saved successfully!');
        
        return {
          success: true,
          brand: updatedBrand,
          message: 'Značka úspešne aktualizovaná!'
        };
      } else {
        return {
          success: false,
          message: 'Značka nebola nájdená'
        };
      }
    } catch (error) {
      console.error('❌ EMERGENCY: Update brand error:', error);
      return {
        success: false,
        message: 'Chyba pri aktualizácii značky'
      };
    }
  }

  // Get fallback brands - ALL 18 BRANDS
  getFallbackBrands() {
    return [
      // Main brands with descriptions
      {
        id: 1,
        name: 'Agape',
        description: 'Prémiový taliansky dodávateľ kúpeľňových batérií, sanity, nábytku a kúpeľňových doplnkov',
        category: 'Kúpeľňový nábytok',
        logo: '/logoWhite.svg',
        website: 'https://www.agapedesign.it',
        order: 1,
        images: [],
        isMain: true
      },
      {
        id: 2,
        name: 'Fantini',
        description: 'Prémiový taliansky výrobca kúpeľňových a kuchynských batérií a doplnkov',
        category: 'Batérie a sprchy',
        logo: '/fantini.png',
        website: 'https://www.fantini.it',
        order: 2,
        images: [],
        isMain: true
      },
      {
        id: 3,
        name: 'Cielo',
        description: 'Prémiový taliansky výrobca kúpeľňovej sanity, nábytku a kúpeľňových doplnkov',
        category: 'Sanitárna keramika',
        logo: '/logo_cielo_white.png',
        website: 'https://www.cielo.it',
        order: 3,
        images: [],
        isMain: true
      },
      {
        id: 4,
        name: 'Azzurra',
        description: 'Prémiový taliansky výrobca kúpeľňovej sanity, nábytku a kúpeľňových doplnkov',
        category: 'Sanitárna keramika',
        logo: '/logoWhite.svg',
        website: 'https://www.azzurra.it',
        order: 4,
        images: [],
        isMain: true
      },
      {
        id: 5,
        name: 'CEA',
        description: 'Prémiový taliansky výrobca kúpeľňových a kuchynských batérií, elektrických sušiakov a doplnkov',
        category: 'Batérie a sprchy',
        logo: '/cea.svg',
        website: 'https://www.ceadesign.it',
        order: 5,
        images: [],
        isMain: true
      },
      {
        id: 6,
        name: 'Antrax',
        description: 'Prémiový taliansky výrobca dizajnových radiátorov',
        category: 'Radiátory',
        logo: '/antraxIt.jpg',
        website: 'https://www.antrax.it',
        order: 6,
        images: [],
        isMain: true
      },
      {
        id: 7,
        name: 'Zenon',
        description: 'Prémiový španielsky výrobca umývadiel, vaní a sprchových vaničiek',
        category: 'Sanitárna keramika',
        logo: '/logoWhite.svg',
        website: 'https://www.zenon.es',
        order: 7,
        images: [],
        isMain: true
      },
      {
        id: 8,
        name: 'Fondovalle',
        description: 'Prémiový taliansky výrobca keramických obkladov a dlažieb',
        category: 'Obklady a dlažby',
        logo: '/logogf.png',
        website: 'https://www.fondovalle.it',
        order: 8,
        images: [],
        isMain: true
      },
      {
        id: 9,
        name: 'Fiandre',
        description: 'Prémiový taliansky výrobca keramických obkladov a dlažieb',
        category: 'Obklady a dlažby',
        logo: '/elite_logoRGB-11.jpg',
        website: 'https://www.granitifiandre.com',
        order: 9,
        images: [],
        isMain: true
      },
      // Other brands (Ostatné)
      {
        id: 10,
        name: 'Tres',
        description: 'tresgriferia.com',
        category: 'Ostatné',
        logo: '/TRES_logo_W.svg',
        website: 'https://www.tresgriferia.com',
        order: 10,
        images: [],
        isMain: false,
        isOther: true
      },
      {
        id: 11,
        name: 'Axor',
        description: '',
        category: 'Ostatné',
        logo: '/Axor-logo-white.png',
        website: 'https://www.axor-design.com',
        order: 11,
        images: [],
        isMain: false,
        isOther: true
      },
      {
        id: 12,
        name: 'Kaldewei',
        description: '',
        category: 'Ostatné',
        logo: '/kaldewei.png',
        website: 'https://www.kaldewei.com',
        order: 12,
        images: [],
        isMain: false,
        isOther: true
      },
      {
        id: 13,
        name: 'Alca',
        description: '',
        category: 'Ostatné',
        logo: '/alca.svg',
        website: 'https://www.alca.es',
        order: 13,
        images: [],
        isMain: false,
        isOther: true
      },
      {
        id: 14,
        name: 'Hansgrohe',
        description: '',
        category: 'Ostatné',
        logo: '/Hansgrohe-Logo-2.svg',
        website: 'https://www.hansgrohe.com',
        order: 14,
        images: [],
        isMain: false,
        isOther: true
      },
      {
        id: 15,
        name: 'Huppe',
        description: '',
        category: 'Ostatné',
        logo: '/logoWhite.svg',
        website: 'https://www.huppe.com',
        order: 15,
        images: [],
        isMain: false,
        isOther: true
      },
      {
        id: 16,
        name: 'Dornbracht',
        description: '',
        category: 'Ostatné',
        logo: '/logoWhite.svg',
        website: 'https://www.dornbracht.com',
        order: 16,
        images: [],
        isMain: false,
        isOther: true
      },
      {
        id: 17,
        name: 'Laufen',
        description: '',
        category: 'Ostatné',
        logo: '/LAUFEN_White_RGB_big.png',
        website: 'https://www.laufen.com',
        order: 17,
        images: [],
        isMain: false,
        isOther: true
      },
      {
        id: 18,
        name: 'Kludi',
        description: '',
        category: 'Ostatné',
        logo: '/logoWhite.svg',
        website: 'https://www.kludi.com',
        order: 18,
        images: [],
        isMain: false,
        isOther: true
      },
      {
        id: 19,
        name: 'Elite Bath + Kitchen',
        description: '',
        category: 'Partnerstvo',
        logo: '/ebk-logo.svg', // Specific EB+K logo path
        website: 'https://www.elitebathkitchen.com',
        order: 19,
        images: [],
        isMain: true,
        isPartnership: true
      }
    ];
  }
}

// Export singleton instance
const emergencyBrands = new EmergencyBrandsService();
export default emergencyBrands;
