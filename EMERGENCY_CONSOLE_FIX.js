// 🚨 EMERGENCY DATABASE FIX FOR CLIENT MEETING
// Copy and paste this ENTIRE code into your browser console on the Brands page

console.log('🚨 EMERGENCY: Starting database fix...');

// Create the brands table directly via Supabase client
async function emergencyCreateBrandsTable() {
  try {
    // Get the Supabase client from the window (if available)
    const supabase = window.supabase || (await import('/node_modules/@supabase/supabase-js/dist/main.js')).createClient(
      'https://lckbwknxfmbjffjsmahs.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxja2J3a254Zm1iamZmanNtYWhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2ODU5OTEsImV4cCI6MjA3NTI2MTk5MX0.NxHuviT07Wv2WfIHfHEHiLcMQiWWImK7VREF2pgZjJk'
    );

    console.log('✅ EMERGENCY: Supabase client ready');

    // Create table SQL
    const createTableSQL = `
      CREATE TABLE IF NOT EXISTS brands (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL UNIQUE,
        description TEXT,
        category VARCHAR(100),
        logo TEXT,
        website VARCHAR(255),
        "order" INTEGER DEFAULT 0,
        images JSONB DEFAULT '[]'::jsonb,
        is_main BOOLEAN DEFAULT true,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
      
      ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
      CREATE POLICY IF NOT EXISTS "Allow all access to brands" ON brands FOR ALL USING (true);
    `;

    // Try to execute SQL
    const { error: sqlError } = await supabase.rpc('exec_sql', { sql: createTableSQL });
    
    if (sqlError) {
      console.log('⚠️ EMERGENCY: SQL execution failed, trying manual insert...');
    } else {
      console.log('✅ EMERGENCY: Table created successfully');
    }

    // Insert brand data manually
    const brandData = [
      {
        name: 'Agape',
        description: 'Prémiový taliansky dodávateľ kúpeľňových batérií, sanity, nábytku a kúpeľňových doplnkov',
        category: 'Kúpeľňový nábytok',
        logo: '/logoWhite.svg',
        order: 1,
        images: []
      },
      {
        name: 'Fantini',
        description: 'Prémiový taliansky výrobca kúpeľňových a kuchynských batérií a doplnkov',
        category: 'Batérie a sprchy',
        logo: '/fantini.png',
        order: 2,
        images: []
      },
      {
        name: 'Cielo',
        description: 'Prémiový taliansky výrobca kúpeľňovej sanity, nábytku a kúpeľňových doplnkov',
        category: 'Sanitárna keramika',
        logo: '/logo_cielo_white.png',
        order: 3,
        images: []
      }
      // Add more brands as needed...
    ];

    const { data, error } = await supabase
      .from('brands')
      .insert(brandData)
      .select();

    if (error) {
      console.error('🚨 EMERGENCY: Insert failed:', error);
      return false;
    }

    console.log('✅ EMERGENCY: Brands inserted successfully:', data.length, 'brands');
    return true;

  } catch (error) {
    console.error('🚨 EMERGENCY: Critical error:', error);
    return false;
  }
}

// Execute the emergency fix
emergencyCreateBrandsTable().then(success => {
  if (success) {
    console.log('🎉 EMERGENCY FIX COMPLETE! Refresh the page now.');
    // Auto-refresh the page
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  } else {
    console.log('❌ EMERGENCY FIX FAILED. Try manual SQL script in Supabase dashboard.');
  }
});
