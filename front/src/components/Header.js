import { Link } from 'react-router-dom'

const Header = ( {isLoggedIn, setIsLoggedIn} ) => {

  function logOut() {
    localStorage.clear()
    setIsLoggedIn(false)
  }

  if(isLoggedIn) {
    return (
      <header>
        <h1><Link to="/" style={{marginLeft: "215px"}}>Hautapaikat</Link></h1>
        <ul id="nav">
          <h4 style={{ color: "#e90177", margin:0, marginRight:30 }}>Tervetuloa, {JSON.parse(localStorage.getItem("username"))}!</h4>
          <li><Link className="hvr-wobble-skew" to="/about" onClick={() => console.log("Test")}>Sivustosta</Link></li>
          <li><Link className="hvr-wobble-skew" to="/" onClick={logOut} style={{fontWeight: "bold"}}>Kirjaudu ulos</Link></li>
      </ul>
      </header>
    )
  } else {
    return (
      <header>
        <h1><Link to="/" style={{marginLeft: "215px"}}>Hautapaikat</Link></h1>
        <ul id="nav">
            <li><Link className="hvr-wobble-skew" to="/login">Kirjaudu sisään</Link></li>
            <li><Link className="hvr-wobble-skew" to="/register">Rekisteröidy</Link></li>
            <li><Link className="hvr-wobble-skew" to="/about">Sivustosta</Link></li>
      </ul>
      </header>
    )
  }

}

  export default Header