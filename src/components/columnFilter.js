import React from 'react'

const ColumnFilter = ({ filter, setFilter }) => {
    return (
        <span>
            <input type='text' placeholder='Search' value={filter || ""} onChange={(e) => setFilter(e.target.value)} />
        </span>
    )
}

export default ColumnFilter