import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsString, Length} from "class-validator";

export class CreateUserDto{
    @ApiProperty({example: 'email', description: 'Email of a user'})
    @IsString({message: 'Email should be a string'})
    @IsEmail({}, {message: 'Invalid email'})
    readonly email: string

    @ApiProperty({example: '********', description: 'Password of a user'})
    @Length(4, 16, {message: "Password should be between 4 and 16 length"})
    readonly password: string

    @ApiProperty({example: 'densmith', description: 'Username of a user'})
    @IsString({message: 'Username should be a string'})
    readonly username: string

    @ApiProperty({example: 'img link', description: 'Image of a user'})
    readonly img: string

    @ApiProperty({example: 'Bishkek', description: 'City of a user'})
    @IsString({message: 'City should be a string'})
    readonly city: string
}