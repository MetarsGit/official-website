export function _uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
        /[xy]/g,
        function (c) {
            var r = (Math.random() * 16) | 0,
                v = c == 'x' ? r : (r & 0x3) | 0x8
            return v.toString(16)
        }
    )
}

/**
 * @description 格式化时间
 * @returns {string|null}
 */
export function parseTime(timeStamp, patten = 'yyyy-MM-dd hh:mm:ss') {
    let date = new Date(timeStamp)
    let m = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ]
    let pattenMap = {
        MM: date.getMonth() + 1,
        dd: date.getDate(),
        hh: date.getHours(),
        mm: date.getMinutes(),
        ss: date.getSeconds(),
        qq: Math.floor((date.getMonth() + 3) / 3),
        S: date.getMilliseconds()
    }

    if (/(ENM)/.test(patten)) {
        patten = patten.replace(RegExp.$1, m[date.getMonth()])
    }
    if (/(TIMEZONE)/.test(patten)) {
        patten = patten.replace(
            RegExp.$1,
            date.getTimezoneOffset() < 0
                ? '+' + date.getTimezoneOffset() / -60
                : date.getTimezoneOffset() / -60
        )
    }
    if (/(yy+)/.test(patten)) {
        patten = patten.replace(
            RegExp.$1,
            (date.getFullYear() + '').substr(4 - RegExp.$1.length)
        )
    }

    for (let k in pattenMap) {
        if (new RegExp('(' + k + ')').test(patten)) {
            patten = patten.replace(
                RegExp.$1,
                RegExp.$1.length === 1
                    ? pattenMap[k]
                    : ('00' + pattenMap[k]).substr(('' + pattenMap[k]).length)
            )
        }
    }

    return patten
}

/**
 * @description 将url请求参数转为json格式
 * @param url
 * @returns {{}|any}
 */
export function paramObj(url) {
    const search = url.split('?')[1]
    if (!search) {
        return {}
    }
    return JSON.parse(
        '{"' +
            decodeURIComponent(search)
                .replace(/"/g, '\\"')
                .replace(/&/g, '","')
                .replace(/=/g, '":"')
                .replace(/\+/g, ' ') +
            '"}'
    )
}

/**
 * @description 不四舍五入取小数点位数
 * @param num
 * @returns number
 */
export function amountFloor(num, p = 4) {
    if (!num) {
        return 0
    }
    if (typeof num !== 'number' && typeof num !== 'string') {
        return num
    }
    const precision = Math.pow(10, p)
    return Math.floor(num * precision) / precision
}

export function shortString(str, start = 6, end = 4) {
    if (!str) {
        return '--'
    }

    const originStr = String(str)
    if (start + end + 3 >= str.length) {
        return str
    }

    if (!end) {
        return originStr.slice(0, start) + '...'
    }

    return originStr.slice(0, start) + '...' + originStr.slice(-1 * end)
}

/**
 * 时间差
 * @param ptime 毫秒
 * @param ctime 毫秒
 * @returns {string}
 */
export function timeago(ptime, ctime) {
    if (!ptime || !ctime) return ''
    // let ntime = new Date(ptime * 1000),
    //     seconds = Math.floor((ctime - ntime) / 1000),
    let seconds = Math.floor((ctime - ptime) / 1000),
        intervals = [
            Math.floor(seconds / 31536000),
            Math.floor(seconds / 2592000),
            Math.floor(seconds / 604800),
            Math.floor(seconds / 86400),
            Math.floor(seconds / 3600),
            Math.floor(seconds / 60)
        ],
        times = ['year', 'month', 'week', 'day', 'hour', 'minute'],
        key,
        res
    for (key in intervals) {
        if (intervals[key] > 1) {
            res = intervals[key] + ' ' + times[key] + 's '
            return res
        } else if (intervals[key] === 1) {
            res = intervals[key] + ' ' + times[key] + ' '
            return res
        }
    }
    return 'Just now'
}

export function toThousandFilter(num, fraction) {
    if (typeof num === 'undefined' || num === null) {
        return '--'
    }
    if (!num) {
        return num
    }
    const toFix =
        String(num).indexOf('.') !== -1 && typeof fraction !== 'undefined'
    const numFixed = toFix ? num.toFixed(fraction) : num

    const numStr = String(numFixed)
    let numDeci = ''
    let numInt = numStr.split('.')[0]
    if (numStr.indexOf('.') > -1) {
        numDeci = '.' + numStr.split('.')[1]
    }

    let numPrefix = ''
    let numArr = ''
    let numDist = ''

    // 处理负数情况
    if (numInt < 0) {
        numPrefix = '-'
        numArr = String(numInt).slice(1).split('').reverse()
    } else {
        numArr = String(numInt).split('').reverse()
    }

    for (let i = 0; i < numArr.length; i++) {
        numDist += numArr[i]
        if ((i + 1) % 3 === 0 && i + 1 < numArr.length) {
            numDist += ','
        }
    }

    numDist = numPrefix + numDist.split('').reverse().join('')
    return numDist + numDeci
}

/**
 * @description 格式化大数据
 * @returns {string|null}
 */
export function converterNum(n, fraction) {
    if (typeof n === 'undefined' || n === null) {
        return '--'
    }
    if (isNaN(Number(n))) {
        return n
    }
    const num = Number(n)
    if (num < 1e6) {
        const toFix =
            String(num).indexOf('.') !== -1 && typeof fraction !== 'undefined'
        const fixedNum = toFix ? num.toFixed(fraction) : num
        return toThousandFilter(fixedNum)
    }
    // if (num >= 1e5 && num < 1e6) {
    //     const toFix = String(num / 1e3).indexOf('.') !== -1
    //     const fixedNum = toFix ? +(num / 1e3).toFixed(fraction) : +(num / 1e3)
    //     return fixedNum + 'K'
    // }
    if (num >= 1e6 && num < 1e9) {
        const toFix = String(num / 1e6).indexOf('.') !== -1
        const fixedNum = toFix ? +(num / 1e6).toFixed(fraction) : +(num / 1e6)
        return fixedNum + 'M'
    }
    if (num >= 1e9 && num < 1e12) {
        const toFix = String(num / 1e9).indexOf('.') !== -1
        const fixedNum = toFix ? +(num / 1e9).toFixed(fraction) : +(num / 1e9)
        return fixedNum + 'B'
    }
    if (num >= 1e12 && num < 1e15) {
        const toFix = String(num / 1e12).indexOf('.') !== -1
        const fixedNum = toFix ? +(num / 1e12).toFixed(fraction) : +(num / 1e12)
        return fixedNum + 'T'
    }
    if (num >= 1e15) {
        const toFix = String(num / 1e15).indexOf('.') !== -1
        const fixedNum = toFix ? +(num / 1e15).toFixed(fraction) : +(num / 1e15)
        return fixedNum + 'P'
    }
}

/**
 * @description 计算时间差
 * @returns {string|null}
 */
export function getTimeDiff(datetime) {
    datetime =
        typeof datetime !== 'undefined'
            ? datetime
            : '2014-01-01 01:02:03.123456'
    datetime = new Date(datetime).getTime()
    var now = new Date().getTime()

    if (isNaN(datetime)) return ''

    const DAYTIME = 24 * 60 * 60 * 1000
    const HOURTIME = 60 * 60 * 1000
    const MINTIME = 60 * 1000

    var milisec_diff = datetime < now ? now - datetime : datetime - now
    var days = Math.floor(milisec_diff / DAYTIME)
    var hours = Math.floor((milisec_diff % DAYTIME) / HOURTIME)
    var mins = Math.floor(((milisec_diff % DAYTIME) % HOURTIME) / MINTIME)
    var secs = Math.floor(
        (((milisec_diff % DAYTIME) % HOURTIME) % MINTIME) / 1000
    )
    // return days + " Days "+ date_diff.getHours() + " Hours " + date_diff.getMinutes() + " Minutes " + date_diff.getSeconds() + " Seconds";
    return days
        ? days + ' Days'
        : hours
        ? hours + ' Hours'
        : mins
        ? mins + ' Minutes'
        : secs + ' Seconds'
}
