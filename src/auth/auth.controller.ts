import {Body, Controller, Post} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CreateUserDto} from "../users/dto/create-user.dto";
import {LoginUserDto} from "../users/dto/login-user.dto";
import {User} from "../users/users.model";

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @ApiOperation({summary: 'Login'})
    @ApiResponse({status: 200, type: 'token'})
    @Post('/login')
    login(@Body() dto: LoginUserDto){
        return this.authService.login(dto)
    }

    @ApiOperation({summary: 'Registration'})
    @ApiResponse({status: 200, type: 'token'})
    @Post('/registration')
    registration(@Body() dto: CreateUserDto){
        return this.authService.registration(dto)
    }
}
