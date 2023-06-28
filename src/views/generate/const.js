export const [
    DETAILS,
    ENVIRONMENT,
    MAIN_IDEA,
    PUBLISH,
    START,
    STYLE] = ['DETAILS', 'ENVIRONMENT', 'MAIN_IDEA', 'PUBLISH', 'START', 'STYLE']

export const stepList = [
    {
        status: 'START', // 当前作品实际状态
        nextStatus: 'MAIN_IDEA', // 页面正在填写的部分
        label: 'Main Idea',
        sort: 1  // 状态排序
    },
    {
        status: 'MAIN_IDEA',
        nextStatus: 'STYLE',
        label: 'Style',
        sort: 2
    },
    {
        status: 'STYLE',
        nextStatus: 'ENVIRONMENT',
        label: 'Environment',
        sort: 3
    },
    {
        status: 'ENVIRONMENT',
        nextStatus: 'DETAILS',
        label: 'Details',
        sort: 4
    },
    {
        status: 'DETAILS',
        nextStatus: 'PUBLISH',
        label: 'Publish',
        sort: 5
    }
]

export const STEP_SORT = ['START', 'MAIN_IDEA', 'STYLE', 'ENVIRONMENT', 'DETAILS', 'PUBLISH']



const isProd =
    location.search.indexOf('?isProd=1') > -1 ||
    (location.origin.indexOf('//dev') === -1 &&
        location.origin.indexOf('//test') === -1 &&
        location.origin.indexOf('//127.0.0.1') === -1)
let env = isProd ? 'prod' : 'dev'

export const domainMap = {
    dev: 'https://test.a1pha.win/',
    prod: 'https://artifuse.ai/'
}
export const shareUrlPrefix = `${domainMap[env]}generate`

// prompt格式校验
export const ART_NAME_PATTERN = /^[\w\d,._]{1,}( [\w\d,._]{1,}){0,9}$/
export const MAIN_IDEA_PATTERN = /^[\w\d,._]{1,}( [\w\d,._]{1,}){0,29}$/
export const STYLE_PATTERN = /^[\w\d,._]{1,}( [\w\d,._]{1,}){0,14}$/
export const ENVIRONMENT_PATTERN = /^[\w\d,._]{1,}( [\w\d,._]{1,}){0,19}$/
export const DETAILS_PATTERN = /^[\w\d,._]{1,}( [\w\d,._]{1,}){0,19}$/