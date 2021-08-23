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
            <div>
                {showError && (
                    <p className="alert alert-danger">
                        No reservations found.
                    </p>
                )}
            </div>

            <h3 className="d-flex m-3 justify-content-center">Search Form</h3>

            <div>
                <form className="form-group" onSubmit={handleSubmit}>
                        <input
                        name="mobile_number"
                        type="text"
                        placeholder="Enter a customer's phone number"
                        required
                        onChange={(e) => setMobile_number(e.target.value)}
                        value={mobile_number}
                        className="form-control"
                        />
                    <br />
                    <div className="d-flex justify-content-center">
                        <button className="btn btn-primary" type="submit">FIND</button>
                    </div>
                </form>
                <div>
                    <ul className="list-group list-group-flush">
                        {reservations && reservations.map((res) => (
                            <li className="list-group-item" key={res.reservation_id}>
                                <ReservationDetail reservation={res} />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default SearchPhone;