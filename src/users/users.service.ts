import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateUserDto} from "./dto/create-user.dto";
import {InjectModel} from "@nestjs/sequelize";
import {User} from "./users.model";
import {UpdateUserDto} from "./dto/update-user.dto";
import {RolesService} from "../roles/roles.service";
import {Role} from "../roles/roles.model";
import {AddRoleDto} from "./dto/add-role.dto";
import {BanUserDto} from "./dto/ban-user.dto";

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepo: typeof User,
                private roleService: RolesService) {}

    async getUsers(){
        return await this.userRepo.findAll({include: {all: true}})
    }

    async getUser(id: number){
        return await this.userRepo.findOne({where: {id}, include: {model: Role}})
    }

    async createUser(userDto: CreateUserDto){
        if(!userDto.username || !userDto.email || !userDto.password)
            throw new HttpException('Not all data was sent', HttpStatus.BAD_REQUEST)

        const user = await this.userRepo.create(userDto)
        const role = await this.roleService.getRoleByName('ADMIN')
        await user.$set('roles', [role.id])
        user.roles = [role]
        return user
    }

    async deleteUser(id:number){
        if(!id) throw new HttpException('ID is required', HttpStatus.BAD_REQUEST)
        await this.userRepo.destroy({where: {id}})
        return {id}
    }

    async updateUser(userDto: UpdateUserDto ){
        if(!userDto.id) throw new HttpException('ID is required', HttpStatus.BAD_REQUEST)
        await this.userRepo.update(userDto, {where: {id: userDto.id}})
        return userDto
    }

    async getUserByEmail(email: string){
        return await this.userRepo.findOne({where: {email}, include: {all: true}})
    }

    async addRole(dto: AddRoleDto){
        const user = await this.userRepo.findByPk(dto.userId)
        const role = await this.roleService.getRoleByName(dto.name)
        if(user && role){
            await user.$add('role', role.id)
            return {message: 'Role is added', status: HttpStatus.OK}
        }
        throw new HttpException('User or role are not found', HttpStatus.NOT_FOUND)
    }

    async banUser(dto: BanUserDto){
        const user = await this.userRepo.findByPk(dto.userId)
        if(user){
            user.banned = true
            user.banReason = dto.banReason
            await user.save()
            return user
        }
        throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }
}
