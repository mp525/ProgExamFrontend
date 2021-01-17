import React, { useState, useEffect } from "react";

const mainURL = "https://mparking.dk/ProgExamBackend/";
//const mainURL = "http://localhost:8080/jpareststarter";
const addSport = "/api/sport";
const allSports = "/api/sport/all";
const addTeam = "/api/sport/team";
const allTeams = "/api/sport/all/teams";
const editTeams = "/api/sport/team";
const delTeam = "/api/sport/team/";
const addPlayer = "/api/sport/player";
const allPlayers = "/api/sport/all/players";
const addPlayerToTeam = "/api/sport/team/addPlayer";

const userInfoEndpoint = "/api/info/user";
const adminInfoEndpoint = "/api/info/admin";
const defaultEndpoint = "/api/default";
const loginEndpoint = "/api/login";

export {
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
};
