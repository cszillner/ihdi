import { redirect, type LoaderArgs } from "@remix-run/node";
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

export default function () {
  return (
    <div>
      <h1>
        Contato
      </h1>
      <ul className="mt-6">
        <li>
          <Link to="/" className="text-blue-500 hover:underline">Home</Link>
        </li>
        <li>
          <Link to="/logout" className="text-blue-500 hover:underline">Logout</Link>
        </li>
      </ul>
    </div>
  );
}