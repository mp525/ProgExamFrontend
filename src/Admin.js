
import "./App.css";
import React, { useEffect, useState } from "react";
import facade from "./apiFacade";
import FetchTeams from "./FetchTeams";

function Admin() {
    const [errorAdmin, setErrorAdmin] = useState("");
    const [dataFromServer, setDataFromServer] = useState("Error!");
    const [sport, setSport] = useState({});
    const [team, setTeam] = useState({});
    const [editTeam, setEditTeam] = useState({});
    const [editID, setEditID] = useState();
    //const [id, setID] = useState(0);
    const [delID, setDelID] = useState(0);
    const [player, setPlayer] = useState({});
    const [playerToTeam, setPlayerToTeam] = useState({});
  
    useEffect(() => {
      facade
        .fetchDataAdmin()
        .then((data) => setDataFromServer(data.msg))
        .catch((err) => {
          err.fullError.then((err) => {
            setErrorAdmin(err.message);
          });
        });
    }, []);
  
    useEffect(() => {
      
    }, [errorAdmin]);
  
  
  
    const handleChangeSport = (evt) => {
      setSport({ ...sport,[evt.target.id]: evt.target.value })
      console.log("Name: " + sport.name + " , Desc: " + sport.description);
    }
  
    const handleSubmitSport = (evt) => {
      evt.preventDefault();
      facade.addSports(sport, setErrorAdmin);
    }
  
    const handleChangeTeam = (evt) => {
      setTeam({ ...team,[evt.target.id]: evt.target.value })
      console.log(team.pricePerYear + ", " + team.teamName + ", " + team.minAge + ", " + team.maxAge + ", " + team.sportName);
    }
  
    const handleSubmitTeam = (evt) => {
      evt.preventDefault();
      facade.addTeams(team);
    }
  
    const handleChangeEditTeam = (evt) => {
      setEditTeam({ ...editTeam,[evt.target.id]: evt.target.value })
      console.log(editTeam.pricePerYear + ", " + editTeam.teamName + ", " + editTeam.minAge + ", " + editTeam.maxAge + ", " + editTeam.sportName + "," + editTeam.id);
    }
  
    const handleSubmitEditTeam = (evt) => {
      evt.preventDefault();
      //setEditTeam({ ...editTeam, [id]: editID})
      facade.editTeam(editTeam);
    }
    const handleChangeDel = (evt) => {
      setDelID(evt.target.value);
    }
    const deleteTeam = (evt) => {
      evt.preventDefault();
      facade.deleteTeam(delID);
    }
  
    const changePlayer = (evt) => {
      setPlayer({ ...player,[evt.target.id]: evt.target.value })
    }
  
    const submitPlayer = (evt) => {
      evt.preventDefault();
      facade.addPlayers(player);
    }
  
    const changePlayerToTeam = (evt) => {
      setPlayerToTeam({ ...playerToTeam,[evt.target.id]: evt.target.value })
    }
    const submitToTeam = (evt) => {
      evt.preventDefault();
      facade.addToTeam(playerToTeam);
    }
  
    return (
      <div align="center">
        <h3>{dataFromServer}</h3>
        <p>{errorAdmin}</p>
  
        <h3>Add a sport:</h3>
        <div>
          <form onSubmit={handleSubmitSport}>
            <input type="text" id="name" placeholder="sportname" onChange={handleChangeSport}/>
            <br/>
            <input type="text" id="description" placeholder="sportdescription" onChange={handleChangeSport}/>
            <br/>
            <input type="submit" />
          </form>
        </div>
        <br/>
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
        <br/>
        <FetchTeams isAdmin={true} setEditID={setEditID}/>
        <h3>Edit a team:</h3>
        <div>
          <form onSubmit={handleSubmitEditTeam}>
            <input type="number" id="id" placeholder="ID" onChange={handleChangeEditTeam}/* value={editID} *//>
            <br/>
            <input type="number" id="pricePerYear" placeholder="price per year" onChange={handleChangeEditTeam}/>
            <br/>
            <input type="text" id="teamName" placeholder="team name" onChange={handleChangeEditTeam}/>
            <br/>
            <input type="number" id="minAge" placeholder="min age" onChange={handleChangeEditTeam}/>
            <br/>
            <input type="number" id="maxAge" placeholder="max age" onChange={handleChangeEditTeam}/>
            <br/>
            <input type="text" id="sportName" placeholder="sport name" onChange={handleChangeEditTeam}/>
            <br/>
            <input type="submit" />
          </form>
        </div>
        <br/>
        <h3>Delete team:</h3>
        <div>
          <form onSubmit={deleteTeam}>
          <input type="number" placeholder="ID" onChange={handleChangeDel}/>
          <input type="submit" />
          </form>
        </div>
        <br/>
        <h3>Add a player:</h3>
        <div>
          <form onSubmit={submitPlayer}>
            <input type="text" id="name" placeholder="name" onChange={changePlayer}/>
            <br/>
            <input type="text" id="email" placeholder="email" onChange={changePlayer}/>
            <br/>
            <input type="number" id="phone" placeholder="phone" onChange={changePlayer}/>
            <br/>
            <input type="number" id="age" placeholder="age" onChange={changePlayer}/>
            <br/>
            <input type="text" id="teamName" placeholder="teamName" onChange={changePlayer}/>
            <br/>
            <input type="submit" />
          </form>
        </div>
        <br/>
        <h3>Add a player to a team:</h3>
        <div>
          <form onSubmit={submitToTeam}>
            <input type="text" id="email" placeholder="email" onChange={changePlayerToTeam}/>
            <br/>
            <input type="text" id="teamName" placeholder="teamName" onChange={changePlayerToTeam}/>
            <br/>
            <input type="submit" />
          </form>
        </div>
        <br/>
        <br/>
        <br/>
        <br/>
      </div>
    );
  }

  export default Admin;