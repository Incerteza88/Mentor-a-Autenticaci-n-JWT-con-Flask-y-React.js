import React, {useEffect, useState} from 'react'
import { getProfile } from '../services/fetch'
import { useNavigate } from 'react-router-dom'


function Profile() {

const [user, setUser] = useState(null)
const navigate = useNavigate()

useEffect(() => {
  const token = localStorage.getItem("token")  //para obtener el token del localStore
  if(!token){
    navigate("/login")
    return 
  }
  getProfile(token).then((data) => {
    if(data){
      setUser(data)
    } else {
      console.log("No se pudo cargar el perfil")
      navigate("/login")
    }
  })
}, []);

if(!user){
  return <p>Cargando pefil...</p>
}
  return (
    <div>
      <h1>Soy Profile</h1>
      <p>id: {user.id}</p>
      <p>Email: {user.email}</p>
    </div>
  )
}

export default Profile
