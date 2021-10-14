import React from "react"
import Reservation from "./Reservation"

function ReservationsList(props) {
    
    const listReservations = props.reservations.map((reservation, key) => (
    <li key={key}><Reservation reservation={reservation}
                               listReservationsDate={props.listReservationsDate}
                            />
                        </li>
    ))
    return (
        <ul>
            {listReservations}
          </ul>
    )
}

export default ReservationsList;