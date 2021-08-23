  
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { listReservations, updateReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationForm from "./ReservationForm";

function EditReservation() {
    const history = useHistory();
    const params = useParams();

    const initialFormData = {
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people: "",
        status: "booked",
    };
    const [formData, setFormData] = useState(initialFormData);
    const [error, setError] = useState(null);
    const [reservations, setReservations] = useState([]);
    const [currentReservation, setCurrentReservation] = useState({});
    
    useEffect(() => {
        const abortController = new AbortController();
        setError(null);
        listReservations({})
        .then((response) => {
            setReservations(response);
        })
        .catch(setError);
        return () => abortController.abort();
    }, []);

    useEffect(() => {
        if (reservations.length !== 0) {
            const current = reservations.find((res) => res.reservation_id === Number(params.reservation_id));
            setCurrentReservation(current);
            setFormData(current);
        }
    }, [reservations, params]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(null);
        const updatedReservation = {
            ...formData,
        };
        updateReservation(updatedReservation, currentReservation.reservation_id)
        .then(() => {
            history.push(`/dashboard?date=${formData.reservation_date}`);
        })
        .catch(setError);
    }

    return (
        <div>
            <ErrorAlert error={error} />
            <h3 className="d-flex m-3 justify-content-center">Edit Reservation Form</h3>
      
            <div>
                <ReservationForm
                    formData={formData}
                    setFormData={setFormData}
                    handleSubmit={handleSubmit}
                />
            </div>
        </div>
    )
};

export default EditReservation;