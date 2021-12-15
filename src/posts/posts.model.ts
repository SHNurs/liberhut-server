import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../users/users.model";

interface PostCreateAttrs{
    title: string
    bookAuthor: string
    description: string
    img: string
    cost: number
    isBarter: boolean
    isAgreeable: boolean
    userId: number
}

@Table({tableName: 'Posts'})
export class Post extends Model<Post, PostCreateAttrs>{

    @ApiProperty({example: '1', description: 'ID of post'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ApiProperty({example: 'Godfather', description: 'Title of book'})
    @Column({type: DataType.STRING, allowNull: false})
    title: string

    @ApiProperty({example: 'Paulo Coelho', description: 'Author of book'})
    @Column({type: DataType.STRING, allowNull: true})
    bookAuthor: string

    @ApiProperty({example: 'This is book of ...', description: 'Description of book'})
    @Column({type: DataType.STRING, allowNull: true})
    description: string

    @ApiProperty({example: 'Image', description: 'Image of book'})
    @Column({type: DataType.STRING, allowNull: false})
    img: string

    @ApiProperty({example: '245', description: 'Price of book'})
    @Column({type: DataType.INTEGER, allowNull: false})
    cost: number

    @ApiProperty({example: 'Barter is on', description: 'Is barter'})
    @Column({type: DataType.BOOLEAN, allowNull: true})
    isBarter: boolean

    @ApiProperty({example: 'Agreeable is on', description: 'Is agreeable'})
    @Column({type: DataType.BOOLEAN, allowNull: true})
    isAgreeable: boolean

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number

    @BelongsTo(() => User)
    user: User
}