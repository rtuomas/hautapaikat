import { FaSearch } from "@react-icons/all-files/fa/FaSearch";
import { FaPlusCircle } from "@react-icons/all-files/fa/FaPlusCircle";
import { FaMinusCircle } from "@react-icons/all-files/fa/FaMinusCircle";
import { FaTimes } from "@react-icons/all-files/fa/FaTimes";
import { useState } from "react"
import services from '../services/axios_services'
import arrowImg from '../img/arrowImg.png'

let newGrave = {
    firstName: "",
    lastName: "",
    birthday: "",
    died: "",
    cemetery: "",
    location: {lat: "", long: ""},
    category: ""
};

const Sidebar = (props) => {
    const [newGraveNotification, setNewGraveNotification] = useState("");
    const [isOpen, setOpen] = useState(false)
    const [searchContent, setSearchContent] = useState("")
    const [resultDetails, showResultDetails] = useState(false)
    const [idOfDetails, setId] = useState("")

    newGrave.location = props.newGraveCoordinates

    function sendFormData(event) {
        event.preventDefault();
        if (validateForm()) {
                console.log(newGrave);
                services
                    .newGrave(newGrave)
                    .then(res => {
                        setNewGraveNotification(res.message)
                        props.fetchGraves();
                    }).catch(error => {
                        console.log(error)
                    })
            } else {
                setNewGraveNotification('Fill every field and try again')
                console.log(newGrave)
            }
    }

    function deleteGrave(id) {
        console.log("Delete grave: " + id)
        services.deleteGrave(id).then(res => {
            console.log(res)
            props.fetchGraves();
        }).catch(error => {
            console.log(`Problem loading graves from database: ${error}`)
        })
    }

    function validateForm() {
        return (newGrave.firstName.length > 0 && newGrave.lastName.length > 0 && newGrave.birthday.length > 0 && newGrave.died.length > 0 && newGrave.cemetery.length > 0 &&
            newGrave.category.length > 0 && props.isLoggedIn)
    }

    function setGraveAddingTo(boolean){
        props.addingNewGrave(boolean)
    }

    function toggleNewGraveForm(){
        setOpen(!isOpen)
        setGraveAddingTo(!isOpen)
    }

    function formatDate (date) {
        let datePart = date.match(/\d+/g),
            year = datePart[0].substring(0),
            month = datePart[1],
            day = datePart[2];

        return day+'.'+month+'.'+year;
    }

    function addGrave() {
        if (props.isLoggedIn) {
            if (!isOpen) {
                return (
                <div style={{ color: "white", marginRight: "1em", marginTop: "2.5em", display: "flex", cursor: "pointer" }}>
                    <p onClick={() => toggleNewGraveForm()}><FaPlusCircle style={{marginRight: "1em"}} />Lisää hautapaikka</p>
                </div>
                )
            } else {
                return (
                <>
                    <div style={{ color: "white", marginRight: "1em", marginTop: "2.5em", display: "flex", cursor: "pointer"}}>
                        <p onClick={() => toggleNewGraveForm() }><FaMinusCircle style={{marginRight: "1em"}} />Lisää hautapaikka</p>
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
                                    <input type="number" placeholder="X-koordinaatti" name="x" id='x' required onSubmit={event => newGrave.location.lat = event.target.value} value={props.newGraveCoordinates.lat}/>

                                    <label htmlFor="y" style={{color:"white", marginRight:"1em"}}>Y-koordinaatti</label>
                                    <input type="number" placeholder="Y-koordinaatti" name="y" id='y' required onSubmit={event => newGrave.location.long = event.target.value} value={props.newGraveCoordinates.long} />
    
                                <label htmlFor="category" style={{color:"white", marginRight:"1em"}}>Kategoria</label>
                                <select name="category" id="category" onChange={event => newGrave.category = event.target.value} required>
                                    <option value="-">Ei kategoriaa</option>
                                    <option value="Musiikki">Muusikko</option>
                                    <option value="Politiikka">Poliitikko</option>
                                    <option value="Elokuvat">Elokuvat</option>
                                    <option value="Viihde">Viihde</option>
                                    <option value="Muu">Muu</option>
                                </select>
                                <div className="button" id="button-7" onClick={() => document.getElementById("newGraveButton").click()} style={{marginTop: "1rem"}}>
                                    <div id="dub-arrow"><img src={arrowImg} alt="" /></div>
                                    <p>Lähetä</p>
                                </div>
                                <input id="newGraveButton" style={{ marginTop: "1em", display:"none" }} type="submit" value="submit"/>
                            </div>
                        </form>
                        <p style={{color:"red"}}>{newGraveNotification}</p>
                    </div>
                </>
                )
            }
        } else {
            return null;
        }
    }

    function handleResultClick(showOrHide, id, location) {
        showResultDetails(showOrHide)
        setId(id)
        if(showOrHide) {
            props.handleSetCoordinatesForZoom(location)
        }
    }

    function chooseFilteringMethod() {
        let array;
        if (searchContent.charAt(0) === "#") {
            array = props.graves.filter(item => {
                if(item.category) {
                    return item.category.includes(searchContent.substring(1)) || item.category.toUpperCase().includes(searchContent.substring(1)) || item.category.toLowerCase().includes(searchContent.substring(1))
                } else {
                    return null
                }
            })
        } else if (searchContent.charAt(0) === "@") {
            array = props.graves.filter(item => {
                return item.cemetery.includes(searchContent.substring(1)) || item.cemetery.toUpperCase().includes(searchContent.substring(1)) || item.cemetery.toLowerCase().includes(searchContent.substring(1))
            })
        } else if (searchContent.length > 0) {
            array = props.graves.filter(item => {
                return item.name.toLowerCase().includes(searchContent) || item.name.toUpperCase().includes(searchContent) || item.name.includes(searchContent)
            })
        } else if (searchContent.length === 0) {
            array = props.graves
        }
        return array;
    }

    function handleSearching(event) {
        event.preventDefault()
        setSearchContent(event.target.value)
    }

    const resultsList = () => {
        return (
            <ul id="results">
            {chooseFilteringMethod().map(item =>
            <li key={item._id}>
                <div id="singleResult" onClick={() => handleResultClick(!resultDetails, item._id, item.location)}>{item.name}</div>
                {(() => {
                if (resultDetails && idOfDetails === item._id){
                    return (
                        <div id="singleResultDetails">
                            <ul>
                                <li>Syntynyt: { formatDate(item.birthday) }</li>
                                <li>Kuollut: { formatDate(item.died) }</li>
                                <li>Hautausmaa: { item.cemetery }</li>
                                <li>Kategoria: { item.category ?? "-" }</li>
                            </ul>
                            <div id="deleteGrave" onClick={() => deleteGrave(item._id)}>
                                <FaTimes id="deleteGraveIcon"/>
                                <p>Poista hauta</p>
                            </div>
                        </div>
                    )
                }
            })()}
            </li>
            )}
        </ul>
            )
    }

    return (
    <>
      <ul id="sidebar">
        { props.isLoggedIn ? addGrave() : null }
        <div style={{display:"flex"}}>
            <FaSearch style={{ color: "white", marginRight: "1em", marginTop: "2.5em"}} id="searchIcon" />
            <div className="form__group field">
                <input type="input" className="form__field" placeholder="Hae" name="search" id='search' onChange={event => handleSearching(event)} />
                <label htmlFor="name" className="form__label">Hae</label>
            </div>
        </div>
        { resultsList() }
    </ul>
    </>
    )
  }

  export default Sidebar