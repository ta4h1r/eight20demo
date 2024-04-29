import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Login from "./Login";
import User from "./User";
import axios from "axios";
import ErrorBoundary from "./ErrorBoundary";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/" element={<Login />} />,
    <Route
      path="/login"
      element={<User />}
      errorElement={<ErrorBoundary/>}
      action={async ({ request }) => {
        switch (request.method) {
          case "POST":
            {
              const formdata = await request.formData();
              try {
                // Auth
                let res = await client.post(`/api/login`, {
                  username: formdata.get("username"),
                  password: formdata.get("password"),
                });

                // TODO: I struggled with Session tokens for these two
                // requests
                
                // Hopefully the logic is clear: 
                
                // We request the logged in user
                // res = await client.get(`/api/user`);

                // Then use his id to fetch his associated pokemon 
                // res = await client.get(`/api/user/${res.id}`);
                
                // so `res.fav_pokemon` should be available in the <User/>
                // component.  
                return res;
              } catch (e) {
                console.log(e)
                  throw new Response(JSON.stringify(e.message, null, 2), { status: e.response.status });
              }
            }
          default: {
            throw new Response("", { status: 405 });
          }
        }
      }}
    />,
    <Route
      path="/logout"
      element={<Login />}
      loader={async () => {
        const res = await client.post(`/api/logout`, {
          method: "post",
        });
        return { res };
      }}
    />,
  ])
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
