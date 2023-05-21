import { type V2_MetaFunction, redirect } from "@remix-run/node";
import type { LoaderArgs } from "@remix-run/node"
import { Link } from "@remix-run/react";
import { createServerClient } from "~/config/supabase";

export async function loader({ request }: LoaderArgs) {
  const response = new Response();
  const supabase = createServerClient({ request, response });
  
  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session) {
    return redirect('/login', {
      headers: response.headers
    });
  }

  return null
};

export const meta: V2_MetaFunction = () => {
  return [{ title: "New Remix App" }];
};

export default function Index() {
  
  return (
    <div>
      <h1>IHDI</h1>
      <ul className="mt-6">
        <li>
          <Link to="/contato" className="text-blue-500 hover:underline">Contato</Link>
        </li>
        <li>
          <Link to="/logout" className="text-blue-500 hover:underline">Logout</Link>
        </li>
      </ul>
    </div>
  );
}
