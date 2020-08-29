import { prop, modelOptions } from '@typegoose/typegoose'
import { ApiProperty } from '@nestjs/swagger'

@modelOptions({
    schemaOptions: {
        timestamps: true
    }
})
export class Message {

    @ApiProperty({ description: '标题' })
    @prop()
    title: string

    @ApiProperty({ description: '内容' })
    @prop()
    content: string

    @ApiProperty({ description: '封面' })
    @prop()
    cover: string
    
    @ApiProperty({ description: '标签' })
    @prop()
    tag: []

    @ApiProperty({ description: '状态' }) // 0 -> 正常  1 -> 异常
    @prop({
        enum: [0, 1],
        default: 0
    })
    state?: number
}