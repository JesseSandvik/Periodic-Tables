import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ReservationDetail from "../dashboard/ReservationDetail";

function SearchPhone() {
    const [mobile_number, setMobile_number] = useState("");
    const [reservations, setReservations] = useState(null);
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        if (reservations && reservations.length === 0) {
            setShowError(true);
        }
    }, [reservations]);

    const handleSubmit = (e) => {
        e.preventDefault();
        listReservations({mobile_number})
        .then((response) => {
            setReservations(response);
        });
    }

    return (
        <div>
                {showError && (
                    <p>
                        No reservations found.
                    </p>
                )}

            <h3>Search Form</h3>
                <form onSubmit={handleSubmit}>
                        <input
                        name="mobile_number"
                        type="text"
                        placeholder="Enter a customer's phone number"
                        required
                        onChange={(e) => setMobile_number(e.target.value)}
                        value={mobile_number}
                        />
                        <button type="submit">Find Reservation</button>
                </form>
                    <ul>
                        {reservations && reservations.map((res) => (
                            <li key={res.reservation_id}>
                                <ReservationDetail reservation={res} />
                            </li>
                        ))}
                    </ul>
        </div>
    );
}

export default SearchPhone;