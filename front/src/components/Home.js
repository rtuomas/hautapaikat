import Header from './Header'
import Sidebar from './Sidebar'
import Map from './Map'
import { useState } from "react"
import '../css/App.css';

const Home = () => {

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

  const [markers, addMarker] = useState(initialMarkers)

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

    return (
        <div id="mainContainer">
        <Header />
        <div id="mapContainer">
          {/* Markkerien tiedot mapille */}
          <Map markers={markers} />
        </div>
        {/* Markkerien lisäysfunktio sidebarille */}
        <Sidebar addMarker={handleAddMarker} />
      </div>
    )
  }

  export default Home