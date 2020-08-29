import { Controller, Get, Param, Query, Body, Post, Delete } from '@nestjs/common';
import { Message } from './message.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { MessageCreateDto } from './MessageCreateDto';


@Controller('message')
@ApiTags('消息模块接口')
export class MessageController {

    constructor(
        @InjectModel(Message) private readonly modelMessage: ModelType<Message>
    ) { }

    /**
     * 获取所有消息通知
     */
    @Get()
    @ApiOperation({ summary: '获取所有消息通知' })
    async GetMessageList() {
        return await this.modelMessage.find({ state: 0 })
    }

    /**
     * 获取通知详情
     */
    @Post(':id')
    @ApiOperation({ summary: '获取所有消息通知' })
    async GetMessagDetail(@Param('id') id: string) {
        return await this.modelMessage.findById(id)
    }

    // --------------------- 以下接口供后台使用 ----------------------

    /**
     * 删除通知
     */
    @Delete(':id')
    @ApiOperation({ summary: '删除通知信息' })
    async DeleteMessag(@Param('id') id: string) {
        return await this.modelMessage.findByIdAndDelete(id)
    }

    /**
     * 发布通知
     */
    @Post()
    @ApiOperation({ summary: '新建通知' })
    async CreateMessag(@Body() MessageCreate: MessageCreateDto) {
        return await this.modelMessage.create(MessageCreate)
    }
}
