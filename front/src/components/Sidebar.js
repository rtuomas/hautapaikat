import { FaBeer } from "@react-icons/all-files/fa/FaBeer";
import { FaSearch } from "@react-icons/all-files/fa/FaSearch";
import { IconContext } from "react-icons";

const searchField = () => {
    return (
    <div>
        <div class="form__group field">
            <input type="input" class="form__field" placeholder="Hae" name="name" id='name' required />
            <label for="name" class="form__label">Hae</label>
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