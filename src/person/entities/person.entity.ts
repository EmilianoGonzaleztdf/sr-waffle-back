import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'person'})
export class Person {
    
    @PrimaryGeneratedColumn()
    id_person: number;

    @Column()
    dni: number;
    
    @Column()
    name: string;
    
    @Column()
    lastname: string;

    @OneToOne(()=>User, user=>user.person)
    @JoinColumn({name : "fk_id_user"})
    user:User;

    constructor(dni: number, name: string, lastname: string){
        this.dni = dni;
        this.name = name;
        this.lastname = lastname;
    }


    public getId(): number {
        return this.id_person;
    }

    public getDni(): number {
        return this.dni;
    }

    public getName(): string {
        return this.name;
    }

    public getLastname(): string {
        return this.lastname;
    }

    public setDni(dni: number) {
        this.dni = dni;
    }

    public setName(name: string){
        this.name = name;
    }

    public setLastname(lastname: string){
        this.lastname = lastname;
    }
}
