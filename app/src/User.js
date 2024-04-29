import React from "react";
import { Form, Navigate, useActionData, useLoaderData } from "react-router-dom";

export default function User() {
  const res = useActionData();

  if (res.status != 200) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <div> USER </div>
      <Form action="/logout">
        <button> Logout </button>{" "}
      </Form>
    </>
  );
}
