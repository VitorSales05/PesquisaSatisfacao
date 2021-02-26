import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid';


// É necessário a classe ser uma entidade ( @Entity ), onde é informado o nome da tabela do DB
// Essa entidade é utilizado pelo ORM para a criação de uma tabela
@Entity("surveys")
class Survey {

    @PrimaryColumn()
    readonly id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @CreateDateColumn()
    created_at: Date;


    constructor(){
        if(!this.id){
            this.id = uuid();
        }
    }
}

export { Survey }