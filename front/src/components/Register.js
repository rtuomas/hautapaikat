import React, { useState } from "react"
import Header from './Header'
import services from '../services/axios_services'

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");


    function registerSubmit(event) {
        event.preventDefault()
        if(validateRegisterForm()){
            services
                .newUser(username, password, password2)
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

    function validateRegisterForm() {
        return username.length > 0 &&
            password.length > 0 &&
            password2.length > 0 &&
            password === password2
    }

    return (
        <form onSubmit={registerSubmit}>
            <Header />
            <div id="logInContainer">
                <h1 style={{ color: "white" }}>Rekisteröidy</h1>
                <div class="form__group field">
                    <input
                        type="input"
                        class="form__field"
                        placeholder="Käyttäjätunnus"
                        name="username"
                        id='username'
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
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
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                    />
                    <label for="name" class="form__label">Salasana</label>
                </div>
                <div class="form__group field">
                    <input
                        type="password"
                        class="form__field"
                        placeholder="Salasana"
                        name="password"
                        id='password'
                        onChange={(e) => setPassword2(e.target.value)}
                        value={password2}
                        required
                    />
                    <label for="name" class="form__label">Syötä salasana uudelleen</label>
                </div>

                {/*

                <div  type="submit" class="button" id="button-2">
                    <input type="submit" id="slide"></input>
                    <p>Luo käyttäjä</p>
                </div>

                */}
                <input type="submit" value="Luo käyttäjä" />

            </div>
        </form>
    )
  }

  export default Register