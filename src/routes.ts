import { Router } from "express";
import { SendMailController } from "./controllers/SendMailController";
import { SurveyController } from "./controllers/SurveyController";
import { UserController } from "./controllers/UserController";


// variavel de Router
const router = Router();

// instanciando a classe UserController
const userController = new UserController();
const surveyController = new SurveyController();
const sendMailController = new SendMailController();


// definindo a url que ira ter a função de criar 
router.post("/users", userController.create);

router.post("/surveys", surveyController.create);
router.get("/surveys", surveyController.show);

router.post("/sendMail", sendMailController.execute);



// exportando os metodos Router
export { router };
