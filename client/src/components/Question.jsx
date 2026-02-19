import React, { useContext, useEffect, useState } from 'react';
import { UseProvider } from './DataProvider';
import scoreData from "../score.json";

function Question() {
    const { data } = useContext(UseProvider);

    const [item, setItem] = useState({});
    const [answer, setAnswer] = useState("");
    const [score, setScore] = useState(scoreData.score);
    const [questionKeys, setQuestionKeys] = useState([]);

    const keys = ["eventid", "iyear", "country_txt", "city", "attacktype1_txt"];
    useEffect(() => {
        if (data && data.length > 0) {
            const randomIndex = Math.floor(Math.random() * data.length);
            const randomItem = data[randomIndex];
            setItem(randomItem);
            const shuffled = [...keys].sort(() => 0.5 - Math.random());
            setQuestionKeys(shuffled.slice(0, 3));
            setAnswer("");
        }
    }, [data, score]);
    const [item1, item2, item3] = questionKeys;
    async function checkAnswer() {
        if (answer === String(item[item3])) {
            const newScore = score + 1;
            try {
                const response = await fetch("http://localhost:3010/score", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ score: newScore })
                });
                await response.json();
                setScore(prev => prev + 1);
            } catch (error) {
                console.error(error);
            }
        }
    }
    return (
        <div>
            <p>
                When {item1} = {item[item1]} and {item2} = {item[item2]} → what is {item3}?
            </p>
            <input
                type="text"
                placeholder="Answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
            />
            <button onClick={checkAnswer}>
                Answer
            </button>
            <p>Score: {score}</p>
        </div>
    );
}

export default Question;
