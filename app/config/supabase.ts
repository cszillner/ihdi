import { createServerClient, createBrowserClient } from '@supabase/auth-helpers-remix';
import { redirect } from "@remix-run/node"

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

/**
 * Continue navigation to requested route if session is present
 * @param req 
 * @param res 
 * @returns Redirect to "login" page is has no session 
 *          or return an object that contains Supabase Client, 
 *          Session and Response if has session
 */
export const continueIfLoggedIn = async (req: Request, res?: Response) => {
  const { supabase, response } = getSupabaseServerClient(req, res);

  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session) {
    throw redirect('/login');
  }

  return { supabase, session, response }

}

/**
 * Redirect to logged area is session is present
 * @param req 
 * @param res 
 * @returns Redirect to root logged route if has a session 
 *          or return an object that contains Supabase Client
 *          and Response if has no session
 */
export const redirectToLoggedArea = async (req: Request, res?: Response) => {
  const { supabase, response } = getSupabaseServerClient(req, res);

  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (session) {
    throw redirect('/');
  }

  return { supabase, response }
}