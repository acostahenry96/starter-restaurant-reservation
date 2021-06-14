import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import { listReservation, updateStatus } from "../../utils/api";

export default function Edit(props){
    const history = useHistory();
    const params = useParams();
    const [reservation, setReservation] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    

    // useEffect(()=>{
    //     async function fetchData(){
    //       const abortController = new AbortController();
    //       listReservation(params.reservation_id, abortController.signal)
    //         .then((response) => setReservation(response[0]))
    //         .catch(console.log);
         
    //       return () => abortController.abort();
    //     }
    //     fetchData();
    // },[]);


    const handleChange = (ev) => {
        setReservation({...reservation, [ev.target.name] : ev.target.value});
    };

    const handleSubmit =  async (ev) => {
          ev.preventDefault();
          const abortController = new AbortController();
          updateStatus(params.reservation_id, reservation, abortController.signal)
            .catch(console.log)
          history.push(`/dashboard?date=${reservation.reservation_date}`);
          return () => abortController.abort();
    };
    /*
    Go through everything and work on user input control
    with try and catchs or other methods
    
    Lastly style everything out
    */
    return (
        <div>
            {false ? 
                  <div>Only reservations with the status of booked can be edited</div> :
                    <form onSubmit={handleSubmit}>
                       <label>
              First name:
              <input type="text" name="first_name" defaultValue={reservation.first_name} placeholder="First name" onChange={handleChange} />
              <br/>
            </label>
            <div>
            <label>
              Last name:
              <input type="text" name="last_name" defaultValue={reservation.last_name} placeholder="Last name" onChange={handleChange} required />
            </label>
            </div>
            <label>
              Contact number:
              <input type="text" name="mobile_number" defaultValue={reservation.mobile_number} placeholder="XXX-XXX-XXX" onChange={handleChange} />
              <br/>
            </label>
            <label>
              <p>Date of reservation:
              <DatePicker
                selected={selectedDate}
                dateFormat="Pp"
                onChange={date => {
                  if(date){
                    const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
                    setReservation({...reservation, "reservation_date" : formattedDate});
                  }
                  return setSelectedDate(date);
                }}
                minDate={new Date()}
                filterDate={date => date.getDay() !== 2}
                isClearable
                placeholderText="YYYY-MM-DD"
                defaultValue={reservation.reservation_date}
                showYearDropdown
                scrollableMonthYearDropdown
              />
              </p>
             <br/>
            </label>
            <label>
              Time of reservation:
              <input type="time" name="reservation_time" min="10:30" max="21:30" defaultValue={reservation.reservation_time} placeholder="HH:MM" onChange={handleChange} />
              <br/>
            </label>
            <label>
              Amount of people attending:
              <input type="text" name="people" defaultValue={reservation.people} placeholder="People" onChange={handleChange} />
              <br/>
            </label>
              <input type="submit" value="Submit" />
              <button type="button" onClick={()=>history.goBack()}>Cancel</button>
        </form>
            }              
        </div>
    );
};