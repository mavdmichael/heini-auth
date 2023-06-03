// await authenticate({
//   ldapOpts: { url: "ldap://ldap.forumsys.com" },
//   userDn: "uid=gauss,dc=example,dc=com",
//   userPassword: "password",
//   userSearchBase: "dc=example,dc=com",
//   usernameAttribute: "uid",
//   username: "gauss",
//   attributes: ["dn", "sn", "cn"],
// });

import { AppLoadContext, SessionStorage } from "@remix-run/node";
import { AuthenticateOptions, Strategy } from "remix-auth";

export interface LdapStrategyVerifyParams {
  form: FormData;
  context?: AppLoadContext;
}

export interface LdapStrategyOptions {
  url: string;
  useSsl: boolean;
  baseDnPrefix?: string;
  baseDn?: string;
  searchBase: string;
  usernameAttribute: string;
  attributes: string[];
}

export class LdapStrategy<User> extends Strategy<
  User,
  LdapStrategyVerifyParams
> {
  name = "ldap";

  async authenticate(
    request: Request,
    sessionStorage: SessionStorage,
    options: AuthenticateOptions
  ): Promise<User> {
    let form = await this.readFormData(request, options);

    try {
      let user = await this.verify({ form, context: options.context });

      return this.success(user, request, sessionStorage, options);
    } catch (error) {
      if (error instanceof Error) {
        return await this.failure(
          error.message,
          request,
          sessionStorage,
          options,
          error
        );
      }

      if (typeof error === "string") {
        return await this.failure(
          error,
          request,
          sessionStorage,
          options,
          new Error(error)
        );
      }

      return await this.failure(
        "An error occurred",
        request,
        sessionStorage,
        options,
        new Error(JSON.stringify(error, null, 2))
      );
    }
  }

  private async readFormData(request: Request, options: AuthenticateOptions) {
    if (options.context?.formData instanceof FormData) {
      return options.context.formData;
    }
    return await request.formData();
  }
}
