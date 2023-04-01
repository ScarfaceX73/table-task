import React, { useMemo } from 'react';
import { COLUMNSIX, COLUMNFOUR } from './columns';
import { useSortBy, useTable, useGlobalFilter } from 'react-table';
import "./style/table.css";
import GlobalFilter from './globalFilter';

const Table = ({ toggle, users }) => {
    const columnSix = useMemo(() => COLUMNSIX, []);
    const columnFour = useMemo(() => COLUMNFOUR, []);
    const data = useMemo(() => users, [users]);

    const tableInstance = useTable({
        columns: toggle === false ? columnSix : columnFour,
        data: data
    },
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
                                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                        {column.render("Header")}
                                        <span style={{ marginLeft: "10px" }}>{column.isSorted ? (column.isSortedDesc ? "🔼" : "🔽") : ""}</span>
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
                                        <span style={{ marginLeft: "10px" }}>{column.isSorted ? (column.isSortedDesc ? "🔼" : "🔽") : ""}</span>
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