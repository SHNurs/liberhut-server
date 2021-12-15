import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsString, Length} from "class-validator";

export class LoginUserDto{
    @ApiProperty({example: 'email', description: 'Email of a user'})
    @IsString({message: 'Email should be a string'})
    @IsEmail({}, {message: 'Invalid email'})
    readonly email: string

    @ApiProperty({example: '********', description: 'Password of a user'})
    @Length(4, 16, {message: "Password should be between 4 and 16 length"})
    readonly password: string
}