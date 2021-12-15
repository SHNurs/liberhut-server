import {Body, HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import {CreateUserDto} from "../users/dto/create-user.dto";
import {LoginUserDto} from "../users/dto/login-user.dto";
import * as bcrypt from 'bcryptjs'
import {User} from "../users/users.model";

@Injectable()
export class AuthService {
    constructor(private userService: UsersService,
                private jwtService: JwtService) {}

    async login(userDto: LoginUserDto){
        const user = await this.validateUser(userDto)
        return this.generateToken(user)
    }

    async registration(userDto: CreateUserDto){
        const candidate = await this.userService.getUserByEmail(userDto.email)
        if(candidate)
            throw new HttpException('There is a user with this email', HttpStatus.BAD_REQUEST)
        const hashedPassword = await bcrypt.hash(userDto.password, 5)
        const user = await this.userService.createUser({...userDto, password: hashedPassword})
        return this.generateToken(user)
    }

    private async generateToken(user: User){
        const payload = {email: user.email, id: user.id, roles: user.roles}
        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async validateUser(userDto: LoginUserDto){
        const user = await this.userService.getUserByEmail(userDto.email)

        const passwords = await bcrypt.compare(userDto.password, user.password)

        if(user && passwords){
            return user
        }
        throw new UnauthorizedException({message: 'Wrong email or password'})
    }
}
