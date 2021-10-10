import Header from './Header'

const About = ( {isLoggedIn, setIsLoggedIn} ) => {
    return (
    <div>
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
        <div id="aboutContainer">
            <h2 style={{ color: "white" }}>Tämä sivusto on tehty Metropolian opiskelijatyönä.</h2>
        </div>
    </div>
    )
  }

  export default About