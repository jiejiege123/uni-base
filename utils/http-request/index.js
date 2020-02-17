import Request from './request'

const http = new Request()
// const refreshToken = getTokenDebounce()
http.setConfig((config) => { /* 设置全局配置 */
  config.baseUrl = 'http://39.96.65.117:9010' /* 根域名不同 */
  config.header = {
    ...config.header,
  }
  return config
})

/**
 * 自定义验证器，如果返回true 则进入响应拦截器的响应成功函数(resolve)，否则进入响应拦截器的响应错误函数(reject)
 * @param { Number } statusCode - 请求响应体statusCode（只读）
 * @return { Boolean } 如果为true,则 resolve, 否则 reject
 */
// 有默认，非必写
http.validateStatus = (statusCode) => {
  return statusCode === 200
}

http.interceptor.request((config, cancel) => { /* 请求之前拦截器 */
  config.header = {
    ...config.header,
  }
  /*
  if (!token) { // 如果token不存在，调用cancel 会取消本次请求，但是该函数的catch() 仍会执行
    cancel('token 不存在') // 接收一个参数，会传给catch((err) => {}) err.errMsg === 'token 不存在'
  }
  */
  return config
})

// 必须使用异步函数，注意
http.interceptor.response(async (response) => { /* 请求之后拦截器 */
  // if (response.data.code === tokenExpireCode) {
  //   // jwt token 过期了
  //   expireToken.push(response.config.header.token) // 把过期token 储存
  //   const currToken = getTokenStorage() // todo 获取token逻辑，可自定义
  //   if (expireToken.includes(currToken)) { // 本地储存的是过期token了，重新获取
  //     const getTokenResult = await refreshToken()
  //     if (getTokenResult === 'success') { // 获取新的token成功
  //       const repeatRes = await reReqest.request(configHandle(response.config)) // XXX 可根据自身逻辑决定是否需要重新创建一个示例
  //       console.log('重新获取后的结果')
  //       console.log(repeatRes)
  //       if (repeatRes) {
  //         response = repeatRes
  //       }
  //     }
  //   } else {
  //     // 本地的是重新获取的token 直接使用就行了
  //     const repeatRes = await reReqest.request(configHandle(response.config))
  //     console.log('重新获取后的结果')
  //     console.log(repeatRes)
  //     if (repeatRes) {
  //       response = repeatRes
  //     }
  //   }
  // }
  if (response.data.code !== 200) { // 服务端返回的状态码不等于200，则reject()
    return Promise.reject(response.data)
  } else {
	return response
  }
}, (response) => { // 请求错误做点什么
  return response
})

export {http}
