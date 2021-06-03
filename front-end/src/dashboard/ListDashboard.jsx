import { useHistory } from "react-router-dom";

import "./dash-style.css"

function ListDashboard({ reservation }){
    const history = useHistory();
    
    function handleEdit(e, id){
        e.preventDefault();
        history.push(`/reservations/${id}/edit`)
    };
    
    return (
        <li id={reservation["reservation_id"]} className="container-reservation">
                {reservation["first_name"]} {reservation["last_name"]} 
                <br/>
                {reservation["mobile_number"]}
                <br/>
                {reservation["reservation_time"]} 
                <br/>
                {reservation["reservation_date"]}
                <br/>
                This reservation is {reservation["status"]}. 
                <br/>
                {
                reservation["status"] == "booked" ?
                    <div className="dashboard-buttons">
                    <button className="dashboard-button-seat" onClick={()=>history.push(`/reservations/${reservation["reservation_id"]}/seat`)}  >
                     Seat</button>
                    <button className="dashboard-button-edit" onClick={(e) => handleEdit(e, reservation["reservation_id"])}>Edit</button>
                    </div>
                    :
                    null
                }
        </li>
    );
};

export default ListDashboard;