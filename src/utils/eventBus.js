// 发布/订阅设计模式(Pub/Sub)
class EventBus {
    constructor() {
        this.key = 0
        this._eventList = {} //调度中心列表
    }

    static Instance() {
        //返回当前类的实例的单例
        if (!EventBus._instance) {
            Object.defineProperty(EventBus, '_instance', {
                value: new EventBus()
            })
        }
        return EventBus._instance
    }
    /**
     * 注册事件至调度中心
     * @param type 事件类型，特指具体事件名
     * @param fn 事件注册的回调
     */
    onEvent(type, fn) {
        //订阅者
        if (!this._eventList[type]) {
            this._eventList[type] = {}
        }

        this._eventList[type][++this.key] = fn
        return this.key
    }
    /**
     * 触发调度中心的某个或者某些该事件类型下注册的函数
     * @param type 事件类型，特指具体事件名
     * @param data 发布者传递的参数
     */
    emitEvent(type, data) {
        const map = this._eventList[type]
        if (map) {
            Object.keys(map).forEach((key) => {
                map[key] && map[key](data)
            })
        }
    }
    offEvent(type, key) {
        //销毁监听
        if (this._eventList[type] && key) delete this._eventList[type][key]
    }
}

export default EventBus.Instance()
