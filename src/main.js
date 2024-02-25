import { createApp } from 'vue'
import '@/assets/css/index.less'
import App from './App'
import router from './router'
import store from './store'
import '@/vab'
import svgIcon from './icons'
import {
    Modal,
    Row,
    Col,
    Image,
    Spin,
    Empty,
    Button,
    Input,
    Table,
    Progress,
    Layout,
    Menu,
    Dropdown,
    SubMenu,
    Select,
    BackTop,
    Tooltip,
    TabPane,
    Tabs,
    Carousel
} from 'ant-design-vue'

import Notification from 'ant-design-vue/lib/notification'
import message from 'ant-design-vue/lib/message'

const app = createApp(App)
app.config.globalProperties.$notification = Notification
app.config.globalProperties.$message = message


app
    .use(svgIcon)
    .use(store)
    .use(router)
    .use(Modal)
    .use(Row)
    .use(Col)
    .use(Image)
    .use(Spin)
    .use(Empty)
    .use(Button)
    .use(Input)
    .use(Table)
    .use(Progress)
    .use(Layout)
    .use(Menu)
    .use(Dropdown)
    .use(SubMenu)
    .use(Select)
    .use(BackTop)
    .use(Tooltip)
    .use(TabPane)
    .use(Tabs)
    .use(Carousel)
    .mount('#app')
