import { prop, modelOptions, arrayProp } from "@typegoose/typegoose";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Schema } from "mongoose";
import { Comment } from "./comment.model"

@modelOptions({
    schemaOptions: {
        timestamps: true
    }
})
export class Forum {
    @ApiProperty({ description: '帖子标题' })
    @IsNotEmpty({ message: '请填写帖子标题' })
    @prop({
        required: true
    })
    title: string

    @ApiProperty({ description: '帖子内容' })
    @IsNotEmpty({ message: '请填写帖子内容' })
    @prop({
        required: true
    })
    content: string

    @ApiProperty({ description: '发帖用户头像' })
    @IsNotEmpty({ message: '请填写发帖用户头像' })
    @prop({
        required: true
    })
    portrait: string

    @ApiProperty({ description: '帖子描述' })
    @IsNotEmpty({ message: '请填写帖子描述' })
    @prop({
        required: true
    })
    describe: string

    @ApiProperty({ description: '发帖人头像' })
    @IsNotEmpty({ message: '请填写发帖人头像' })
    @prop({
        required: true
    })
    nickname: string

    @ApiProperty({ description: '帖子状态 0 -> 审核中 1 -> 通过 2 -> 不通过' })
    @IsNotEmpty({ message: '请填写帖子状态' })
    @prop({
        enum: [0, 1, 2],
        default: 0
    })
    state?: number

    @ApiProperty({ description: '发帖人_id' })
    @IsNotEmpty({ message: '请填写发帖人_id' })
    @prop({
        required: true
    })
    user_id: string

    @ApiProperty({ description: '帖子封面' })
    @IsNotEmpty({ message: '请填写帖子封面' })
    @prop({
        required: true
    })
    cover: string

    @ApiProperty({ description: '帖子基本信息' })
    @IsNotEmpty({ message: '请填写帖子基本信息' })
    @prop({
        required: true,
        default: {
            watch: 0,
            give: 0,
            comment_number: 0
        }
    })
    essential?: {
        watch: 0,
        give: 0,
        comment_number: 0
    }
}