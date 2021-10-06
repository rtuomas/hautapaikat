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
                <div class="form__group field">
                    <input
                        type="input"
                        class="form__field"
                        placeholder="Käyttäjätunnus"
                        name="username"
                        id='username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <label for="name" class="form__label">Käyttäjätunnus</label>
                </div>
                <div class="form__group field">
                    <input
                        type="password"
                        class="form__field"
                        placeholder="Salasana"
                        name="password"
                        id='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <label for="name" class="form__label">Salasana</label>
                </div>

                {/*
                <div class="button" id="button-2">
                    <div id="slide"></div>
                    <p>Kirjaudu sisään</p>
                </div>
                */}
                <input type="submit" value="Luo käyttäjä" />

            </div>
        </form>
    )
  }

  export default LogIn