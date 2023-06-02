import type { LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { motion } from "framer-motion";
import { authenticator } from "~/lib/auth.server";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader({ request }: LoaderArgs) {
  return await authenticator.isAuthenticated(request);
}

export default function Index() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div>
        <motion.div initial={{ y: -100 }} animate={{ y: 0 }}>
          <h1>Whoop whoop, du är inloggad!</h1>
          <ul>
            <li>
              <a
                target="_blank"
                href="https://remix.run/tutorials/blog"
                rel="noreferrer"
              >
                15m Quickstart Blog Tutorial
              </a>
            </li>
            <li>
              <a
                target="_blank"
                href="https://remix.run/tutorials/jokes"
                rel="noreferrer"
              >
                Deep Dive Jokes App Tutorial
              </a>
            </li>
            <li>
              <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
                Remix Docs
              </a>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
