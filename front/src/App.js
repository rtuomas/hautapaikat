import React from 'react'
import LogIn from './components/LogIn'
import Register from './components/Register'
import About from './components/About'
import Home from './components/Home'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

const App = () => {
  return (
  <>
    <Router>
        <Switch>
            <Route path="/login">
              <LogIn />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/">
          <Home />
          </Route>
        </Switch>
      </Router>
    </>
  )
}

export default App

