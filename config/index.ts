import { BaseExceptionFilter } from "@nestjs/core"

// mongodb
export const config = {
    SECRET: '******************',
    DB: 'mongodb://127.0.0.1:27017/test'
}

// redis
export const options={
    port: 6379,
    host: '127.0.0.1',
    password: '******************',
}

// 阿里云oos
export const AliOOS = {
    region: 'oss-cn-hangzhou',
    accessKeyId: '******************',
    accessKeySecret: '******************',
    bucket: '******************',
}

// 腾讯位置服务 // https://lbs.qq.com/service/webService/webServiceGuide/webServiceIp
export const TenXunMap ={
    key: '******************',
    url: 'https://apis.map.qq.com/ws/location/v1/ip' // <----次接口无需改动
}
