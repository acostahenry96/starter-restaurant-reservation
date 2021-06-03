import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { listReservations } from "../utils/api";
import { previous, next } from "../utils/date-time";
import { listTables } from "../utils/api"
import ErrorAlert from "../layout/ErrorAlert";
import ListDashboard from "./ListDashboard";
import ListTables from "./ListTables";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const history = useHistory();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const setDate = searchParams.get('date');

  const [reservations, setReservations] = useState([]);
  const [tables, setTables] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(setDate || date);

  useEffect(loadDashboard, [selectedDate]);
  useEffect(loadTables, []);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ selectedDate }, abortController.signal)
      .then((response) => setReservations(response))
      .catch(setReservationsError);
    return () => abortController.abort();
  };

  function loadTables(){
    const abortController = new AbortController();
    listTables(abortController.signal)
      .then((response) => setTables(response))
      .catch(console.log);
    return () => abortController.abort();
  };

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      <div >
        <ul className="dashboard-reservations">
        {reservations.map((reservation) => 
        <ListDashboard reservation={reservation} />
        )}
        </ul>
      </div>
      <div className="dashboard-dates">
        <button className="dashboard-date-button" onClick={()=>{
          history.push(`/dashboard?date=${previous(selectedDate)}`)
          return setSelectedDate(previous(selectedDate))
        }}>Previous</button>       
        <button className="dashboard-date-button" onClick={()=>{
          history.push("/dashboard") 
          return setSelectedDate(date)
        }}>Today</button>
        <button className="dashboard-date-button" onClick={()=>{
          history.push(`/dashboard?date=${next(selectedDate)}`)
          return setSelectedDate(next(selectedDate))  
        }}>Next</button>
      </div>
      <ul className="dashboard-tables">
       {tables.map((table) =><ListTables table={table}  /> )}
      </ul>
    </main>
  );
}

export default Dashboard;
