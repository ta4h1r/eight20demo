import { Form } from "react-router-dom";

export default function Login() {
  return (
    <Form method="post" action="/login">
      <div style={{ padding: 10 }}>
        <br />
        <span>Username:</span>
        <br />
        <input type="text" name="username" />
        <br />
        <span>Password:</span>
        <br />
        <input type="password" name="password" />
        <br />
        <br />
        <button type="submit">Login</button>
      </div>
    </Form>
  );
}
