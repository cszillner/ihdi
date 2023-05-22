import { redirect } from "@remix-run/node";
import { getSupabaseServerClient } from "~/config/supabase";
import type { SigninWithEmailAndPassword } from "./types";

/**
 * Perform login with e-mail and password
 * @param param0 
 * @returns 
 */
export const signinWithEmailAndPassword = 
  async ({ credentials, req, res  }: SigninWithEmailAndPassword.Params): Promise<SigninWithEmailAndPassword.Return> => {
  const { supabase, response } = getSupabaseServerClient(req, res);

  const { email, password } = credentials

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return {
      response,
      result: {
        success: '',
        error: error.message
      }
    }
  }

  return {
    response,
    result: {
      success: 'Login successfully',
      error: ''
    }
  }
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
