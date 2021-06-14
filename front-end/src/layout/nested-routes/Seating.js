import { useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { updateStatus, listReservation, listTables, updateSeating } from "../../utils/api";


export default function Seating(props){
    const history = useHistory();    
    const params = useParams();
    const [reservation, setReservation] = useState({});
    const [tables, setTables] = useState([]);
    const [seat, setSeat] = useState();

    useEffect(fetchData, []);

    function fetchData() {
        const abortController = new AbortController();
        listReservation(params.reservation_id, abortController.signal)
            .then(response => setReservation(response[0]))
            .catch(console.log);
        listTables(abortController.signal)
            .then(response => setTables(response))
            .catch(console.log);
        return () => abortController.abort();
    };

    function handleSubmit(e){
        e.preventDefault();
        const abortController = new AbortController();
        updateSeating(seat, abortController.signal)
            .catch(console.log);
        updateStatus(params.reservation_id, { status: "seated" }, abortController.signal)
            .catch(console.log);
        history.push("/dashboard");
        return () => abortController.abort();
    };

    function handleChange(ev){
        setSeat({[ev.target.name] : ev.target.value, "reservation_id" : reservation["reservation_id"]})
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Select a Table:</label>
            <select name="table_id" onChange={handleChange}>
                {tables.map((table) => {
                    if(table["capacity"] >= reservation["people"]){
                    return <option id={table["table_id"]} value={table["table_id"]}>{table["table_name"]} - {table["capacity"]}</option>
                    } else { <option>No Tables/Bars that big!</option>}
                }
                    )}
            </select>
            <input type="submit" value="Submit" />
            <button onClick={()=>history.goBack()} >Cancel</button>
        </form>
    );
};