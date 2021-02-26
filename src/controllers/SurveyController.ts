import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveysRepository } from "../repositories/SurveysRepository";


class SurveyController {
    async create(request: Request, response: Response){
        const { title , description } = request.body;

        // O ideal é que os controllers não alterem as tabelas diretamente
        // Este commando faz com que a UdersRepository manipule as tabela
        const surveysRepository = getCustomRepository(SurveysRepository);

        
        // realiza o cadastro do survey
        const survey = surveysRepository.create({ title, description });
        await surveysRepository.save(survey);
        return response.status(201).json(survey);
    }

    async show(request: Request, response: Response){

        // O ideal é que os controllers não alterem as tabelas diretamente
        // Este commando faz com que a UdersRepository manipule as tabela
        const surveysRepository = getCustomRepository(SurveysRepository);

        const all = await surveysRepository.find();
        return response.json(all);
    }
}


export { SurveyController };
