import React, { useState } from 'react'
import LogIn from './components/LogIn'
import Register from './components/Register'
import About from './components/About'
import Home from './components/Home'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

const App = () => {
  //Kun näkymän päivittää, muuttuu loggedIn taas falseksi
  // --> Korjaus: tarkistaa kirjautumisen aina server.js:n kautta jwt:llä /tuomas
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
  <>
    <Router>
        <Switch>
            <Route path="/login">
              <LogIn setIsLoggedIn={setIsLoggedIn}/>
            </Route>
            <Route path="/register">
              <Register />
            </Route>
          <Route path="/about">
            <About isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
          </Route>
          <Route path="/">
          <Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
          </Route>
        </Switch>
      </Router>
    </>
  )
}

export default App

