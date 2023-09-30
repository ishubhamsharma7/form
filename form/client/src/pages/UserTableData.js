import React from 'react'

const UserTableData = ({users}) => {
  return (
    <>
        {
            users.map((element)=>{
                const {_id,firstName,lastName,email,country,state,city,gender,age,dateOfBirth} = element

                return (
                    <tr key={_id}>
                        <td>{firstName}</td>
                        <td>{lastName}</td>
                        <td>{email}</td>
                        <td>{country}</td>
                        <td> {state} </td>
                        <td> {city} </td>
                        <td> {gender} </td>
                        <td> {age} </td>
                        <td> {dateOfBirth} </td>
                        
                    </tr>
                )
            })
        }
    </>
  )
}

export default UserTableData