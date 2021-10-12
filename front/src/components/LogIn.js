import React, { useState } from "react"
import Header from './Header'
import services from '../services/axios_services'
import { useHistory } from 'react-router-dom'

const LogIn = ( {isLoggedIn, setIsLoggedIn} ) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loginNotification, setLoginNotification] = useState("");

    const history = useHistory()

    function loginSubmit(event) {
        event.preventDefault()
        if(validateLoginForm()){
            services
                .login(username, password)
                .then(res => {
                    console.log(res)
                    if(res.status===202){
                        localStorage.setItem("myToken", JSON.stringify(res.data.accessToken))
                        localStorage.setItem("username", JSON.stringify(res.data.username))
                        history.push('/')
                        setIsLoggedIn(true)
                    } else {
                        setLoginNotification(res.data.message)
                    }
                }).catch(error => {
                    console.log(error)
                })
        } else {
            setLoginNotification('Username and/or password needs to be more than 0 characters. TRY AGAIN!')
        }
    }

    function validateLoginForm() {
        return username.length > 0 && password.length > 0
    }

    return (
        <form onSubmit={loginSubmit}>
            <Header />
            <div id="logInContainer">
                <h1 style={{ color: "white" }}>Kirjaudu sisään</h1>
                <div className="form__group field">
                    <input
                        type="input"
                        className="form__field"
                        placeholder="Käyttäjätunnus"
                        name="username"
                        id='username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <label htmlFor="name" className="form__label">Käyttäjätunnus</label>
                </div>
                <div className="form__group field">
                    <input
                        type="password"
                        className="form__field"
                        placeholder="Salasana"
                        name="password"
                        id='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <label htmlFor="name" className="form__label">Salasana</label>
                </div>

                <div className="button" id="button-2" onClick={() => document.getElementById("logInButton").click()}>
                    <div id="slide"></div>
                    <p>Kirjaudu sisään</p>
                </div>
                <input id="logInButton" style={{ display: "none" }} type="submit" value="Kirjaudu"/>
                <p style={{ color: "red" }}>{loginNotification}</p>
            </div>
        </form>
    )
  }

  export default LogIn