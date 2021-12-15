import {ApiProperty} from "@nestjs/swagger";

export class CreatePostDto{
    @ApiProperty({example: 'Godfather', description: 'Title of book'})
    readonly title: string

    @ApiProperty({example: 'Paulo Coelho', description: 'Author of book'})
    readonly bookAuthor: string

    @ApiProperty({example: 'This is book...', description: 'Descriptions of book'})
    readonly description: string

    @ApiProperty({example: 'Image', description: 'Image of book'})
    readonly img: string
    @ApiProperty({example: '234', description: 'Cost of book'})
    readonly cost: number
    @ApiProperty({example: 'isBarter', description: 'isBarter of book'})
    readonly isBarter: boolean
    @ApiProperty({example: 'isAgreeble', description: 'Is agreeable of book'})
    readonly isAgreeable: boolean
    @ApiProperty({example: 'UserID', description: 'UserID'})
    readonly userId: number
}
