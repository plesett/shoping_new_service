import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"
import { modelOptions } from "@typegoose/typegoose"

@modelOptions({
    schemaOptions: {
        timestamps: true
    }
})
export class MessageCreateDto {
    @ApiProperty({ description: '标题' })
    @IsNotEmpty({ message: '请填写标题' })
    title: string

    @ApiProperty({ description: '内容' })
    @IsNotEmpty({ message: '请填写内容' })
    content: string

    @ApiProperty({ description: '封面' })
    @IsNotEmpty({ message: '请填写封面' })
    cover: string
    
    @ApiProperty({ description: '标签' })
    @IsNotEmpty({ message: '请填写标签' })
    tag: []

    @ApiProperty({ description: '状态' }) // 0 -> 正常  1 -> 异常
    @IsNotEmpty({ message: '请填写状态' })
    state: number
}