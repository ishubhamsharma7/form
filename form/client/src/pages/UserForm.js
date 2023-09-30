import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const UserForm = () => {

  const navigate = useNavigate();
  const [countryData,setCountryData]= useState([])
  const [states,setStates]= useState([])
  const [city,setCity]= useState([])

  const [country,setCountry] = useState("country")
  const [state,setState] = useState('state')
  const [cities,setCities] = useState('cities')

  const [isAgeValid,setAgeValid] = useState(false)

  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "male", 
    age:0,
    dateOfBirth:""
  }) 

  const [errorResponse,setErrorResponse] = useState("")
  const [errorMsg,setErrorMsg] = useState(false)

  useEffect(()=>{
    fetch('http://localhost:5000/fetch/country', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
        .then((response) => response.json())
        .then((data) =>setCountryData(data))
        .catch((error) => {
          console.error('Error:', error);
        });
  },[])

  useEffect(()=>{
    const calAge = ()=>{
      if(formValues.dateOfBirth !== ""){
      let today = new Date().getFullYear();
      let birthDate = new Date(formValues.dateOfBirth).getFullYear()

      let ageValue = today - birthDate

      if(ageValue < 14){
        setAgeValid(true)
        setFormValues({
          ...formValues,
          age: ageValue,
        });
        return
      }

      setAgeValid(false)
      setFormValues({
        ...formValues,
        age: ageValue,
      });
    }
  }
    
    calAge()
  },[formValues.dateOfBirth])

  const handleCountryChange = (e)=>{
    if(e.target.value === "" || e.target.value === "Select Country" ){
      return
    }
    setCountry(e.target.value)
    setStates(countryData.find(ctr => ctr.countryName === e.target.value).state)
  }

  const handleChangeState = (e) =>{
    if(e.target.value === "" || e.target.value === "Select State" ){
      return
    }
    setState(e.target.value)
    setCity(states.find(ctr => ctr.name === e.target.value).city)
  }

  const handleCityChange = (e)=> {
    if(e.target.value === "" || e.target.value === "Select City" ){
      return
    }
    setCities(e.target.value)
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
    
  };


  const handleSubmit = async(e) => {
    e.preventDefault();
    
    if(isAgeValid ) return
    
    formValues.country = country;
    formValues.state = state;
    formValues.city = cities
    
    // // Assuming you have an API endpoint to POST the data to, you can use the fetch API
    let response = await fetch('http://localhost:5000/save/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formValues),
    })
      let res = await  response.json()

      if(response.status === 200){
        navigate('/users/detail')
      }

      if(response.status === 400){
        setErrorMsg(true)
        setErrorResponse(res.message)
        return
      }
  };

  return (
    <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input type="text" name="firstName" value={formValues.firstName} onChange={handleInputChange} required/>
        </div>

        <div>
          <label>Last Name:</label>
          <input
            type="text" name="lastName" value={formValues.lastName} onChange={handleInputChange} required />

        </div>

        <div>
          <label>E-Mail:</label>
          <input type="email" name="email" value={formValues.email} onChange={handleInputChange} required />
        </div>

        <div>
          <label>Country:</label>
          <select name="country" value={country} onChange={handleCountryChange} required >
            <option key="1" value="Select Country">Select Country</option>
            
            {countryData.map((data)=>{
             return <option key={data._id} value={data.countryName}>{data.countryName}</option>
            })}

          </select>

        </div>

        <div>
          <label>State:</label>
          <select name="state" value={state} onChange={handleChangeState} required >
            <option key="34" value="Select State">Select State</option>
            
            {states.map((data,i)=>(
            <option key={i+1} value={data.name}>{data.name}</option>
            ))}

          </select>

        </div>

        <div>
          <label>City:</label>
          <select name="city" value={cities} onChange={handleCityChange} required >
            <option key="4234"value="Select City">Select City</option>
            
            {city.map((data,i)=>(
            <option key={i+1} value={data}>{data}</option>
            ))}

          </select>

        </div>

        <div>
          <label>Gender:</label>
          <div>
            <input type="radio" name="gender" value="male" onChange={handleInputChange} required />
            <label>Male</label>
          </div>

          <div>
            <input type="radio" name="gender" value="female" onChange={handleInputChange} required />
            <label>Female</label>
          </div>

        </div>

        <div>
          <label>Date of Birth:</label>
          <input type="date" name="dateOfBirth" value={formValues.dateOfBirth} onChange={handleInputChange} required />
        </div>

        <div>
          <label>Age:</label>
          <input type="text" name="age" value={formValues.age} disabled/>
          {isAgeValid && <span> Age must be above 14</span>}
        </div>

            {<span>{errorResponse}</span>}
        <div>
         <button type="submit">Submit</button>
        </div>
    </form>

    // {response}
  )
}

export default UserForm