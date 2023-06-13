var debounce = (func, delay) => {
    var timer = null
    return function () {
        var context = this
        var args = arguments
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(function () {
            func.apply(context, args)
            timer = null
        }, delay)
    }
}

export default debounce
