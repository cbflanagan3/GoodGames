import React, { useState, useEffect } from "react";
import store, {fetchGames} from '../store/actions'


const Search = (props) => {
  const [searchValue, setSearchValue] = useState("");

//   useEffect(() => {
//     console.log(props)
//     props.fetchGames();
// }, []);
  
  const handleSearchInputChanges = (e) => {
    setSearchValue(e.target.value);
  }

  const resetInputField = () => {
    setSearchValue("")
  }

  const callSearchFunction = (e) => {
    e.preventDefault();
    props.search(searchValue);
    resetInputField();
  }

  return (
      <div>
      <form className="search">
        <input
          value={searchValue}
          onChange={handleSearchInputChanges}
          type="text"
        />
        <input onClick={callSearchFunction} type="submit" value="SEARCH" />
      </form>
      <select name="platfrom">Platform:
      <option value =''>Platform</option>
      <option value="Playstation4">Playstation 4</option>
      <option value="nintendo">Nintendo Switch</option>
      <option value="xbox">XBox</option>
      <option value="pc">PC</option>
      </select>
      <select name="Length">Length:
      <option value =''>Length</option>
      <option value="short">Less than 3 hours</option>
      <option value="sortofshort">3-10 hours</option>
      <option value="medium">10-30 hours</option>
      <option value="long">30-50 hours</option>
      <option value="verylong">More than 50 hours</option>
      </select>
      </div>
    );
}

export default Search;