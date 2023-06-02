import { Authenticator } from "remix-auth";
import { sessionStorage } from "~/lib/session.server";
import { User } from "./types/User";

import { FormStrategy } from "remix-auth-form";
import invariant from "tiny-invariant";

// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session
export let authenticator = new Authenticator<User>(sessionStorage);

// Tell the Authenticator to use the form strategy
authenticator.use(
  new FormStrategy(async ({ form, context }) => {
    // Here you can use `form` to access and input values from the form.
    // and also use `context` to access more things from the server
    let username = form.get("username"); // or email... etc
    let password = form.get("password");

    // You can validate the inputs however you want
    invariant(typeof username === "string", "username must be a string");
    invariant(username.length > 0, "username must not be empty");

    invariant(typeof password === "string", "password must be a string");
    invariant(password.length > 0, "password must not be empty");

    // And if you have a password you should hash it
    // let hashedPassword = await hash(password);

    // And finally, you can find, or create, the user
    // let user = await findOrCreateUser(username, hashedPassword);

    // FAKE USER
    let user: User = {
      username: "Heini",
      password: "1234",
    };

    // And return the user as the Authenticator expects it
    return user;
  }),
  // each strategy has a name and can be changed to use another one
  // same strategy multiple times, especially useful for the OAuth2 strategy.
  "user-pass"
);
