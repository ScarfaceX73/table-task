import React, { useMemo } from 'react';
import { COLUMNSIX, COLUMNFOUR } from './columns';
import { useSortBy, useTable, useGlobalFilter, useFilters } from 'react-table';
import "./style/table.css";
import GlobalFilter from './globalFilter';
import { BiSortUp, BiSortDown, BiSort } from "react-icons/bi"
import ColumnFilter from './columnFilter';

const Table = ({ toggle, users }) => {
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
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state,
        setGlobalFilter,
    } = tableInstance

    const { globalFilter } = state

    if (!toggle) {
        return (
            <div>
                <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
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
                        {rows.map(row => {
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
            </div>
        )
    }
    if (toggle) {
        return (
            <div>
                <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
                <table {...getTableProps()}>
                    <thead>
                        {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
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
                        {rows.map(row => {
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
            </div>
        )
    }
    return <></>
}

export default Table