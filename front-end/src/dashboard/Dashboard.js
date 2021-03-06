import './Dashboard.css';
import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import { previous, next, today } from "../utils/date-time";
import useQuery from "../utils/useQuery";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationDetail from "./ReservationDetail";
import TableDetail from "./TableDetail";

export default function Dashboard() {
  const date = today();

  const [reservations, setReservations] = useState(null);
  const [tables, setTables] = useState(null);
  const [viewDate, setViewDate] = useState(date);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    setError(null);
    if (viewDate === date) {
      listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setError);
    } else {
      listReservations({ viewDate }, abortController.signal)
      .then(setReservations)
      .catch(setError);
    }
    return () => abortController.abort();
  }, [date, viewDate]);

  useEffect(() => {
    const abortController = new AbortController();
    setError(null);
    listTables()
    .then(setTables)
    .catch(setError);
    return () => abortController.abort();
  }, []);

  const query = useQuery();
  const searchedDate = query.get("date");

  useEffect(() => {
    if (searchedDate && searchedDate !== "") {
      setViewDate(searchedDate);
    }    
  }, [searchedDate])


  const handlePreviousDay = (e) => {
    e.preventDefault();
    setViewDate(previous(viewDate));
  }
  const handleNextDay = (e) => {
    e.preventDefault();
    setViewDate(next(viewDate));
  }
  const handleTodayDay = (e) => {
    e.preventDefault();
    setViewDate(date);
  }
  
  return (
    <section>
      <div className="pageTitle">
        <h1>Dashboard</h1>
        <div>  
          <button onClick={handlePreviousDay}>Previous Day</button>
          <button onClick={handleTodayDay}>Today</button>
          <button onClick={handleNextDay}>Next Day</button>
        </div>
        <h4>Date: {viewDate}</h4>
      </div>
      <ErrorAlert error={error} />
      {reservations && reservations.map((res) => (
        <div className="pageBodyOne" key={res.reservation_id}>
          <ReservationDetail reservation={res} />
        </div>
      ))
      }
      <div className="pageBodyTwo">
        <div className="item title">
          <h3>Tables</h3>
        </div>
        <div className="item body">
          {tables && tables.map((table) => (
            <div key={table.table_id}>
              <TableDetail table={table} />
            </div>
          ))
          }
        </div>
      </div>
    </section>
  ); 
};