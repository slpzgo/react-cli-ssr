const express = require('express')
const path = require('path')
const fly = require('flyio')
const url = require('url')

const app = express()
app.disable('x-powered-by')

app.use(express.static(path.join(__dirname, '/client')))

// allow custom header and CORS
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild')
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')

  if (req.method == 'OPTIONS') {
    res.sendStatus(200) // 让options请求快速返回
  } else {
    next()
  }
})

// 获取全国天气API
const ak = 'nSxiPohfziUaCuONe4ViUP2N'
app.get('/weather', (req, res) => {
  const parseObj = url.parse(encodeURI(req.url), true)
  const { city } = parseObj.query
  fly.get({
    method: 'GET',
    url: `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=${ak}`
  }).then(data => {
    res.send(data.data)
  })
})

// 获取当前定位
app.get('/position', (req, res) => {
  fly.get({
    method: 'GET',
    url: `http://api.map.baidu.com/location/ip?ak=${ak}`
  }).then(data => {
    res.send(data)
  })

})

const PORT = process.argv[2] || 8888
app.listen(PORT, () => {
  console.log('Production Express server running at localhost:' + PORT)
})