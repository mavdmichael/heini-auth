import { ActionArgs } from "@remix-run/node";
import { authenticator } from "~/lib/auth.server";

export async function action({ request }: ActionArgs) {
  await authenticator.logout(request, { redirectTo: "/" });
}
