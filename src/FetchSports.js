
import "./App.css";
import React, { useEffect, useState } from "react";

import facade from "./apiFacade";

function FetchSports() {
    const [array, setArray] = useState([]);
  
    useEffect(() => {
      facade.fetchAllSports(setArray);
    }, []);
  
    return (
      <div align="center">
        <h3>All sports we offer:</h3>
        <ul>
          {array.map((sport) => {
            return <li>Name: {sport.name}, Description: {sport.description}</li>;
          })}
        </ul>
      </div>
    );
  }

  export default FetchSports;