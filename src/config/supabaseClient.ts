import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ldufhmwdeanyvzdvkovm.supabase.co'; // ضع رابط مشروع supabase الخاص بك هنا
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkdWZobXdkZWFueXZ6ZHZrb3ZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3OTE0NTEsImV4cCI6MjA2NjM2NzQ1MX0.chHrpF1_SwajD-BkgSYDQphiPCE2_Mo5IJpHLbwxxQQ'; // ضع anon key الخاص بك هنا

export const supabase = createClient(supabaseUrl, supabaseAnonKey); 