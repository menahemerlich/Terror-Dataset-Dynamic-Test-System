import React from 'react'
import Question from '../components/Question'
import { useNavigate } from 'react-router-dom'

function TestPage() {
    const navigate = useNavigate()

    return (
        <div>
            <Question />
            <button onClick={() => navigate("/")}
            >Home Page</button>
        </div>
    )
}

export default TestPage
