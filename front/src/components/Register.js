import React, { useState } from "react"
import Header from './Header'
import services from '../services/axios_services'
import { useHistory } from 'react-router-dom'

const Register = ( {isLoggedIn} ) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [RegisterNotification, setRegisterNotification] = useState("");

    const history = useHistory()


    function registerSubmit(event) {
        event.preventDefault()
        if(validateRegisterForm()){
            services
                .newUser(username, password, password2)
                .then(res => {

                    console.log(res)
                    if(res.status===202){
                        setRegisterNotification(res.message + ', \n Redirecting to login page!')

                        //setRegisterNotification(res.message)
                        history.push('/login')
                    } else {
                        setRegisterNotification(res.message)
                    }

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
                <div className="form__group field">
                    <input
                        type="input"
                        className="form__field"
                        placeholder="Käyttäjätunnus"
                        name="username"
                        id='username'
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
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
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                    />
                    <label htmlFor="name" className="form__label">Salasana</label>
                </div>
                <div className="form__group field">
                    <input
                        type="password"
                        className="form__field"
                        placeholder="Salasana"
                        name="password"
                        id='password2'
                        onChange={(e) => setPassword2(e.target.value)}
                        value={password2}
                        required
                    />
                    <label htmlFor="name" className="form__label">Syötä salasana uudelleen</label>
                </div>

                <div className="button" id="button-2" onClick={() => document.getElementById("registerButton").click()}>
                    <div id="slide"></div>
                    <p>Kirjaudu sisään</p>
                </div>
                <input type="submit" id="registerButton" style={{ display: "none" }} value="Luo käyttäjä" />
                <p>{RegisterNotification}</p>
            </div>
        </form>
    )
  }

  export default Register