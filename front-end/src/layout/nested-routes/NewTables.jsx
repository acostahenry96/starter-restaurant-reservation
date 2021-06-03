import { useState } from "react";
import { useHistory } from "react-router-dom";
import { createTable } from "../../utils/api";


export default function NewTables(props){
    const history = useHistory();
    const [newTable, setNewTable] = useState({
        "table_name": '',
        "capacity" : ''
    });

    function handleChange(event){
        setNewTable({...newTable, [event.target.name] : event.target.value})
    };

    function handleSubmit(ev){
        ev.preventDefault();
        const abortController = new AbortController();
        createTable(newTable, abortController.signal)
            .catch(console.log);
        history.push(`/dashboard`);
        return () => abortController.abort();
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <p>Table Name:</p>
                <input type="text" name="table_name" value={newTable["table_name"]} onChange={handleChange} />
                <p>Capacity:</p>
                <input type="text" name="capacity" value={newTable["capacity"]} onChange={handleChange} />
            </div>
            <input type="submit" value="Submit" />
            <button type="btn" onClick={()=>history.goBack()}>Cancel</button>
        </form>
    );
};