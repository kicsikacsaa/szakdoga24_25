import express from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

const router = express.Router();

router.get("/", async (req, res) => {
    const usersRepository = AppDataSource.getRepository(User);

    
    const users = await usersRepository.find();
    
    res.json(users);
})

router.post("/create", async (req, res) =>{
    const usersRepository = AppDataSource.getRepository(User);

    const user = new User();
    user.name = req.body.name
    user.phone = req.body.phone
    user.email = req.body.email

    const inserted = await usersRepository.save(user)
    res.json(inserted)
})

router.put("/update/:id", async (req, res) => {
    const id = parseInt(req.params.id)
    const usersRepository = AppDataSource.getRepository(User);
    const user = await usersRepository.findOneBy({
        id: id
    })

    if(user){
        user.name = req.body.name
        user.phone = req.body.phone
        user.email = req.body.email
        
        const saved = await usersRepository.save(user)
        res.json(saved)
    }else{
        res.status(404).json({
            "message": "Not found"
        })
    }
})

router.delete("/delete/:id", async(req, res) =>{
    const id = parseInt(req.params.id)
    const usersRepository = AppDataSource.getRepository(User);

    const user = await usersRepository.findOneBy({
        id: id
    })

    if(user){
        const saved = await usersRepository.remove(user)
        res.status(204).send()
    }else{
        res.status(404).json({
            "message": "Not found"
        })
    }
})

export default router;