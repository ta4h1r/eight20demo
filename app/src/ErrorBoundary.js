import React from 'react'
import { useRouteError, isRouteErrorResponse } from 'react-router-dom';

export default function ErrorBoundary() {
    const error = useRouteError();
  
      // the response json is automatically parsed to
      // `error.data`, you also have access to the status
      return (
        <div>
          <h1>{error.status}</h1>
          <p>{error.data}</p>
        </div>
      );
  }