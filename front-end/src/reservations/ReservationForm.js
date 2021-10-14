import { useHistory } from "react-router-dom";

function ReservationForm({ handleSubmit, formData, setFormData }) {
    const history = useHistory();
    
    const handleCancel = (e) => {
        e.preventDefault();
        history.goBack();
    }

    return (
        <form className="form-group" onSubmit={handleSubmit} >
            <label className="form-label">First Name:</label>
                <input
                name="first_name"
                type="text"
                required
                onChange={(e) => setFormData({
                    first_name: e.target.value,
                    last_name: formData.last_name,
                    mobile_number: formData.mobile_number,
                    reservation_date: formData.reservation_date,
                    reservation_time: formData.reservation_time,
                    people: formData.people,
                })}
                value={formData.first_name}
                className="form-control"
                />
            <label className="form-label">Last Name:</label>
                <input
                name="last_name"
                type="text"
                required
                onChange={(e) => setFormData({
                    first_name: formData.first_name,
                    last_name: e.target.value,
                    mobile_number: formData.mobile_number,
                    reservation_date: formData.reservation_date,
                    reservation_time: formData.reservation_time,
                    people: formData.people,
                })}
                value={formData.last_name}
                className="form-control"
                />
            <label className="form-label">Mobile Number:</label>
                <input
                name="mobile_number"
                type="text"
                required
                onChange={(e) => setFormData({
                    first_name: formData.first_name,
                    last_name: formData.last_name,
                    mobile_number: e.target.value,
                    reservation_date: formData.reservation_date,
                    reservation_time: formData.reservation_time,
                    people: formData.people,
                })}
                value={formData.mobile_number}
                className="form-control"
                />
            <label>Reservation Date:</label>
                <input
                name="reservation_date"
                type="date"
                required
                onChange={(e) => setFormData({
                    first_name: formData.first_name,
                    last_name: formData.last_name,
                    mobile_number: formData.mobile_number,
                    reservation_date: e.target.value,
                    reservation_time: formData.reservation_time,
                    people: formData.people,
                })}
                value={formData.reservation_date}
                className="form-control"
                />
            <label>Reservation Time:</label>
                <input
                name="reservation_time"
                type="time"
                required
                onChange={(e) => setFormData({
                    first_name: formData.first_name,
                    last_name: formData.last_name,
                    mobile_number: formData.mobile_number,
                    reservation_date: formData.reservation_date,
                    reservation_time: e.target.value,
                    people: formData.people,
                })}
                value={formData.reservation_time}
                className="form-control"
                />
            <label>Amount of People:</label>
                <input
                name="people"
                type="number"
                required
                onChange={(e) => setFormData({
                    first_name: formData.first_name,
                    last_name: formData.last_name,
                    mobile_number: formData.mobile_number,
                    reservation_date: formData.reservation_date,
                    reservation_time: formData.reservation_time,
                    people: e.target.valueAsNumber,
                })}
                value={formData.people}
                className="form-control"
                />

                <button type="submit">Submit</button>
                <button onClick={handleCancel}>Cancel</button>
        </form>
    )
}

export default ReservationForm;