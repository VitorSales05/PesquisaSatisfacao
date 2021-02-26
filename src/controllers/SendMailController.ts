import { Request, Response } from "express";
import { resolve } from 'path';
import { getCustomRepository } from "typeorm";
import { SurveysRepository } from "../repositories/SurveysRepository";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";
import { UsersRepository } from "../repositories/UsersRepository";
import SendMailService from "../services/SendMailService";


class SendMailController {
    async execute(request: Request, response: Response) {
        const { email, survey_id } = request.body;

        
        // O ideal é que os controllers não alterem as tabelas diretamente
        // Este commando faz com que a UdersRepository manipule as tabela
        const usersRepository = getCustomRepository(UsersRepository);
        const surveysRepository = getCustomRepository(SurveysRepository);
        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);


        // verifica se já existe usuario cadastrado com o mesmo email
        const user = await usersRepository.findOne({ email });
        if(!user){
            return response.status(400).json({
                error: "User does not exists!"
            });
        }


        const survey = await surveysRepository.findOne({ id: survey_id });
        if(!survey){
            return response.status(400).json({
                error: "Survey does not exists!"
            });
        }

        // variaveis necessárias para o envio do email
        const variables = {
            name: user.name,
            title: survey.title,
            description: survey.description,
            user_id: user.id,
            link: process.env.URL_MAIL
        }

        // informa o diretorio onde o arquivo CSS esta
        const npsPath = resolve(__dirname, "..", "views", "emails", "npsMail.hbs");

        // verifica se ja foi enviado um email para o usuario antes de enviar
        // caso já tenha envia o mesmo que já está no DB
        const surveyUserAlreadyExists = await surveysUsersRepository.findOne({
            where: [{user_id: user.id, value: null}],
            relations: ["user", "survey"]
        });

        if( surveyUserAlreadyExists){
            await SendMailService.execute(email, survey.title, variables, npsPath);
            return response.json(surveyUserAlreadyExists);
        }

        // Responsavel por salvar informações na tabela surveyUser
        const surveyUser = surveysUsersRepository.create({
            user_id: user.id,
            survey_id
        });
        await surveysUsersRepository.save(surveyUser);
        
        // responsável por migrar os dados para o envio do email
        // e a partir daí ENVIAR O EMAIL utilizando a função 'execute' 
        await SendMailService.execute(email, survey.title, variables, npsPath);

        return response.json(surveyUser);
    }
}

export { SendMailController };
