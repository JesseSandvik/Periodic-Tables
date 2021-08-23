import React from "react"
import Reservation from "./Reservation"

function ReservationsList(props) {
    
    const listReservations = props.reservations.map((reservation, key) => (
    <li key={key}
        className="card w-50"><Reservation reservation={reservation}
                               listReservationsDate={props.listReservationsDate}
                            />
                        </li>
    ))
    return (
        <ul className="container">
            {listReservations}
          </ul>
    )
}

export default ReservationsList;