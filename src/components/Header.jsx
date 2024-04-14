import React, {useState} from "react";
import SearchIcon from '/search.svg'

export default function Header(props) {
    const handleFilterChange = (event) => {
        props.onFilterChange(event.target.value)
    }

    const handleSearch = (event) => {
        props.onSearch(event.target.value)
    }

    return(
        <header>

            <div className="search--wrapper flex-ac-jcse">
                <img src={SearchIcon} />
                <input 
                    className="search"
                    type="text" 
                    placeholder="Search Pokemon"
                    onChange={handleSearch}
                    value={props.searchInput}
                />
            </div>

            <a className="header--title absolute-center" href="/"><h1>POKEDEX V3</h1></a>

            <div 
                className="filter--wrapper flex-ac-jcse"
                onChange={handleFilterChange}
            >
                <select name="filter" id="filter">
                    <option value="asc-num">Ascending - Number</option>
                    <option value="desc-num">Descending - Number</option>
                    <option value="asc-name">Ascending - Name</option>
                    <option value="desc-name">Descending - Name</option>
                </select>
            </div>

        </header>
    )
}