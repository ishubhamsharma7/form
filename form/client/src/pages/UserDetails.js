import React, { useEffect, useState } from 'react'
import UserTableData from './UserTableData'


const UserDetails = () => {

  const [errorMsg,setErrorMsg] = useState("")
  const [error,setError] = useState(false)

  const [usersData,setUsersData] = useState([])

  const fetchUsers = async ()=>{
  
      let users = await fetch('http://localhost:5000/fetch/users')
      let res = await users.json()
    
      if(users.status === 200){
        setUsersData(res)
      }
      if(users.status === 404){
        setError(true)
        setErrorMsg("No users in DB")
        return
      }
  }

  

  useEffect(()=>{
    fetchUsers()
  },[])

  return (
    <>
    {console.log(error,errorMsg)}
      {error && <span> {errorMsg} </span> }
      <table>
        <thead>
          <tr> 
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Country</th>
            <th>State</th>
            <th>City</th>
            <th>Gender</th>
            <th>Age</th>
            <th>Date Of Birth</th>
          </tr>
        </thead>
        <tbody>
              <UserTableData users={usersData} />
          </tbody>
      </table>
    </>
  )
}

export default UserDetails