
import "./App.css";
import React, { useEffect, useState } from "react";
import facade from "./apiFacade";

function FetchTeams({isAdmin, setEditID}) {
    const [array, setArray] = useState([]);
    //const [isAdmin, setIsAdmin] = useState(false);
  
    useEffect(() => {
      facade.fetchAllTeams(setArray);
      //setIsAdmin(isAdminProp);
    }, []);
  
    const handleClick = (e)=>{
      e.preventDefault();
      setEditID(e.target.id);
    }
  
    return (
      <div align="center">
        <h3>All sport teams:</h3>
        <ul>
          {array.map((team) => {
            return <li key={team.id}>Team name: {team.teamName}, Sport name: {team.sportName}, Min/max age: [{team.minAge} - {team.maxAge}], 
            Price per year: {team.pricePerYear} {isAdmin && (<><a href="" id={team.id} onClick={handleClick}>edit</a> ID: {team.id}</>)}</li>;
          })}
        </ul>
      </div>
    );
  }

  export default FetchTeams;