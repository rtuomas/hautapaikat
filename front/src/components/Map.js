import { MapContainer, Marker, Popup, TileLayer, useMapEvents, MapConsumer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import L from 'leaflet';
import { useState } from "react"

const Map = (props) => {

  function LocationMarker() {
    const [position, setPosition] = useState(null)
    const map = useMapEvents({
      click() {
        map.locate()
        console.info("moimoi")
      },
      locationfound(e) {
        console.log(e.latlng)
        setPosition(e.latlng)
        map.flyTo(e.latlng, map.getZoom())
      },
    })
  
    return position === null ? null : (
      <Marker position={position}>
        <Popup>You are here</Popup>
      </Marker>
    )
  }

    let DefaultIcon = L.icon({
        iconUrl: icon,
        shadowUrl: iconShadow,
        iconAnchor: [12.5, 41]
    });

    function posTest(e){
      console.log(e)
    }
    
    L.Marker.prototype.options.icon = DefaultIcon;
    return (
        <MapContainer style={{ width: "56vw", height: "35vw"}} center={[65.5538179, 27.7496755]} zoom={5} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapConsumer>
        {(map) => {
          map.on("click", function (e) {
            console.log(e.latlng);
          });
          return null;
        }}
      </MapConsumer>

        {/* Propseina saadut markkerien tiedot asetetaan tässä kartalle */}
        
        {props.graves.map(marker => 
          <Marker key={marker.id} position={[marker.location.lat, marker.location.long]}>
          <Popup>
            <span> { marker.name } <br/> {marker.cemetery} </span>
          </Popup>
          </Marker>
        )}
      </MapContainer>
    )
  }

  export default Map