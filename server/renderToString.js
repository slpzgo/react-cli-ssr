import React from 'react'
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'
import { matchPath, StaticRouter } from 'react-router-dom'
import routes from '../src/route'
import App from '../src/app'
import initStore from '../src/store'
import env from './env'

const store = initStore()
const matchRoute = async ctx => {
  const activeRoute = routes().props.children.find(route => matchPath(ctx.req.url, route.props)) || { props: {} }
  const data = await (!!activeRoute.props.fetch ? store.dispatch(activeRoute.props.fetch()) : Promise.resolve(null))
  return data
}

const setToString = string => {
  return `
    <html lang=en>
      <head>
        <meta charset=utf-8>
        <title>How to set up React, Webpack4, and Babel7</title>
        <script src=${env.webpackPath}/js/prop-types.min.js></script>
        <link href=${env.webpackPath}/css/main.css rel=stylesheet />
      </head>
      <body>
        <div class=container id=app>${string}</div>
         <script>window._initState_ = ${JSON.stringify(store.getState()).replace(/</g, '\\x3c')}</script>
         <script type=text/javascript src=${env.webpackPath}/js/vendor.dll.js></script>
         <script type=text/javascript src=${env.webpackPath}/js/vendor.786948b9ba982d2b7a57.js></script>
         <script type=text/javascript src=${env.webpackPath}/js/main.js></script>
      </body>
    </html>`
}

export default async ctx => {
  const context = { data: await matchRoute(ctx) }
  const string = renderToString(
    <Provider store={store}>
      <StaticRouter location={ctx.req.url} context={context}>
        <App />
      </StaticRouter>
    </Provider>
  )
  return setToString(string)
}