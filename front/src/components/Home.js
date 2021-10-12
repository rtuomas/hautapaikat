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

  function handleSetCoordinatesForZoom(coordinates) {
    setCoordinatesForZooming(coordinates)
  }

  function jloadGraves(){
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
  }

  jloadGraves()

    return (
        <div id="mainContainer">
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
        <div id="mapContainer">
          {/* Markkerien tiedot mapille */}
          <Map graves={graves} coordinatesToZoom={coordinatesToZoom}/>
        </div>
        {/* Markkerien lisäysfunktio sidebarille */}
        <Sidebar graves={graves} handleSetCoordinatesForZoom={handleSetCoordinatesForZoom}/>
      </div>
    )
  }

  export default Home