const path = require('path')
const {
    /* baseURL, */
    publicPath,
    lintOnSave,
    title,
    devPort
} = require('./src/config')
process.env.VUE_APP_TITLE = title

function resolve(dir) {
    return path.join(__dirname, dir)
}


const IS_PROD = process.env.NODE_ENV === 'production'
// vue.config.js
const vueConfig = {
    publicPath,

    configureWebpack(config) {
        // if (IS_PROD) {
        config.optimization.splitChunks = {
            cacheGroups: {

                vendors: {
                    name: 'chunk-vendors',
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'initial',
                    priority: 2,
                    reuseExistingChunk: true,
                    enforce: true
                },
                antDesignVue: {
                    name: 'chunk-ant-design-vue',
                    test: /[\\/]node_modules[\\/]ant-design-vue[\\/]/,
                    chunks: 'initial',
                    priority: 3,
                    reuseExistingChunk: true,
                    enforce: true
                },
                web3: {
                    name: 'chunk-web3',
                    test: /web3\/dist/,
                    chunks: 'initial',
                    priority: 3,
                    reuseExistingChunk: true,
                    enforce: true
                }
            }
        }
        // }
        // if prod, add externals
        externals: { }
    },

    chainWebpack: (config) => {
        config.resolve.alias.set('@$', resolve('src'))

        const svgRule = config.module.rule('svg')
        svgRule.uses.clear()
        svgRule.exclude.add(/node_modules/)
        svgRule
            .test(/\.svg$/)
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })

        const imagesRule = config.module.rule('images')
        imagesRule.exclude.add(resolve('src/icons')) // !!! 注意路径
        config.module.rule('images').test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
    },

    css: {
        loaderOptions: {
            less: {
                // DO NOT REMOVE THIS LINE
                javascriptEnabled: true
            }
        }
    },

    devServer: {
        // development server port 8000
        host: '127.0.0.1',
        port: devPort,
        hot: true,
        open: true,
        // If you want to turn on the proxy, please remove the mockjs /src/main.jsL11
        proxy: {
            //配置权限代理
            '/api': {
                // target: 'https://dev.titandao.io/',
                target: 'https://test1.a1pha.win/',
                changeOrigin: true,
                headers: {
                    Connection: 'keep-alive'
                }
                // pathRewrite: {
                //     '^/api': ''
                // }
            }
        }
    },

    // disable source map in production
    productionSourceMap: false,

    lintOnSave,

    // babel-loader no-ignore node_modules/*
    transpileDependencies: [],

    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'less',
            patterns: [path.resolve(__dirname, 'src/assets/css/antd.less')]
        }
    }
}

module.exports = vueConfig
