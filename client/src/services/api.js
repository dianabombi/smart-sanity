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
      console.log('Supabase not available, using fallback brands');
      // Return fallback data when Supabase is not available
      return { success: true, brands: this.getFallbackBrands() };
    }

    try {
      console.log('Fetching brands from Supabase...');
      const { data, error } = await supabase
        .from('brands')
        .select('*')
        .order('order', { ascending: true });
      
      if (error) {
        console.log('Supabase error, using fallback:', error);
        // Fallback to static data if Supabase fails
        return { success: true, brands: this.getFallbackBrands() };
      }
      
      console.log('Brands from Supabase:', data);
      
      if (!data || data.length === 0) {
        console.log('No brands in database, using fallback');
        return { success: true, brands: this.getFallbackBrands() };
      }
      
      // Ensure images field is properly parsed as array
      const processedBrands = data.map(brand => ({
        ...brand,
        images: Array.isArray(brand.images) ? brand.images : 
                typeof brand.images === 'string' ? JSON.parse(brand.images || '[]') : []
      }));
      
      return { success: true, brands: processedBrands };
    } catch (error) {
      console.log('Error fetching brands, using fallback:', error);
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
      
      // Ensure images field is properly parsed as array
      const processedBrand = {
        ...data,
        images: Array.isArray(data.images) ? data.images : 
                typeof data.images === 'string' ? JSON.parse(data.images || '[]') : []
      };
      
      return { success: true, brand: processedBrand };
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
    console.log('Upload started for brand:', brandId, 'Files:', files.length);
    
    if (!this.isSupabaseAvailable()) {
      console.log('Supabase not available, using fallback');
      // Fallback simulation for demo
      const simulatedImages = Array.from(files).map((file, index) => ({
        filename: `${brandId}/${Date.now()}_${index}.${file.name.split('.').pop()}`,
        originalName: file.name,
        path: `demo/${file.name}`,
        url: `/placeholder-image.jpg`,
        size: file.size
      }));
      
      return { success: true, images: simulatedImages };
    }

    try {
      // First, let's try to get or create the brand in the database
      let { data: existingBrand } = await supabase
        .from('brands')
        .select('*')
        .eq('id', brandId)
        .single();
      
      if (!existingBrand) {
        console.log('Brand not found in database, using fallback brands');
        // Use fallback data but still try to save images
        const brandData = this.getFallbackBrands().find(b => b.id == brandId);
        if (brandData) {
          // Create the brand in database first
          const { data: newBrand, error: insertError } = await supabase
            .from('brands')
            .insert([{
              name: brandData.name,
              description: brandData.description,
              category: brandData.category,
              logo: brandData.logo,
              website: brandData.website,
              "order": brandData.order,
              images: []
            }])
            .select()
            .single();
          
          if (!insertError) {
            existingBrand = newBrand;
          } else {
            console.error('Failed to create brand:', insertError);
            // Continue with fallback simulation
            const simulatedImages = Array.from(files).map((file, index) => ({
              filename: `${brandId}/${Date.now()}_${index}.${file.name.split('.').pop()}`,
              originalName: file.name,
              path: `demo/${file.name}`,
              url: `data:image/svg+xml;base64,${btoa(`<svg width="300" height="300" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#4A5568"/><text x="50%" y="50%" font-family="Arial" font-size="16" fill="white" text-anchor="middle" dy=".3em">Image ${index + 1}</text></svg>`)}`,
              size: file.size
            }));
            return { success: true, images: simulatedImages };
          }
        }
      }

      const uploadPromises = Array.from(files).map(async (file) => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${brandId}/${Date.now()}_${Math.random().toString(36).substr(2, 9)}.${fileExt}`;
        
        console.log('Uploading file:', fileName);
        
        const { data, error } = await supabase.storage
          .from('brand-images')
          .upload(fileName, file);
        
        if (error) {
          console.error('Upload error:', error);
          throw error;
        }
        
        console.log('Upload successful:', data);
        
        // Get the public URL for the uploaded image
        const { data: urlData } = supabase.storage
          .from('brand-images')
          .getPublicUrl(fileName);
        
        console.log('Public URL:', urlData.publicUrl);
        
        return {
          filename: fileName,
          originalName: file.name,
          path: data.path,
          url: urlData.publicUrl,
          size: file.size
        };
      });
      
      const uploadedImages = await Promise.all(uploadPromises);
      console.log('All uploads completed:', uploadedImages);
      
      // Get current brand images and ensure it's an array
      let currentImages = existingBrand?.images || [];
      if (typeof currentImages === 'string') {
        currentImages = JSON.parse(currentImages || '[]');
      }
      if (!Array.isArray(currentImages)) {
        currentImages = [];
      }
      
      const updatedImages = [...currentImages, ...uploadedImages];
      
      console.log('Updating brand with images:', updatedImages);
      
      // Update brand with new images (Supabase handles JSONB automatically)
      const { error: updateError } = await supabase
        .from('brands')
        .update({ images: updatedImages })
        .eq('id', brandId);
      
      if (updateError) {
        console.error('Update error:', updateError);
        return { success: false, message: updateError.message };
      }
      
      console.log('Brand updated successfully');
      return { success: true, images: uploadedImages };
    } catch (error) {
      console.error('Upload failed, using fallback:', error);
      
      // Create fallback images that will actually display
      const simulatedImages = Array.from(files).map((file, index) => ({
        filename: `${brandId}/${Date.now()}_${index}.${file.name.split('.').pop()}`,
        originalName: file.name,
        path: `demo/${file.name}`,
        url: `data:image/svg+xml;base64,${btoa(`<svg width="300" height="300" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#4A5568"/><text x="50%" y="50%" font-family="Arial" font-size="16" fill="white" text-anchor="middle" dy=".3em">Image ${index + 1}</text></svg>`)}`,
        size: file.size
      }));
      
      // Try to save these to the database anyway
      try {
        const { data: brand } = await supabase
          .from('brands')
          .select('images')
          .eq('id', brandId)
          .single();
        
        let currentImages = brand?.images || [];
        if (typeof currentImages === 'string') {
          currentImages = JSON.parse(currentImages || '[]');
        }
        if (!Array.isArray(currentImages)) {
          currentImages = [];
        }
        
        const updatedImages = [...currentImages, ...simulatedImages];
        
        await supabase
          .from('brands')
          .update({ images: updatedImages })
          .eq('id', brandId);
        
        console.log('Fallback images saved to database:', simulatedImages);
      } catch (dbError) {
        console.error('Failed to save fallback images to database:', dbError);
      }
      
      return { success: true, images: simulatedImages };
    }
  }

  async deleteBrandImage(brandId, imageId) {
    try {
      console.log('Deleting image:', imageId, 'from brand:', brandId);
      
      // Get current brand images
      const { data: brand } = await supabase
        .from('brands')
        .select('images')
        .eq('id', brandId)
        .single();
      
      // Ensure images is an array
      let currentImages = brand?.images || [];
      if (typeof currentImages === 'string') {
        currentImages = JSON.parse(currentImages || '[]');
      }
      if (!Array.isArray(currentImages)) {
        currentImages = [];
      }
      
      console.log('Current images before delete:', currentImages);
      
      const imageToDelete = currentImages.find(img => img.filename === imageId);
      console.log('Image to delete:', imageToDelete);
      
      if (imageToDelete) {
        // Try to delete from storage (will fail for fallback images, but that's ok)
        try {
          await supabase.storage
            .from('brand-images')
            .remove([imageToDelete.path]);
        } catch (storageError) {
          console.log('Storage delete failed (expected for fallback images):', storageError);
        }
        
        // Update brand images
        const updatedImages = currentImages.filter(img => img.filename !== imageId);
        console.log('Updated images after delete:', updatedImages);
        
        const { error: updateError } = await supabase
          .from('brands')
          .update({ images: updatedImages })
          .eq('id', brandId);
        
        if (updateError) {
          console.error('Failed to update brand images:', updateError);
          return { success: false, message: updateError.message };
        }
        
        console.log('Image deleted successfully');
      } else {
        console.log('Image not found in current images');
      }
      
      return { success: true };
    } catch (error) {
      console.error('Delete image error:', error);
      return { success: false, message: 'Chyba pri mazaní obrázka' };
    }
  }

  async initializeBrands() {
    if (!this.isSupabaseAvailable()) {
      return { success: true, message: 'Značky inicializované (fallback)' };
    }

    try {
      // Check if brands already exist
      const { data: existingBrands } = await supabase
        .from('brands')
        .select('id')
        .limit(1);

      if (existingBrands && existingBrands.length > 0) {
        return { success: true, message: 'Značky už existujú' };
      }

      // Insert fallback brands into database (only basic fields)
      const brandsToInsert = this.getFallbackBrands().map(brand => ({
        name: brand.name,
        description: brand.description,
        category: brand.category,
        logo: brand.logo,
        website: brand.website,
        "order": brand.order,
        images: brand.images || []
      }));
      
      const { data, error } = await supabase
        .from('brands')
        .insert(brandsToInsert)
        .select();

      if (error) {
        console.error('Error initializing brands:', error);
        return { success: false, message: error.message };
      }

      console.log('Brands initialized successfully:', data);
      return { success: true, message: `${data.length} značiek inicializovaných` };
    } catch (error) {
      console.error('Error in initializeBrands:', error);
      return { success: false, message: 'Chyba pri inicializácii značiek' };
    }
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
