import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {UsersService} from "./users.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {User} from "./users.model";

@ApiTags('User')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @ApiOperation({summary: 'get all users'})
    @ApiResponse({status: 200, type: [User]})
    @Get()
    getUsers(){
        return this.usersService.getUsers()
    }

    @ApiOperation({summary: 'get user by ID'})
    @ApiResponse({status: 200, type: User})
    @Get(':id')
    getUser(@Param('id') id: string){
        return this.usersService.getUser(+id)
    }

    @ApiOperation({summary: 'create new user'})
    @ApiResponse({status: 200, type: User})
    @Post()
    createUser(@Body() userDto: CreateUserDto){
        return this.usersService.createUser(userDto)
    }

    @ApiOperation({summary: 'delete a user by ID'})
    @ApiResponse({status: 200, type: 'id'})
    @Delete(':id')
    deleteUser(@Param('id') id:string){
        return this.usersService.deleteUser(+id)
    }

    @ApiOperation({summary: 'update a user'})
    @ApiResponse({status: 200, type: User})
    @Put()
    updateUser(@Body() userDto: UpdateUserDto ){
        return this.usersService.updateUser(userDto)
    }
}
