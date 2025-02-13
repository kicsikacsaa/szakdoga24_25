import express from "express"
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

const router = express.Router()
const usersRepository = AppDataSource.getRepository(User);

router.get("/", async (req, res) => {
    const users = await usersRepository.find();
    
    res.json(users);
    return
})

router.post("/create", async (req, res) =>{
    const user = new User();

    user.name = req.body.name
    user.phone = req.body.phone
    user.email = req.body.email

    const inserted = await usersRepository.save(user)
    res.status(201).json(inserted)
    return
})

router.put("/update/:id", async (req, res) => {
    const user = await usersRepository.findOneBy({
        id: parseInt(req.params.id)
    })

    if(user){
        user.name = req.body.name
        user.phone = req.body.phone
        user.email = req.body.email

        const saved = await usersRepository.save(user)
        res.status(200).json(saved)
        return
    }else{
        res.status(404).send("Not found!")
        return
    }
})

router.delete("/delete/:id", async(req, res) =>{
    const user = await usersRepository.findOneBy({
        id: parseInt(req.params.id)
    })

    if(user){
        await usersRepository.remove(user)
        res.status(204).send()
        return
    }else{
        res.status(404).send("Not found!")
    }
})

export default router;