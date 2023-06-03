// Second, we need to export an action function, here we will use the

import { ActionArgs } from "@remix-run/node";
import { authenticator } from "~/lib/auth.server";

// `authenticator.authenticate method`
export async function action({ request }: ActionArgs) {
  const url = new URL(request.url);
  const path = url.searchParams.get("path");
  // we call the method with the name of the strategy we want to use and the
  // request object, optionally we pass an object with the URLs we want the user
  // to be redirected to after a success or a failure
  const res = await authenticator.authenticate("ldap", request, {
    successRedirect: path || "/",
    failureRedirect: "/",
  });

  return res;
}
