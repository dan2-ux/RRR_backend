import mongoose from "mongoose";
import {PORT, MONGO_URL} from './config.js'
import express from 'express'
import Route from './Route/Route.js'
import { Remider } from "./module/Modules.js";
import cors from 'cors'

const app = express()

const port = process.env.PORT || 1000;

app.get('/', (req,res) => {
    if(!Remider){
        return res.status(404).send("<h1>Error</h1>")
    }
    res.status(200).send("<h1>Connected</h1>")
})

app.use(cors())

app.use(express.json());
app.use('/data/', Route)

mongoose.connect(MONGO_URL)
        .then(() => {
            app.listen(port, () => {
                console.log(`RUNNING AT ${port}`)
            })
        })
        .catch((e) => {
            console.log(e.message);
        })
