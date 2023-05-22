import { type V2_MetaFunction } from "@remix-run/node";
import type { LoaderArgs } from "@remix-run/node"
import { Link } from "@remix-run/react";
import { continueIfLoggedIn } from "~/config/supabase";

export async function loader({ request }: LoaderArgs) {
  await continueIfLoggedIn(request)

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
