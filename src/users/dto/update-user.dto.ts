import {ApiProperty} from "@nestjs/swagger";

export class UpdateUserDto {
    @ApiProperty({example: '1', description: 'ID of a user'})
    id:number

    @ApiProperty({example: 'email', description: 'Email of a user'})
    email: string

    @ApiProperty({example: '********', description: 'Password of a user'})
    password: string

    @ApiProperty({example: 'densmith', description: 'Username of a user'})
    username: string

    @ApiProperty({example: 'img link', description: 'Image of a user'})
    img: string

    @ApiProperty({example: 'Bishkek', description: 'City of a user'})
    city: string
}