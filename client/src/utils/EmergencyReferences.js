// Emergency References System - Base64 Storage Fallback
// This system stores references data in localStorage as a backup when Supabase is unavailable

class EmergencyReferences {
  constructor() {
    this.storageKey = 'emergency_references_data';
    this.defaultReferences = [
      {
        id: 1,
        title: 'Luxusná kúpeľňa v rodinnom dome',
        description: 'Kompletná rekonštrukcia kúpeľne s použitím prémiových materiálov a moderných technológií.',
        year: '2024',
        location: 'Bratislava',
        client: 'Súkromný klient',
        images: ['/photos/compressed/ATX_AG0065.jpg', '/photos/compressed/ATX_AG0088.jpg'],
        created_at: new Date().toISOString()
      },
      {
        id: 2,
        title: 'Moderná kúpeľňa v byte',
        description: 'Štýlové riešenie malého priestoru s dôrazom na funkčnosť a estetiku.',
        year: '2024',
        location: 'Košice',
        client: 'Súkromný klient',
        images: ['/photos/compressed/ATX_AG0102.jpg', '/photos/compressed/ATX_AG0114.jpg'],
        created_at: new Date().toISOString()
      },
      {
        id: 3,
        title: 'Wellness kúpeľňa',
        description: 'Priestranná kúpeľňa s wellness prvkami a relaxačnou zónou.',
        year: '2023',
        location: 'Žilina',
        client: 'Súkromný klient',
        images: ['/photos/compressed/ATX_AG0120.jpg', '/photos/compressed/ATX_AG0129.jpg'],
        created_at: new Date().toISOString()
      },
      {
        id: 4,
        title: 'Minimalistická kúpeľňa',
        description: 'Čisté línie a jednoduché riešenia pre moderný životný štýl.',
        year: '2023',
        location: 'Trenčín',
        client: 'Súkromný klient',
        images: ['/photos/compressed/ATX_AG0134.jpg', '/photos/compressed/ATX_AG0142.jpg'],
        created_at: new Date().toISOString()
      }
    ];
  }

  // Get all references
  getReferences() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        const data = JSON.parse(stored);
        console.log('📦 EMERGENCY: Loaded references from localStorage');
        return { success: true, references: data };
      }
      
      console.log('📦 EMERGENCY: Using default references');
      return { success: true, references: this.defaultReferences };
    } catch (error) {
      console.error('📦 EMERGENCY: Error loading references:', error);
      return { success: true, references: this.defaultReferences };
    }
  }

  // Save references to localStorage
  saveReferences(references) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(references));
      console.log('📦 EMERGENCY: Saved references to localStorage');
      return { success: true };
    } catch (error) {
      console.error('📦 EMERGENCY: Error saving references:', error);
      return { success: false, error: error.message };
    }
  }

  // Add new reference
  addReference(referenceData) {
    try {
      const current = this.getReferences();
      const references = current.references || [];
      
      const newReference = {
        ...referenceData,
        id: Date.now(), // Simple ID generation
        created_at: new Date().toISOString()
      };
      
      references.unshift(newReference); // Add to beginning
      this.saveReferences(references);
      
      console.log('📦 EMERGENCY: Added new reference');
      return { success: true, reference: newReference };
    } catch (error) {
      console.error('📦 EMERGENCY: Error adding reference:', error);
      return { success: false, error: error.message };
    }
  }

  // Update reference
  updateReference(id, referenceData) {
    try {
      const current = this.getReferences();
      const references = current.references || [];
      
      const index = references.findIndex(item => item.id === id);
      if (index === -1) {
        return { success: false, error: 'Reference not found' };
      }
      
      references[index] = { ...references[index], ...referenceData };
      this.saveReferences(references);
      
      console.log('📦 EMERGENCY: Updated reference');
      return { success: true, reference: references[index] };
    } catch (error) {
      console.error('📦 EMERGENCY: Error updating reference:', error);
      return { success: false, error: error.message };
    }
  }

  // Delete reference
  deleteReference(id) {
    try {
      const current = this.getReferences();
      const references = current.references || [];
      
      const filtered = references.filter(item => item.id !== id);
      this.saveReferences(filtered);
      
      console.log('📦 EMERGENCY: Deleted reference');
      return { success: true };
    } catch (error) {
      console.error('📦 EMERGENCY: Error deleting reference:', error);
      return { success: false, error: error.message };
    }
  }

  // Clear all data (for testing)
  clearAll() {
    try {
      localStorage.removeItem(this.storageKey);
      console.log('📦 EMERGENCY: Cleared all reference data');
      return { success: true };
    } catch (error) {
      console.error('📦 EMERGENCY: Error clearing data:', error);
      return { success: false, error: error.message };
    }
  }
}

// Export singleton instance
const emergencyReferences = new EmergencyReferences();
export default emergencyReferences;
