import type { LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { motion } from "framer-motion";
import { HiCheck } from "react-icons/hi";
import { Buttons } from "~/components/Buttons";
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
  const user = useLoaderData<typeof loader>();
  const memberOf = user?.memberOf ?? [];
  return (
    <div className="w-full py-40 flex justify-center items-center">
      <div>
        <motion.div initial={{ y: -100 }} animate={{ y: 0 }}>
          <h1 className="text-2xl font-thin mb-8">
            Whoop whoop, du är inloggad!
          </h1>
          <span className="font-medium">Dina grupper;</span>
          <ul>
            {memberOf.map((group) => {
              const name = group.split(",")[0].split("=")[1];
              return (
                <li
                  key={group}
                  className="flex flex-row space-x-2 my-1 items-center"
                >
                  <HiCheck size={24} />
                  <span>{name}</span>
                </li>
              );
            })}
          </ul>
          <div className="text-slate-400 text-xs uppercase mt-8">
            Du har tillgång till:
          </div>
          <Buttons memberOf={memberOf} />
        </motion.div>
      </div>
    </div>
  );
}
