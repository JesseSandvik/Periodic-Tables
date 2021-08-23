import React from "react";

function Reservation(props) {
    
    return (
        <>
        {props.listReservationsDate === props.reservation.reservation_date && (
        <div key={props.key}>
            <div className="card-header d-flex justify-content-between">
                <h5>{props.reservation.last_name}, {props.reservation.first_name}</h5>
                <p className="card-text">{props.reservation.mobile_number}</p>
            </div>
            <div className="card-body text-center">
            <h5>Reservation Date: </h5><p className="card-text">{props.reservation.reservation_date}</p>
            <h5>Reservation Time: </h5><p className="card-text">{props.reservation.reservation_time}</p>
            <h5>Party Size: </h5><p className="card-text">{props.reservation.people}</p>
            </div>
        </div>
        )}
        </>
    )
}

export default Reservation;