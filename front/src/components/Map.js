import { MapContainer, Marker, Popup, TileLayer, MapConsumer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import L, { map } from 'leaflet';
import { useEffect } from 'react'

let moveEventAdded = false
function formatDate (date) {
  let datePart = date.match(/\d+/g),
      year = datePart[0].substring(0),
      month = datePart[1],
      day = datePart[2];

  return day+'.'+month+'.'+year;
}

let previousCoordinateUpdate = +new Date()
const coordinateUpdateMinInterval = 10

let previousZoomCoordinates

let mapCenter = [65.5538179, 27.7496755]

const Map = (props) => {

  useEffect(() => {
    moveEventAdded = false
  }, []);

    let DefaultIcon = L.icon({
        iconUrl: icon,
        shadowUrl: iconShadow,
        iconAnchor: [12.5, 41]
    });

    function getCenterCoordinates(center){
      mapCenter = [center.lat,center.lng]
      const timeNow = +new Date()
      if(timeNow - previousCoordinateUpdate > coordinateUpdateMinInterval){
        previousCoordinateUpdate = timeNow
        const newCoords = {lat:center.lat,long:center.lng}
        props.passNewGraveCoordinates(newCoords)
      }
    }

    function drawCenterMarker(){
      if(props.addingNewGrave){
        return (<Marker position={mapCenter}></Marker>)
      }
    }
    
    L.Marker.prototype.options.icon = DefaultIcon;
    return (
        <MapContainer style={{ width: "inherit", height: "inherit"}} center={[65.5538179, 27.7496755]} zoom={5} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapConsumer>
        {(map) => {

          mapCenter = [map.getCenter().lat,map.getCenter().lng]
          
          if(moveEventAdded){
            // already added
          } else {
            map.on("move", function (e) {
              getCenterCoordinates(map.getCenter())
            })
            moveEventAdded = true
          }
          if (props.coordinatesToZoom && (props.coordinatesToZoom !== previousZoomCoordinates)) {
            if(props.coordinatesToZoom.lat){
              map.flyTo([props.coordinatesToZoom.lat, props.coordinatesToZoom.long], 18)
              previousZoomCoordinates = props.coordinatesToZoom
            }
          }
          return null;
        }}
      </MapConsumer>
        { drawCenterMarker() }
        {props.graves.map(marker => 
          <Marker onClick={() => console.log("test")} key={marker._id} position={[marker.location.lat, marker.location.long]}>
          <Popup>
            <h1 style={{textAlign: "center"}}> { marker.name } </h1>
            <ul style={{listStyle: "none", padding: "3px", textAlign: "center"}}>
                <li>Syntynyt: { formatDate(marker.birthday) }</li>
                <li>Kuollut: { formatDate(marker.died) }</li>
                <li>Hautausmaa: { marker.cemetery }</li>
                <li>Kategoria: { marker.category ?? "-" }</li>
            </ul>
          </Popup>
          </Marker>
        )}
      </MapContainer>
    )
  }

  export default Map