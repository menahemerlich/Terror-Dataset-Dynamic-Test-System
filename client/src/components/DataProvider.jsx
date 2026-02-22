import React, { useState, useEffect, createContext } from 'react'

const UseProvider = createContext()

function DataProvider({ children }) {
    const [data, setData] = useState([]);
    const [originalData, setOriginalData] = useState([]);
    const [score, setScore] = useState(0);
    const [currentItem, setCurrentItem] = useState(null);
    const [currentKeys, setCurrentKeys] = useState([]);

    useEffect(() => {
        async function fetchInitialScore() {
            try {
                const response = await fetch("http://localhost:3010/score");
                if (response.ok) {
                    const result = await response.json();
                    setScore(result.score || 0);
                }
            } catch (error) {
                console.error("Error fetching score:", error);
            }
        }
        fetchInitialScore();
    }, []);

    return (
        <UseProvider value={{ 
            data, setData, 
            originalData, setOriginalData, 
            score, setScore,
            currentItem, setCurrentItem,
            currentKeys, setCurrentKeys
        }}>
            {children}
        </UseProvider>
    )
}

export { DataProvider, UseProvider }