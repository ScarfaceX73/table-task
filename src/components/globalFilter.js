import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useAsyncDebounce } from 'react-table';

const GlobalFilter = ({ filter, setFilter }) => {
    const [value, setValue] = useState(filter);
    const handleChange = useAsyncDebounce((value) => {
        setFilter(value || undefined)
    }, 1000)

    return (
        <div className='inp-div'>
            <input className='search-field' type='text'
                placeholder='Search' value={value || ""}
                onChange={(e) => {
                    setValue(e.target.value)
                    handleChange(e.target.value)
                }} />
            <span className='inp-btn'><FiSearch /></span>
        </div>
    )
}

export default GlobalFilter