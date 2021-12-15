import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../users/users.model";
import {UserRole} from "./user-roles.model";

interface RolesCreateAttrs{
    name: string
    description: string
}

@Table({tableName: 'Roles'})
export class Role extends Model<Role, RolesCreateAttrs>{

    @ApiProperty({example: '1', description: 'ID of role'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ApiProperty({example: 'ADMIN', description: 'Name of role'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    name:string

    @ApiProperty({example: 'Administrator', description:'Description of role'})
    @Column({type: DataType.STRING})
    description: string

    @BelongsToMany(() => User, () => UserRole)
    users: User[]
}