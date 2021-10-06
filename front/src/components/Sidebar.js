import { FaSearch } from "@react-icons/all-files/fa/FaSearch";

const searchField = () => {
    return (
    <div>
        <div className="form__group field">
            <input type="input" className="form__field" placeholder="Hae" name="name" id='name' required />
            <label htmlFor="name" className="form__label">Hae</label>
        </div>
    </div>
    )
}

const Sidebar = () => {
    return (
    <div>
      <ul id="sidebar">
        <FaSearch style={{ color: "white", marginRight: "1em", marginTop: "2.5em"}} id="searchIcon" /> {searchField()}
    </ul>
    </div>
    )
  }

  export default Sidebar