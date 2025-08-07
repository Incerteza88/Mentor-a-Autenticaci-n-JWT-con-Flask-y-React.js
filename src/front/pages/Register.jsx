import React, { useState } from 'react'
import { registerUsuario } from '../services/fetch'
import { useNavigate } from 'react-router-dom'
import Login from './Login'

function Register() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

      const handleRegister = async () => {
          if (!email || !password) {
              console.log("Faltan datos")
              return
          }

        const {ok, data} = await registerUsuario(email, password)
        if(ok){
            console.log("Registro exitoso", data)
            navigate("/login")
        } else {
            alert("No se pudo hacer el registro")
        }
        
      }  


    return (
        <div>
            <h1>Soy Register</h1>
      <div className='form'>
            <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <button className='btn btn-primary' onClick={handleRegister}>Registrar</button>
        </div>
    </div >
  )
}

export default Register
