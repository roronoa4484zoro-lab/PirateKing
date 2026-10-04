import { createClient } from '@supabase/supabase-js'

// These will be replaced by environment variables in a real deployment
// For now, I'm creating the structure. The user will need to provide these or
// I can guide them to create a free project at supabase.com
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
