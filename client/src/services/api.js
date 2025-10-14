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
      console.log('🚫 Supabase not available, using fallback brands');
      return { success: true, brands: this.getFallbackBrands(), source: 'fallback-no-supabase' };
    }

    try {
      console.log('Fetching brands from Supabase...');
      
      // Add timeout to prevent long waits
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 second timeout
      
      const { data, error } = await supabase
        .from('brands')
        .select('*')
        .order('order', { ascending: true })
        .abortSignal(controller.signal);
      
      clearTimeout(timeoutId);
      
      if (error) {
        console.log('🚫 Supabase error, using fallback:', error);
        return { success: true, brands: this.getFallbackBrands(), source: 'fallback-supabase-error' };
      }
      
      if (!data || data.length === 0) {
        console.log('🚫 No brands in database, using fallback');
        return { success: true, brands: this.getFallbackBrands(), source: 'fallback-empty-db' };
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

      console.log('✅ Successfully loaded brands from Supabase database');
      return { success: true, brands: processedBrands, source: 'supabase-database' };
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('🚫 Supabase request timed out, using fallback brands');
        return { success: true, brands: this.getFallbackBrands(), source: 'fallback-timeout' };
      }
      console.log('Error fetching brands, using fallback:', error);
      return { success: true, brands: this.getFallbackBrands(), source: 'fallback-error' };
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
      // Validate file sizes (max 2MB per image to prevent issues)
      const maxSize = 2 * 1024 * 1024; // 2MB
      const oversizedFiles = Array.from(files).filter(file => file.size > maxSize);
      if (oversizedFiles.length > 0) {
        throw new Error(`Súbory sú príliš veľké. Maximálna veľkosť je 2MB. Veľké súbory: ${oversizedFiles.map(f => f.name).join(', ')}`);
      }

      // 1. Convert all files to base64 data URLs with compression
      const dataUrlPromises = Array.from(files).map(file => {
        return new Promise((resolve, reject) => {
          // Create canvas for image compression
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          const img = new Image();
          
          img.onload = () => {
            // Calculate new dimensions (max 1200px width/height)
            const maxDimension = 1200;
            let { width, height } = img;
            
            if (width > maxDimension || height > maxDimension) {
              if (width > height) {
                height = (height * maxDimension) / width;
                width = maxDimension;
              } else {
                width = (width * maxDimension) / height;
                height = maxDimension;
              }
            }
            
            canvas.width = width;
            canvas.height = height;
            
            // Draw and compress
            ctx.drawImage(img, 0, 0, width, height);
            const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.8); // 80% quality
            
            resolve({
              url: compressedDataUrl,
              originalName: file.name,
              filename: `${brandId}-${Date.now()}-${file.name}`,
              size: Math.round(compressedDataUrl.length * 0.75) // Approximate compressed size
            });
          };
          
          img.onerror = () => reject(new Error(`Chyba pri spracovaní obrázka: ${file.name}`));
          
          // Load image from file
          const reader = new FileReader();
          reader.onload = (e) => { img.src = e.target.result; };
          reader.onerror = () => reject(new Error(`Chyba pri čítaní súboru: ${file.name}`));
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

  // Hero Banners
  getFallbackHeroBanners() {
    return [
      {
        id: 1,
        src: '/photos/kaldewei.avif',
        alt: 'Kaldewei premium bathroom solutions',
        title: 'Kaldewei Premium',
        description: 'Prémiové kúpeľňové riešenia',
        order: 1,
        active: true
      },
      {
        id: 2,
        src: '/photos/umyvadlo.jpeg',
        alt: 'Modern sink installations',
        title: 'Moderné umývadlá',
        description: 'Inštalácie moderných umývadiel',
        order: 2,
        active: true
      },
      {
        id: 3,
        src: '/photos/vanaPs.png',
        alt: 'Premium bathtub design',
        title: 'Prémiové vane',
        description: 'Dizajnové kúpeľňové vane',
        order: 3,
        active: true
      }
    ];
  }

  async getHeroBanners() {
    if (!this.isSupabaseAvailable()) {
      console.log('Supabase not available, using fallback hero banners');
      return { success: true, banners: this.getFallbackHeroBanners() };
    }

    try {
      console.log('Fetching hero banners from Supabase...');
      const { data, error } = await supabase
        .from('hero_banners')
        .select('*')
        .eq('active', true)
        .order('order', { ascending: true });
      
      if (error) {
        console.log('Supabase error, using fallback hero banners:', error);
        return { success: true, banners: this.getFallbackHeroBanners() };
      }
      
      if (!data || data.length === 0) {
        console.log('No hero banners in database, using fallback');
        return { success: true, banners: this.getFallbackHeroBanners() };
      }

      return { success: true, banners: data };
    } catch (error) {
      console.log('Error fetching hero banners, using fallback:', error);
      return { success: true, banners: this.getFallbackHeroBanners() };
    }
  }

  async getAllHeroBanners() {
    if (!this.isSupabaseAvailable()) {
      console.log('Supabase not available, using fallback banners');
      return { success: true, banners: this.getFallbackHeroBanners() };
    }

    try {
      console.log('Attempting to fetch hero banners from database...');
      
      // Add timeout to prevent hanging
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Database timeout')), 10000)
      );
      
      const fetchPromise = supabase
        .from('hero_banners')
        .select('*')
        .order('order', { ascending: true });
      
      const { data, error } = await Promise.race([fetchPromise, timeoutPromise]);
      
      if (error) {
        console.error('Database error:', error);
        // If table doesn't exist, return error to trigger setup
        if (error.message && error.message.includes('hero_banners')) {
          return { 
            success: false, 
            error: 'TABLE_NOT_EXISTS',
            message: 'Tabuľka hero_banners neexistuje. Prosím vytvorte ju v Supabase.',
            banners: this.getFallbackHeroBanners() 
          };
        }
        console.log('Using fallback due to database error');
        return { success: true, banners: this.getFallbackHeroBanners() };
      }
      
      console.log('Successfully loaded banners from database:', data);
      console.log('Number of banners loaded:', data ? data.length : 0);
      return { success: true, banners: data || this.getFallbackHeroBanners() };
    } catch (error) {
      console.error('Fetch error (timeout or other):', error);
      console.log('Using fallback due to error:', error.message);
      return { success: true, banners: this.getFallbackHeroBanners() };
    }
  }

  async createHeroBanner(bannerData) {
    if (!this.isSupabaseAvailable()) {
      return { success: true, message: 'Hero banner vytvorený (simulácia)' };
    }

    try {
      const { data, error } = await supabase
        .from('hero_banners')
        .insert([bannerData])
        .select();
      
      if (error) {
        // If table doesn't exist, simulate success
        if (error.message && error.message.includes('hero_banners')) {
          console.log('Hero banners table does not exist, simulating create');
          return { success: true, message: 'Hero banner vytvorený (simulácia - tabuľka neexistuje)' };
        }
        return { success: false, message: error.message };
      }
      
      return { success: true, banner: data[0] };
    } catch (error) {
      console.log('Create hero banner error, using fallback:', error);
      return { success: true, message: 'Hero banner vytvorený (simulácia)' };
    }
  }

  async updateHeroBanner(id, bannerData) {
    if (!this.isSupabaseAvailable()) {
      return { success: true, message: 'Hero banner aktualizovaný (simulácia)' };
    }

    try {
      const { data, error } = await supabase
        .from('hero_banners')
        .update(bannerData)
        .eq('id', id)
        .select();
      
      if (error) {
        // If table doesn't exist, simulate success
        if (error.message && error.message.includes('hero_banners')) {
          console.log('Hero banners table does not exist, simulating update');
          return { success: true, message: 'Hero banner aktualizovaný (simulácia - tabuľka neexistuje)' };
        }
        return { success: false, message: error.message };
      }
      
      return { success: true, banner: data[0] };
    } catch (error) {
      console.log('Update hero banner error, using fallback:', error);
      return { success: true, message: 'Hero banner aktualizovaný (simulácia)' };
    }
  }

  async deleteHeroBanner(id) {
    if (!this.isSupabaseAvailable()) {
      return { success: true, message: 'Hero banner odstránený (simulácia)' };
    }

    try {
      console.log('Attempting to delete hero banner with ID:', id);
      
      // First check if the banner exists
      const { data: existingBanner } = await supabase
        .from('hero_banners')
        .select('*')
        .eq('id', id)
        .single();
      
      console.log('Banner to delete:', existingBanner);
      
      const { data, error } = await supabase
        .from('hero_banners')
        .delete()
        .eq('id', id)
        .select(); // This will return the deleted rows
      
      console.log('Delete operation result:', { data, error });
      
      if (error) {
        console.error('Delete error:', error);
        // If table doesn't exist, simulate success for fallback data
        if (error.message && error.message.includes('hero_banners')) {
          console.log('Hero banners table does not exist, simulating delete');
          return { success: true, message: 'Hero banner odstránený (simulácia - tabuľka neexistuje)' };
        }
        return { success: false, message: error.message };
      }
      
      console.log('Successfully deleted banner(s):', data);
      console.log('Number of rows deleted:', data ? data.length : 0);
      
      return { success: true, deletedRows: data ? data.length : 0 };
    } catch (error) {
      console.error('Delete hero banner error:', error);
      return { success: false, message: error.message };
    }
  }

  async uploadHeroBannerImage(file) {
    try {
      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        throw new Error('Súbor je príliš veľký. Maximálna veľkosť je 5MB.');
      }

      // Convert to data URL with compression
      return new Promise((resolve, reject) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        
        img.onload = () => {
          // Calculate new dimensions (max 1920px width for hero banners)
          const maxWidth = 1920;
          let { width, height } = img;
          
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
          
          canvas.width = width;
          canvas.height = height;
          
          // Draw and compress
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.85); // 85% quality
          
          resolve({
            success: true,
            url: compressedDataUrl,
            filename: `hero-${Date.now()}-${file.name}`,
            originalName: file.name,
            size: Math.round(compressedDataUrl.length * 0.75)
          });
        };
        
        img.onerror = () => reject(new Error(`Chyba pri spracovaní obrázka: ${file.name}`));
        
        // Load image from file
        const reader = new FileReader();
        reader.onload = (e) => { img.src = e.target.result; };
        reader.onerror = () => reject(new Error(`Chyba pri čítaní súboru: ${file.name}`));
        reader.readAsDataURL(file);
      });

    } catch (error) {
      console.error('Hero banner image upload failed:', error);
      return { success: false, message: error.message };
    }
  }

  async initializeHeroBanners() {
    if (!this.isSupabaseAvailable()) {
      return { success: true, message: 'Hero bannery inicializované (fallback)' };
    }

    try {
      console.log('Initializing hero banners...');
      
      // First, try to create the table if it doesn't exist
      const createTableSQL = `
        CREATE TABLE IF NOT EXISTS hero_banners (
          id SERIAL PRIMARY KEY,
          src TEXT NOT NULL,
          alt TEXT NOT NULL,
          title TEXT,
          description TEXT,
          "order" INTEGER DEFAULT 1,
          active BOOLEAN DEFAULT true,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
        
        CREATE INDEX IF NOT EXISTS idx_hero_banners_order ON hero_banners("order");
        CREATE INDEX IF NOT EXISTS idx_hero_banners_active ON hero_banners(active);
        
        ALTER TABLE hero_banners ENABLE ROW LEVEL SECURITY;
        
        CREATE POLICY IF NOT EXISTS "Allow public read access" ON hero_banners
        FOR SELECT USING (true);
      `;

      // Execute table creation
      const { error: createError } = await supabase.rpc('exec_sql', { sql: createTableSQL });
      
      if (createError) {
        console.log('Table creation via RPC failed, trying direct insert:', createError);
      }

      // Check if hero banners already exist
      const { data: existingBanners, error: selectError } = await supabase
        .from('hero_banners')
        .select('id')
        .limit(1);

      if (selectError) {
        console.log('Select error (table might not exist):', selectError);
        // If table doesn't exist, we'll try to insert and let it fail gracefully
      }

      if (existingBanners && existingBanners.length > 0) {
        return { success: true, message: 'Hero bannery už existujú v databáze' };
      }

      // Insert fallback hero banners into database
      const bannersToInsert = this.getFallbackHeroBanners().map(banner => ({
        src: banner.src,
        alt: banner.alt,
        title: banner.title,
        description: banner.description,
        "order": banner.order,
        active: banner.active
      }));
      
      console.log('Inserting hero banners:', bannersToInsert);
      
      const { data, error } = await supabase
        .from('hero_banners')
        .insert(bannersToInsert)
        .select();

      if (error) {
        console.error('Error inserting hero banners:', error);
        return { 
          success: false, 
          message: `Chyba pri inicializácii: ${error.message}. Prosím vytvorte tabuľku 'hero_banners' v Supabase manuálne.` 
        };
      }

      console.log('Hero banners initialized successfully:', data);
      return { success: true, message: `${data.length} hero bannerov úspešne inicializovaných v databáze!` };
    } catch (error) {
      console.error('Error in initializeHeroBanners:', error);
      return { 
        success: false, 
        message: `Chyba pri inicializácii hero bannerov: ${error.message}. Skontrolujte pripojenie k databáze.` 
      };
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

  // References
  async getReferences() {
    if (!this.isSupabaseAvailable()) {
      console.log('🚫 Supabase not available, using fallback references');
      return { success: true, references: this.getFallbackReferences(), source: 'fallback-no-supabase' };
    }

    try {
      console.log('Fetching references from Supabase...');
      const { data, error } = await supabase
        .from('references')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.log('🚫 Supabase error, using fallback:', error);
        return { success: true, references: this.getFallbackReferences(), source: 'fallback-supabase-error' };
      }
      
      if (!data || data.length === 0) {
        console.log('🚫 No references in database, using fallback');
        return { success: true, references: this.getFallbackReferences(), source: 'fallback-empty-db' };
      }

      console.log('✅ Successfully loaded references from Supabase database');
      return { success: true, references: data, source: 'supabase-database' };
    } catch (error) {
      console.log('Error fetching references, using fallback:', error);
      return { success: true, references: this.getFallbackReferences(), source: 'fallback-error' };
    }
  }

  async createReference(referenceData) {
    if (!this.isSupabaseAvailable()) {
      console.log('Supabase not available, simulating reference creation');
      return { success: true, message: 'Referencia vytvorená (simulácia - Supabase nedostupný)' };
    }

    try {
      console.log('Creating reference in Supabase:', referenceData);
      
      const { data, error } = await supabase
        .from('references')
        .insert([{
          title: referenceData.title,
          description: referenceData.description,
          year: referenceData.year,
          location: referenceData.location,
          client: referenceData.client,
          images: referenceData.images || [],
          created_at: new Date().toISOString()
        }])
        .select();

      if (error) {
        console.error('Supabase error creating reference:', error);
        
        // If table doesn't exist, provide helpful message
        if (error.message && error.message.includes('relation "references" does not exist')) {
          return { 
            success: false, 
            message: 'Tabuľka "references" neexistuje v databáze. Kontaktujte administrátora.' 
          };
        }
        
        return { 
          success: false, 
          message: `Chyba databázy: ${error.message}` 
        };
      }

      console.log('Reference created successfully:', data[0]);
      return { success: true, reference: data[0] };
    } catch (error) {
      console.error('Exception creating reference:', error);
      return { 
        success: false, 
        message: `Neočakávaná chyba: ${error.message}` 
      };
    }
  }

  async updateReference(id, referenceData) {
    if (!this.isSupabaseAvailable()) {
      console.log('Supabase not available, simulating reference update');
      return { success: true, message: 'Reference updated (simulated)' };
    }

    try {
      const { data, error } = await supabase
        .from('references')
        .update({
          title: referenceData.title,
          description: referenceData.description,
          year: referenceData.year,
          location: referenceData.location,
          client: referenceData.client,
          images: referenceData.images || [],
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select();

      if (error) {
        console.error('Error updating reference:', error);
        return { success: false, message: 'Chyba pri aktualizácii referencie' };
      }

      return { success: true, reference: data[0] };
    } catch (error) {
      console.error('Error updating reference:', error);
      return { success: false, message: 'Chyba pri aktualizácii referencie' };
    }
  }

  async deleteReference(id) {
    if (!this.isSupabaseAvailable()) {
      console.log('Supabase not available, simulating reference deletion');
      return { success: true, message: 'Reference deleted (simulated)' };
    }

    try {
      const { error } = await supabase
        .from('references')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting reference:', error);
        return { success: false, message: 'Chyba pri mazaní referencie' };
      }

      return { success: true };
    } catch (error) {
      console.error('Error deleting reference:', error);
      return { success: false, message: 'Chyba pri mazaní referencie' };
    }
  }

  getFallbackReferences() {
    return [
      {
        id: 1,
        title: "Hotel Grandezza Bratislava",
        description: "120 hotelových kúpeľní",
        year: "2023",
        location: "Bratislava",
        client: "Hotel Group s.r.o.",
        images: []
      },
      {
        id: 2,
        title: "Wellness AquaRelax",
        description: "Kompletné wellness vybavenie",
        year: "2023",
        location: "Košice",
        client: "AquaRelax s.r.o.",
        images: []
      },
      {
        id: 3,
        title: "Rezidencia Zlaté Piesky",
        description: "8 luxusných kúpeľní",
        year: "2022",
        location: "Bratislava",
        client: "Rezidencia s.r.o.",
        images: []
      }
    ];
  }

  // Who We Are Sections
  async getWhoWeAreSections() {
    if (!this.isSupabaseAvailable()) {
      console.log('🚫 Supabase not available, using fallback sections');
      return { success: true, sections: this.getFallbackWhoWeAreSections(), source: 'fallback-no-supabase' };
    }

    try {
      console.log('Fetching who-we-are sections from Supabase...');
      const { data, error } = await supabase
        .from('who_we_are_sections')
        .select('*')
        .order('order', { ascending: true });
      
      if (error) {
        console.log('🚫 Supabase error, using fallback:', error);
        return { success: true, sections: this.getFallbackWhoWeAreSections(), source: 'fallback-supabase-error' };
      }
      
      if (!data || data.length === 0) {
        console.log('🚫 No sections in database, using fallback');
        return { success: true, sections: this.getFallbackWhoWeAreSections(), source: 'fallback-empty-db' };
      }

      console.log('✅ Successfully loaded sections from Supabase database');
      return { success: true, sections: data, source: 'supabase-database' };
    } catch (error) {
      console.log('Error fetching sections, using fallback:', error);
      return { success: true, sections: this.getFallbackWhoWeAreSections(), source: 'fallback-error' };
    }
  }

  async createWhoWeAreSection(sectionData) {
    if (!this.isSupabaseAvailable()) {
      console.log('Supabase not available, simulating section creation');
      return { success: true, message: 'Sekcia vytvorená (simulácia - Supabase nedostupný)' };
    }

    try {
      console.log('Creating section in Supabase:', sectionData);
      
      const { data, error } = await supabase
        .from('who_we_are_sections')
        .insert([{
          title: sectionData.title,
          content: sectionData.content,
          size: sectionData.size || 'large',
          order: Date.now(), // Simple ordering
          created_at: new Date().toISOString()
        }])
        .select();

      if (error) {
        console.error('Supabase error creating section:', error);
        
        if (error.message && error.message.includes('relation "who_we_are_sections" does not exist')) {
          return { 
            success: false, 
            message: 'Tabuľka "who_we_are_sections" neexistuje v databáze. Kontaktujte administrátora.' 
          };
        }
        
        return { 
          success: false, 
          message: `Chyba databázy: ${error.message}` 
        };
      }

      console.log('Section created successfully:', data[0]);
      return { success: true, section: data[0] };
    } catch (error) {
      console.error('Exception creating section:', error);
      return { 
        success: false, 
        message: `Neočakávaná chyba: ${error.message}` 
      };
    }
  }

  async updateWhoWeAreSection(id, sectionData) {
    if (!this.isSupabaseAvailable()) {
      console.log('Supabase not available, simulating section update');
      return { success: true, message: 'Sekcia aktualizovaná (simulácia)' };
    }

    try {
      const { data, error } = await supabase
        .from('who_we_are_sections')
        .update({
          title: sectionData.title,
          content: sectionData.content,
          size: sectionData.size || 'large',
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select();

      if (error) {
        console.error('Error updating section:', error);
        return { success: false, message: 'Chyba pri aktualizácii sekcie' };
      }

      return { success: true, section: data[0] };
    } catch (error) {
      console.error('Error updating section:', error);
      return { success: false, message: 'Chyba pri aktualizácii sekcie' };
    }
  }

  async deleteWhoWeAreSection(id) {
    if (!this.isSupabaseAvailable()) {
      console.log('Supabase not available, simulating section deletion');
      return { success: true, message: 'Sekcia vymazaná (simulácia)' };
    }

    try {
      const { error } = await supabase
        .from('who_we_are_sections')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting section:', error);
        return { success: false, message: 'Chyba pri mazaní sekcie' };
      }

      return { success: true };
    } catch (error) {
      console.error('Error deleting section:', error);
      return { success: false, message: 'Chyba pri mazaní sekcie' };
    }
  }

  getFallbackWhoWeAreSections() {
    return [
      {
        id: 1,
        title: "O spoločnosti",
        content: "Spoločnosť Smart Sanit s.r.o. vznikla v roku 2024 ako obchodná spoločnosť, ktorej hlavnou náplňou je ponuka dizajnových produktov v oblasti obkladov, dlažieb a kompletného vybavenia kúpeľní.",
        order: 1,
        size: "large"
      },
      {
        id: 2,
        title: "Naša vízia",
        content: "Ako milovníci dizajnu sledujeme najnovšie trendy v danej oblasti. S nami sa dotknete krásy a pocítite emóciu dizajnu na vlastnej koži.",
        order: 2,
        size: "large"
      },
      {
        id: 3,
        title: "Pre našich klientov",
        content: "Našim klientom ponúkame moderné, funkčné a na mieru šité riešenia, ktoré svojím budúcim užívateľom prinášajú každodenný pocit komfortu, pohody a spoľahlivosti.",
        order: 3,
        size: "large"
      },
      {
        id: 4,
        title: "Partnerstvo",
        content: "Partnersky spolupracujeme so štúdiom EB+K.",
        order: 4,
        size: "small"
      }
    ];
  }

  // Contact Content Management
  async getContactContent() {
    if (!this.isSupabaseAvailable()) {
      console.log('Supabase not available, using fallback contact content');
      return { success: true, content: this.getFallbackContactContent() };
    }

    try {
      const { data, error } = await this.supabase
        .from('contact_content')
        .select('*')
        .single();
      
      if (error) {
        console.log('Supabase error, using fallback contact content:', error);
        return { success: true, content: this.getFallbackContactContent() };
      }
      
      if (!data) {
        console.log('No contact content in database, using fallback');
        return { success: true, content: this.getFallbackContactContent() };
      }

      return { success: true, content: data.content };
    } catch (error) {
      console.log('Error fetching contact content, using fallback:', error);
      return { success: true, content: this.getFallbackContactContent() };
    }
  }

  async updateContactContent(content) {
    if (!this.isSupabaseAvailable()) {
      console.log('Supabase not available, simulating contact content update');
      return { success: true, message: 'Contact content updated (simulated)' };
    }

    try {
      const { data, error } = await this.supabase
        .from('contact_content')
        .upsert({
          id: 1,
          content: content,
          updated_at: new Date().toISOString()
        })
        .select();

      if (error) {
        console.error('Error updating contact content:', error);
        return { success: false, error: error.message };
      }

      return { success: true, content: data[0] };
    } catch (error) {
      console.error('Exception updating contact content:', error);
      return { success: false, error: error.message };
    }
  }

  getFallbackContactContent() {
    return {
      title: 'Kontakt',
      subtitle: 'Máte otázky alebo potrebujete poradenstvo? Kontaktujte nás a radi vám pomôžeme s výberom správnych riešení pre vašu kúpeľňu.',
      formTitle: 'Napíšte nám',
      contactInfoTitle: 'Kontaktné údaje',
      servicesTitle: 'Naše služby',
      contactDetails: {
        manager: 'Ing. Dušan Drinka, PhD.',
        phone: '+421 948 882 376',
        email: 'dusan.drinka@smartsanit.sk',
        address: 'Továrenská 14\n811 09 Bratislava'
      },
      services: [
        'Poradenstvo a návrh kúpeľní',
        'Dodávka sanitárnych zariadení',
        'Inštalácia a montáž',
        'Servis a údržba',
        'Technická podpora'
      ]
    };
  }

  // Inspirations Management
  async getInspirations() {
    if (!this.isSupabaseAvailable()) {
      console.log('Supabase not available, using fallback inspirations');
      return { success: true, inspirations: this.getFallbackInspirations() };
    }

    try {
      const { data, error } = await this.supabase
        .from('inspirations')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.log('Supabase error, using fallback inspirations:', error);
        return { success: true, inspirations: this.getFallbackInspirations() };
      }
      
      if (!data || data.length === 0) {
        console.log('No inspirations in database, using fallback');
        return { success: true, inspirations: this.getFallbackInspirations() };
      }

      return { success: true, inspirations: data };
    } catch (error) {
      console.log('Error fetching inspirations, using fallback:', error);
      return { success: true, inspirations: this.getFallbackInspirations() };
    }
  }

  async createInspiration(inspirationData) {
    if (!this.isSupabaseAvailable()) {
      console.log('Supabase not available, simulating inspiration creation');
      return { success: true, message: 'Inspiration created (simulated)' };
    }

    try {
      const { data, error } = await this.supabase
        .from('inspirations')
        .insert([inspirationData])
        .select();

      if (error) {
        console.error('Error creating inspiration:', error);
        return { success: false, error: error.message };
      }

      return { success: true, inspiration: data[0] };
    } catch (error) {
      console.error('Exception creating inspiration:', error);
      return { success: false, error: error.message };
    }
  }

  async updateInspiration(id, inspirationData) {
    if (!this.isSupabaseAvailable()) {
      console.log('Supabase not available, simulating inspiration update');
      return { success: true, message: 'Inspiration updated (simulated)' };
    }

    try {
      const { data, error } = await this.supabase
        .from('inspirations')
        .update(inspirationData)
        .eq('id', id)
        .select();

      if (error) {
        console.error('Error updating inspiration:', error);
        return { success: false, error: error.message };
      }

      return { success: true, inspiration: data[0] };
    } catch (error) {
      console.error('Exception updating inspiration:', error);
      return { success: false, error: error.message };
    }
  }

  async deleteInspiration(id) {
    if (!this.isSupabaseAvailable()) {
      console.log('Supabase not available, simulating inspiration deletion');
      return { success: true, message: 'Inspiration deleted (simulated)' };
    }

    try {
      const { error } = await this.supabase
        .from('inspirations')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting inspiration:', error);
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      console.error('Exception deleting inspiration:', error);
      return { success: false, error: error.message };
    }
  }

  getFallbackInspirations() {
    return [
      {
        id: 1,
        title: 'Moderná kúpeľňa',
        description: 'Elegantný dizajn s čistými líniami.',
        category: 'modern',
        image: '/photos/ATX_AG0088.jpg',
        features: ['Moderný dizajn', 'Kvalitné materiály', 'Funkčnosť'],
        brands: ['Agape', 'Fantini', 'Cielo']
      },
      {
        id: 2,
        title: 'Luxusná kúpeľňa',
        description: 'Prémiové materiály a vybavenie.',
        category: 'luxury',
        image: '/photos/ATX_AG0102.jpg',
        features: ['Luxusné materiály', 'Prémiové vybavenie', 'Elegantný dizajn'],
        brands: ['AXOR', 'Fantini', 'Cielo']
      },
      {
        id: 3,
        title: 'Štýlová kúpeľňa',
        description: 'Kombinácia funkčnosti a estetiky.',
        category: 'modern',
        image: '/photos/ATX_AG0088.jpg',
        features: ['Štýlový dizajn', 'Praktické riešenia', 'Kvalitné materiály'],
        brands: ['CEA Design', 'Azzurra', 'Hansgrohe']
      }
    ];
  }

  // Dashboard Stats
  async getDashboardStats() {
    try {
      const stats = {
        brands: 0,
        references: 0,
        inspirations: 0,
        contacts: 0
      };

      if (!this.isSupabaseAvailable()) {
        // Fallback stats
        stats.brands = this.getFallbackBrands().length;
        stats.references = this.getFallbackReferences().length;
        stats.inspirations = this.getFallbackInspirations().length;
        stats.contacts = 0;
        return { success: true, stats };
      }

      // Get brands count
      const { data: brandsData, error: brandsError } = await supabase
        .from('brands')
        .select('*', { count: 'exact', head: true });
      
      if (!brandsError) {
        stats.brands = brandsData.count || 0;
      } else {
        stats.brands = this.getFallbackBrands().length;
      }

      // Get references count
      const { data: referencesData, error: referencesError } = await supabase
        .from('references')
        .select('*', { count: 'exact', head: true });
      
      if (!referencesError) {
        stats.references = referencesData.count || 0;
      } else {
        stats.references = this.getFallbackReferences().length;
      }

      // Get inspirations count
      const { data: inspirationsData, error: inspirationsError } = await supabase
        .from('inspirations')
        .select('*', { count: 'exact', head: true });
      
      if (!inspirationsError) {
        stats.inspirations = inspirationsData.count || 0;
      } else {
        stats.inspirations = this.getFallbackInspirations().length;
      }

      // Get messages count
      const { data: messagesData, error: messagesError } = await supabase
        .from('messages')
        .select('*', { count: 'exact', head: true });
      
      if (!messagesError) {
        stats.contacts = messagesData.count || 0;
      }

      return { success: true, stats };
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      // Return fallback stats on error
      return {
        success: true,
        stats: {
          brands: this.getFallbackBrands().length,
          references: this.getFallbackReferences().length,
          inspirations: this.getFallbackInspirations().length,
          contacts: 0
        }
      };
    }
  }

  // Recent Activity
  async getRecentActivity() {
    try {
      const activities = [];

      if (!this.isSupabaseAvailable()) {
        // Fallback activities
        return {
          success: true,
          activities: [
            {
              id: 1,
              type: 'system',
              message: 'Systém používa fallback dáta',
              icon: '⚠️',
              timestamp: new Date().toISOString()
            },
            {
              id: 2,
              type: 'info',
              message: 'Pripojte Supabase pre živé dáta',
              icon: '🔗',
              timestamp: new Date().toISOString()
            }
          ]
        };
      }

      // Get recent messages (last 3)
      try {
        const { data: messages } = await supabase
          .from('messages')
          .select('name, subject, created_at')
          .order('created_at', { ascending: false })
          .limit(3);

        if (messages && messages.length > 0) {
          messages.forEach(message => {
            activities.push({
              id: `msg-${message.created_at}`,
              type: 'message',
              message: `Nová správa od ${message.name}: ${message.subject}`,
              icon: '📧',
              timestamp: message.created_at
            });
          });
        }
      } catch (error) {
        console.log('Could not fetch recent messages:', error);
      }

      // Get recent hero banner updates
      try {
        const { data: banners } = await supabase
          .from('hero_banners')
          .select('title, updated_at, created_at')
          .order('updated_at', { ascending: false })
          .limit(2);

        if (banners && banners.length > 0) {
          banners.forEach(banner => {
            const isNew = new Date(banner.created_at) > new Date(Date.now() - 24 * 60 * 60 * 1000);
            activities.push({
              id: `banner-${banner.updated_at}`,
              type: 'banner',
              message: `${isNew ? 'Vytvorený' : 'Aktualizovaný'} hero banner: ${banner.title}`,
              icon: '🖼️',
              timestamp: banner.updated_at || banner.created_at
            });
          });
        }
      } catch (error) {
        console.log('Could not fetch recent banners:', error);
      }

      // Get recent brand updates
      try {
        const { data: brands } = await supabase
          .from('brands')
          .select('name, updated_at, created_at')
          .order('updated_at', { ascending: false })
          .limit(2);

        if (brands && brands.length > 0) {
          brands.forEach(brand => {
            const isNew = new Date(brand.created_at) > new Date(Date.now() - 24 * 60 * 60 * 1000);
            activities.push({
              id: `brand-${brand.updated_at}`,
              type: 'brand',
              message: `${isNew ? 'Pridaná' : 'Aktualizovaná'} značka: ${brand.name}`,
              icon: '🏷️',
              timestamp: brand.updated_at || brand.created_at
            });
          });
        }
      } catch (error) {
        console.log('Could not fetch recent brands:', error);
      }

      // Sort activities by timestamp and take the most recent 5
      activities.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      const recentActivities = activities.slice(0, 5);

      // If no activities found, show default message
      if (recentActivities.length === 0) {
        recentActivities.push({
          id: 'default',
          type: 'info',
          message: 'Žiadna nedávna aktivita',
          icon: '📊',
          timestamp: new Date().toISOString()
        });
      }

      return { success: true, activities: recentActivities };
    } catch (error) {
      console.error('Error fetching recent activity:', error);
      return {
        success: true,
        activities: [
          {
            id: 'error',
            type: 'error',
            message: 'Chyba pri načítavaní aktivity',
            icon: '❌',
            timestamp: new Date().toISOString()
          }
        ]
      };
    }
  }
}

const apiService = new ApiService();
export default apiService;
