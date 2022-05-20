import { createApp } from 'vue'
import "@/assets/css/index.less";
import App from './App.vue'
import router from './router'
import {createStore} from './store'
import SvgIcon from './icons'
import Web3 from 'web3'
import directives from '@/directives'
import eventBus from 'vue3-eventbus'
import { networkConfig } from "@/config";
import Row from 'ant-design-vue/lib/row';
import Col from 'ant-design-vue/lib/col';
import Button from 'ant-design-vue/lib/button';
import Icon from 'ant-design-vue/lib/icon'
import Timeline from 'ant-design-vue/lib/timeline'
import Pagination from 'ant-design-vue/lib/pagination'
import Dropdown from 'ant-design-vue/lib/dropdown'
import Menu from 'ant-design-vue/lib/menu'
import BackTop from 'ant-design-vue/lib/back-top'
import Notification from 'ant-design-vue/lib/notification'
import Modal from 'ant-design-vue/lib/modal'
import Alert from 'ant-design-vue/lib/alert'
import Skeleton from 'ant-design-vue/lib/skeleton'
import Avatar from 'ant-design-vue/lib/avatar'
import Image from 'ant-design-vue/lib/image'
import Popover from 'ant-design-vue/lib/popover'
import InputNumber from 'ant-design-vue/lib/input-number'

const web3 = new Web3(Web3.givenProvider);
const store = createStore(web3, {networkConfig});

const app = createApp(App);
app.config.globalProperties.web3 = web3
app.config.globalProperties.$networkConfig = networkConfig
app.config.globalProperties.$notification = Notification;
// console.log('web3:: ', web3);

app
    .use(Row)
    .use(Col)
    .use(Button)
    .use(Icon)
    .use(Timeline)
    .use(Pagination)
    .use(Dropdown)
    .use(Menu)
    .use(BackTop)
    .use(Modal)
    .use(Alert)
    .use(Skeleton)
    .use(Avatar)
    .use(Image)
    .use(Popover)
    .use(InputNumber)
app
    .use(SvgIcon)
    .use(store)
    .use(directives)
    .use(router)
    .use(eventBus)
    .mount('#app')
