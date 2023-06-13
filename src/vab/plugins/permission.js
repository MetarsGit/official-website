import router from '@/router'
import getPageTitle from '@/utils/pageTitle'
import { routesVarifyList } from '@/config'

router.beforeEach(async (to, from, next) => {
    if (!routesVarifyList.includes(to.path)) {
        // 如果路由页面不需要钱包连接验证
        next()
    }
})

router.afterEach((to) => {
    document.title = getPageTitle(to.meta.title)
})
