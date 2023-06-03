import { LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Buttons } from "~/components/Buttons";
import { authenticator } from "~/lib/auth.server";

export async function loader({ request }: LoaderArgs) {
  return await authenticator.isAuthenticated(request);
}

function BeredskapPage() {
  const user = useLoaderData<typeof loader>();
  const memberOf = user?.memberOf ?? [];
  return (
    <div className="w-full py-40 flex justify-center items-center">
      <div className="flex flex-col space-y-4">
        <div className="text-2xl">Beredskapssidan</div>
        <Buttons memberOf={memberOf} />
      </div>
    </div>
  );
}

export default BeredskapPage;
