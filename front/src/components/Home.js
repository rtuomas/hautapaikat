import Header from './Header'
import Sidebar from './Sidebar'
import Map from './Map'
import { useState } from "react"
import '../css/App.css'
import services from '../services/axios_services'

const Home = ( {isLoggedIn, setIsLoggedIn} ) => {

  const [gravesLoaded, setGravesLoaded] = useState(false)
  const [coordinatesToZoom, setCoordinatesForZooming] = useState()
  const [graves, loadGraves] = useState([])
  const [addingNewGrave, toggleGraveAdding] = useState(false)
  const [newGraveCoordinates, updateNewGraveCoordinates] = useState({lat:0,long:0})

  function handleSetCoordinatesForZoom(coordinates) {
    setCoordinatesForZooming(coordinates)
  }

  function handleNewGraveAdding(newState){
    toggleGraveAdding(newState)
  }

  function handleNewGraveCoordinates(coordinates){
    updateNewGraveCoordinates(coordinates)
    //console.log(newGraveCoordinates)
  }

    if(gravesLoaded){
      // already loaded
    } else {
      services.loadGraves().then(gravesData => {
          //console.log(gravesData)
          loadGraves(gravesData)
          setGravesLoaded(true)
      }).catch(error => {
          console.log(`Problem loading graves from database: ${error}`)
      })
    }


    return (
        <div id="mainContainer">
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
        <div id="mapContainer">
          <Map graves={graves} coordinatesToZoom={coordinatesToZoom} passNewGraveCoordinates={handleNewGraveCoordinates} addingNewGrave={addingNewGrave}/>
        </div>
          <Sidebar
            isLoggedIn={isLoggedIn}
            graves={graves}
            handleSetCoordinatesForZoom={handleSetCoordinatesForZoom}
            newGraveCoordinates={newGraveCoordinates}
            addingNewGrave={handleNewGraveAdding}
            isLoggedIn={isLoggedIn}/>
        </div>
    )
  }

  export default Home