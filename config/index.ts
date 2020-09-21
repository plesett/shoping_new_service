import { BaseExceptionFilter } from "@nestjs/core"

// mongodb
export const config = {
    SECRET: 'asQW1eedASD!12!@3asd1!#Drg%H5jh%J^H31F@#f!@#F!#F',
    DB: 'mongodb://127.0.0.1:27017/test'
}

// redis
export const options={
    port: 6379,
    host: '127.0.0.1',
    password: 'zkpkzkpk'
}

// 阿里云oos
export const AliOOS = {
    region: 'oss-cn-hangzhou',
    accessKeyId: '********',
    accessKeySecret: '*******',
    bucket: '*****'
}

// 腾讯位置服务 // https://lbs.qq.com/service/webService/webServiceGuide/webServiceIp
export const TenXunMap ={
    key: 'A4WBZ-AW332-EDHUE-CHEIK-63K6O-RLFTL',
    url: 'https://apis.map.qq.com/ws/location/v1/ip' // <----次接口无需改动
}