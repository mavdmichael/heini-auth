import { Form, useLocation } from "@remix-run/react";

export const LoginForm = () => {
  const { pathname } = useLocation();
  return (
    <Form
      action={`/actions/login?path=${pathname}`}
      method="post"
      className="login-form"
    >
      <input type="hidden" name="pathname" value={pathname} />
      <label htmlFor="username">
        Användarnamn
        <input type="text" name="username" id="username" />
      </label>
      <label htmlFor="password">
        Lösenord
        <input type="password" name="password" id="password" />
      </label>
      <button type="submit">Logga in</button>
    </Form>
  );
};
