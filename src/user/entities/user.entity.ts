import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

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
