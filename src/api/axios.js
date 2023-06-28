import Axios from 'axios'
import { message } from 'ant-design-vue'
import { getAccessToken } from '@/utils/accessToken'

function showError(_tip) {
    message.error(_tip, 3)
}

const whiteListCodes = {
    106: 'Please Login',
    111: 'The artwork is generating',
    // 112: 'The current work has been completed, please jump to the artwork details page.'
}

const service = Axios.create({
    timeout: 30000
})

/**
 * @description 请求发起前的拦截器
 * @returns {AxiosRequestConfig} config
 */
service.interceptors.request.use(async (config) => {
    if (getAccessToken()) {
        config.headers['token'] = getAccessToken()
    }

    if (process.env.NODE_ENV === 'development') {
        config.url = `${config.url}`
    }
    return config
})

const get = (path, params) => {
    return service
        .get(path, { params })
        .then((resp) => {
            const data = resp.data
            const { code, msg } = data
            if (resp.status === 200) {
                if (code === 1) {
                    return Promise.resolve(data)
                } else {
                    if (!whiteListCodes[code]) {
                        showError(msg)
                    }
                    return Promise.resolve(data)
                }
            } else {
                return Promise.reject(new Error(msg))
            }
        })
        .catch((err) => {
            let __emsg = err.message || ''
            return Promise.reject(new Error(__emsg))
        })
}

const post = (path, data) => {
    return service
        .post(path, data)
        .then((resp) => {
            const data = resp.data
            const { code, msg } = data
            if (resp.status === 200) {
                if (code === 1) {
                    return Promise.resolve(data)
                } else {
                    if (!whiteListCodes[code]) {
                        showError(msg)
                    }
                    return Promise.resolve(data)
                }
            } else {
                return Promise.reject(new Error(msg))
            }
        })
        .catch((err) => {
            let __emsg = err.message || ''
            return Promise.reject(new Error(__emsg))
        })
}

export default {
    service,
    get,
    post
}
