import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://lckbwknxfmbjffjsmahs.supabase.co'
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxja2J3a254Zm1iamZmanNtYWhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2ODU5OTEsImV4cCI6MjA3NTI2MTk5MX0.NxHuviT07Wv2WfIHfHEHiLcMQiWWImK7VREF2pgZjJk'

// Create Supabase client with error handling
let supabase = null;
try {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
  console.log('Supabase client created successfully');
} catch (error) {
  console.warn('Supabase client creation failed:', error);
}

export { supabase }
