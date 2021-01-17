import "./App.css";
import React, { useEffect, useState } from "react";
import facade from "./apiFacade";

function User() {
    const [errorUser, setErrorUser] = useState("");
    const [dataFromServer, setDataFromServer] = useState("Error");
    const [team, setTeam] = useState({});
    const [players, setPlayers] = useState([]);
  
    useEffect(() => {
      facade
        .fetchDataUser()
        .then((data) => setDataFromServer(data.msg))
        .catch((err) => {
          err.fullError.then((err) => {
            setErrorUser(err.message);
          });
        });
    }, []);
  
    useEffect(() => {
      facade.fetchAllPlayers(setPlayers);
    }, []);
  
    const handleChangeTeam = (evt) => {
      setTeam({ ...team,[evt.target.id]: evt.target.value })
      console.log(team.pricePerYear + ", " + team.teamName + ", " + team.minAge + ", " + team.maxAge + ", " + team.sportName);
    }
  
    const handleSubmitTeam = (evt) => {
      evt.preventDefault();
      facade.addTeams(team);
    }
  
    return (
      <div align="center">
        <h3>{dataFromServer}</h3>
        <p>{errorUser}</p>
        <h3>Add a team:</h3>
        <div>
          <form onSubmit={handleSubmitTeam}>
            <input type="number" id="pricePerYear" placeholder="price per year" onChange={handleChangeTeam}/>
            <br/>
            <input type="text" id="teamName" placeholder="team name" onChange={handleChangeTeam}/>
            <br/>
            <input type="number" id="minAge" placeholder="min age" onChange={handleChangeTeam}/>
            <br/>
            <input type="number" id="maxAge" placeholder="max age" onChange={handleChangeTeam}/>
            <br/>
            <input type="text" id="sportName" placeholder="sport name" onChange={handleChangeTeam}/>
            <br/>
            <input type="submit" />
          </form>
        </div>
        <br/>
        <h3>All players and their teams:</h3>
        <div>
          <ul>
            {players.map(p=>{
              return <li>Name:{p.name}, Email: {p.email}, Phone: {p.phone}, Age: {p.age}, Teams by name: {p.teams.map(t=>{
                return <p>{t.teamName} </p>
              })}
              </li>
            })}
          </ul>
        </div>
      </div>
    );
  }

  export default User;