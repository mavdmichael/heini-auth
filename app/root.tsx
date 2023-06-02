import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction, LoaderArgs } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";

import stylesheet from "~/styles/tailwind.css";
import { LoginForm } from "./components/LoginForm";
import { authenticator } from "./lib/auth.server";

export const links: LinksFunction = () => [
  ...(cssBundleHref
    ? [{ rel: "stylesheet", href: cssBundleHref }]
    : [{ rel: "stylesheet", href: stylesheet }]),
];

export async function loader({ request }: LoaderArgs) {
  return await authenticator.isAuthenticated(request);
}

export default function App() {
  const user = useLoaderData<typeof loader>();
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <pre className="p-4 bg-slate-400">
          USER DATA:
          <br />
          {JSON.stringify(user, null, 2)}
        </pre>

        {!!user ? (
          <Outlet />
        ) : (
          <div className="w-full h-screen flex items-center justify-center">
            <LoginForm />
          </div>
        )}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
