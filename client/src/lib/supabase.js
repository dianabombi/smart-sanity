import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://lckbwknxfmbjffjsmahs.supabase.co'
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxja2J3a254Zm1iamZmanNtYWhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2ODU5OTEsImV4cCI6MjA3NTI2MTk5MX0.NxHuviT07Wv2WfIHfHEHiLcMQiWWImK7VREF2pgZjJk'

// Debug environment variables
console.log('🔍 SUPABASE CONFIG DEBUG:');
console.log('- REACT_APP_SUPABASE_URL env:', process.env.REACT_APP_SUPABASE_URL ? 'SET' : 'NOT SET');
console.log('- REACT_APP_SUPABASE_ANON_KEY env:', process.env.REACT_APP_SUPABASE_ANON_KEY ? 'SET' : 'NOT SET');
console.log('- NEXT_PUBLIC_SUPABASE_URL env:', process.env.NEXT_PUBLIC_SUPABASE_URL ? 'SET' : 'NOT SET');
console.log('- NEXT_PUBLIC_SUPABASE_ANON_KEY env:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'SET' : 'NOT SET');
console.log('- Using URL:', supabaseUrl);
console.log('- Using Key (first 20 chars):', supabaseAnonKey.substring(0, 20) + '...');

// Create Supabase client with error handling
let supabase = null;
try {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
  console.log('✅ Supabase client created successfully');
} catch (error) {
  console.error('❌ Supabase client creation failed:', error);
}

export { supabase }
