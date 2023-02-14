import { useState } from 'react'

const Auth = () => {
    const [isLogIn, setIsLogin] = useState(true)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)
    const [error, setError] = useState(null)

    console.log(email, password, confirmPassword)

    const viewLogin = (status) => {
        setError(null)
        setIsLogin(status)
    }

    const handleSubmit = async (e, endpoint) => {
        e.preventDefault()
        if (!isLogIn && password !== confirmPassword) {
            setError('Make sure passwords match!')
            return
        }

        const response = await fetch(`${process.env.REACT_APP_SERVERURL}/${endpoint}`,{
            method: 'POST',
            headers: { 'Content-Type' : 'application/json' },
            body: JSON.stringify({ email, password })
        })

        const data = await response.json()
        console.log(data)
    }

    return (
        <div className="auth-container">
            <div className="auth-container-box">
                <form>
                    <h2>{isLogIn ? 'Please log in' : 'Plrase sign up'}</h2>
                    <input type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)}/>
                    <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)}/>
                    {!isLogIn && <input type="password" placeholder="confirm password" onChange={(e) => setConfirmPassword(e.target.value)}/>}
                    <input type="submit" className="create" onClick={(e) =>handleSubmit(e, isLogIn ? 'login' : 'signuo')}/>
                    {error && <p>{error}</p>}
                </form>
                <div className="auth-options">
                    <button
                        onClick={() => viewLogin(false)}
                        style={{backgroundColor : !isLogIn ? 'rgb(255, 255, 255)' : 'rgb(188, 188, 188 )'}}
                    >Sign Up</button>
                    <button
                        onClick={() => viewLogin(true)}
                        style={{backgroundColor : isLogIn ? 'rgb(255, 255, 255)' : 'rgb(188, 188, 188 )'}}
                    >Login</button>
                </div>

            </div>
        </div>
    )
}

export default Auth
