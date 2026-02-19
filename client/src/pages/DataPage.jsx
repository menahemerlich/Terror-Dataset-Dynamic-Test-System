import React from 'react'
import DataTable from '../components/DataTable'
import Filter from '../components/Filter'
import { useNavigate } from 'react-router-dom'
function DataPage() {
    const navigate = useNavigate()
    return (
        <>
            <Filter />
            <button onClick={()=>navigate("/test")}
            >Test Page</button>
            <DataTable />
        </>
    )
}

export default DataPage
