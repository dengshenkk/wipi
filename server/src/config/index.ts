import { IConfig } from './config.interface'
import devConfig from './dev'
import prodConfig from './prod'

const isProd = process.env.NODE_ENV === 'production'
const config: IConfig = isProd ? prodConfig : devConfig

export default config
