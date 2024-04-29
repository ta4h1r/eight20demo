import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import User from "./User";
import axios from "axios";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

export default function App() {
  const [user, setUser] = React.useState(false);
  return (
    <Routes>
      <Route
        path="/login"
        element={<User user={user} />}
        action={async ({ request }) => {
          switch (request.method) {
            case "POST": {
              const formdata = await request.formData();
              const res = await client.post(`/api/login`, {
                username: "admin",
                password: "admin123",
                // username: formdata.get("username"),
                // password: formdata.get("password"),
              });
              setUser(true);
              return { res };
            }
            default: {
              throw new Response("", { status: 405 });
            }
          }
        }}
      />
      ,
      <Route
        path="/logout"
        element={<Login />}
        loader={async () => {
          const res = await client.post(`/api/logout`, {
            method: "post",
          });
          return { res };
        }}
      />
      ,
    </Routes>
  );
}
