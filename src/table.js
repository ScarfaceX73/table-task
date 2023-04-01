import React, { useMemo } from 'react';
import { COLUMNSIX, COLUMNFOUR } from './columns';
import { useTable } from 'react-table';
import "./table.css";

const Table = ({ toggle, users }) => {
    const columnSix = useMemo(() => COLUMNSIX, []);
    const columnFour = useMemo(() => COLUMNFOUR, []);
    const data = useMemo(() => users, [users]);

    const tableInstance = useTable({
        columns: toggle === false ? columnSix : columnFour,
        data: data
    })

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance

    if (!toggle) {
        return (
            <div>
                <table {...getTableProps()}>
                    <thead>
                        {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <th {...column.getHeaderProps()}>{column.render("Header")}</th>
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
                <table {...getTableProps()}>
                    <thead>
                        {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <th {...column.getHeaderProps()}>{column.render("Header")}</th>
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