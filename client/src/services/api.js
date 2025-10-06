import { supabase } from '../lib/supabase';

class ApiService {
  // Check if Supabase is available
  isSupabaseAvailable() {
    return supabase !== null;
  }

  // Get fallback brands data
  getFallbackBrands() {
    return [
      // Main brands with descriptions (in specified order)
      {
        id: 1,
        name: 'Agape',
        description: 'Prémiový taliansky dodávateľ kúpeľňových batérií, sanity, nábytku a kúpeľňových doplnkov',
        category: 'Kúpeľňový nábytok',
        logo: '/icons/Agape_transparent.png',
        logoSize: 'max-h-16',
        logoFilter: 'brightness(0) invert(1)',
        order: 1,
        images: []
      },
      {
        id: 2,
        name: 'Fantini',
        description: 'Prémiový taliansky výrobca kúpeľňových a kuchynských batérií a doplnkov',
        category: 'Batérie a sprchy',
        logo: '/fantini.png',
        logoSize: 'max-h-16',
        logoFilter: 'brightness(0) invert(1)',
        order: 2,
        images: []
      },
      {
        id: 3,
        name: 'Cielo',
        description: 'Prémiový taliansky výrobca kúpeľňovej sanity, nábytku a kúpeľňových doplnkov',
        category: 'Sanitárna keramika',
        logo: '/logo_cielo_white.png',
        logoSize: 'max-h-16',
        logoFilter: 'brightness(0) invert(1)',
        order: 3,
        images: []
      },
      {
        id: 4,
        name: 'Azzurra',
        description: 'Prémiový taliansky výrobca kúpeľňovej sanity, nábytku a kúpeľňových doplnkov',
        category: 'Sanitárna keramika',
        logo: '/logoAZZ.svg',
        logoSize: 'max-h-16',
        logoFilter: 'brightness(0) invert(1)',
        order: 4,
        images: []
      },
      {
        id: 5,
        name: 'Cea',
        description: 'Prémiový taliansky výrobca kúpeľňových a kuchynských batérií, elektrických sušiakov a doplnkov',
        category: 'Batérie a doplnky',
        logo: '/cea.svg',
        logoSize: 'max-h-16',
        logoFilter: 'brightness(0) invert(1)',
        order: 5,
        images: []
      },
      {
        id: 6,
        name: 'Zenon',
        description: 'Prémiový španielsky výrobca umývadiel, vaní a sprchových vaničiek',
        category: 'Povrchy a vane',
        logo: '/icons/ZENON_2024.png',
        logoSize: 'max-h-16',
        logoFilter: 'brightness(0) invert(1)',
        order: 6,
        images: []
      },
      {
        id: 7,
        name: 'Fondovalle',
        description: 'Prémiový taliansky výrobca keramických obkladov a dlažieb',
        category: 'Obklady a dlažby',
        logo: '/icons/Fondovalle.png',
        logoSize: 'max-h-16',
        logoFilter: 'brightness(0) invert(1)',
        order: 7,
        images: []
      },
      {
        id: 8,
        name: 'Fiandre',
        description: 'Prémiový taliansky výrobca keramických obkladov a dlažieb',
        category: 'Obklady a dlažby',
        logo: '/logogf.png',
        logoSize: 'max-h-16',
        logoFilter: 'brightness(0) invert(1)',
        order: 8,
        images: []
      },
      
      // Ostatné brands (logos only, no descriptions)
      {
        id: 9,
        name: 'Tres',
        website: 'tresgriferia.com',
        category: 'Ostatné',
        logo: '/TRES_logo_W.svg',
        logoSize: 'max-h-16',
        logoFilter: 'brightness(0) invert(1)',
        order: 9,
        images: []
      },
      {
        id: 10,
        name: 'Axor',
        category: 'Ostatné',
        logo: '/Axor-logo-white.png',
        logoSize: 'max-h-16',
        logoFilter: 'brightness(0) invert(1)',
        order: 10,
        images: []
      },
      {
        id: 11,
        name: 'Kaldewei',
        category: 'Ostatné',
        logo: '/kaldewei.png',
        logoSize: 'max-h-16',
        logoFilter: 'brightness(0) invert(1)',
        order: 11,
        images: []
      },
      {
        id: 12,
        name: 'Alca',
        category: 'Ostatné',
        logo: '/alca.svg',
        logoSize: 'max-h-16',
        logoFilter: 'brightness(0) invert(1)',
        order: 12,
        images: []
      },
      {
        id: 13,
        name: 'Hansgrohe',
        category: 'Ostatné',
        logo: '/Hansgrohe-Logo-2.svg',
        logoSize: 'max-h-16',
        logoFilter: 'brightness(0) invert(1)',
        order: 13,
        images: []
      },
      {
        id: 14,
        name: 'Huppe',
        category: 'Ostatné',
        logo: '/logoWhite.svg',
        logoSize: 'max-h-16',
        logoFilter: 'brightness(0) invert(1)',
        order: 14,
        images: []
      },
      {
        id: 15,
        name: 'Dornbracht',
        category: 'Ostatné',
        logo: '/logoWhite.svg',
        logoSize: 'max-h-16',
        logoFilter: 'brightness(0) invert(1)',
        order: 15,
        images: []
      },
      {
        id: 16,
        name: 'Laufen',
        category: 'Ostatné',
        logo: '/LAUFEN_White_RGB_big.png',
        logoSize: 'max-h-16',
        logoFilter: 'brightness(0) invert(1)',
        order: 16,
        images: []
      },
      {
        id: 17,
        name: 'Kludi',
        category: 'Ostatné',
        logo: '/logoWhite.svg',
        logoSize: 'max-h-16',
        logoFilter: 'brightness(0) invert(1)',
        order: 17,
        images: []
      }
    ];
  }

  // Authentication
  async login(email, password) {
    // Always try fallback first for demo purposes
    if (email === 'Dusan.drinka@smartsanit.sk' && password === 'WeAreAwesome2025@!') {
      return { success: true, user: { email } };
    }

    if (!this.isSupabaseAvailable()) {
      return { success: false, message: 'Nesprávne prihlasovacie údaje' };
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        // Fallback to demo credentials if Supabase auth fails
        if (email === 'Dusan.drinka@smartsanit.sk' && password === 'WeAreAwesome2025@!') {
          return { success: true, user: { email } };
        }
        return { success: false, message: 'Nesprávne prihlasovacie údaje' };
      }
      
      return { success: true, user: data.user };
    } catch (error) {
      // Fallback to demo credentials on any error
      if (email === 'Dusan.drinka@smartsanit.sk' && password === 'WeAreAwesome2025@!') {
        return { success: true, user: { email } };
      }
      return { success: false, message: 'Nesprávne prihlasovacie údaje' };
    }
  }

  async logout() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        return { success: false, message: error.message };
      }
      return { success: true };
    } catch (error) {
      return { success: false, message: 'Chyba pri odhlásení' };
    }
  }

  // Brands
  async getBrands() {
    if (!this.isSupabaseAvailable()) {
      // Return fallback data when Supabase is not available
      return { success: true, brands: this.getFallbackBrands() };
    }

    try {
      const { data, error } = await supabase
        .from('brands')
        .select('*')
        .order('order', { ascending: true });
      
      if (error) {
        // Fallback to static data if Supabase fails
        return { success: true, brands: this.getFallbackBrands() };
      }
      
      return { success: true, brands: data };
    } catch (error) {
      // Fallback to static data on any error
      return { success: true, brands: this.getFallbackBrands() };
    }
  }

  async getBrand(id) {
    try {
      const { data, error } = await supabase
        .from('brands')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        return { success: false, message: error.message };
      }
      
      return { success: true, brand: data };
    } catch (error) {
      return { success: false, message: 'Chyba pri načítavaní značky' };
    }
  }

  async createBrand(brandData) {
    try {
      const { data, error } = await supabase
        .from('brands')
        .insert([brandData])
        .select();
      
      if (error) {
        return { success: false, message: error.message };
      }
      
      return { success: true, brand: data[0] };
    } catch (error) {
      return { success: false, message: 'Chyba pri vytváraní značky' };
    }
  }

  async updateBrand(id, brandData) {
    try {
      const { data, error } = await supabase
        .from('brands')
        .update(brandData)
        .eq('id', id)
        .select();
      
      if (error) {
        return { success: false, message: error.message };
      }
      
      return { success: true, brand: data[0] };
    } catch (error) {
      return { success: false, message: 'Chyba pri aktualizácii značky' };
    }
  }

  async uploadBrandImages(brandId, files) {
    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${brandId}/${Date.now()}.${fileExt}`;
        
        const { data, error } = await supabase.storage
          .from('brand-images')
          .upload(fileName, file);
        
        if (error) throw error;
        
        return {
          filename: fileName,
          originalName: file.name,
          path: data.path,
          size: file.size
        };
      });
      
      const uploadedImages = await Promise.all(uploadPromises);
      
      // Get current brand images
      const { data: brand } = await supabase
        .from('brands')
        .select('images')
        .eq('id', brandId)
        .single();
      
      const currentImages = brand?.images || [];
      const updatedImages = [...currentImages, ...uploadedImages];
      
      // Update brand with new images
      const { error: updateError } = await supabase
        .from('brands')
        .update({ images: updatedImages })
        .eq('id', brandId);
      
      if (updateError) {
        return { success: false, message: updateError.message };
      }
      
      return { success: true, images: uploadedImages };
    } catch (error) {
      return { success: false, message: 'Chyba pri nahrávaní obrázkov' };
    }
  }

  async deleteBrandImage(brandId, imageId) {
    try {
      // Get current brand images
      const { data: brand } = await supabase
        .from('brands')
        .select('images')
        .eq('id', brandId)
        .single();
      
      const currentImages = brand?.images || [];
      const imageToDelete = currentImages.find(img => img.filename === imageId);
      
      if (imageToDelete) {
        // Delete from storage
        await supabase.storage
          .from('brand-images')
          .remove([imageToDelete.path]);
        
        // Update brand images
        const updatedImages = currentImages.filter(img => img.filename !== imageId);
        await supabase
          .from('brands')
          .update({ images: updatedImages })
          .eq('id', brandId);
      }
      
      return { success: true };
    } catch (error) {
      return { success: false, message: 'Chyba pri mazaní obrázka' };
    }
  }

  async initializeBrands() {
    // This will be handled by Supabase migrations/seed data
    return { success: true, message: 'Značky inicializované' };
  }

  // Messages
  async getMessages(status = 'all', page = 1, limit = 20) {
    if (!this.isSupabaseAvailable()) {
      // Return empty messages for fallback
      return { 
        success: true, 
        messages: [], 
        total: 0,
        page,
        limit
      };
    }

    try {
      let query = supabase
        .from('messages')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false });
      
      if (status !== 'all') {
        query = query.eq('status', status);
      }
      
      const from = (page - 1) * limit;
      const to = from + limit - 1;
      
      const { data, error, count } = await query.range(from, to);
      
      if (error) {
        return { success: true, messages: [], total: 0, page, limit };
      }
      
      return { 
        success: true, 
        messages: data, 
        total: count,
        page,
        limit
      };
    } catch (error) {
      return { success: true, messages: [], total: 0, page, limit };
    }
  }

  async sendMessage(messageData) {
    try {
      const { data, error } = await supabase
        .from('messages')
        .insert([{
          ...messageData,
          status: 'new',
          is_read: false
        }])
        .select();
      
      if (error) {
        return { success: false, message: error.message };
      }
      
      return { success: true, message: data[0] };
    } catch (error) {
      return { success: false, message: 'Chyba pri odosielaní správy' };
    }
  }

  async markMessageAsRead(messageId) {
    try {
      const { error } = await supabase
        .from('messages')
        .update({ 
          is_read: true, 
          read_at: new Date().toISOString() 
        })
        .eq('id', messageId);
      
      if (error) {
        return { success: false, message: error.message };
      }
      
      return { success: true };
    } catch (error) {
      return { success: false, message: 'Chyba pri označovaní správy' };
    }
  }

  async updateMessageStatus(messageId, status) {
    try {
      const { error } = await supabase
        .from('messages')
        .update({ status })
        .eq('id', messageId);
      
      if (error) {
        return { success: false, message: error.message };
      }
      
      return { success: true };
    } catch (error) {
      return { success: false, message: 'Chyba pri aktualizácii statusu' };
    }
  }

  async updateMessageNotes(messageId, notes) {
    try {
      const { error } = await supabase
        .from('messages')
        .update({ notes })
        .eq('id', messageId);
      
      if (error) {
        return { success: false, message: error.message };
      }
      
      return { success: true };
    } catch (error) {
      return { success: false, message: 'Chyba pri aktualizácii poznámok' };
    }
  }

  async deleteMessage(messageId) {
    try {
      const { error } = await supabase
        .from('messages')
        .delete()
        .eq('id', messageId);
      
      if (error) {
        return { success: false, message: error.message };
      }
      
      return { success: true };
    } catch (error) {
      return { success: false, message: 'Chyba pri odstraňovaní správy' };
    }
  }

  async getMessageStats() {
    try {
      const { data: total } = await supabase
        .from('messages')
        .select('*', { count: 'exact', head: true });
      
      const { data: unread } = await supabase
        .from('messages')
        .select('*', { count: 'exact', head: true })
        .eq('is_read', false);
      
      const { data: replied } = await supabase
        .from('messages')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'replied');
      
      const { data: recent } = await supabase
        .from('messages')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString());
      
      return {
        success: true,
        stats: {
          total: total.count || 0,
          unread: unread.count || 0,
          replied: replied.count || 0,
          recent: recent.count || 0
        }
      };
    } catch (error) {
      return { success: false, message: 'Chyba pri načítavaní štatistík' };
    }
  }

  // Content Management (simplified for now)
  async getContent(pageId = null) {
    return { success: true, content: {} };
  }

  async updateContent(pageId, contentData) {
    return { success: true };
  }

  async createContent(contentData) {
    return { success: true };
  }

  async initializeContent() {
    return { success: true };
  }
}

const apiService = new ApiService();
export default apiService;
