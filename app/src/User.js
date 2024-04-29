import React from "react";
import { Form, Navigate } from "react-router-dom";

export default function User({ user }) {
  if (!user) {
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
