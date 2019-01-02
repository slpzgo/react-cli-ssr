import React from 'react'
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'
import { matchPath, StaticRouter } from 'react-router-dom'
import routes from '../src/route'
import App from '../src/app'
import initStore from '../src/store'

const store = initStore()

const matchRoute = async ctx => {
  const activeRoute = routes().props.children.find(route => matchPath(ctx.req.url, route.props)) || {}
  console.log(activeRoute)
  const data = await (!!activeRoute.props.fetch ? store.dispatch(activeRoute.props.fetch()) : Promise.resolve(null))
  return data
}

const setToString = string => {
  return `
    <html lang=en>
      <head>
        <meta charset=utf-8>
        <title>How to set up React, Webpack4, and Babel7</title>
        <script src=/dist/static/js/prop-types.min.js></script>
        <link href=/dist/static/css/main.css rel=stylesheet />
      </head>
      <body>
        <div class=container id=app>${string}</div>
         <script>window._initState_ = ${JSON.stringify(store.getState()).replace(/</g, '\\x3c')}</script>
         <script type=text/javascript src=/dist/static/js/vendor.dll.js></script>
         <script type=text/javascript src=/dist/static/js/vendor.8f6e40bfbacbb3078743.js></script>
         <script type=text/javascript src=/dist/static/js/main.js></script>
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