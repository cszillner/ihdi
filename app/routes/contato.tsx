import { type LoaderArgs } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { continueIfLoggedIn } from "~/config/supabase";

export async function loader({ request }: LoaderArgs) {
  await continueIfLoggedIn(request)

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