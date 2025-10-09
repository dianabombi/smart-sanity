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
        category: 'Kúpeľňový nábytok',
        logo: '/logoWhite.svg',
        logoSize: 'max-h-16',
        logoFilter: 'none',
        description: 'Agape – svet plný originality a materiálovej pestrosti z pera tých najlepších svetových dizajnérov - prémiový taliansky dodávateľ kúpeľňových batérií, sanity, nábytku a doplnkov',
        images: [],
        isMain: true,
        order: 1
      },
      {
        id: 2,
        name: 'Fantini',
        description: 'Fantini – symbióza špičkového dizajnu a prvotriednej kvality sú výsledkom talianskeho producenta kúpeľňových a kuchynských batérií, doplnkov a komplexných wellness riešení',
        category: 'Batérie a sprchy',
        logo: '/fantini.png',
        logoSize: 'max-h-16',
        logoFilter: 'none',
        order: 2,
        images: [],
        isMain: true
      },
      {
        id: 3,
        name: 'Cielo',
        description: 'Cielo – „Hand Made Italy" – dotknite sa raja - ručne vyrábaná kúpeľňová sanita a nábytok',
        category: 'Sanitárna keramika',
        logo: '/logo_cielo_white.png',
        logoSize: 'max-h-16',
        logoFilter: 'none',
        order: 3,
        images: [],
        isMain: true
      },
      {
        id: 4,
        name: 'Azzurra',
        description: 'Azzurra – elegancia, ktorá zmení vašu kúpeľňu na moderný priestor - špičkový taliansky výrobca kúpeľňovej sanity a nábytku',
        category: 'Sanitárna keramika',
        logo: '/logo Azzurra bianco su fondo nero.png',
        logoSize: 'max-h-16',
        logoFilter: 'none',
        order: 4,
        images: [],
        isMain: true
      },
      {
        id: 5,
        name: 'Cea',
        description: 'Cea – pocíťte luxus – nerez, ako hlavný materiál tohto prémiového talianskeho producenta kúpeľňových batérií, doplnkov a elektrických sušiakov',
        category: 'Batérie a doplnky',
        logo: '/cea.svg',
        logoSize: 'max-h-16',
        logoFilter: 'none',
        order: 5,
        images: [],
        isMain: true
      },
      {
        id: 6,
        name: 'Antrax',
        description: 'Antrax – poďte sa hrať – moderný dizajn, originalita a jedinečnosť azda najviac charakterizujú tohto výrobcu kúpeľňových a bytových radiátorov z Talianska',
        category: 'Dizajnové radiátory',
        logo: '/antraxIt.jpg',
        logoSize: 'max-h-16',
        logoFilter: 'none',
        order: 6,
        images: [],
        isMain: true
      },
      {
        id: 7,
        name: 'Zenon',
        description: 'Zenon – zažite s nami nadšenie pre inovácie od španielskeho výrobcu umývadiel, vaní a sprchových vaničiek',
        category: 'Povrchy a vane',
        logo: '/logoBlack.webp',
        logoSize: 'max-h-16',
        logoFilter: 'none',
        order: 7,
        images: [],
        isMain: true
      },
      {
        id: 8,
        name: 'Fondovalle',
        description: 'Fondovalle – pokročilé technológie výroby a špičková kvalita produktov, to sú keramické obklady a dlažby v širokej škále dizajnov a povrchov pre zhmotnenie vašich predstáv',
        category: 'Obklady a dlažby',
        logo: '/icons/Fondovalle.png',
        logoSize: 'max-h-16',
        logoFilter: 'none',
        order: 8,
        images: [],
        isMain: true
      },
      {
        id: 9,
        name: 'Fiandre',
        description: 'Fiandre – povrchy, ktoré formujú jedinečnosť - prémiový taliansky výrobca gresových obkladov a dlažieb, ktorý medzi prvými prišiel s veľkoformátovými obkladmi',
        category: 'Obklady a dlažby',
        logo: '/logogf.png',
        logoSize: 'max-h-16',
        logoFilter: 'none',
        order: 9,
        images: [],
        isMain: true
      },
      
      // Ostatné brands (logos only, no descriptions)
      {
        id: 10,
        name: 'Tres',
        website: 'tresgriferia.com',
        category: 'Ostatné',
        logo: '/TRES_logo_W.svg',
        logoSize: 'max-h-16',
        logoFilter: 'none',
        order: 9,
        images: []
      },
      {
        id: 11,
        name: 'Axor',
        category: 'Ostatné',
        logo: '/Axor-logo-white.png',
        logoSize: 'max-h-16',
        logoFilter: 'none',
        order: 10,
        images: []
      },
      {
        id: 12,
        name: 'Kaldewei',
        category: 'Ostatné',
        logo: '/kaldewei.png',
        logoSize: 'max-h-16',
        logoFilter: 'none',
        order: 11,
        images: []
      },
      {
        id: 13,
        name: 'Alca',
        category: 'Ostatné',
        logo: '/alca.svg',
        logoSize: 'max-h-16',
        logoFilter: 'none',
        order: 12,
        images: []
      },
      {
        id: 14,
        name: 'Hansgrohe',
        category: 'Ostatné',
        logo: '/Hansgrohe-Logo-2.svg',
        logoSize: 'max-h-16',
        logoFilter: 'none',
        order: 13,
        images: []
      },
      {
        id: 15,
        name: 'Huppe',
        category: 'Ostatné',
        logo: '/logoWhite.svg',
        logoSize: 'max-h-16',
        logoFilter: 'none',
        order: 14,
        images: []
      },
      {
        id: 16,
        name: 'Dornbracht',
        category: 'Ostatné',
        logo: '/logoWhite.svg',
        logoSize: 'max-h-16',
        logoFilter: 'none',
        order: 15,
        images: []
      },
      {
        id: 17,
        name: 'Laufen',
        category: 'Ostatné',
        logo: '/LAUFEN_White_RGB_big.png',
        logoSize: 'max-h-16',
        logoFilter: 'none',
        order: 16,
        images: []
      },
      {
        id: 18,
        name: 'Kludi',
        category: 'Ostatné',
        logo: '/logoWhite.svg',
        logoSize: 'max-h-16',
        logoFilter: 'none',
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
        return { success: true, brands: this.getFallbackBrands() };
      }
      
      if (!data || data.length === 0) {
        console.log('No brands in database, using fallback');
        return { success: true, brands: this.getFallbackBrands() };
      }

      // Process brands without any automatic cleanup
      const processedBrands = data.map(brand => {
        let images = [];
        try {
          if (Array.isArray(brand.images)) {
            images = brand.images;
          } else if (typeof brand.images === 'string' && brand.images.trim().startsWith('[')) {
            images = JSON.parse(brand.images);
          }
        } catch (e) {
          images = [];
        }

        // Process all images without filtering anything out
        const validatedImages = images.map(img => {
          if (!img) return null;

          // If the url is already a data URL (real or placeholder), use it as-is
          if (img.url && img.url.startsWith('data:')) {
            return img;
          }

          // Try to build a public URL from a path
          const imagePath = img.path || img.filename;
          if (imagePath) {
            return {
              ...img,
              url: `https://lckbwknxfmbjffjsmahs.supabase.co/storage/v1/object/public/brand-images/${imagePath}`
            };
          }
          
          return null;
        }).filter(Boolean);

        return {
          ...brand,
          logoFilter: 'none',
          images: validatedImages,
        };
      });

      return { success: true, brands: processedBrands };
    } catch (error) {
      console.log('Error fetching brands, using fallback:', error);
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
    console.log('EMERGENCY MODE: Bypassing Supabase Storage. Converting images to data URLs.');

    try {
      // 1. Convert all files to base64 data URLs
      const dataUrlPromises = Array.from(files).map(file => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve({
            url: reader.result,
            originalName: file.name,
            filename: `${brandId}-${Date.now()}-${file.name}`,
            size: file.size
          });
          reader.onerror = error => reject(error);
          reader.readAsDataURL(file);
        });
      });

      const newImages = await Promise.all(dataUrlPromises);
      console.log(`${newImages.length} images converted to data URLs.`);

      // 2. Get the current brand data
      const { data: brand, error: fetchError } = await supabase
        .from('brands')
        .select('images')
        .eq('id', brandId)
        .single();

      if (fetchError) {
        console.error('Failed to fetch brand before update:', fetchError);
        throw new Error('Could not find the brand to update.');
      }

      // 3. Merge old images with new ones
      let existingImages = [];
      try {
        if (Array.isArray(brand.images)) {
          existingImages = brand.images;
        } else if (typeof brand.images === 'string') {
          existingImages = JSON.parse(brand.images);
        }
      } catch (e) {
        console.warn('Could not parse existing images, starting fresh.');
        existingImages = [];
      }
      
      const updatedImages = [...existingImages, ...newImages];
      console.log(`Updating brand ${brandId} with a total of ${updatedImages.length} images.`);

      // 4. Save the combined array back to the database
      const { error: updateError } = await supabase
        .from('brands')
        .update({ images: updatedImages })
        .eq('id', brandId);

      if (updateError) {
        console.error('Failed to save data URLs to database:', updateError);
        throw new Error('Database update failed.');
      }

      console.log('SUCCESS: Images saved directly to database as data URLs.');
      return { success: true, images: newImages };

    } catch (error) {
      console.error('EMERGENCY UPLOAD FAILED:', error);
      return { success: false, message: error.message };
    }
  }

  async updateBrandDescription(brandId, newDescription) {
    try {
      console.log('Updating brand description:', brandId, newDescription);
      
      if (!this.isSupabaseAvailable()) {
        console.log('Supabase not available, description update simulated');
        return { success: true, message: 'Popis značky bol aktualizovaný (simulácia)' };
      }

      const { error } = await supabase
        .from('brands')
        .update({ description: newDescription })
        .eq('id', brandId);

      if (error) {
        console.error('Failed to update brand description:', error);
        return { success: false, message: error.message };
      }

      console.log('Brand description updated successfully');
      return { success: true, message: 'Popis značky bol úspešne aktualizovaný' };
    } catch (error) {
      console.error('Update brand description error:', error);
      return { success: false, message: 'Chyba pri aktualizácii popisu značky' };
    }
  }

  async updateBrandLogo(brandId, logoFile) {
    try {
      console.log('Updating brand logo:', brandId, logoFile.name);
      
      // Create data URL for the logo
      const reader = new FileReader();
      return new Promise(async (resolve) => {
        reader.onload = async () => {
          const logoDataUrl = reader.result;
          console.log('Logo converted to data URL, updating database...');
          
          if (!this.isSupabaseAvailable()) {
            console.log('Supabase not available, logo update simulated');
            resolve({ 
              success: true, 
              logoUrl: logoDataUrl,
              message: 'Logo značky bol aktualizovaný (simulácia)' 
            });
            return;
          }

          try {
            // Update brand record with new logo data URL
            const { error: updateError } = await supabase
              .from('brands')
              .update({ logo: logoDataUrl })
              .eq('id', brandId);

            if (updateError) {
              console.error('Failed to update brand logo in database:', updateError);
              resolve({ success: false, message: updateError.message });
              return;
            }

            console.log('Brand logo updated successfully in database');
            resolve({ 
              success: true, 
              logoUrl: logoDataUrl,
              message: 'Logo značky bol úspešne aktualizovaný' 
            });
          } catch (dbError) {
            console.error('Database update error:', dbError);
            resolve({ success: false, message: 'Chyba pri aktualizácii v databáze' });
          }
        };
        reader.readAsDataURL(logoFile);
      });

      // Original Supabase code (disabled due to tenant config issues)
      /*
      if (!this.isSupabaseAvailable()) {
        // Create a fallback data URL for the logo
        const reader = new FileReader();
        return new Promise((resolve) => {
          reader.onload = () => {
            console.log('Supabase not available, logo update simulated');
            resolve({ 
              success: true, 
              logoUrl: reader.result,
              message: 'Logo značky bol aktualizovaný (simulácia)' 
            });
          };
          reader.readAsDataURL(logoFile);
        });
      }

      // Upload logo to Supabase storage
      const fileExt = logoFile.name.split('.').pop();
      const fileName = `brand-${brandId}-logo-${Date.now()}.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('brand-logos')
        .upload(fileName, logoFile);

      if (uploadError) {
        console.error('Failed to upload logo:', uploadError);
        return { success: false, message: uploadError.message };
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('brand-logos')
        .getPublicUrl(fileName);

      // Update brand record with new logo URL
      const { error: updateError } = await supabase
        .from('brands')
        .update({ logo: publicUrl })
        .eq('id', brandId);

      if (updateError) {
        console.error('Failed to update brand logo URL:', updateError);
        return { success: false, message: updateError.message };
      }

      console.log('Brand logo updated successfully');
      return { 
        success: true, 
        logoUrl: publicUrl,
        message: 'Logo značky bol úspešne aktualizovaný' 
      };
      */
    } catch (error) {
      console.error('Update brand logo error:', error);
      return { success: false, message: 'Chyba pri aktualizácii loga značky' };
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
