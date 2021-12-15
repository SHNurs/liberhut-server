import {BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table} from "sequelize-typescript";
import {ApiOperation, ApiProperty, ApiTags} from "@nestjs/swagger";
import {Role} from "../roles/roles.model";
import {UserRole} from "../roles/user-roles.model";
import {Post} from "../posts/posts.model";

interface UserCreationAttrs{
    email: string
    password: string
    username: string
    img: string
    city: string
}

@Table({tableName: 'Users'})
export class User extends Model<User, UserCreationAttrs>{

    @ApiProperty({example: '1', description: 'ID'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement:true, primaryKey: true})
    id: number

    @ApiProperty({example: 'densmith', description: 'Username of a user'})
    @Column({type: DataType.STRING, allowNull: false})
    username: string

    @ApiProperty({example: 'img link', description: 'Image'})
    @Column({type: DataType.STRING, allowNull: true})
    img: string

    @ApiProperty({example: 'densmith@gmail.com', description: 'Email of a user'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string

    @ApiProperty({example: '********', description: 'Password of a user'})
    @Column({type: DataType.STRING, allowNull: false})
    password: string

    @ApiProperty({example: 'true', description: 'Banned or not'})
    @Column({type: DataType.STRING, defaultValue: false})
    banned: boolean

    @ApiProperty({example: 'For not respecting others', description: 'Ban reason'})
    @Column({type: DataType.STRING, allowNull: true})
    banReason: string

    // @Column({type: DataType.INTEGER})
    @ApiProperty({example: 'Bishkek', description: 'City of a user'})
    @Column({type: DataType.STRING, allowNull: false})
    // @ForeignKey()
    //city_id: number
    city: string

    @BelongsToMany(() => Role, () => UserRole)
    roles: Role[]

    @HasMany(() => Post)
    posts: Post[]
}