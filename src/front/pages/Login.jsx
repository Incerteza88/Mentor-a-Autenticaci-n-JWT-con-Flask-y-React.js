import React, { useState } from 'react'
import { login } from '../services/fetch'
import useGlobalReducer from '../hooks/useGlobalReducer'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const {store, dispatch} = useGlobalReducer()
    const navigate = useNavigate()

    const handleLogin = async() => {
        if (!email || !password) {
            console.log("Faltan datos")
            return
        }
        const response = await login({ email, password, dispatch })
        if (response.ok) {
            alert("Login exitoso")
            navigate("/profile")
        }
    }

    return (
        <div classNameName='text-center'>
            <h1>Este es el Login</h1>
            <div className='form'>
                <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className='btn btn-primary' onClick={handleLogin}>Enviar Datos</button>
            </div>

            <p>¿No tienes cuenta? <Link to="/register">Registrate</Link>  </p>

        </div>
    )

}

export default Login
