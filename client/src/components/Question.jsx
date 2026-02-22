import React, { useContext, useEffect, useState, useCallback } from 'react';
import { UseProvider } from './DataProvider';

function Question() {
    const { data, score, setScore, currentItem, setCurrentItem, currentKeys, setCurrentKeys} = useContext(UseProvider);

    const [answer, setAnswer] = useState("");
    const [feedback, setFeedback] = useState("");

    const keys = ["eventid", "iyear", "country_txt", "city", "attacktype1_txt"];

    const generateNewQuestion = useCallback(() => {
        if (data && data.length > 0) {
            const randomIndex = Math.floor(Math.random() * data.length);
            const randomItem = data[randomIndex];
            const shuffled = [...keys].sort(() => 0.5 - Math.random());

            setCurrentItem(randomItem);
            setCurrentKeys(shuffled.slice(0, 3));
            setAnswer("");
            setFeedback("");
        }
    }, [data]);

    useEffect(() => {
        if (data.length > 0 && !currentItem) {
            generateNewQuestion();
        }
    }, [data, currentItem, generateNewQuestion]);

    async function checkAnswer() {
        const targetKey = currentKeys[2];
        if (answer.trim().toLowerCase() === String(currentItem[targetKey]).toLowerCase()) {
            const newScore = score + 1;
            try {
                const response = await fetch("http://localhost:3010/score", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ score: newScore })
                });

                if (response.ok) {
                    setScore(newScore);
                    setFeedback("Correct! You can move to the next question.");
                }
            } catch (error) {
                console.error("Error:", error);
            }
        } else {
            setFeedback("Wrong answer, please try again.");
        }
    }
    if (!currentItem || currentKeys.length < 3) return <div>Loading...</div>;
    const [item1, item2, item3] = currentKeys;
    return (
        <div>
            <div>Score: {score}</div>
            <p>
                When: {item1} = <strong>{currentItem[item1]}</strong> and {item2} = <strong>{currentItem[item2]}</strong>.
            </p>
            <p>What is <strong>{item3}</strong>?</p>

            <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
            />

            <div>
                <button onClick={checkAnswer}>Check</button>
                <button onClick={generateNewQuestion}>Next Question</button>
            </div>

            {feedback && <div>{feedback}</div>}
        </div>
    );
}

export default Question;