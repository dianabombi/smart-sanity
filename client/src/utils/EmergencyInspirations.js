// Emergency Inspirations System - Base64 Storage Fallback
// This system stores inspirations data in localStorage as a backup when Supabase is unavailable

class EmergencyInspirations {
  constructor() {
    this.storageKey = 'emergency_inspirations_data';
    this.defaultInspirations = [
      {
        id: 1,
        title: 'Luxusný priestor',
        description: 'Prémiové materiály a sofistikované riešenia.',
        category: 'luxury',
        image: '/photos/compressed/ATX_AG0065.jpg',
        features: ['Luxusné materiály', 'Prémiové vybavenie', 'Elegantný dizajn'],
        brands: ['AXOR', 'Fantini', 'Cielo'],
        created_at: new Date().toISOString()
      },
      {
        id: 2,
        title: 'Štýlová kúpeľňa',
        description: 'Kombinácia funkčnosti a estetiky.',
        category: 'modern',
        image: '/photos/compressed/ATX_AG0088.jpg',
        features: ['Štýlový dizajn', 'Praktické riešenia', 'Kvalitné materiály'],
        brands: ['CEA Design', 'Azzurra', 'Hansgrohe'],
        created_at: new Date().toISOString()
      },
      {
        id: 3,
        title: 'Minimalistický štýl',
        description: 'Čisté línie a jednoduché riešenia.',
        category: 'modern',
        image: '/photos/compressed/ATX_AG0102.jpg',
        features: ['Minimalizmus', 'Čisté línie', 'Funkčnosť'],
        brands: ['Agape', 'Kaldewei', 'Hansgrohe'],
        created_at: new Date().toISOString()
      },
      {
        id: 4,
        title: 'Elegantná kúpeľňa',
        description: 'Sofistikované riešenie s dôrazom na detail.',
        category: 'luxury',
        image: '/photos/compressed/ATX_AG0114.jpg',
        features: ['Elegancia', 'Detailné riešenia', 'Kvalita'],
        brands: ['Fantini', 'AXOR', 'Cielo'],
        created_at: new Date().toISOString()
      },
      {
        id: 5,
        title: 'Klasický štýl',
        description: 'Nadčasový dizajn s tradičnými prvkami.',
        category: 'classic',
        image: '/photos/compressed/ATX_AG0120.jpg',
        features: ['Klasický dizajn', 'Tradičné prvky', 'Nadčasovosť'],
        brands: ['Azzurra', 'Hansgrohe', 'Kaldewei'],
        created_at: new Date().toISOString()
      },
      {
        id: 6,
        title: 'Moderný komfort',
        description: 'Pohodlné a praktické riešenia.',
        category: 'modern',
        image: '/photos/compressed/ATX_AG0129.jpg',
        features: ['Komfort', 'Praktickosť', 'Modernosť'],
        brands: ['CEA Design', 'Agape', 'Fantini'],
        created_at: new Date().toISOString()
      }
    ];
  }

  // Get all inspirations
  getInspirations() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        const data = JSON.parse(stored);
        console.log('📦 EMERGENCY: Loaded inspirations from localStorage');
        return { success: true, inspirations: data };
      }
      
      console.log('📦 EMERGENCY: Using default inspirations');
      return { success: true, inspirations: this.defaultInspirations };
    } catch (error) {
      console.error('📦 EMERGENCY: Error loading inspirations:', error);
      return { success: true, inspirations: this.defaultInspirations };
    }
  }

  // Save inspirations to localStorage
  saveInspirations(inspirations) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(inspirations));
      console.log('📦 EMERGENCY: Saved inspirations to localStorage');
      return { success: true };
    } catch (error) {
      console.error('📦 EMERGENCY: Error saving inspirations:', error);
      return { success: false, error: error.message };
    }
  }

  // Add new inspiration
  addInspiration(inspirationData) {
    try {
      const current = this.getInspirations();
      const inspirations = current.inspirations || [];
      
      const newInspiration = {
        ...inspirationData,
        id: Date.now(), // Simple ID generation
        created_at: new Date().toISOString()
      };
      
      inspirations.unshift(newInspiration); // Add to beginning
      this.saveInspirations(inspirations);
      
      console.log('📦 EMERGENCY: Added new inspiration');
      return { success: true, inspiration: newInspiration };
    } catch (error) {
      console.error('📦 EMERGENCY: Error adding inspiration:', error);
      return { success: false, error: error.message };
    }
  }

  // Update inspiration
  updateInspiration(id, inspirationData) {
    try {
      const current = this.getInspirations();
      const inspirations = current.inspirations || [];
      
      const index = inspirations.findIndex(item => item.id === id);
      if (index === -1) {
        return { success: false, error: 'Inspiration not found' };
      }
      
      inspirations[index] = { ...inspirations[index], ...inspirationData };
      this.saveInspirations(inspirations);
      
      console.log('📦 EMERGENCY: Updated inspiration');
      return { success: true, inspiration: inspirations[index] };
    } catch (error) {
      console.error('📦 EMERGENCY: Error updating inspiration:', error);
      return { success: false, error: error.message };
    }
  }

  // Delete inspiration
  deleteInspiration(id) {
    try {
      const current = this.getInspirations();
      const inspirations = current.inspirations || [];
      
      const filtered = inspirations.filter(item => item.id !== id);
      this.saveInspirations(filtered);
      
      console.log('📦 EMERGENCY: Deleted inspiration');
      return { success: true };
    } catch (error) {
      console.error('📦 EMERGENCY: Error deleting inspiration:', error);
      return { success: false, error: error.message };
    }
  }

  // Clear all data (for testing)
  clearAll() {
    try {
      localStorage.removeItem(this.storageKey);
      console.log('📦 EMERGENCY: Cleared all inspiration data');
      return { success: true };
    } catch (error) {
      console.error('📦 EMERGENCY: Error clearing data:', error);
      return { success: false, error: error.message };
    }
  }
}

// Export singleton instance
const emergencyInspirations = new EmergencyInspirations();
export default emergencyInspirations;
