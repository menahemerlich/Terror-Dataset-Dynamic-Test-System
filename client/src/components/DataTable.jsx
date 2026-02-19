import React, { useContext, useEffect } from 'react';
import { UseProvider } from './DataProvider';

function DataTable() {
    const { data, setData, setOriginalData } = useContext(UseProvider);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("http://localhost:3010/loadData");
                const result = await response.json();
                setData(result);
                setOriginalData(result);
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();
    }, [setData]);

    return (
            <tbody>
                <tr>
                    <th>Event ID</th>
                    <th>Year</th>
                    <th>Country</th>
                    <th>City</th>
                    <th>Attack Typr</th>
                </tr>
                {Array.isArray(data) && data.map((item, index) => (
                    <tr key={index} className='row'>
                        <td>{item.eventid}</td>
                        <td>{item.iyear}</td>
                        <td>{item.country_txt}</td>
                        <td>{item.city}</td>
                        <td>{item.attacktype1_txt}</td>
                    </tr>
                ))}
            </tbody>
    );
}

export default DataTable;
