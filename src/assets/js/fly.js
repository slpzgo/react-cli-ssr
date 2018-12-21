import flyio from 'flyio'

const APIS = {
  weather: {
    url: '/weather',
    method: 'GET'
  },
  position: {
    method: 'GET',
    url: '/position'
  }
}

flyio.config.baseURL = 'http://localhost:8888/'
// flyio.config.withCredentials = true
flyio.config.timeout = 100000
flyio.config.responseType = 'json'

flyio.interceptors.request.use(config => {
  let contentType = 'application/json'
  // if (config.method === 'POST') contentType = 'application/x-www-form-urlencoded'
  config.headers['Content-Type'] = contentType
  // config.headers['Session'] = 'pkfkurqfnteycjagywyfkuxikqbqrcfd'
  return config
},
error => {
  return Promise.reject(error)
})

flyio.interceptors.response.use(
  response => {
    return response
  },
  error => {
    return Promise.reject(error)
  }
)

const matchUri = (url, params) => {
  url = url.replace(/\$[a-zA-Z0-9]+/, a => {
    const key = a.slice(1)
    const val = params[key]
    delete params[key]
    return val
  })
  return url
}

export default function fetch (options) {
  if (options.constructor !== Object) throw new Error('fetch options must be object!')
  if (!options.api && !options.url) throw new Error('fetch options have no api or url!')

  return new Promise((resolve, reject) => {
    const fromApi = !!options.api
    let { method, url } = fromApi ? APIS[options.api] : options
    if (!method) throw new Error('fetch options have no method!')
    if (url.includes('$')) {
      url = matchUri(url, options.params)
    }

    flyio[method.toLowerCase()](url, options.params, options.configs)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
  })
}