import {Body, Controller, Delete, Get, Param, Post, Put, UseGuards} from '@nestjs/common';
import {UsersService} from "./users.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {User} from "./users.model";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {Roles} from "../auth/roles.decorator";
import {RolesGuard} from "../auth/roles.guard";
import {AddRoleDto} from "./dto/add-role.dto";
import {BanUserDto} from "./dto/ban-user.dto";

@ApiTags('User')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @ApiOperation({summary: 'get all users'})
    @ApiResponse({status: 200, type: [User]})
    @UseGuards(JwtAuthGuard)
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Get()
    getUsers(){
        return this.usersService.getUsers()
    }

    @ApiOperation({summary: 'get user by ID'})
    @ApiResponse({status: 200, type: User})
    @UseGuards(JwtAuthGuard)
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

    @ApiOperation({summary: 'Pinning a role'})
    @ApiResponse({status: 200})
    @UseGuards(JwtAuthGuard)
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post('/role')
    addRole(@Body() dto: AddRoleDto){
        return this.usersService.addRole(dto)
    }

    @ApiOperation({summary: 'Bannin a user'})
    @ApiResponse({status: 200})
    @UseGuards(JwtAuthGuard)
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post('/ban')
    banUser(@Body() dto: BanUserDto){
        return this.usersService.banUser(dto)
    }
}
