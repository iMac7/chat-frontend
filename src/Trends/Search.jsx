import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import './search.css'


function Search() {
    return (
        <div id="search">
            <SearchIcon/>
            <input type="text" id='searchInput' />
        </div>
    )
}

export default Search
