import React, { useMemo, useState } from 'react';
import { COLUMNSIX, COLUMNFOUR } from './columns';
import { useSortBy, useTable, useGlobalFilter, useFilters, usePagination } from 'react-table';
import "./style/table.css";
import GlobalFilter from './globalFilter';
import { BiSortUp, BiSortDown, BiSort } from "react-icons/bi"
import { BsChevronDoubleRight, BsChevronDoubleLeft } from "react-icons/bs"
import ColumnFilter from './columnFilter';

const Table = ({ toggle, users, refresh }) => {
    const [showGlobal, setShowGlobal] = useState(false);
    const [showSort, setShowSort] = useState(false);
    const columnSix = useMemo(() => COLUMNSIX, []);
    const columnFour = useMemo(() => COLUMNFOUR, []);
    const data = useMemo(() => users, [users]);
    const defaultColumn = useMemo(() => {
        return {
            Filter: ColumnFilter
        }
    }, []);

    const tableInstance = useTable({
        columns: toggle === false ? columnSix : columnFour,
        data: data,
        defaultColumn
    },
        useFilters,
        useGlobalFilter,
        useSortBy,
        usePagination
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        prepareRow,
        pageOptions,
        state,
        setGlobalFilter,
    } = tableInstance

    const { globalFilter, pageIndex } = state

    const handleGlobal = () => {
        setShowGlobal(!showGlobal);
    }

    const handleSort = () => {
        setShowSort(!showSort)
    }


    if (!toggle) {
        return (
            <div>
                {showGlobal ? <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} /> : <></>}
                <button className='refresh-btn' onClick={() => handleGlobal()}>{showGlobal ? "Disable Global Filter" : "Enable Global Filter"}</button>
                <table {...getTableProps()}>
                    <thead>
                        {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <th {...column.getHeaderProps()}>
                                        {column.render("Header")}
                                        <span {...column.getHeaderProps(column.getSortByToggleProps())} style={{ marginLeft: "10px" }}>
                                            {column.isSorted ? (column.isSortedDesc ? <BiSortDown /> : <BiSortUp />) : <BiSort />}
                                        </span>
                                        <div>{column.canFilter ? column.render('Filter') : null}</div>
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {page.map(row => {
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map((cell) => {
                                        return (
                                            <td {...cell.getCellProps()}>
                                                {cell.render('Cell')}
                                            </td>
                                        )
                                    })}

                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <div className='pagination'>
                    <button onClick={() => previousPage()} disabled={!canPreviousPage}><BsChevronDoubleLeft /></button>
                    <span>{pageIndex + 1} of {pageOptions.length}</span>
                    <button onClick={() => nextPage()} disabled={!canNextPage}><BsChevronDoubleRight /></button>
                </div>
            </div>
        )
    }
    if (toggle) {
        return (
            <div>
                <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
                <button className='refresh-btn' onClick={() => handleSort()}>{showGlobal ? "Disable Sort Filter" : "Enable Sort Filter"}</button>
                <table {...getTableProps()}>
                    <thead>
                        {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <th {...column.getHeaderProps()}>
                                        {column.render("Header")}
                                        {showSort ? <span {...column.getHeaderProps(column.getSortByToggleProps())} style={{ marginLeft: "10px" }}>
                                            {column.isSorted ? (column.isSortedDesc ? <BiSortDown /> : <BiSortUp />) : <BiSort />}
                                        </span> : <></>}
                                        <div>{column.canFilter ? column.render('Filter') : null}</div>
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {page.map(row => {
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map((cell) => {
                                        return (
                                            <td {...cell.getCellProps()}>
                                                {cell.render('Cell')}
                                            </td>
                                        )
                                    })}

                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <div className='pagination'>
                    <button onClick={() => previousPage()} disabled={!canPreviousPage}><BsChevronDoubleLeft /></button>
                    <span>{pageIndex + 1} of {pageOptions.length}</span>
                    <button onClick={() => nextPage()} disabled={!canNextPage}><BsChevronDoubleRight /></button>
                </div>
            </div>
        )
    }
    return <></>
}

export default Table