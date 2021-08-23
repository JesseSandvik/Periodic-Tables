import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import { deleteReservationId, deleteTable, updateReservationStatus } from "../utils/api";

function TableDetail( {table} ) {
    const history = useHistory();
    const [currentTable, setCurrentTable] = useState(table);
    const [tableStatus, setTableStatus] = useState("Free");
    const [error, setError] = useState(null);

    useEffect(() => {
        if (currentTable.reservation_id) {
            setTableStatus(`Occupied by reservation ID: ${currentTable.reservation_id}`);
        } else {
            setTableStatus("Free");
        }
    }, [currentTable]);

    const handleFinish = (e) => {
        e.preventDefault();
        setError(null);
        const confirmBox = window.confirm(
            "Is this table ready to seat new guests? This cannot be undone."
        );
        if (confirmBox === true) {
            updateReservationStatus({ status: "finished" }, currentTable.reservation_id)
            .catch(setError);
            deleteReservationId(currentTable.table_id)
            .then((response) => {
                setCurrentTable(response)
                history.go(0);
            })
            .catch(setError);
        }
    }

    const handleCancel = (e) => {
        e.preventDefault();
    }

    const handleDelete =(e) => {
        e.preventDefault();
        setError(null);
        const confirmBox = window.confirm(
            "Are you sure you want to delete this table? This cannot be undone."
        );
        if (confirmBox === true) {
            deleteTable(currentTable.table_id)
            .catch(setError);
            history.go(0);
        }
    }

    return (
        <div className="card text-center card-background">
            <ErrorAlert error={error} />
            <div className="card-body">
                <p className="card-text">Table Name: {currentTable.table_name}</p>
                <p className="card-text">Table Capacity: {currentTable.capacity}</p>
                <p className="card-text" data-table-id-status={`${currentTable.table_id}`}>
                {tableStatus}
                </p>   
                <div className="d-flex justify-content-center">
                    {tableStatus === "Free" ? (<div></div>) : (<div><button className="btn btn-primary" data-table-id-finish={currentTable.table_id} onClick={handleFinish}>FINISH</button> <button className="btn btn-danger" onClick={handleCancel}>CANCEL</button></div>)} 
                </div>
                <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
            </div>
        </div>
    )
}

export default TableDetail;