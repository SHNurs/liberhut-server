import {ApiProperty} from "@nestjs/swagger";

export class AddRoleDto{

    @ApiProperty({example: 'ADMIN', description:'Role'})
    readonly name: string

    @ApiProperty({example: '1', description:'User ID'})
    readonly userId: number
}