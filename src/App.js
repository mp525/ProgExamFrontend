import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
  useLocation,
  useParams,
  Prompt,
  useRouteMatch,
  useHistory,
} from "react-router-dom";
import Login from "./Login";
import facade from "./apiFacade";
import LoggedIn from "./LoggedIn";
import LoginForm from "./loginForm";
import User from "./User";
import Admin from "./Admin";
import FetchTeams from "./FetchTeams";
import FetchSports from "./FetchSports";

function App() {
  const [errorMes, setErrorMes] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  let history = useHistory();

  const logout = () => {
    facade.logout();
    setLoggedIn(false);
  };
  const login = (user, pass) => {
    facade
      .login(user, pass)

      .then((res) => setLoggedIn(true))
      .catch((err) => {
        err.fullError.then((err) => {
          setErrorMes(err.message);
        });
      });
  };

  return (
    <div>
      <Header loginMsg={loggedIn ? "Logout" : "Login"} loggedIn={loggedIn} />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/page1">
          <FetchSports />
        </Route>
        <Route path="/page2">
          <FetchTeams />
        </Route>
        <Route path="/page3">
          <User />
        </Route>
        <Route path="/page4">
          <Admin />
        </Route>
        <Route path="/login">
          {!loggedIn ? (
            <LoginForm
              errorMes={errorMes}
              setErrorMes={setErrorMes}
              login={login}
            />
          ) : (
            <div>
              <LoggedIn />
              <button onClick={logout}>Logout</button>
            </div>
          )}
        </Route>
        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
    </div>
  );
}

function Header({ loggedIn, loginMsg }) {
  return (
    <ul className="header">
      <li>
        <NavLink exact activeClassName="active" to="/">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" to="/page1">
          All Sports
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" to="/page2">
          All teams
        </NavLink>
      </li>
      {loggedIn && (
        <>
          <li>
            <NavLink activeClassName="active" to="/page3">
              User page
            </NavLink>
          </li>
          <li>
            <NavLink exact activeClassName="active" to="/page4">
              Admin page
            </NavLink>
          </li>
        </>
      )}
      <li>
        <NavLink exact activeClassName="active" to="/login">
          {loginMsg}
        </NavLink>
      </li>
    </ul>
  );
}

function NoMatch() {
  let location = useLocation();
  return (
    <h3>
      No match for <code>{location.pathname}</code>
    </h3>
  );
}

function Home() {
  return (
    <div align="center">
      <h1>Welcome to the sports team!</h1>
      <p>
        Use this site to register players, teams and new sports.
        View current sports we offer training in, and more!
      </p>
    </div>
  );
}

function Placeholder() {
  return <h3>TODO</h3>;
}

export default App;
