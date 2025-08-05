import React, { useState } from 'react'
import { login } from '../services/fetch'

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = () => {
        if (!email || !password) {
            console.log("Faltan datos")
            return
        }
        login({ email, password })
    }

    return (
        <div classNameName='text-center'>
            <h1>Este es el Login</h1>
            <div className='form'>
                <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className='btn btn-primary' onClick={handleLogin}>Enviar Datos</button>
            </div>
        </div>
    )

}

export default Login
