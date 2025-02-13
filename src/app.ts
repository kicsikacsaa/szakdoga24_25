import express, {Request, Response} from "express"
import usersRouter from "./routers/users";
import "reflect-metadata"
import { AppDataSource } from "./data-source";

const app = express();

app.use(express.json())

app.listen(process.env.PORT, () => {
    AppDataSource.initialize().then(() => {
        console.log("Connected to database")
        console.log(`Server is running on ${process.env.PORT}`)
    })
})