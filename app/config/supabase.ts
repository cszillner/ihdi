import { createServerClient, createBrowserClient } from '@supabase/auth-helpers-remix';

/**
 * Get Supabase Server Client 
 * @param request 
 * @param response 
 * @returns An object with supabase server client and response
 */
export const getSupabaseServerClient = (request: Request,  response?: Response) =>{
  const finalResponse = !response ? new Response() : response

  const supabase = createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    { request, response: finalResponse }
  );

  return { supabase, response: finalResponse }
}

/**
 * Get Supabase Browser Client
 * @param SUPABASE_URL 
 * @param SUPABASE_ANON_KEY 
 * @returns Supabase browser client 
 */
export const getSupabaseBrowserClient = (SUPABASE_URL: string, SUPABASE_ANON_KEY: string) => {
  return createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY)
}