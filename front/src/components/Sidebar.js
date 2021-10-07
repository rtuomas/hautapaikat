import { FaSearch } from "@react-icons/all-files/fa/FaSearch";
import { FaPlusCircle } from "@react-icons/all-files/fa/FaPlusCircle";
import { FaMinusCircle } from "@react-icons/all-files/fa/FaMinusCircle";
import { useState } from "react"
import axios from "axios";

const searchField = () => {
    return (
    <div style={{display:"flex"}}>
    <FaSearch style={{ color: "white", marginRight: "1em", marginTop: "2.5em"}} id="searchIcon" />
        <div className="form__group field">
            <input type="input" className="form__field" placeholder="Hae" name="name" id='name' required />
            <label htmlFor="name" className="form__label">Hae</label>
        </div>
    </div>
    )
}

const Sidebar = (props) => {

    let newGrave = {
        firstName: "",
        lastName: "",
        birthday: "",
        died: "",
        cemetery: "",
        location: {lat: "", long: ""},
        category: "musician"
    };

    const [isOpen, setOpen] = useState(false)

    function sendFormData(event) {
        event.preventDefault();
        console.log(newGrave);

        axios.post("http://localhost:3002/addDead", {
            newGrave
        }).then(res =>  {
            console.log(res)
        }).catch(error => {
            console.log(error);
        })
    }

    function addGrave() {
        if (!isOpen) {
            return (
            <div style={{ color: "white", marginRight: "1em", marginTop: "2.5em", display: "flex", cursor: "pointer" }}>
                <p onClick={() => setOpen(!isOpen)}><FaPlusCircle style={{marginRight: "1em"}} />Lisää hautapaikka</p>
            </div>
            )
        } else {
            return (
            <>
                <div style={{ color: "white", marginRight: "1em", marginTop: "2.5em", display: "flex", cursor: "pointer"}}>
                    <p onClick={() => setOpen(!isOpen)}><FaMinusCircle style={{marginRight: "1em"}} />Lisää hautapaikka</p>
                </div>

                <div id="newGraveContainer" style={{marginBottom: "3rem"}}>
                    <form onSubmit={(event) => sendFormData(event)}>
                        <div id="newGraveForm">
                                <label htmlFor="firstName" style={{ color:"white", marginRight:"1em"}}>Etunimi</label>
                                <input type="input" placeholder="Etunimi" name="firstName" id='firstName' required onChange={event => newGrave.firstName = event.target.value} />

                                <label htmlFor="lastName" style={{color:"white", marginRight:"1em"}}>Sukunimi</label>
                                <input type="input" placeholder="Sukunimi" name="lastName" id='lastName' required onChange={event => newGrave.lastName = event.target.value} />

                                <label htmlFor="born" style={{color:"white", marginRight:"1em"}}>Syntynyt</label>
                                <input type="date" placeholder="Syntynyt" name="born" id='born' required onChange={event => newGrave.birthday = event.target.value} />

                                <label htmlFor="died" style={{ color:"white", marginRight:"1em"}}>Kuollut</label>
                                <input type="date" placeholder="Kuollut" name="died" id='died' required onChange={event => newGrave.died = event.target.value} />

                                <label htmlFor="cemetery" style={{ color:"white", marginRight:"1em"}}>Hautausmaa</label>
                                <input type="input" placeholder="Hautausmaa" name="cemetery" id='cemetery' required onChange={event => newGrave.cemetery = event.target.value} />

                                <label htmlFor="x" style={{color:"white", marginRight:"1em"}}>X-koordinaatti</label>
                                <input type="input" placeholder="X-koordinaatti" name="x" id='x' required onChange={event => newGrave.location.lat = event.target.value} />

                                <label htmlFor="y" style={{color:"white", marginRight:"1em"}}>Y-koordinaatti</label>
                                <input type="input" placeholder="Y-koordinaatti" name="y" id='y' required onChange={event => newGrave.location.long = event.target.value} />

                            <label htmlFor="category" style={{color:"white", marginRight:"1em"}}>Kategoria</label>
                            <select name="category" id="category" onChange={event => newGrave.category = event.target.value}>
                                <option value="musician">Muusikko</option>
                                <option value="politician">Poliitikko</option>
                                <option value="actor">Näyttelijä</option>
                                <option value="other">Muu</option>
                            </select>
                            <input id="newGraveButton" style={{ marginTop: "1em" }} type="submit" value="Lähetä"/>
                        </div>
                    </form>
                </div>
            </>
            )
        }
    }

    // Lisättävä demomarker. Tiedot tulevat siis myöhemmin klikkaamalla haluttua vainajaa.

    let dynamicMarker = {
        position: [63.5538179, 27.7496755],
        info: "Merkintä sidebarilta nro. "
    };

    return (
    <>
      <ul id="sidebar">
        {/* Kutsutaan propseina saatua addMarkeria */}
        <button onClick={() => props.addMarker(dynamicMarker)}>Lisää markkeri</button>
        { addGrave() }
        { searchField() }
    </ul>
    </>
    )
  }

  export default Sidebar