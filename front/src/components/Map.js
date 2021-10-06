import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import L from 'leaflet';

const Map = (props) => {

    let DefaultIcon = L.icon({
        iconUrl: icon,
        shadowUrl: iconShadow
    });
    
    L.Marker.prototype.options.icon = DefaultIcon;
    return (
        <MapContainer style={{ width: "56vw", height: "35vw"}} center={[65.5538179, 27.7496755]} zoom={5} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[65.5538179, 27.7496755]}>
          <Popup>
            Karttamerkintä 1. <br /> Tännekkin on haudattuna joku.
          </Popup>
        </Marker>

        {/* Propseina saadut markkerien tiedot asetetaan tässä kartalle */}
        
        {props.markers.map(marker => 
          <Marker key={marker.id} position={marker.position}>
          <Popup>
            <span> { marker.info } <br/> Easily customizable.</span>
          </Popup>
          </Marker>
        )}
      </MapContainer>
    )
  }

  export default Map