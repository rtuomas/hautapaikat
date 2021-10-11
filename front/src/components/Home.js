import Header from './Header'
import Sidebar from './Sidebar'
import Map from './Map'
import { useState } from "react"
import '../css/App.css'
import services from '../services/axios_services'



const Home = ( {isLoggedIn, setIsLoggedIn} ) => {



  /* Markkereiden state. Lisäysfunktio handleAddMarker annetaan Sidebarille ja markkereiden tiedot Mapille joka piirtää ne kartalle */

  // Markkereiden staten alustus

  const initialMarkers = [
    {
      id: 1,
      position: [64.5538179, 27.7496755],
      info: "Hauta 1"
    }
  ]

  // Markkereiden staten määritys

  const [gravesLoaded, setGravesLoaded] = useState(false)
  const [markers, addMarker] = useState(initialMarkers)
  const [graves, loadGraves] = useState([])

  // Markkereiden lisäysfunktio, jota kutsutaan Sidebarista

  function handleAddMarker(marker) {
    const updateMarkers = [
      ...markers,
      {
        id: markers.length + 1,
        position: marker.position,
        info: marker.info + (markers.length + 1)
      }
    ];
    addMarker(updateMarkers);
  }

  /*
 useEffect(() => {
    services
      .getProjects()
      .then(initialProjects => {
        setProjects(initialProjects)
    })
  }, [])

  */

  function jloadGraves(){
    if(gravesLoaded){
      // already loaded 
    } else {
      services.loadGraves().then(gravesData => {
          console.log(gravesData)
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
          <Map markers={markers} graves={graves}/>
        </div>
        {/* Markkerien lisäysfunktio sidebarille */}
        <Sidebar addMarker={handleAddMarker} graves={graves}/>
      </div>
    )
  }

  export default Home