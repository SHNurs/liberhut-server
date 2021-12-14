import {Body, Delete, Get, Injectable, Param, Post, Put} from '@nestjs/common';
import {CreateUserDto} from "./dto/create-user.dto";
import {InjectModel} from "@nestjs/sequelize";
import {User} from "./users.model";

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepo: typeof User) {}

    async getUsers(){
        return await this.userRepo.findAll()
    }

    async getUser(id: number){
        return await this.userRepo.findOne({where: {id}})
    }

    async createUser(userDto: CreateUserDto){
        const user = await this.userRepo.create(userDto)
        return user
    }

    // deleteUser(id:number){
    //     this.users = this.users.filter(item => item.id !== id)
    //     return 'Deleted ' + id
    // }
    //
    // updateUser(userDto ){
    //     return  'Updated'
    // }
}
