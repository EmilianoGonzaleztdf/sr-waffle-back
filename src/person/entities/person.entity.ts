import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'person'})
export class Person {
    // ATRIBUTOS
    
    @PrimaryGeneratedColumn()
    id_person: number;

    @Column()
    dni: number;
    
    @Column()
    name: string;
    
    @Column()
    lastname: string;

    // CONSTRUCTOR

    constructor(dni: number, name: string, lastname: string){
        this.dni = dni;
        this.name = name;
        this.lastname = lastname;
    }

    // GET

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

    // SET

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
