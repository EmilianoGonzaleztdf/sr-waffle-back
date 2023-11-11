import { User } from "src/user/entities/user.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'role'})
export class Role {
    // ATRIBUTOS

    @PrimaryGeneratedColumn()
    id_role: number;

    @Column()
    description: string;

    // RELACION

    @OneToMany(()=>User,user=>user.role)
    users:User[];

    // CONSTRUCTOR

    constructor(description : string) {
        this.description = description;        
    }

    // GET

    public getId(): number {
        return this.id_role;
    }

    public getDescription(): string {
        return this.description;
    }

    //SET
    
    public setDescription(description: string) {
        this.description = description;
    }
}