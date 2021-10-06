import { Link } from 'react-router-dom'

const Header = () => {
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

  export default Header