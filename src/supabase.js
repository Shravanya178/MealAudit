import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase Client safely
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://example.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'public-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function logAudit(query, persona, auditData) {
    try {
        // As a telemetry test, insert the audit payload into a 'audits' table if it exists.
        // It won't fail the app if the table isn't created yet or RLS blocks it.
        await supabase.from('audits').insert([
            { query, persona, result: auditData }
        ]);
    } catch (e) {
        console.warn("Supabase log failed:", e);
    }
}
