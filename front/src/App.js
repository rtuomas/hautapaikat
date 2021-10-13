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

          <Route path="/about">
            <About isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
          </Route>
          
          <Route path={isLoggedIn ? '/' : '/login'}>
            {isLoggedIn
              ? <Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
              : <LogIn isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
            }
          </Route>
          <Route path={isLoggedIn ? '/' : '/register'}>
            {isLoggedIn
              ? <Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
              : <Register isLoggedIn={isLoggedIn} />
            }
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

