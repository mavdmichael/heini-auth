import { Form } from "@remix-run/react";

export const LoginForm = () => {
  return (
    <Form action="/actions/login" method="post" className="login-form">
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
