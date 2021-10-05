import Header from './Header'
import Sidebar from './Sidebar'
import Map from './Map'
import '../css/App.css';

const Home = () => {
    return (
        <div id="mainContainer">
        <Header />
        <Sidebar />
        <div id="mapContainer">
          <Map />
        </div>
      </div>
    )
  }

  export default Home