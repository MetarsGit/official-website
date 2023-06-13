<template>
    <div class="countdown">
        <div class="item">
            <span class="count">
                &nbsp;{{ d }}&nbsp;{{ formatUnit('Day', d) }}
            </span>
        </div>
        <div class="item">
            <span class="count">
                &nbsp;{{ h }}&nbsp;{{ formatUnit('Hour', h) }}
            </span>
        </div>
        <div class="item">
            <span class="count">
                &nbsp;{{ m }}&nbsp;{{ formatUnit('Minute', m) }}
            </span>
        </div>
        <div class="item">
            <span class="count">
                &nbsp;{{ s }}&nbsp;{{ formatUnit('Second', s) }}
            </span>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                flag: false,
                d: 0,
                h: 0,
                m: 0,
                s: 0
            }
        },
        props: {
            endTime: {
                type: Number,
                default: -1
            }
        },
        mounted() {
            this.init()
        },
        watch: {
            endTime() {
                this.init()
            }
        },
        methods: {
            init() {
                const nowTime = new Date().getTime()
                if (this.endTime <= nowTime) {
                    this.$emit('time-end')
                    this.d = 0
                    this.h = 0
                    this.m = 0
                    this.s = 0
                } else {
                    this.startTimer()
                }
            },
            startTimer() {
                let timer = setInterval(() => {
                    if (this.flag) {
                        clearInterval(timer)
                        return
                    }
                    this.timeDown()
                }, 1000)
            },
            timeDown() {
                const endTime = new Date(this.endTime)
                const nowTime = new Date()
                let leftTime = parseInt(
                    (endTime.getTime() - nowTime.getTime()) / 1000
                )
                if (leftTime <= 0) {
                    this.flag = true
                    this.$emit('time-end')
                    this.d = 0
                    this.h = 0
                    this.m = 0
                    this.s = 0
                    return
                }
                let d = parseInt(leftTime / (24 * 60 * 60))
                let h = parseInt((leftTime / (60 * 60)) % 24)
                let m = parseInt((leftTime / 60) % 60)
                let s = parseInt(leftTime % 60)
                this.d = d
                this.h = h
                this.m = m
                this.s = s
            },
            formatUnit(type, value) {
                return value > 1 ? `${type}s` : type
            }
        }
    }
</script>

<style scoped lang="less">
    .countdown {
        display: inline-flex;
        align-items: center;
        justify-content: space-between;
        .item {
            display: inline-flex;
        }
    }
</style>
