import React from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Map from './components/Map'
import './App.css';

const App = () => {
  return (
  <div id="mainContainer">
    <Header/>
    <Sidebar/>
    <div id="mapContainer">
      <Map/>
    </div>
  </div>
  )
}

export default App

