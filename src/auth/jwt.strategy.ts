import { Strategy, StrategyOptions, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport'
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { User } from '../user/user.model';
import { config } from '../../config/index';
import { CacheService } from '../cache.service';

export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        @InjectModel(User) private userModel: ReturnModelType<typeof User>,
        private readonly CacheService: CacheService,
    ) {
        super({
            // 取出token
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            // 取出token 还原
            secretOrKey: config.SECRET
        } as StrategyOptions)
    }

    async validate(decryption) {
        const UserID = await this.CacheService.get(decryption._id);
        if (!!UserID && UserID == decryption.random) {
            return await this.userModel.find({ _id: decryption._id })
        } else {
            return
        }
    }
}