import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";

interface UserCreationAttrs{
    email: string
    password: string
    username: string
    img: string
    city: string
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs>{

    @Column({type: DataType.INTEGER, unique: true, autoIncrement:true, primaryKey: true})
    id: number

    @Column({type: DataType.STRING, allowNull: false})
    username: string

    @Column({type: DataType.STRING, allowNull: true})
    img: string

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string

    @Column({type: DataType.STRING, allowNull: false})
    password: string

    @Column({type: DataType.STRING, defaultValue: false})
    banned: boolean

    @Column({type: DataType.STRING, allowNull: true})
    banReason: string

    // @Column({type: DataType.INTEGER})
    @Column({type: DataType.STRING, allowNull: false})
    // @ForeignKey()
    //city_id: number
    city: string
}