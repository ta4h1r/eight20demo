import React from "react";
import { Form, Navigate, useActionData, useLoaderData } from "react-router-dom";

import client from "./index";

export default function User() {
  const res = useActionData();

  if (!res || res.status != 200) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <h2> USER </h2>
      <Form action="/logout">
        <p></p>
        <button> Logout </button>{" "}
      </Form>
    </>
  );
}
