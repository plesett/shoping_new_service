import { Module, Global } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessageModule } from './message/message.module';
import { TypegooseModule } from 'nestjs-typegoose';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { RedisModule } from 'nestjs-redis';
import { options, config } from 'config';
import { CacheService } from './cache.service';
import { ToolFNService } from './tool.service';
import { JwtModule } from '@nestjs/jwt'
import { WinningModule } from './winning/winning.module';
import { OngoingController } from './ongoing/ongoing.controller';
import { OngoingModule } from './ongoing/ongoing.module';
import { InformationController } from './information/information.controller';
import { InformationModule } from './information/information.module';
import { ForumController } from './forum/forum.controller';
import { ForumModule } from './forum/forum.module';
import { PayController } from './pay/pay.controller';
import { PayModule } from './pay/pay.module';

/**
 * docker： docker run -itd --name mongo -p 27017:27017 mongo
 * redis： docker run -d  --name redis  -p 6379:6379  redis --requirepass "zkpkzkpk"
 */
@Global()
@Module({
  imports: [
    TypegooseModule.forRoot(config.DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    }),
    RedisModule.register(options),
    JwtModule.registerAsync({
      useFactory() {
        return {
          secret: config.SECRET
        }
      }
    }),
    MessageModule,
    ProductModule,
    UserModule,
    WinningModule,
    OngoingModule,
    InformationModule,
    ForumModule,
    PayModule
  ],
  controllers: [AppController],
  providers: [AppService, CacheService, ToolFNService ],
  exports: [CacheService, ToolFNService, JwtModule ] // 导出成为全局注册模块
})
export class AppModule {}
