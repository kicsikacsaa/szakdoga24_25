import express, {Request, Response} from "express"
import usersRouter from "./routers/users";
import "reflect-metadata"
import { AppDataSource } from "./data-source";

const app = express();

app.use(express.json())

app.use("/users", usersRouter);



async function run1(){
    return new Promise((resolve, reject) => {
        console.log("run1 start")

    setTimeout(() => {
        console.log("run1 stop")
        resolve("end")
    }, 100)
    })
}

app.get("/ping", (req: Request, res: Response) => {
    res.send("pong");
})

async function fnc1(){
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("fnc1")
            resolve("fnc1")
        }, 200)
    })
}

async function fnc2(){
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("fnc2")
            resolve("fnc2")
        }, 300)
    })
}

async function fnc3(){
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("fnc3")
            resolve("fnc3")
        }, 100)
    })
}

app.listen(3000, async() => {

    const promises = [fnc1(), fnc2(), fnc3()]

    Promise.all(promises).then(() => {
        console.log("all finished")
    })

    run1().then((resolved) =>{
        console.log("end of run1, ertek: " + resolved)

        AppDataSource.initialize().then(() => {
            console.log("Connected to database")
        })
        console.log("Server is running...")
    })
    
   /*
    const resolved = await run1()
    console.log("end of run1, ertek: " + resolved)
    AppDataSource.initialize()
            .then(() => {
                console.log("Connected to database")
    })
    console.log("Server is running...")
    */
})