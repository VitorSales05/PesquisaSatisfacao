import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { Survey } from "./Survey";
import { User } from "./User";


// É necessário a classe ser uma entidade ( @Entity ), onde é informado o nome da tabela do DB
// Essa entidade é utilizado pelo ORM para a criação de uma tabela
@Entity("surveys_users")
class SurveyUser {

    @PrimaryColumn()
    readonly id: string;

    @Column()
    user_id: string;

    // Mostra o relacionamento que as tabelas tem entre si
    @ManyToOne(() => User)
    @JoinColumn({ name: "user_id"})
    user: User;

    @Column()
    survey_id: string;

    // Mostra o relacionamento que as tabelas tem entre si
    @ManyToOne(() => Survey)
    @JoinColumn({ name: "survey_id" })
    survey: Survey;

    @Column()
    value: Number;

    @CreateDateColumn()
    created_at: Date;


    constructor(){
        if(!this.id){
            this.id = uuid();
        }
    }
}

export { SurveyUser }