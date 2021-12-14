import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {UsersService} from "./users.service";
import {CreateUserDto} from "./dto/create-user.dto";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    getUsers(){
        return this.usersService.getUsers()
    }

    @Get(':id')
    getUser(@Param('id') id: number){
        return this.usersService.getUser(+id)
    }

    @Post()
    createUser(@Body() userDto: CreateUserDto){
        return this.usersService.createUser(userDto)
    }

    // @Delete(':id')
    // deleteUser(@Param('id') id:string){
    //     return this.usersService.deleteUser(+id)
    // }
    //
    // @Put()
    // updateUser(@Body() userDto: CreateUserDto ){
    //     return this.usersService.updateUser(userDto)
    // }
}
