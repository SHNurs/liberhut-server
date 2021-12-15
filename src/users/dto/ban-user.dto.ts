import {ApiProperty} from "@nestjs/swagger";

export class BanUserDto{
    @ApiProperty({example: 'For not respecting others', description: 'Reason of ban'})
    readonly banReason: string

    @ApiProperty({example: 'ID', description: 'User ID'})
    readonly userId: number
}