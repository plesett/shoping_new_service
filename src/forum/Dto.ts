import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";


export class createForumDto {
    @ApiProperty({ description: '帖子标题' })
    @IsNotEmpty({ message: '请填写帖子标题' })
    title: string

    @ApiProperty({ description: '帖子内容' })
    @IsNotEmpty({ message: '请填写帖子内容' })
    content: string

    @ApiProperty({ description: '帖子描述' })
    @IsNotEmpty({ message: '请填写帖子描述' })
    describe: string

    @ApiProperty({ description: '帖子封面' })
    @IsNotEmpty({ message: '请填写帖子封面' })
    cover: string
}

export class UpdateInfoDto {
    @ApiProperty({ description: '帖子基本信息', example: { watch: 0, give: 0, comment_number: 0 } })
    @IsNotEmpty({ message: '请填写帖子基本信息' })
    cover: {
        watch: 0,
        give: 0,
        comment_number: 0
    }
}

export class commentDto {
    @ApiProperty({ description: '评论内容' })
    @IsNotEmpty({ message: '请填写评论内容' })
    comment_Content: string

    @ApiProperty({ description: '评论的帖子id' })
    @IsNotEmpty({ message: '请填写评论的帖子id' })
    post_id: string
}