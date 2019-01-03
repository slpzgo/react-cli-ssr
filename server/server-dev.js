import Koa from 'koa'
import Router from 'koa-router'
import webpack from 'webpack'
import opn from 'opn'
import htmlString from './renderToString'
import webpackConfig from '../build/webpack.dev.conf'

const app = new Koa()
const path = require('path')
const server = require('http').createServer(app.callback())
app.use(require('koa-static')(path.resolve(__dirname, '../')))

const compiler = webpack(webpackConfig)
const devMiddleware = require('koa-webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  noInfo: true
})

const hotMiddleware = require('koa-webpack-hot-middleware')(compiler, {
   log: false,
   reload: true
})

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// 首页路由
let router = new Router()
router.get('*', async ctx => {
	if (!/\/static\//.test(ctx.req.url)) {
	    ctx.response.type = 'html'
	    const html = await htmlString(ctx)
	    ctx.response.body = html
	}
})
app.use(router.routes())

// 监听端口
server.listen(8082, () => {
  const uri = 'http://localhost:8082'
  console.log('listening on *:8082')
  opn(uri)
})

