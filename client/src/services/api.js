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
      return { success: true, brands: this.getFallbackBrands(), source: 'fallback-no-supabase' };
    }

    try {
      // Create abort controller with 60 second timeout (increased for large image data)
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 60000); // 60 seconds
      
      const { data, error } = await supabase
        .from('brands')
        .select('*')
        .order('order', { ascending: true })
        .abortSignal(controller.signal);
      
      clearTimeout(timeoutId);
      
      if (error) {
        console.error('Supabase error:', error.message);
        // Check if it's a timeout error
        if (error.message.includes('timeout') || error.message.includes('canceling statement')) {
          console.log('⏱️ Database query timed out due to large images, using fallback');
          return { success: true, brands: this.getFallbackBrands(), source: 'fallback-timeout' };
        }
        return { success: false, error: error, message: 'Supabase error: ' + error.message };
      }
      
      if (!data || data.length === 0) {
        console.log('No brands in database, using fallback');
        return { success: true, brands: this.getFallbackBrands(), source: 'fallback-empty' };
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

  // Single brand fetch by ID - optimized for brand detail page
  async getBrandById(brandId) {
    if (!this.isSupabaseAvailable()) {
      // Try to find brand in fallback list
      const fallback = this.getFallbackBrands().find(b => b.id?.toString() === String(brandId));
      return fallback
        ? { success: true, brand: fallback, source: 'fallback' }
        : { success: false, message: 'Brand not found (fallback)', source: 'fallback-miss' };
    }

    try {
      const { data, error } = await supabase
        .from('brands')
        .select('*')
        .eq('id', brandId)
        .single();

      if (error) {
        console.error('Supabase error (getBrandById):', error.message);
        return { success: false, message: 'Supabase error: ' + error.message };
      }

      if (!data) {
        return { success: false, message: 'Brand not found' };
      }

      // Reuse the same image processing logic as in getBrands, but for a single brand
      let images = [];
      try {
        if (Array.isArray(data.images)) {
          images = data.images;
        } else if (typeof data.images === 'string' && data.images.trim().startsWith('[')) {
          images = JSON.parse(data.images);
        }
      } catch (e) {
        images = [];
      }

      const validatedImages = images
        .map(img => {
          if (!img) return null;

          if (img.url && img.url.startsWith('data:')) {
            return img;
          }

          const imagePath = img.path || img.filename;
          if (imagePath) {
            return {
              ...img,
              url: `https://lckbwknxfmbjffjsmahs.supabase.co/storage/v1/object/public/brand-images/${imagePath}`
            };
          }

          return null;
        })
        .filter(Boolean);

      const processedBrand = {
        ...data,
        logoFilter: 'none',
        images: validatedImages,
      };

      return { success: true, brand: processedBrand, source: 'supabase-database' };
    } catch (error) {
      console.error('Error fetching brand by id:', error);
      return { success: false, message: 'Error fetching brand: ' + error.message };
    }
  }

  // Lightweight brands fetch: only basic fields, no image parsing
  async getBrandsLight(language = 'sk') {
    if (!this.isSupabaseAvailable()) {
      console.log('🚫 Supabase not available for brands (light), returning no brands');
      return { success: true, brands: [], source: 'no-supabase' };
    }

    try {
      // Try to select all columns including language-specific ones
      // If they don't exist, fall back to basic columns
      let data, error;
      
      try {
        const result = await supabase
          .from('brands')
          .select('id, name, description, category, description_sk, description_en, category_sk, category_en, logo, order')
          .order('order', { ascending: true });
        data = result.data;
        error = result.error;
      } catch (selectError) {
        // If language columns don't exist yet, try without them
        console.log('Language columns not found, using basic columns');
        const result = await supabase
          .from('brands')
          .select('id, name, description, category, logo, order')
          .order('order', { ascending: true });
        data = result.data;
        error = result.error;
      }

      if (error) {
        console.error('Supabase error (light brands):', error.message);
        return { success: true, brands: [], source: 'error' };
      }

      if (!data || data.length === 0) {
        console.log('📭 No brands in database (light), returning empty list');
        return { success: true, brands: [], source: 'empty' };
      }

      // For light version we just pass data through with language-specific fields
      const processedBrands = data.map(brand => {
        // Use language-specific columns if available, fallback to old columns
        const description = language === 'en' 
          ? (brand.description_en || brand.description)
          : (brand.description_sk || brand.description);
        
        const category = language === 'en'
          ? (brand.category_en || brand.category)
          : (brand.category_sk || brand.category);

        return {
          ...brand,
          description,
          category,
          logoFilter: brand.logoFilter || 'none',
        };
      });

      return { success: true, brands: processedBrands, source: 'database' };
    } catch (error) {
      console.log('Error fetching light brands, returning empty list:', error);
      return { success: true, brands: [], source: 'connection-error' };
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

  // Get single brand WITH images (for detail/gallery pages)
  async getBrandWithImages(brandId) {
    if (!this.isSupabaseAvailable()) {
      return { success: false, message: 'Supabase not available' };
    }

    try {
      const { data, error } = await supabase
        .from('brands')
        .select('*')
        .eq('id', brandId)
        .single();
      
      if (error) {
        console.error('Error fetching brand with images:', error);
        return { success: false, message: error.message };
      }

      // Process images
      let images = [];
      try {
        if (Array.isArray(data.images)) {
          images = data.images;
        } else if (typeof data.images === 'string' && data.images.trim().startsWith('[')) {
          images = JSON.parse(data.images);
        }
      } catch (e) {
        console.error('Error parsing images:', e);
        images = [];
      }

      // Validate image URLs
      const validatedImages = images.map(img => {
        if (!img) return null;

        // If using data URLs (base64), use as-is
        if (img.url && img.url.startsWith('data:')) {
          return img;
        }

        // If using Supabase Storage, build public URL
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
        success: true, 
        brand: {
          ...data,
          images: validatedImages,
          logoFilter: 'none'
        }
      };
    } catch (error) {
      console.error('Error in getBrandWithImages:', error);
      return { success: false, message: 'Chyba pri načítavaní značky' };
    }
  }




  async uploadBrandImages(brandId, files) {
    console.log('🚀 Uploading images to Supabase Storage...');

    try {
      // Validate file sizes (max 10MB per image - reasonable for web)
      const maxSize = 10 * 1024 * 1024; // 10MB
      const oversizedFiles = Array.from(files).filter(file => file.size > maxSize);
      if (oversizedFiles.length > 0) {
        throw new Error(`Súbory sú príliš veľké. Maximálna veľkosť je 10MB. Veľké súbory: ${oversizedFiles.map(f => f.name).join(', ')}`);
      }

      // 1. Upload files to Supabase Storage
      const uploadPromises = Array.from(files).map(async (file) => {
        const timestamp = Date.now();
        const randomStr = Math.random().toString(36).substring(7);
        const filename = `${brandId}/${timestamp}-${randomStr}-${file.name}`;
        
        console.log(`📤 Uploading ${file.name} to storage...`);
        
        const { error } = await supabase.storage
          .from('brand-images')
          .upload(filename, file, {
            cacheControl: '3600',
            upsert: false
          });

        if (error) {
          console.error(`❌ Upload failed for ${file.name}:`, error);
          throw new Error(`Chyba pri nahrávaní ${file.name}: ${error.message}`);
        }

        console.log(`✅ Uploaded ${file.name} successfully`);

        // Return image metadata (only path stored in DB, not the actual image data)
        return {
          url: `https://lckbwknxfmbjffjsmahs.supabase.co/storage/v1/object/public/brand-images/${filename}`,
          path: filename,
          originalName: file.name,
          filename: filename,
          size: file.size
        };
      });

      const newImages = await Promise.all(uploadPromises);
      console.log(`✅ ${newImages.length} images uploaded to storage`);

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

      // 4. Save only the metadata to database (NOT the image data!)
      const { error: updateError } = await supabase
        .from('brands')
        .update({ images: updatedImages })
        .eq('id', brandId);

      if (updateError) {
        console.error('Failed to save image metadata to database:', updateError);
        throw new Error('Database update failed.');
      }

      console.log('✅ SUCCESS: Images uploaded to storage and metadata saved to database');
      return { success: true, images: newImages };

    } catch (error) {
      console.error('❌ UPLOAD FAILED:', error);
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

  async updateBrandImageTitle(brandId, imageFilename, newTitle) {
    try {
      console.log('🔄 Updating brand image title:', brandId, imageFilename, newTitle);
      
      if (!this.isSupabaseAvailable()) {
        console.log('Supabase not available, image title update simulated');
        return { success: true, message: 'Názov obrázka bol aktualizovaný (simulácia)' };
      }

      // 1. Get the current brand data
      const { data: brand, error: fetchError } = await supabase
        .from('brands')
        .select('images')
        .eq('id', brandId)
        .single();

      if (fetchError) {
        console.error('Failed to fetch brand:', fetchError);
        return { success: false, message: 'Značka nebola nájdená' };
      }

      // 2. Parse existing images
      let images = [];
      try {
        if (Array.isArray(brand.images)) {
          images = brand.images;
        } else if (typeof brand.images === 'string') {
          images = JSON.parse(brand.images);
        }
      } catch (e) {
        console.error('Could not parse existing images:', e);
        return { success: false, message: 'Chyba pri spracovaní obrázkov' };
      }

      // 3. Find and update the specific image
      const imageIndex = images.findIndex(img => img.filename === imageFilename);
      if (imageIndex === -1) {
        return { success: false, message: 'Obrázok nebol nájdený' };
      }

      images[imageIndex] = {
        ...images[imageIndex],
        title: newTitle
      };

      // 4. Save back to database
      const { error: updateError } = await supabase
        .from('brands')
        .update({ images: images })
        .eq('id', brandId);

      if (updateError) {
        console.error('Failed to update image title:', updateError);
        return { success: false, message: updateError.message };
      }

      console.log('✅ Brand image title updated successfully');
      return { success: true, message: 'Názov obrázka bol úspešne aktualizovaný' };
    } catch (error) {
      console.error('Update brand image title error:', error);
      return { success: false, message: 'Chyba pri aktualizácii názvu obrázka' };
    }
  }

  async updateReferenceImageTitle(referenceId, imageId, newTitle) {
    try {
      console.log('🔄 Updating reference image title:', referenceId, imageId, newTitle);
      
      if (!this.isSupabaseAvailable()) {
        console.log('Supabase not available, image title update simulated');
        return { success: true, message: 'Názov obrázka bol aktualizovaný (simulácia)' };
      }

      // 1. Get the current reference data
      const { data: reference, error: fetchError } = await supabase
        .from('references')
        .select('images')
        .eq('id', referenceId)
        .single();

      if (fetchError) {
        console.error('Failed to fetch reference:', fetchError);
        return { success: false, message: 'Referencia nebola nájdená' };
      }

      // 2. Parse existing images
      let images = [];
      try {
        if (Array.isArray(reference.images)) {
          images = reference.images;
        } else if (typeof reference.images === 'string') {
          images = JSON.parse(reference.images);
        }
      } catch (e) {
        console.error('Could not parse existing images:', e);
        return { success: false, message: 'Chyba pri spracovaní obrázkov' };
      }

      // 3. Find and update the specific image
      const imageIndex = images.findIndex(img => img.id === imageId);
      if (imageIndex === -1) {
        return { success: false, message: 'Obrázok nebol nájdený' };
      }

      images[imageIndex] = {
        ...images[imageIndex],
        title: newTitle
      };

      // 4. Save back to database
      const { error: updateError } = await supabase
        .from('references')
        .update({ images: images })
        .eq('id', referenceId);

      if (updateError) {
        console.error('Failed to update image title:', updateError);
        return { success: false, message: updateError.message };
      }

      console.log('✅ Reference image title updated successfully');
      return { success: true, message: 'Názov obrázka bol úspešne aktualizovaný' };
    } catch (error) {
      console.error('Update reference image title error:', error);
      return { success: false, message: 'Chyba pri aktualizácii názvu obrázka' };
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
      console.log('Supabase not available');
      return { success: false, banners: [], error: 'Supabase not available' };
    }

    try {
      console.log('Fetching hero banners from Supabase...');
      const { data, error } = await supabase
        .from('hero_banners')
        .select('*')
        .eq('active', true)
        .order('order', { ascending: true });
      
      if (error) {
        console.error('Supabase error:', error);
        return { success: false, banners: [], error };
      }
      
      if (!data || data.length === 0) {
        console.log('No hero banners in database');
        return { success: true, banners: [] };
      }

      return { success: true, banners: data };
    } catch (error) {
      console.error('Error fetching hero banners:', error);
      return { success: false, banners: [], error };
    }
  }

  async getAllHeroBanners() {
    if (!this.isSupabaseAvailable()) {
      console.log('Supabase not available');
      return { success: false, banners: [], error: 'Supabase not available' };
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
            banners: [] 
          };
        }
        return { success: false, banners: [], error };
      }
      
      console.log('Successfully loaded banners from database:', data);
      console.log('Number of banners loaded:', data ? data.length : 0);
      return { success: true, banners: data || [] };
    } catch (error) {
      console.error('Fetch error (timeout or other):', error);
      return { success: false, banners: [], error };
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

  // References - load WITHOUT images for fast loading (images are 31MB+)
  async getReferences(language = 'sk') {
    if (!this.isSupabaseAvailable()) {
      return { success: false, message: 'Database connection not available' };
    }

    try {
      // Select all columns including English translations
      const { data, error } = await supabase
        .from('references')
        .select('id, title, description, year, location, client, title_en, description_en, location_en, client_en, created_at')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error loading references:', error.message);
        return { success: false, message: `Database error: ${error.message}` };
      }
      
      // Map data to use language-specific fields
      const references = (data || []).map(ref => ({
        id: ref.id,
        title: language === 'en' && ref.title_en ? ref.title_en : ref.title,
        description: language === 'en' && ref.description_en ? ref.description_en : ref.description,
        year: ref.year,
        location: language === 'en' && ref.location_en ? ref.location_en : ref.location,
        client: language === 'en' && ref.client_en ? ref.client_en : ref.client,
        created_at: ref.created_at
      }));
      
      return { success: true, references };
    } catch (error) {
      console.error('Error loading references:', error.message);
      return { success: false, message: `Error loading references: ${error.message}` };
    }
  }

  // Get references with image count (for showing Gallery button)
  async getReferencesWithImageInfo() {
    if (!this.isSupabaseAvailable()) {
      return { success: false, message: 'Database connection not available' };
    }

    try {
      // Use RPC function or raw query to get image count without loading full images
      const { data, error } = await supabase
        .from('references')
        .select('id, title, description, year, location, client, created_at, images')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error loading references:', error.message);
        return { success: false, message: `Database error: ${error.message}` };
      }
      
      // Process to only include hasImages flag, not actual image data
      const processedData = (data || []).map(ref => ({
        id: ref.id,
        title: ref.title,
        description: ref.description,
        year: ref.year,
        location: ref.location,
        client: ref.client,
        created_at: ref.created_at,
        hasImages: ref.images && ref.images.length > 0,
        imageCount: ref.images ? ref.images.length : 0
      }));
      
      return { success: true, references: processedData };
    } catch (error) {
      console.error('Error loading references:', error.message);
      return { success: false, message: `Error loading references: ${error.message}` };
    }
  }

  async getReferenceById(id) {
    if (!this.isSupabaseAvailable()) {
      return { success: false, message: 'Database connection not available' };
    }

    try {
      const { data, error } = await supabase
        .from('references')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        console.error('Error loading reference:', error.message);
        return { success: false, message: `Database error: ${error.message}` };
      }
      
      return { success: true, reference: data };
    } catch (error) {
      console.error('Error loading reference:', error.message);
      return { success: false, message: `Error loading reference: ${error.message}` };
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
  async getWhoWeAreSections(language = 'sk') {
    if (!this.isSupabaseAvailable()) {
      console.log('🚫 Supabase not available');
      return { success: false, sections: [], source: 'no-supabase', message: 'Database connection not available' };
    }

    try {
      console.log(`Fetching who-we-are sections from Supabase (language: ${language})...`);
      // Add a timeout, but long enough so real content usually loads from database
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Request timed out')), 5000)
      );

      const fetchPromise = supabase
        .from('who_we_are_sections')
        .select('*')
        .eq('language', language)
        .order('order', { ascending: true });

      const { data, error } = await Promise.race([fetchPromise, timeoutPromise]);
      
      if (error) {
        console.log('🚫 Supabase error:', error);
        return { success: false, sections: [], source: 'supabase-error', message: error.message };
      }
      
      if (!data || data.length === 0) {
        console.log('📭 No sections in database, returning empty result');
        return { success: true, sections: [], source: 'empty-database' };
      }

      console.log('✅ Successfully loaded sections from Supabase database');
      return { success: true, sections: data, source: 'supabase-database' };
    } catch (error) {
      console.log('Error fetching sections:', error);
      if (error && error.message === 'Request timed out') {
        return { success: false, sections: [], source: 'timeout', message: 'Request timed out' };
      }
      return { success: false, sections: [], source: 'connection-error', message: error.message };
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
          order: sectionData.order || 1, // Use provided order or default to 1
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

  // Partner Logos
  async getPartnerLogos() {
    if (!this.isSupabaseAvailable()) {
      console.log('🚫 Supabase not available, returning no partner logos');
      return { success: true, logos: [], source: 'no-supabase' };
    }

    try {
      console.log('🔄 Fetching partner logos from Supabase (optimized query)...');
      // Increased timeout to 10 seconds for large base64 images
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Request timed out')), 10000)
      );

      // Fetch only essential fields to reduce data transfer
      const fetchPromise = supabase
        .from('partner_logos')
        .select('id, name, logo, order')
        .eq('active', true)
        .order('order', { ascending: true });

      const { data, error } = await Promise.race([fetchPromise, timeoutPromise]);
      
      if (error) {
        console.log('🚫 Supabase error:', error);
        return { success: true, logos: [], source: 'error' };
      }
      
      if (!data || data.length === 0) {
        console.log('📭 No logos in database');
        return { success: true, logos: [], source: 'empty' };
      }

      console.log(`✅ Successfully loaded ${data.length} logos from Supabase database`);
      return { success: true, logos: data, source: 'database' };
    } catch (error) {
      console.log('Error fetching logos:', error);
      const reason = error && error.message === 'Request timed out' ? 'timeout' : 'connection-error';
      return { success: true, logos: [], source: reason };
    }
  }

  async getAllPartnerLogos() {
    if (!this.isSupabaseAvailable()) {
      console.log('🚫 Supabase not available');
      return { success: false, logos: [], message: 'Database not available' };
    }

    try {
      const { data, error } = await supabase
        .from('partner_logos')
        .select('*')
        .order('order', { ascending: true });
      
      if (error) {
        console.error('Error fetching all logos:', error);
        return { success: false, logos: [], message: error.message };
      }

      return { success: true, logos: data || [] };
    } catch (error) {
      console.error('Error fetching all logos:', error);
      return { success: false, logos: [], message: error.message };
    }
  }

  async createPartnerLogo(logoData) {
    if (!this.isSupabaseAvailable()) {
      return { success: false, message: 'Database not available' };
    }

    try {
      const { data, error } = await supabase
        .from('partner_logos')
        .insert([{
          name: logoData.name,
          logo: logoData.logo,
          order: logoData.order || 999,
          active: logoData.active !== undefined ? logoData.active : true
        }])
        .select();

      if (error) {
        console.error('Error creating partner logo:', error);
        return { success: false, message: error.message };
      }

      return { success: true, logo: data[0] };
    } catch (error) {
      console.error('Error creating partner logo:', error);
      return { success: false, message: error.message };
    }
  }

  async updatePartnerLogo(id, logoData) {
    if (!this.isSupabaseAvailable()) {
      return { success: false, message: 'Database not available' };
    }

    try {
      const updateData = {};
      if (logoData.name !== undefined) updateData.name = logoData.name;
      if (logoData.logo !== undefined) updateData.logo = logoData.logo;
      if (logoData.order !== undefined) updateData.order = logoData.order;
      if (logoData.active !== undefined) updateData.active = logoData.active;
      updateData.updated_at = new Date().toISOString();

      const { data, error } = await supabase
        .from('partner_logos')
        .update(updateData)
        .eq('id', id)
        .select();

      if (error) {
        console.error('Error updating partner logo:', error);
        return { success: false, message: error.message };
      }

      return { success: true, logo: data[0] };
    } catch (error) {
      console.error('Error updating partner logo:', error);
      return { success: false, message: error.message };
    }
  }

  async deletePartnerLogo(id) {
    if (!this.isSupabaseAvailable()) {
      return { success: false, message: 'Database not available' };
    }

    try {
      const { error } = await supabase
        .from('partner_logos')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting partner logo:', error);
        return { success: false, message: error.message };
      }

      return { success: true };
    } catch (error) {
      console.error('Error deleting partner logo:', error);
      return { success: false, message: error.message };
    }
  }

  getFallbackPartnerLogos() {
    return [
      {
        id: 1,
        name: 'Elite Bath + Kitchen',
        logo: '/elite_logoRGB-11.jpg',
        order: 1,
        active: true
      }
    ];
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
        content: "",
        order: 4,
        size: "small"
      }
    ];
  }

  // Contact Content Management
  async getContactContent(language = 'sk') {
    if (!this.isSupabaseAvailable()) {
      console.log('Supabase not available, using fallback contact content');
      return { success: true, content: this.getFallbackContactContent(language) };
    }

    try {
      const { data, error } = await supabase
        .from('contact_content')
        .select('*')
        .eq('language', language)
        .single();
      
      if (error) {
        console.log('Supabase error, using fallback contact content:', error);
        return { success: true, content: this.getFallbackContactContent(language) };
      }
      
      if (!data) {
        console.log('No contact content in database, using fallback');
        return { success: true, content: this.getFallbackContactContent(language) };
      }

      return { success: true, content: data.content };
    } catch (error) {
      console.log('Error fetching contact content, using fallback:', error);
      return { success: true, content: this.getFallbackContactContent(language) };
    }
  }

  async updateContactContent(content, language = 'sk') {
    if (!this.isSupabaseAvailable()) {
      console.log('Supabase not available, simulating contact content update');
      return { success: true, message: 'Contact content updated (simulated)' };
    }

    try {
      // Use language-specific ID: 1 for SK, 2 for EN
      const langId = language === 'sk' ? 1 : 2;
      
      const { data, error } = await supabase
        .from('contact_content')
        .upsert({
          id: langId,
          language: language,
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

  getFallbackContactContent(language = 'sk') {
    if (language === 'en') {
      return {
        title: 'Contact',
        subtitle: 'Have questions or need advice? Contact us and we will be happy to help you choose the right solutions for your bathroom.',
        formTitle: 'Write to Us',
        contactInfoTitle: 'Contact Information',
        servicesTitle: 'Our Services',
        contactDetails: {
          manager: 'Ing. Dušan Drinka, PhD.\nMgr. Juraj Stodolovský',
          phone: '+421 948 882 376',
          email: 'dusan.drinka@smartsanit.sk',
          address: 'Továrenská 14\n811 09 Bratislava'
        },
        services: [
          'Bathroom design and consulting',
          'Sanitary equipment supply',
          'Installation and assembly',
          'Service and maintenance',
          'Technical support'
        ]
      };
    }
    return {
      title: 'Kontakt',
      subtitle: 'Máte otázky alebo potrebujete poradenstvo? Kontaktujte nás a radi vám pomôžeme s výberom správnych riešení pre vašu kúpeľňu.',
      formTitle: 'Napíšte nám',
      contactInfoTitle: 'Kontaktné údaje',
      servicesTitle: 'Naše služby',
      contactDetails: {
        manager: 'Ing. Dušan Drinka, PhD.\nMgr. Juraj Stodolovský',
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
  async getInspirations(retryCount = 0) {
    if (!this.isSupabaseAvailable()) {
      console.log('Supabase not available');
      return { success: false, message: 'Database connection not available', source: 'no-supabase' };
    }

    try {
      console.log(`🔄 Loading inspirations from database... (attempt ${retryCount + 1})`);
      
      // Load with .limit() to reduce initial payload and avoid timeout
      // This helps when images are stored as base64 in database
      const { data, error } = await supabase
        .from('inspirations')
        .select('*')
        .order('created_at', { ascending: false})
        .limit(100); // Add limit to help with timeout issues
      
      if (error) {
        console.error('❌ Supabase error loading inspirations:', error);
        
        // Retry on timeout errors (up to 2 retries)
        if (error.message && error.message.includes('timeout') && retryCount < 2) {
          console.log(`⚠️ Timeout detected, retrying... (attempt ${retryCount + 2}/3)`);
          await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1s before retry
          return this.getInspirations(retryCount + 1);
        }
        
        return { success: false, message: `Database error: ${error.message}`, source: 'supabase-error' };
      }
      
      console.log(`✅ Loaded ${data?.length || 0} inspirations from database`);
      return { success: true, inspirations: data || [], source: 'supabase-database' };
    } catch (error) {
      console.error('❌ Error fetching inspirations:', error);
      
      // Retry on timeout
      if (error.message && error.message.includes('timeout') && retryCount < 2) {
        console.log(`⚠️ Timeout detected, retrying... (attempt ${retryCount + 2}/3)`);
        await new Promise(resolve => setTimeout(resolve, 1000));
        return this.getInspirations(retryCount + 1);
      }
      
      return { success: false, message: `Error loading inspirations: ${error.message}`, source: 'exception' };
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

  // Background Settings API methods
  async getBackgroundSettings() {
    try {
      if (!this.isSupabaseAvailable()) {
        // Return default settings if Supabase not available
        return {
          success: true,
          settings: {
            brandsPagePattern: true,
            patternOpacity: 0.05,
            patternSize: 20,
            patternType: 'tiles',
            homePageBackground: 'default',
            globalBackground: 'default',
            brandsPageBackgroundImage: null,
            backgroundImageOpacity: 0.3,
            backgroundImageBlur: 0
          }
        };
      }

      const { data, error } = await supabase
        .from('background_settings')
        .select('*')
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows found
        throw error;
      }

      const settings = data || {
        brandsPagePattern: true,
        patternOpacity: 0.05,
        patternSize: 20,
        patternType: 'tiles',
        homePageBackground: 'default',
        globalBackground: 'default',
        brandsPageBackgroundImage: null,
        backgroundImageOpacity: 0.3,
        backgroundImageBlur: 0
      };

      return {
        success: true,
        settings: settings
      };
    } catch (error) {
      console.error('❌ API: Error fetching background settings:', error);
      return {
        success: false,
        error: error.message,
        settings: {
          brandsPagePattern: true,
          patternOpacity: 0.05,
          patternSize: 20,
          patternType: 'tiles',
          homePageBackground: 'default',
          globalBackground: 'default',
          brandsPageBackgroundImage: null,
          backgroundImageOpacity: 0.3,
          backgroundImageBlur: 0
        }
      };
    }
  }

  async updateBackgroundSettings(settings) {
    try {
      console.log('💾 API: Updating background settings:', {
        hasEntranceImage: !!settings.entrancePageBackgroundImage,
        entranceImageLength: settings.entrancePageBackgroundImage?.length || 0,
        hasBrandsImage: !!settings.brandsPageBackgroundImage,
        allKeys: Object.keys(settings)
      });
      
      if (!this.isSupabaseAvailable()) {
        // Store in localStorage as fallback
        localStorage.setItem('backgroundSettings', JSON.stringify(settings));
        return { success: true };
      }

      const { data, error } = await supabase
        .from('background_settings')
        .upsert([{
          id: 1,
          ...settings,
          updated_at: new Date().toISOString()
        }])
        .select();

      if (error) throw error;

      console.log('✅ API: Background settings updated successfully');
      return { success: true, settings: data[0] };
    } catch (error) {
      console.error('Error updating background settings:', error);
      // Fallback to localStorage
      localStorage.setItem('backgroundSettings', JSON.stringify(settings));
      return { success: true };
    }
  }

  // Why Choose Us Section API Methods
  async getWhyChooseUs() {
    if (!this.isSupabaseAvailable()) {
      console.log('🚫 Supabase not available');
      return { success: false, data: null, source: 'no-supabase', message: 'Database connection not available' };
    }

    try {
      console.log('Fetching why-choose-us from Supabase...');
      const { data, error } = await supabase
        .from('why_choose_us')
        .select('*')
        .eq('active', true)
        .order('created_at', { ascending: false })
        .limit(1);
      
      if (error) {
        console.log('🚫 Supabase error:', error);
        return { success: false, data: null, source: 'supabase-error', message: error.message };
      }
      
      if (!data || data.length === 0) {
        console.log('📭 No why-choose-us data in database');
        return { success: true, data: null, source: 'empty-database' };
      }

      console.log('✅ Successfully loaded why-choose-us from Supabase database');
      return { success: true, data: data[0], source: 'supabase-database' };
    } catch (error) {
      console.log('Error fetching why-choose-us:', error);
      return { success: false, data: null, source: 'connection-error', message: error.message };
    }
  }

  async updateWhyChooseUs(id, updateData) {
    if (!this.isSupabaseAvailable()) {
      console.log('Supabase not available');
      return { success: false, message: 'Database connection not available' };
    }

    try {
      console.log('Updating why-choose-us in Supabase:', updateData);
      
      const { data, error } = await supabase
        .from('why_choose_us')
        .update({
          title: updateData.title,
          subtitle: updateData.subtitle || '',
          items: updateData.items,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select();

      if (error) {
        console.error('Supabase error updating why-choose-us:', error);
        return { 
          success: false, 
          message: `Database error: ${error.message}` 
        };
      }

      console.log('Why-choose-us updated successfully:', data[0]);
      return { success: true, data: data[0] };
    } catch (error) {
      console.error('Exception updating why-choose-us:', error);
      return { 
        success: false, 
        message: `Update failed: ${error.message}` 
      };
    }
  }

  async createWhyChooseUs(createData) {
    if (!this.isSupabaseAvailable()) {
      console.log('Supabase not available');
      return { success: false, message: 'Database connection not available' };
    }

    try {
      console.log('Creating why-choose-us in Supabase:', createData);
      
      const { data, error } = await supabase
        .from('why_choose_us')
        .insert([{
          title: createData.title,
          subtitle: createData.subtitle || '',
          items: createData.items,
          active: true,
          created_at: new Date().toISOString()
        }])
        .select();

      if (error) {
        console.error('Supabase error creating why-choose-us:', error);
        return { 
          success: false, 
          message: `Database error: ${error.message}` 
        };
      }

      console.log('Why-choose-us created successfully:', data[0]);
      return { success: true, data: data[0] };
    } catch (error) {
      console.error('Exception creating why-choose-us:', error);
      return { 
        success: false, 
        message: `Creation failed: ${error.message}` 
      };
    }
  }

  // =====================================================
  // BRANDS CRUD OPERATIONS
  // =====================================================

  async createBrand(brandData) {
    if (!this.isSupabaseAvailable()) {
      console.log('Supabase not available');
      return { success: false, message: 'Database connection not available' };
    }

    try {
      console.log('Creating brand in Supabase:', brandData);
      
      const { data, error } = await supabase
        .from('brands')
        .insert([{
          name: brandData.name,
          category: brandData.category,
          description: brandData.description,
          logo: brandData.logo,
          logo_size: brandData.logoSize || 'max-h-16',
          logo_filter: brandData.logoFilter || 'none',
          images: brandData.images || [],
          is_main: brandData.is_main !== false,
          order: brandData.order || 0,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }])
        .select();

      if (error) {
        console.error('Supabase error creating brand:', error);
        return { 
          success: false, 
          message: `Database error: ${error.message}` 
        };
      }

      console.log('Brand created successfully:', data[0]);
      return { success: true, brand: data[0] };
    } catch (error) {
      console.error('Exception creating brand:', error);
      return { 
        success: false, 
        message: `Creation failed: ${error.message}` 
      };
    }
  }

  async updateBrand(brandId, updateData) {
    if (!this.isSupabaseAvailable()) {
      console.log('Supabase not available');
      return { success: false, message: 'Database connection not available' };
    }

    try {
      console.log('Updating brand in Supabase:', brandId, updateData);
      
      const updatePayload = {
        ...updateData,
        updated_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('brands')
        .update(updatePayload)
        .eq('id', brandId)
        .select();

      if (error) {
        console.error('Supabase error updating brand:', error);
        return { 
          success: false, 
          message: `Database error: ${error.message}` 
        };
      }

      console.log('Brand updated successfully:', data[0]);
      return { success: true, brand: data[0] };
    } catch (error) {
      console.error('Exception updating brand:', error);
      return { 
        success: false, 
        message: `Update failed: ${error.message}` 
      };
    }
  }

  async deleteBrand(brandId) {
    if (!this.isSupabaseAvailable()) {
      console.log('Supabase not available');
      return { success: false, message: 'Database connection not available' };
    }

    try {
      console.log('Deleting brand from Supabase:', brandId);
      
      const { error } = await supabase
        .from('brands')
        .delete()
        .eq('id', brandId);

      if (error) {
        console.error('Supabase error deleting brand:', error);
        return { 
          success: false, 
          message: `Database error: ${error.message}` 
        };
      }

      console.log('Brand deleted successfully');
      return { success: true };
    } catch (error) {
      console.error('Exception deleting brand:', error);
      return { 
        success: false, 
        message: `Deletion failed: ${error.message}` 
      };
    }
  }

  async uploadBrandLogo(brandId, logoFile) {
    if (!this.isSupabaseAvailable()) {
      console.log('Supabase not available');
      return { success: false, message: 'Database connection not available' };
    }

    try {
      console.log('Uploading brand logo to Supabase:', brandId);
      
      // Convert file to data URL
      const logoDataUrl = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.readAsDataURL(logoFile);
      });

      // Update brand with new logo
      const { data, error } = await supabase
        .from('brands')
        .update({
          logo: logoDataUrl,
          updated_at: new Date().toISOString()
        })
        .eq('id', brandId)
        .select();

      if (error) {
        console.error('Supabase error uploading logo:', error);
        return { 
          success: false, 
          message: `Database error: ${error.message}` 
        };
      }

      console.log('Logo uploaded successfully');
      return { success: true, logoUrl: logoDataUrl, brand: data[0] };
    } catch (error) {
      console.error('Exception uploading logo:', error);
      return { 
        success: false, 
        message: `Upload failed: ${error.message}` 
      };
    }
  }

  // =====================================================
  // INSPIRATIONS CRUD OPERATIONS
  // =====================================================

  async uploadInspirationImage(file) {
    if (!this.isSupabaseAvailable()) {
      console.log('⚠️ Supabase not available, falling back to base64');
      // Fallback to base64 if Supabase Storage is not available
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve({ success: true, url: reader.result, isBase64: true });
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    }

    try {
      console.log('📤 Uploading inspiration image to Supabase Storage...');
      
      // Create unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `inspirations/${fileName}`;

      // Upload to Supabase Storage
      const { error } = await supabase.storage
        .from('inspiration-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        console.error('❌ Supabase Storage upload error:', error);
        
        // If bucket doesn't exist, fall back to base64
        if (error.message.includes('not found') || error.message.includes('does not exist')) {
          console.log('⚠️ Storage bucket not found, falling back to base64');
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve({ success: true, url: reader.result, isBase64: true });
            reader.onerror = reject;
            reader.readAsDataURL(file);
          });
        }
        
        return { success: false, message: error.message };
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('inspiration-images')
        .getPublicUrl(filePath);

      console.log('✅ Image uploaded successfully:', urlData.publicUrl);
      return { success: true, url: urlData.publicUrl, isBase64: false };
    } catch (error) {
      console.error('❌ Exception uploading image:', error);
      // Fallback to base64 on error
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve({ success: true, url: reader.result, isBase64: true });
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    }
  }

  async deleteInspirationImage(imageUrl) {
    if (!this.isSupabaseAvailable() || !imageUrl || imageUrl.startsWith('data:')) {
      // Can't delete base64 images or if Supabase not available
      return { success: true };
    }

    try {
      // Extract file path from URL
      const urlParts = imageUrl.split('/inspiration-images/');
      if (urlParts.length < 2) {
        return { success: true }; // Not a storage URL
      }
      
      const filePath = `inspirations/${urlParts[1]}`;
      
      const { error } = await supabase.storage
        .from('inspiration-images')
        .remove([filePath]);

      if (error) {
        console.error('⚠️ Error deleting image:', error);
        // Don't fail the operation if image deletion fails
        return { success: true };
      }

      console.log('✅ Image deleted from storage');
      return { success: true };
    } catch (error) {
      console.error('❌ Exception deleting image:', error);
      return { success: true }; // Don't fail the operation
    }
  }

  async createInspiration(inspirationData) {
    if (!this.isSupabaseAvailable()) {
      console.log('Supabase not available');
      return { success: false, message: 'Database connection not available' };
    }

    try {
      console.log('Creating inspiration in Supabase:', inspirationData);
      
      // Validate required fields
      if (!inspirationData.title || inspirationData.title.trim() === '') {
        return { success: false, message: 'Title is required' };
      }
      
      // Validate title length
      if (inspirationData.title.length > 255) {
        return { success: false, message: 'Title is too long (max 255 characters)' };
      }
      
      const insertData = {
        title: inspirationData.title.trim(),
        description: inspirationData.description?.trim() || '',
        category: inspirationData.category || 'modern',
        image: inspirationData.image || null,
        features: Array.isArray(inspirationData.features) ? inspirationData.features : [],
        brands: Array.isArray(inspirationData.brands) ? inspirationData.brands : [],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      console.log('📝 Inserting inspiration data:', insertData);
      
      const { data, error } = await supabase
        .from('inspirations')
        .insert([insertData])
        .select();

      if (error) {
        console.error('❌ Supabase error creating inspiration:', error);
        
        // Provide more specific error messages
        if (error.code === '23505') {
          return { success: false, message: 'Inspiration with this title already exists' };
        }
        if (error.code === '23502') {
          return { success: false, message: 'Missing required field' };
        }
        if (error.message.includes('value too long')) {
          return { success: false, message: 'One of the fields is too long' };
        }
        
        return { 
          success: false, 
          message: `Database error: ${error.message}` 
        };
      }

      console.log('✅ Inspiration created successfully:', data[0]);
      return { success: true, inspiration: data[0] };
    } catch (error) {
      console.error('❌ Exception creating inspiration:', error);
      return { 
        success: false, 
        message: `Creation failed: ${error.message}` 
      };
    }
  }

  async updateInspiration(inspirationId, updateData) {
    if (!this.isSupabaseAvailable()) {
      console.log('Supabase not available');
      return { success: false, message: 'Database connection not available' };
    }

    try {
      console.log('Updating inspiration in Supabase:', inspirationId, updateData);
      
      const updatePayload = {
        ...updateData,
        updated_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('inspirations')
        .update(updatePayload)
        .eq('id', inspirationId)
        .select();

      if (error) {
        console.error('Supabase error updating inspiration:', error);
        return { 
          success: false, 
          message: `Database error: ${error.message}` 
        };
      }

      console.log('Inspiration updated successfully:', data[0]);
      return { success: true, inspiration: data[0] };
    } catch (error) {
      console.error('Exception updating inspiration:', error);
      return { 
        success: false, 
        message: `Update failed: ${error.message}` 
      };
    }
  }

  async deleteInspiration(inspirationId) {
    if (!this.isSupabaseAvailable()) {
      console.log('Supabase not available');
      return { success: false, message: 'Database connection not available' };
    }

    try {
      console.log('Deleting inspiration from Supabase:', inspirationId);
      
      const { error } = await supabase
        .from('inspirations')
        .delete()
        .eq('id', inspirationId);

      if (error) {
        console.error('Supabase error deleting inspiration:', error);
        return { 
          success: false, 
          message: `Database error: ${error.message}` 
        };
      }

      console.log('Inspiration deleted successfully');
      return { success: true };
    } catch (error) {
      console.error('Exception deleting inspiration:', error);
      return { 
        success: false, 
        message: `Deletion failed: ${error.message}` 
      };
    }
  }

  // =====================================================
  // REFERENCES CRUD OPERATIONS
  // =====================================================

  async createReference(referenceData) {
    if (!this.isSupabaseAvailable()) {
      console.log('Supabase not available');
      return { success: false, message: 'Database connection not available' };
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
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }])
        .select();

      if (error) {
        console.error('Supabase error creating reference:', error);
        return { 
          success: false, 
          message: `Database error: ${error.message}` 
        };
      }

      console.log('Reference created successfully:', data[0]);
      return { success: true, reference: data[0] };
    } catch (error) {
      console.error('Exception creating reference:', error);
      return { 
        success: false, 
        message: `Creation failed: ${error.message}` 
      };
    }
  }

  async updateReference(referenceId, updateData) {
    if (!this.isSupabaseAvailable()) {
      console.log('Supabase not available');
      return { success: false, message: 'Database connection not available' };
    }

    try {
      console.log('Updating reference in Supabase:', referenceId, updateData);
      
      const updatePayload = {
        ...updateData,
        updated_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('references')
        .update(updatePayload)
        .eq('id', referenceId)
        .select();

      if (error) {
        console.error('Supabase error updating reference:', error);
        return { 
          success: false, 
          message: `Database error: ${error.message}` 
        };
      }

      console.log('Reference updated successfully:', data[0]);
      return { success: true, reference: data[0] };
    } catch (error) {
      console.error('Exception updating reference:', error);
      return { 
        success: false, 
        message: `Update failed: ${error.message}` 
      };
    }
  }

  async deleteReference(referenceId) {
    if (!this.isSupabaseAvailable()) {
      console.log('Supabase not available');
      return { success: false, message: 'Database connection not available' };
    }

    try {
      console.log('Deleting reference from Supabase:', referenceId);
      
      const { error } = await supabase
        .from('references')
        .delete()
        .eq('id', referenceId);

      if (error) {
        console.error('Supabase error deleting reference:', error);
        return { 
          success: false, 
          message: `Database error: ${error.message}` 
        };
      }

      console.log('Reference deleted successfully');
      return { success: true };
    } catch (error) {
      console.error('Exception deleting reference:', error);
      return { 
        success: false, 
        message: `Deletion failed: ${error.message}` 
      };
    }
  }

  // =====================================================
  // PAGE CONTENT MANAGEMENT
  // =====================================================

  async getPageContent(page, section, key, language = 'sk') {
    if (!this.isSupabaseAvailable()) {
      console.log('Supabase not available');
      return { success: false, message: 'Database connection not available' };
    }

    try {
      console.log(`🔄 Loading page content: ${page}.${section}.${key} (language: ${language})`);
      
      // Use RPC function to avoid PostgREST 'page' parameter conflict
      const { data, error } = await supabase
        .rpc('get_page_content', {
          p_page: page,
          p_section: section,
          p_key: key,
          p_language: language
        });

      if (error) {
        console.error('Supabase RPC error loading page content:', error);
        return { 
          success: false, 
          message: `Database error: ${error.message}` 
        };
      }

      if (!data || data.length === 0) {
        console.log(`ℹ️ No content found for ${page}.${section}.${key}`);
        return { success: false, message: 'Content not found' };
      }

      console.log(`✅ Loaded page content for ${page}.${section}.${key}`);
      return { success: true, content: data[0].content };
    } catch (error) {
      console.error('Exception loading page content:', error);
      return { 
        success: false, 
        message: `Loading failed: ${error.message}` 
      };
    }
  }

  async updatePageContent(page, section, key, content, language = 'sk') {
    if (!this.isSupabaseAvailable()) {
      console.log('Supabase not available');
      return { success: false, message: 'Database connection not available' };
    }

    try {
      console.log(`🔄 Updating page content: ${page}.${section}.${key} (language: ${language})`);
      
      // Use RPC function to avoid PostgREST 'page' parameter conflict
      const { data, error } = await supabase
        .rpc('update_page_content', {
          p_page: page,
          p_section: section,
          p_key: key,
          p_content: content,
          p_language: language
        });

      if (error) {
        console.error('Supabase RPC error updating page content:', error);
        return { 
          success: false, 
          message: `Database error: ${error.message}` 
        };
      }

      console.log(`✅ Updated page content for ${page}.${section}.${key}`);
      return { success: true, content: data && data.length > 0 ? data[0] : null };
    } catch (error) {
      console.error('Exception updating page content:', error);
      return { 
        success: false, 
        message: `Update failed: ${error.message}` 
      };
    }
  }
}

const apiService = new ApiService();
export default apiService;
