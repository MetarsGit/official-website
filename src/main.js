import { createApp } from 'vue'
import '@/assets/css/index.less'
import App from './App'
import router from './router'
import store from './store'
import '@/vab'
import svgIcon from './icons'
import Antd from 'ant-design-vue'

import Notification from 'ant-design-vue/lib/notification'
import message from 'ant-design-vue/lib/message'

const app = createApp(App)
app.config.globalProperties.$notification = Notification
app.config.globalProperties.$message = message

app.use(svgIcon).use(store).use(router).use(Antd).mount('#app')
