import { Link } from 'react-router-dom'

const Header = ( {isLoggedIn, setIsLoggedIn} ) => {

  function logOut() {
    localStorage.clear()
    setIsLoggedIn(false)
  }

  if(isLoggedIn) {
    return (
      <header>
        <h1><Link to="/">Hautapaikat.fi</Link></h1>
        <ul id="nav">
            <li><Link className="hvr-wobble-skew" to="/about">Sivustosta</Link></li>
            <button onClick={logOut}>Kirjaudu ulos</button>
      </ul>
      </header>
    )
  } else {
    return (
      <header>
        <h1><Link to="/">Hautapaikat.fi</Link></h1>
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