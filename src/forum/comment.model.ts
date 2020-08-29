import { prop, modelOptions, arrayProp } from "@typegoose/typegoose";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

@modelOptions({
    schemaOptions: {
        timestamps: true
    }
})
export class Comment {

    @ApiProperty({ description: '评论内容' })
    @IsNotEmpty({ message: '请填写评论内容' })
    @prop({
        required: true
    })
    comment_Content: string

    @ApiProperty({ description: '评论文章的用户头像' })
    @IsNotEmpty({ message: '请填写评论文章的用户头像' })
    @prop({
        required: true
    })
    portrait: string


    @ApiProperty({ description: '发帖人头像' })
    @IsNotEmpty({ message: '请填写发帖人头像' })
    @prop({
        required: true
    })
    nickname: string

    @ApiProperty({ description: '发帖人城市' })
    @IsNotEmpty({ message: '请填写发帖人城市' })
    @prop({
        required: true
    })
    city: string
    
    @ApiProperty({ description: '帖子状态 0 -> 通过 1 -> 不通过' })
    @IsNotEmpty({ message: '请填写帖子状态' })
    @prop({
        enum: [0, 1],
        default: 0
    })
    state?: number

    @ApiProperty({ description: '评论的帖子id' })
    @IsNotEmpty({ message: '请填写评论的帖子id' })
    @prop({
        required: true
    })
    post_id: string

    @ApiProperty({ description: '发帖人_id' })
    @IsNotEmpty({ message: '请填写发帖人_id' })
    @prop({
        required: true
    })
    user_id: string
}