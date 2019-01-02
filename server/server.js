import Koa from 'koa'
import Router from 'koa-router'
import htmlString from './renderToString'

const app = new Koa()
const path = require('path')
const server = require('http').createServer(app.callback())
app.use(require('koa-static')(path.resolve(__dirname, '../')))

// 首页路由
let router = new Router()
router.get('*', async ctx => {
  if (!/[.]*\.(.)*/.test(ctx.req.url)) {
    ctx.response.type = 'html'
    const html = await htmlString(ctx)
    ctx.response.body = html
  }
})
app.use(router.routes())

// 监听端口
server.listen(8085, () => {
  console.log('listening on *:8085')
})

