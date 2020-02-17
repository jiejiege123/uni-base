/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-30 09:31:42
 * @LastEditTime : 2019-12-30 16:09:07
 * @LastEditors  : Please set LastEditors
 */
import {http} from '@/utils/http-request/index.js'

export function getSqMode(data) {
  return http.post('/Com/ZhenjianGh/GetSqMode', data)
}