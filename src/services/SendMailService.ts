import nodemailer, { Transporter } from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'fs';


class SendMailService {
    // variavel reponsável por possibilitar a utilização da variavel 'transporter'
    
    private client: Transporter;
    // Serviço que facilita o envio do email
    constructor(){
        nodemailer.createTestAccount().then((account) => {
            const transporter = nodemailer.createTransport({
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure,
                auth: {
                    user: account.user,
                    pass: account.pass
                },
            });

            this.client = transporter;
        });
    }

    // configura e envia o email
    async execute(to: string, subject: string, variables: object, path: string){

        // pesquisa o arquivo CSS modelo para o email
        const templateFileContent = fs.readFileSync(path).toString("utf-8");

        // compila o arquivo CSS
        const mailTemplateParse = handlebars.compile(templateFileContent);

        // define os dados que serão exportados pelo email
        const html = mailTemplateParse(variables);

        // realiza o envio do email
        const message = await this.client.sendMail({
            to,
            subject,
            html,
            from: "NPS <noreplay@nps.com.br>",
        });

        console.log("Mensage sent: %s", message.messageId);
        console.log("Message URL: $s", nodemailer.getTestMessageUrl(message));
    }
}

export default new SendMailService();