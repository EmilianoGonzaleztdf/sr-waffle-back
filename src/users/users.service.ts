import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  //- usuarios en memoria -//
  users = [
    {id:0, name : 'Javier' , lastName : 'Chavarria' , dni : "1211111", email : 'javier@gmail.com', user : "javier.chavarria" , password : "1234", rol : "admin" , status : "active"},
    {id:1, name : 'Emiliano' , lastName : 'Gonzalez' , dni : "1222222", email : 'emiliano@gmail.com', user : "emiliano.gonzalez" , password : "1234", rol : "cocina", status : "disabled"},
    {id:2, name : 'Laura' , lastName : 'Zabala' , dni : "3333333", email : 'laura@gmail.com', user : "laura.zabala" , password : "1234", rol : "admin", status : "active"},
    {id:3, name : 'Sergio' , lastName : 'Sanchez' , dni : "4444444", email : 'sergio@gmail.com', user : "sergio.sanchez" , password : "1234", rol : "cajero" , status : "disabled"},
    {id:4, name : 'Fernando' , lastName : 'Frias' , dni : "5555555", email : 'fernando@gmail.com', user : "fernando.frias" , password : "1234", rol : "cocina", status : "active"},
  ]

  public getUsers(): any {
    return this.users;
  }
  public searchUsersByKeyword(keyword: string): any[] {
    keyword = keyword.toLowerCase();
    return this.users.filter(user =>
      user.name.toLowerCase().includes(keyword) ||
      user.lastName.toLowerCase().includes(keyword) ||
      user.dni.toLowerCase().includes(keyword) ||
      user.email.toLowerCase().includes(keyword) ||
      user.user.toLowerCase().includes(keyword) ||
      user.rol.toLowerCase().includes(keyword)
    );
  }
  public postCreateUser(body): string {
    this.users.push(body);
    return `The user was created with the following attributes:
    id: ${body.id}
    name: ${body.name}
    lastName: ${body.lastName}
    dni : ${body.dni}
    email: ${body.email}
    user : ${body.user}
    password : ${body.password}
    rol : ${body.rol}
    status : ${body.status}
    `;
  }
  public getDeleteUserID(id: number): any {
    let userExists = false;
    let userPosition = 0;
    for (let i = 0; i < this.users.length; i++) {
      if (id == this.users[i].id) {
        userExists = true;
        userPosition = i;
      }
    }
    if (userExists) {
      this.users.splice(userPosition, 1);
      return {
        msj: `user ${id } was removed`,
        producto: this.users[userPosition],
      };
    } else {
      return { msj: ` cannot find requested user with ID: ${id}` };
    }
  }

  public updateUserByID(id: number, body: any): any {
    const userIndex = this.users.findIndex((p) => p.id === id);
  
    if (userIndex !== -1) {
      const userToUpdate = this.users[userIndex];
  
      if (body.name !== undefined) {
        userToUpdate.name = body.name;
      }
      if (body.lastName !== undefined) {
        userToUpdate.lastName = body.lastName;
      }
      if (body.email !== undefined) {
        userToUpdate.email = body.email;
      }
      if (body.user !== undefined) {
        userToUpdate.user = body.user;
      }
      if (body.password !== undefined) {
        userToUpdate.password = body.password;
      }
      if (body.rol !== undefined) {
        userToUpdate.rol = body.rol;
      }
      return {
        msj: `user ${id} updated successfully`,
        user: userToUpdate,
      };
    } else {
      return { msj: `User ID not found ${id}` };
    }
  }






  }

