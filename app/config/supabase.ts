import { createServerClient as _createServerClient, createBrowserClient as _createBrowserClient } from '@supabase/auth-helpers-remix';

/**
 * 
 * @param param0 
 * @returns 
 */
export const createServerClient = ({
  request,
  response
}: {
  request: Request;
  response: Response;
}) =>
  _createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    { request, response }
  );

/**
 * 
 * @param SUPABASE_URL 
 * @param SUPABASE_ANON_KEY 
 * @returns 
 */
export const createBrowserClient = (SUPABASE_URL: string, SUPABASE_ANON_KEY: string) => {
  return _createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY)
}