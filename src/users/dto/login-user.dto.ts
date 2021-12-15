import {ApiProperty} from "@nestjs/swagger";

export class LoginUserDto{
    @ApiProperty({example: 'email', description: 'Email of a user'})
    readonly email: string

    @ApiProperty({example: '********', description: 'Password of a user'})
    readonly password: string
}