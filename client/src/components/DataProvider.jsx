import React from 'react'
import { useState } from 'react'
import { createContext } from 'react'

const UseProvider = createContext()

function DataProvider({ children }) {
    const [data, setData] = useState([]);
    const [originalData, setOriginalData] = useState([]);
    return (
        <UseProvider value={{ data, setData , originalData, setOriginalData}}>
            {children}
        </UseProvider>
    )
}

export { DataProvider, UseProvider }
