import config from '../config'
const isProd = !(process.env.NODE_ENV === 'development')

export default {
  server: `./server/${isProd ? 'server' : 'server-dev'}`,
  //webpack 热载文件不是静态 koa-static不适用
  webpackPath: !isProd ? config.dev.assetsSubDirectory : ''
}