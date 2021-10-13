import { MapContainer, Marker, Popup, TileLayer, MapConsumer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import L from 'leaflet';

const Map = (props) => {

  let previousCoordinateUpdate = +new Date()
  const coordinateUpdateMinInterval = 500

  //console.log(props.addingNewGrave)

    let DefaultIcon = L.icon({
        iconUrl: icon,
        shadowUrl: iconShadow,
        iconAnchor: [12.5, 41]
    });

    function getCenterCoordinates(center){
      const timeNow = +new Date()
      if(timeNow - previousCoordinateUpdate > coordinateUpdateMinInterval){
        previousCoordinateUpdate = timeNow
        props.passNewGraveCoordinates(center)
        //console.log(center.lat)
      }
    }
    
    L.Marker.prototype.options.icon = DefaultIcon;
    return (
        <MapContainer style={{ width: "100%", height: "100%"}} center={[65.5538179, 27.7496755]} zoom={5} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapConsumer>
        {(map) => {
          map.on("move", function (e) {
            getCenterCoordinates(map.getCenter())
          });
          if (props.coordinatesToZoom) {
            map.flyTo([props.coordinatesToZoom.lat, props.coordinatesToZoom.long], 10)
          }
          return null;
        }}
      </MapConsumer>
        {props.graves.map(marker => 
          <Marker onClick={() => console.log("test")} key={marker._id} position={[marker.location.lat, marker.location.long]}>
          <Popup>
            <h1 style={{textAlign: "center"}}> { marker.name } </h1>
            <ul style={{listStyle: "none", padding: "3px", textAlign: "center"}}>
                <li>Syntynyt: { marker.birthday }</li>
                <li>Kuollut: { marker.died }</li>
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