import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { listReservationByPhone, updateStatus } from "../../utils/api";



function Search(props){
    const [mobileNumber, setMobileNumber] = useState();
    const [matchedReservations, setMatchedReservations] = useState(false);
    const [cancelPopup, setCancelPopup] = useState(false);

    const history = useHistory();

    function handleChange(e){
        e.preventDefault();
        setMobileNumber(e.target.value);
    };

    async function handleSubmit(e){
        e.preventDefault();
        const abortController = new AbortController();
        listReservationByPhone(mobileNumber, abortController.signal)
            .then((response) => setMatchedReservations(response))
            .catch(console.log);
        return () => abortController.abort();
    };
    
    function handleCancel(e){
        e.preventDefault();
        const abortController = new AbortController();
        updateStatus(e.target.value, {"status" : "canceled"} , abortController.signal);
        return () => abortController.abort();
        //need to make the page refresh
    };

    function handleEdit(e, id){
        e.preventDefault();
        history.push(`/reservations/${id}/edit`)
    };

    return (
        <div>
            <form onSubmit={handleSubmit} >
                <label>
                    Phone number:
                    <input type="text" name="mobile_number" placeholder="XXX-XXX-XXXX" onChange={handleChange} />
                </label>
                <input type="submit" value="Find" />
            </form>
            {matchedReservations.length ? 
            <ul className="search-reservations">{matchedReservations.map((element) => {
                return (
                <>
                    <li id={element.reservation_id} className="search-reservation">
                        {element.first_name} {element.last_name}
                        <br/>
                        {element.mobile_number}
                        <br/>
                        {element.reservation_date.slice(0,10)}
                        <br/>
                        {element.reservation_time} 
                        <br/>
                        Party Size: {element.people}
                        <br/>
                        This reservation is {element.status}.
                        <div className="search-buttons">
                    <button onClick={()=>setCancelPopup(!cancelPopup)}>Cancel</button>
                    <button onClick={(e) => handleEdit(e, element.reservation_id)}>Edit</button>
                    {cancelPopup ? <><p>Do you want to cancel this reservation? This cannot be undone.</p> <button name="reservation_id" value={element.reservation_id} onClick={handleCancel}>Ok</button> </> : null}
                        </div>
                    </li>
                </>
                )
            })}</ul>
             :
            <p>No reservations were found.</p>
            }
        </div>
    );
};

export default Search;