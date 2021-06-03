import React, { useState } from "react"
import { destorySeat, updateStatus } from "../utils/api";

export default function ListTables({ table }){
  const [popup, setPopup] = useState(false);

  function handleClick(e){
    e.preventDefault();
    const abortController = new AbortController();
    destorySeat(table["table_id"], abortController.signal)
      .catch(console.log);
    updateStatus(table["reservation_id"], { status: "finished" }, abortController.signal)
      .catch(console.log);
    setPopup(false);
    return () => abortController.abort();
  };

  /*
  Need to make it so when popup is clicked 
  it reloads the table to ensure it is updated 
  to most recent version.
  I think adding a new useState paired with a useEffect 
  for the sole purpose of a page refresh is a good idea
  */


  return (
    <li id={table["table_id"]} className="container-table">
      {table["table_name"]} / Capacity: {table["capacity"]}
      {table["reservation_id"] ? <div><p>Occupied</p><button data-table-id-finish={table["table_id"]} onClick={()=> setPopup(!popup)}>Finish</button></div>
       : <p>Free</p>}
       {popup ? <div><p>Is this table ready to seat new guests? This cannot be undone.</p><button onClick={handleClick}>Ok</button><button onClick={()=>setPopup(!popup)}>Cancel</button></div> : <></>}
    </li>
  );
};