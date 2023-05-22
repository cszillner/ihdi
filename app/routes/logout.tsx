import { useEffect, useRef } from "react"
import { json, redirect } from "@remix-run/node"
import { Form, useLoaderData } from "@remix-run/react"
import { getSupabaseBrowserClient } from "~/config/supabase"

export const loader = () => {
  const env = {
    SUPABASE_URL: process.env.SUPABASE_URL!,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY!,
  }
  return json({ env })
}

export async function action() {
  return redirect('/login');
};

export default function () {
  const { env } = useLoaderData<typeof loader>()
  const formRef = useRef<HTMLFormElement | null>(null)

  useEffect(() => {
    const logout = async () => {
      const supabase = getSupabaseBrowserClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY)
      await supabase.auth.signOut()
      formRef.current?.submit()
    }
    logout()
  }, [env.SUPABASE_ANON_KEY, env.SUPABASE_URL])

  return (
    <Form method="POST" ref={formRef}>
      <h1>Signing out...</h1>
    </Form>
  )
}