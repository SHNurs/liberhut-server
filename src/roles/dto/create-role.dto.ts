import {ApiProperty} from "@nestjs/swagger";
import {IsString} from "class-validator";

export class CreateRoleDto{
    @ApiProperty({example: 'ADMIN', description: 'Role name'})
    @IsString({message: 'Name of role should be a string'})
    readonly name: string

    @ApiProperty({example: 'Administrator', description: 'Role description'})
    @IsString({message: 'Description should be a string'})
    readonly description: string
}