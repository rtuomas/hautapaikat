import React, { useState } from "react"
import Header from './Header'
import services from '../services/axios_services'

const LogIn = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    function loginSubmit(event) {
        event.preventDefault()
        if(validateLoginForm()){
            services
                .login(username, password)
                .then(res => {
                    console.log(res.message)
                }).catch(error => {
                    console.log(error)
                })
        } else {
            //TODO KÄYTTÖLIITTYMÄÄN ILMOITUS
            console.log("Validation failed")
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

            </div>
        </form>
    )
  }

  export default LogIn