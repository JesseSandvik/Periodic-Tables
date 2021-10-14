import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import { updateReservationStatus } from "../utils/api";

function ReservationDetail({reservation}) {
    const history = useHistory();

    const [currentReservation, setCurrentReservation] = useState(reservation);
    const [showSeat, setShowSeat] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (currentReservation.status === "booked" || currentReservation.status === null) {
            setShowSeat(true);
        }
    }, [currentReservation]);

    const handleSeat = (event) => {
        event.preventDefault();
        setError(null);
        setShowSeat(false);
        updateReservationStatus({ status: "seated" }, currentReservation.reservation_id)
        .then((response) => {
            setCurrentReservation(response);
            history.push(`/reservations/${currentReservation.reservation_id}/seat`);
        })
        .catch(setError);
    }

    const handleCancelReservation = (event) => {
        event.preventDefault();
        setError(null);
        if (window.confirm("Do you want to cancel this reservation? This cannot be undone.")) {
            updateReservationStatus({ status: "cancelled" }, currentReservation.reservation_id)
            .then((response) => {
                setCurrentReservation(response);
                history.go(0)})
            .catch(setError);
        }
    }
    if (currentReservation) {
    return (
        <div>
            <ErrorAlert error={error} />
            <div>
                <div>
                <h4>{currentReservation.reservation_time}</h4>
                <div>
                    {showSeat ? <a 
                                href={`/reservations/${currentReservation.reservation_id}/seat`}
                                onClick={handleSeat}
                                className="card-link btn btn-outline-info">
                            Seat
                                </a> : <div></div>}
                </div>
                </div>
                <p>{currentReservation.reservation_date}</p>
                <p>{currentReservation.first_name} {currentReservation.last_name}</p>
                <p>{currentReservation.mobile_number}</p>
                <p>Party Size: {currentReservation.people}</p>
                <p data-reservation-id-status={currentReservation.reservation_id}>{currentReservation.status ? currentReservation.status : "booked"}</p>
                <div>
                    <a      href={`/reservations/${currentReservation.reservation_id}/edit`}
                            >
                        Edit Reservation
                    </a>
                    <button data-reservation-id-cancel={currentReservation.reservation_id}
                            onClick={handleCancelReservation}
                            >
                        Cancel Reservation
                    </button>
                </div>
            </div>
        </div>
    )
    } else {
        return null;
    }
}

export default ReservationDetail;