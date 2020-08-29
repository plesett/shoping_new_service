import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { ForumController } from './forum.controller';
import { Forum } from './forum.model';
import { Comment } from './comment.model'

@Module({
    imports: [
        TypegooseModule.forFeature([
            Forum,
            Comment
        ])
    ],
    controllers: [ForumController]
})
export class ForumModule { }
