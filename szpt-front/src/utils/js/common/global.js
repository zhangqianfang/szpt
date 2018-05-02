// PRO环境配置
const japApiProPath = 'http://192.168.20.54:8080/jap/api/jap'
// DEV环境配置
const japApiDevPath = '/jap/api/jap'
const localCityName = '浙江省'

export default {
  'japApiPath': process.env.NODE_ENV === 'production' ? japApiProPath : japApiDevPath,
  localCityName
}
