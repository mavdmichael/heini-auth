import { Form, Link } from "@remix-run/react";
import { FC } from "react";
import { ldapGate } from "~/lib/utils/ldapGate";

interface Props {
  memberOf: string[];
}

export const Buttons: FC<Props> = ({ memberOf }) => {
  return (
    <div className="flex flex-row space-x-4 items-center">
      {ldapGate("SSLVPN_CONSULT_F77", memberOf) ? (
        <Link to="/ssl" className="btn">
          SSL
        </Link>
      ) : (
        <span className="text-red-400">SSL</span>
      )}
      {ldapGate("WEB-DEV_WORDPRESS_ADMINISTRATOR", memberOf) ? (
        <Link to="/ssl" className="btn">
          Wordpress
        </Link>
      ) : (
        <span className="text-red-400">Wordpress</span>
      )}
      {ldapGate("LUNET_BEREDSKAP", memberOf) ? (
        <Link to="/ssl" className="btn">
          Beredskap
        </Link>
      ) : (
        <span className="text-red-400">Beredskap</span>
      )}
      <Form method="post" action="/actions/logout">
        <button type="submit">Logga ut</button>
      </Form>
    </div>
  );
};
