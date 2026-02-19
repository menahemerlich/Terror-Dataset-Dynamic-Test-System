import React from 'react'
import { useContext } from 'react';
import { useState } from 'react'
import { UseProvider } from './DataProvider';

function Filter() {
    const [searchWord, setSearchWord] = useState("")
    const [greater, setGreater] = useState(0)
    const [less, setLass] = useState(0)
    const { setData, originalData } = useContext(UseProvider);
    return (
        <div>
            <input type="text" value={searchWord} placeholder='city or country' onChange={(e) => { setSearchWord(e.target.value) }} />
            <label htmlFor="">Year getter from</label>
            <input type="number" value={greater} placeholder='greater' onChange={(e) => setGreater(e.target.value)} />
            <label htmlFor="">Year lass from</label>
            <input type="number" value={less} placeholder='lass' onChange={(e) => setLass(e.target.value)} />
            <button onClick={() => {
                if (!(searchWord === "")) {
                    const filtered = originalData.filter(item =>
                        searchWord.toLowerCase() === (item.country_txt.toLowerCase() || item.city.toLowerCase()) && item.iyear > greater && item.iyear < less
                    );
                    setData(filtered);
                } else {
                    setData(originalData)
                }
            }}>
                Filter
            </button>
            <button onClick={() => {
                setData(originalData)
                setSearchWord("")
                setGreater(0)
                setLass(0)
            }}
            >All</button>
        </div>
    )
}

export default Filter


// const { data, setData, originalData } = useContext(UseProvider);


