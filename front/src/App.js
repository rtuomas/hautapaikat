import React, { useState, useEffect } from 'react'
import LogIn from './components/LogIn'
import Register from './components/Register'
import About from './components/About'
import Home from './components/Home'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import services from './services/axios_services'

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(()=>{
    services
    .checkLogin()
    .then(res => {
      console.log("APP", res, isLoggedIn)
      res.status===200 ? setIsLoggedIn(true) : setIsLoggedIn(false)
    })
    .catch(error => console.log(error))
  })

  return (
  <>
    <Router>
        <Switch>

          {
            !isLoggedIn && (
              <Route path="/login">
                <LogIn isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
              </Route>
            )
          }

          {
            !isLoggedIn && (
              <Route path="/register">
                <Register isLoggedIn={isLoggedIn} />
              </Route>
            )
          }

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

