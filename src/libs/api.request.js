import HttpRequest from '@/libs/axios'
import config from '@/config'

//这里是iview-admin原来自己配置的
const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro
const axios = new HttpRequest(baseUrl)

export default axios
