import React, { useState } from "react";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useHistory } from "react-router-dom";
import { createReservations } from "../../utils/api"

function NewReservations(props){
    const history = useHistory();
    const [selectedDate, setSelectedDate] = useState(null);
    const [ value, setValue ] = 
        useState({
            "first_name":'',
            "last_name":'',
            "mobile_number":'',
            "reservation_date":'',
            "reservation_time":'',
            "people":''
        });

    const handleChange = (ev) => {
        setValue({...value, [ev.target.name] : ev.target.value});
    };

    const handleSubmit =  async (ev) => {
        try {
          const abortController = new AbortController();
          ev.preventDefault();
          createReservations(value, abortController.signal)
          history.push(`/dashboard?date=${value.reservation_date}`);
        } catch (e) {
            console.log(e.name);
        }
    };
    
    return (
        <form onSubmit={handleSubmit}> 
            <label>
              First name:
              <input type="text" name="first_name" value={value["first_name"]} placeholder="First name" onChange={handleChange} />
              <br/>
            </label>
            <label>
              Last name:
              <input type="text" name="last_name" value={value["last_name"]} placeholder="Last name" onChange={handleChange} />
              <br/>
            </label>
            <label>
              Contact number:
              <input type="text" name="mobile_number" value={value["mobile_number"]} placeholder="XXX-XXX-XXX" onChange={handleChange} />
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
                    setValue({...value, "reservation_date" : formattedDate});
                  }
                  return setSelectedDate(date);
                }}
                dateFormat='yyyy/MM/dd'
                minDate={new Date()}
                filterDate={date => date.getDay() !== 2}
                isClearable
                placeholderText="YYYY-MM-DD"
                showYearDropdown
                scrollableMonthYearDropdown
              />
              </p>
             <br/>
            </label>
            {/* <label>
              Reservation date:
              <input type="date" name="reservation_date" value={value["reservation_date"]} placeholder="YYYY-MM-DD" onChange={handleChange}
                     min={today()} />
              <br/>
            </label> */}
            <label>
              Time of reservation:
              <input type="time" name="reservation_time" min="10:30" max="21:30" value={value["reservation_time"]} placeholder="HH:MM" onChange={handleChange} />
              <br/>
            </label>
            <label>
              Amount of people attending:
              <input type="text" name="people" value={value["people"]} placeholder="People" onChange={handleChange} />
              <br/>
            </label>
              <input type="submit" value="Submit" />
              <button type="button" onClick={()=>history.goBack()}>Cancel</button>
        </form>
    );
};

export default NewReservations;