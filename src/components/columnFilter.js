import React, { useState } from 'react'
import { useAsyncDebounce } from 'react-table';

const ColumnFilter = ({ column }) => {
    const { filterValue, setFilter } = column;
    const [value, setValue] = useState(filterValue);
    const handleChange = useAsyncDebounce((value) => {
        setFilter(value || undefined)
    }, 1000)
    return (
        <span>
            <input className='col-search' type='text'
                placeholder='Search' value={value || ""}
                onChange={(e) => {
                    setValue(e.target.value)
                    handleChange(e.target.value)
                }} />
        </span>
    )
}

export default ColumnFilter