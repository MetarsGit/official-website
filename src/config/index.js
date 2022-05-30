import devConfig from './dev.config'
import prodConfig from './prod.config'

// const isProd = process.env.NODE_ENV === 'production'
const isProd = location.host === 'metars.io'
let networkConfig = prodConfig

if (!isProd) {
    networkConfig = devConfig
}

export {
    networkConfig
}