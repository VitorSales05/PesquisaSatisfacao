import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";

class UserController {
    async create(request: Request, response: Response){
        const { name , email } = request.body;
        
        // O ideal é que os controllers não alterem as tabelas diretamente
        // Este commando faz com que a UdersRepository manipule as tabela
        const usersRepository = getCustomRepository(UsersRepository);

        
        // verifica se já existe usuario cadastrado com o mesmo email
        const userAlreadyExists = await usersRepository.findOne({
            email
        });
        if(userAlreadyExists){
            return response.status(400).json({
                error:"User Already Exists!"
            });
        }
        
        // realiza o cadastro do usuario
        const user = usersRepository.create({
            name, 
            email,
        });
        await usersRepository.save(user);
        return response.status(201).json(user);
    }
}


export { UserController };
