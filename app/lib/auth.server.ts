import { Authenticator } from "remix-auth";
import { sessionStorage } from "~/lib/session.server";

import { authenticate } from "ldap-authentication";
import { LdapStrategy } from "./LdapStrategy";
import { User } from "./types/User";

// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session
export let authenticator = new Authenticator<User>(sessionStorage);

// const baseDn = process.env.LDAP_BASE_DN
const url = process.env.LDAP_URL;
const useSsl = process.env.LDAP_URL_SSL;
const baseDnPrefix = process.env.LDAP_BASE_DN_PREFIX;
const userSearchBase = process.env.LDAP_BASE_DN_SEARCH_BASE;
const usernameAttribute = process.env.LDAP_USERNAME_ATTRIBUTE;
const attributes = process.env.LDAP_ATTRIBUTES?.toString().split(",") || [];

authenticator.use(
  new LdapStrategy(async ({ form, context }) => {
    console.log("💪", form.getAll("username"));
    console.log("⛅", {
      url,
      useSsl,
      baseDnPrefix,
      userSearchBase,
      usernameAttribute,
      attributes,
    });
    let user;
    try {
      user = await authenticate({
        ldapOpts: {
          url,
          tlsOptions: { rejectUnauthorized: useSsl === "true" ? true : false },
        },
        userDn: `${baseDnPrefix}\\${form.get("username")?.toString()}`,
        userPassword: form.get("password")?.toString(),
        userSearchBase,
        usernameAttribute,
        username: form.get("username")?.toString(),
        attributes,
        // attributes: ["samaccountname", "displayname", "mail", "thumbnailphoto"],
        // attributes: [],
        starttls: useSsl === "true" ? true : false,
        // ldapOpts: {
        //   url: "ldaps://local.lunet.se",
        //   tlsOptions: { rejectUnauthorized: false },
        // },
        // userDn: `LUNET\\${form.get("username")?.toString()}`,
        // userPassword: form.get("password")?.toString(),
        // userSearchBase: "ou=lunet,dc=local,dc=lunet,dc=se",
        // usernameAttribute: "sAMAccountName",
        // username: form.get("username")?.toString(),
        // attributes: [
        //   "cn",
        //   "telefohnNumber",
        //   "displayName",
        //   "memberOf",
        //   "sAMAccountName",
        //   "mail",
        // ],
        // // attributes: ["samaccountname", "displayname", "mail", "thumbnailphoto"],
        // // attributes: [],
        // starttls: false,
      });
    } catch (error) {
      console.error("👮", error);
    }
    console.log("🚀", user);

    return user;
  }),
  "ldap"
);

// Tell the Authenticator to use the form strategy
// authenticator.use(
//   new FormStrategy(async ({ form, context }) => {
//     // Here you can use `form` to access and input values from the form.
//     // and also use `context` to access more things from the server
//     let username = form.get("username"); // or email... etc
//     let password = form.get("password");

//     // You can validate the inputs however you want
//     invariant(typeof username === "string", "username must be a string");
//     invariant(username.length > 0, "username must not be empty");

//     invariant(typeof password === "string", "password must be a string");
//     invariant(password.length > 0, "password must not be empty");

//     // And if you have a password you should hash it
//     // let hashedPassword = await hash(password);

//     // And finally, you can find, or create, the user
//     // let user = await findOrCreateUser(username, hashedPassword);

//     // FAKE USER
//     let user: User = {
//       username: "Heini",
//       password: "1234",
//     };

//     // And return the user as the Authenticator expects it
//     return user;
//   }),
//   // each strategy has a name and can be changed to use another one
//   // same strategy multiple times, especially useful for the OAuth2 strategy.
//   "user-pass"
// );
