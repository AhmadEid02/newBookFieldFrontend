import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
const Dashboard = () => {
  const [error, setError] = useState("")
  const [show, setShow] = useState(false)
  const [bookedFields, setBookedFields] = useState([])
  const user = JSON.parse(localStorage.getItem('user'))
  const featchData = async () => {
    if (user) {
      const apiUrl = "https://newbookfieldbackend.onrender.com";
      const response = await axios.get(
        `${apiUrl}/book/booked`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setBookedFields(response.data)
      console.log(response.data)

    } else {
      setError("please login in first")
    }
  }
  useEffect(() => { featchData() }, [])
  return (
    <div className="contener">
      <h2>Dashboard</h2>
      <h3>booked Fields</h3>
      <div >
        {bookedFields.map(e => {
          return (

            <div className="horizontal-card" key={uuidv4()}>
              <img src={e.fieldData.imageUrl} alt="Pitch" />
              <div className="horizontal-card-content">
                <h2>{e.fieldData.name}</h2>
                <p>Date of booking {e.bookedDate}</p>
                <p>Time of booking {e.bookedTime}</p>
                <p>{e.fieldData.description}</p>
                <p className="rating">Rating:{e.fieldData.rating}/5</p>
                <p className="address">{e.fieldData.address?.street}, {e.fieldData.address?.city}</p>
                <p className="pitch-type">Type: {e.fieldData.pitchType} Pitch</p>
                <p className="capacity">Capacity:{e.fieldData.capacity}</p>
              </div>
            </div>

          )
        })}
      </div>
    </div>
  )
}

export default Dashboard