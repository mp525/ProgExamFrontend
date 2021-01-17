import {
  mainURL,
  userInfoEndpoint,
  adminInfoEndpoint,
  defaultEndpoint,
  loginEndpoint,
  addSport,
  allSports,
  addTeam,
  allTeams,
  editTeams,
  delTeam,
  addPlayer,
  allPlayers,
  addPlayerToTeam
} from "./settings";

function handleHttpErrors(res) {
  if (!res.ok) {
    return Promise.reject({ status: res.status, fullError: res.json() });
  }
  return res.json();
}

function apiFacade() {

  const setToken = (token) => {
    localStorage.setItem("jwtToken", token);
  };
  const getToken = () => {
    return localStorage.getItem("jwtToken");
  };
  const loggedIn = () => {
    const loggedIn = getToken() != null;
    return loggedIn;
  };
  const logout = () => {
    localStorage.removeItem("jwtToken");
  };

  const login = (user, password) => {
    const options = makeOptions("POST", true, {
      username: user,
      password: password,
    });
    return fetch(mainURL + loginEndpoint, options)
      .then(handleHttpErrors)
      .then((res) => {
        setToken(res.token);
      });
  };
  const fetchDataUser = () => {
    const options = makeOptions("GET", true); //True add's the token
    return fetch(mainURL + userInfoEndpoint, options).then(handleHttpErrors);
  };
  const fetchDataAdmin = () => {
    const options = makeOptions("GET", true); //True add's the token
    return fetch(mainURL + adminInfoEndpoint, options).then(handleHttpErrors);
  };

  const fetchDefault = (callback) => {
    const options = makeOptions("GET");
    return fetch(mainURL + defaultEndpoint, options)
      .then(handleHttpErrors)
      .then((data) => {
        callback(data);
      });
  };

  const fetchAllSports = (callback) => {
    const options = makeOptions("GET");
    return fetch(mainURL + allSports, options)
      .then(handleHttpErrors)
      .then((data) => {
        callback(data);
      });
  };

  const fetchAllTeams = (callback) => {
    const options = makeOptions("GET");
    return fetch(mainURL + allTeams, options)
      .then(handleHttpErrors)
      .then((data) => {
        callback(data);
      });
  };

  const fetchAllPlayers = (callback) => {
    const options = makeOptions("GET");
    return fetch(mainURL + allPlayers, options)
      .then(handleHttpErrors)
      .then((data) => {
        callback(data);
      });
  };

  const addSports = (dto) => {
    const options = makeOptions("POST", true, dto);
    return fetch(mainURL + addSport, options).then(handleHttpErrors);
  };
  const addTeams = (dto) =>{
    const options = makeOptions("POST", true, dto);
    return fetch(mainURL + addTeam, options).then(handleHttpErrors);
  }

  const addToTeam = (dto) =>{
    const options = makeOptions("POST", true, dto);
    return fetch(mainURL + addPlayerToTeam, options).then(handleHttpErrors);
  }

  const editTeam = (dto) => {
    const options = makeOptions("PUT", true, dto);
    return fetch(mainURL + editTeams, options).then(handleHttpErrors);
  }

  const deleteTeam = (id) => {
    const options = makeOptions("DELETE", true);
    const delURL = delTeam + id;
    return fetch(mainURL + delURL, options).then(handleHttpErrors);
  }

  const addPlayers = (dto) => {
    const options = makeOptions("POST", true, dto);
    return fetch(mainURL + addPlayer, options).then(handleHttpErrors);
  };

  const makeOptions = (method, addToken, body) => {
    var opts = {
      method: method,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    };
    if (addToken && loggedIn()) {
      opts.headers["x-access-token"] = getToken();
    }
    if (body) {
      opts.body = JSON.stringify(body);
    }
    return opts;
  };
  return {
    makeOptions,
    setToken,
    getToken,
    loggedIn,
    login,
    logout,
    fetchDataUser,
    fetchDataAdmin,
    fetchDefault,
    addSports,
    fetchAllSports,
    addTeams,
    fetchAllTeams,
    editTeam,
    deleteTeam,
    addPlayers,
    fetchAllPlayers,
    addToTeam
  };
}
const facade = apiFacade();
export default facade;
