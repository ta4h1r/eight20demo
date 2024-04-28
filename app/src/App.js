import {
  BrowserRouter as Router,
  useRoutes,
  Link,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { useState } from "react";

function NoMatch() {
  return (
    <div style={{ padding: 20 }}>
      <h2>404: Page Not Found</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adip.</p>
    </div>
  );
}

function User({ user }) {
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>User View</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adip.</p>
    </div>
  );
}

function Login({ onLogin }) {
  const [creds, setCreds] = useState({});
  const navigate = useNavigate();

  function handleLogin() {
    // For demonstration purposes only. Never use these checks in production!
    // Use a proper authentication implementation
    if (creds.username === "admin" && creds.password === "123") {
      onLogin && onLogin({ username: creds.username });
      navigate("/user");
    }
  }
  return (
    <div style={{ padding: 10 }}>
      <br />
      <span>Username:</span>
      <br />
      <input
        type="text"
        onChange={(e) => setCreds({ ...creds, username: e.target.value })}
      />
      <br />
      <span>Password:</span>
      <br />
      <input
        type="password"
        onChange={(e) => setCreds({ ...creds, password: e.target.value })}
      />
      <br />
      <br />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

function AppLayout() {
  const [user, setUser] = useState();
  const navigate = useNavigate();

  function logOut() {
    setUser(null);
    navigate("/login");
  }

  function Routes(user) {
    const element = useRoutes([
      { path: "/", element: <Login onLogin={setUser} /> },
      { path: "/login", element: <Login onLogin={setUser} /> },
      { path: "/user", element: <User user={user} /> },
      { path: "*", element: <NoMatch /> },
    ]);
    return element;
  }

  return (
    <>
      <nav style={{ margin: 10 }}>
        {!user && (
          <Link to="/login" style={{ padding: 5 }}>
            Login
          </Link>
        )}
        {user && (
          <span onClick={logOut} style={{ padding: 5, cursor: "pointer" }}>
            Logout
          </span>
        )}
      </nav>
      <Routes />
    </>
  );
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
