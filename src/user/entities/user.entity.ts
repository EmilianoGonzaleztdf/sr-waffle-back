import { Person } from "src/person/entities/person.entity";
import { Role } from "src/role/entities/role.entity";
import { Sale } from "src/sale/entities/sale.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'user'})
export class User {
    // ATRIBUTOS

    @PrimaryGeneratedColumn()
    id_user: number;

    @Column()
    email: string;

    @Column()
    user: string;

    @Column()
    password: string;

    @Column()
    status: string;


    // RELACIONES

    @ManyToOne(()=>Role, role=>role.users)
    @JoinColumn({name : "fk_id_role"})
    role:Role;

    @OneToOne(()=>Person, person=>person.user)
    person:Person;

    @OneToMany(()=>Sale, sale=>sale.user)
    sales:Sale[];

    // CONSTRUCTOR
    constructor(email : string, user : string, password : string, status : string) {
        this.email = email;
        this.user = user;
        this.password = password;
        this.status = status;
    }

    // GET

    public getId(): number {
        return this.id_user;
    }

    public getEmail(): string {
        return this.email;
    }

    public getUser(): string {
        return this.user;
    }

    public getPassword(): string {
        return this.password;
    }

    public getStatus(): string {
        return this.status;
    }

    // SET

    public setEmail(email: string) {
        this.email = email;
    }

    public setUser(user: string) {
        this.user = user;
    }

    public setPassword(password: string) {
        this.password = password;
    }

    public setStatus(status: string) {
        this.status = status;
    }
}
