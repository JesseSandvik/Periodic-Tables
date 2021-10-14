import React from "react";

function Reservation(props) {
    
    return (
        <>
        {props.listReservationsDate === props.reservation.reservation_date && (
        <div key={props.key}>
            <div>
                <h5>{props.reservation.last_name}, {props.reservation.first_name}</h5>
                <p>{props.reservation.mobile_number}</p>
            </div>
            <div>
            <h5>Reservation Date: </h5><p>{props.reservation.reservation_date}</p>
            <h5>Reservation Time: </h5><p>{props.reservation.reservation_time}</p>
            <h5>Party Size: </h5><p>{props.reservation.people}</p>
            </div>
        </div>
        )}
        </>
    )
}

export default Reservation;