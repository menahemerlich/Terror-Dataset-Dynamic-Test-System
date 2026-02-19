import express from 'express'
import cors from 'cors'
import csv from 'async-csv'
import fs from 'fs/promises'
import { writeFile } from './utils/fileFunctions.js'

const app = express()

app.use(cors())
app.use(express.json())

app.get("/loadData", async (req, res) => {
    try {
        const csvString = await fs.readFile('./db/terrorData.csv', 'utf-8');
        const data = await csv.parse(csvString, { columns: true })
        const dataToSubmit = data.slice(0, 50)
        console.log(dataToSubmit.length);
        res.status(200).json(dataToSubmit)
    } catch (error) {
        console.error(error);
    }
})

app.post("/score", async(req, res)=>{
    try {
        if (req.body && req.body.score){
            const {score} = req.body
            await writeFile("./score.json", {date: new Date().toISOString(), score:score})
            res.status(200).send("הציון עודכן בהצלחה")
        }else{
            res.status(400).send("שגיאה בשליחת הנתונים")
        }
    } catch (error) {
        console.error(error);
    
    }
})

app.listen(3010, () => {
    console.log("server runing...");
})