import React from 'react'
import { FiSearch } from 'react-icons/fi'

const GlobalFilter = ({ filter, setFilter }) => {
    return (
        <div className='inp-div'>
            <input type='text' placeholder='Search' value={filter || ""} onChange={(e) => setFilter(e.target.value)} />
            <span className='inp-btn'><FiSearch /></span>
        </div>
    )
}

export default GlobalFilter