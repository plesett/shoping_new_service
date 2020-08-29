import { Controller, Get, Post, Param, Body, Put, Delete, Query, UseGuards, Req } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Forum } from './forum.model';
import { Comment } from './comment.model';
import { InjectModel } from 'nestjs-typegoose';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { createForumDto, UpdateInfoDto, commentDto } from './Dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('帖子模块')
@Controller('forum')
export class ForumController {

    constructor(
        @InjectModel(Forum) private readonly modelForum: ModelType<Forum>,
        @InjectModel(Comment) private readonly modelComment: ModelType<Comment>
    ) { }

    /**
     * 查询所有帖子
     * pageIndex：pageSize
     * 返回格式content： "<view><imges src='XXXXX'>666我是内容</view>"
     */
    @ApiOperation({ summary: '查询所有帖子信息' })
    @Get()
    async GetForumInfo(@Query('pageIndex') pageIndex: number) {
        const pageSize = 10
        return await this.modelForum.find({ state: 1 }, { comment_list: 0, content: 0, describe: 0, state: 0 }).skip(pageIndex - 1).limit(pageSize)
    }

    /**
     * 查询该用户所有的帖子状态
     */
    @ApiOperation({ summary: '查询用户所有帖子信息' })
    @Post('user')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    async GetUserForumInfo(@Req() req) {
        return await this.modelForum.find({ user_id: req.user._id }, { state: -1, createdAt: -1, title: -1 })
    }

    /**
     * 查询帖子详情
     */
    @ApiOperation({ summary: '查询某帖子信息' })
    @Get(':id')
    async GetForumDetaile(@Param('id') id: string) {
        let resForum = await this.modelForum.findById(id)
        let resComment = await this.modelComment.find({ post_id: id })
        return { data: resForum, comment_list: resComment }
    }

    @ApiOperation({ summary: '发表帖子评论' })
    @Post('comment')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    async GetForumDetaileComment(@Body() comment: commentDto, @Req() req) {
        console.log( req.user)
        let res = await this.modelComment.create(Object.assign(comment, { 
            user_id: req.user._id, 
            post_id: comment.post_id,
            portrait: req.user.avatars,
            nickname: req.user.nickname,
            city: req.user.city
        })) // 保存用户评论
        return { msg: '评论成功', code: 0 }
    }

    /**
     * 创建帖子
     */
    @ApiOperation({ summary: '创建帖子' })
    @Post()
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    async CreateForum(@Body() createForum: createForumDto, @Req() req) {
        const { avatars, nickname, _id } = req.user
        return await this.modelForum.create(Object.assign(createForum, { portrait: avatars, nickname, user_id: _id }))
    }

    /**
     * 删除帖子  本人或者管理员   ----> 管理员删除暂未实现
     */
    @ApiOperation({ summary: '删除帖子' })
    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    async DeleteForum(@Param('id') id: string, @Req() req) {
        let res = await this.modelForum.find({ user_id: req.user._id })
        if (res.length === 0) {
            return { msg: '暂未权限或者帖子不存在', code: -1 }
        }
        if (!!await this.modelForum.findByIdAndDelete(id)) {
            return { msg: '删除成功', code: 0 }
        } else {
            return { msg: '删除失败', code: -1 }
        }
    }

    /**
     * 更新帖子基本信息
     */
    @ApiOperation({ summary: '更新帖子基本信息' })
    @Put(':id')
    async UpdateForumEssential(@Param() id: string, @Body() UpdateInfo: UpdateInfoDto) {
        return await this.modelForum.findByIdAndUpdate(id, UpdateInfo.cover)
    }
}
