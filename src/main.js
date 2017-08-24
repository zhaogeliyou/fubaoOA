/**
 * 打包的入口文件中最重要的一个职责
 * 
 * 是使用Vue,渲染出我们项目启动之后用户看到的第一个页面
 * 
 */
import Vue from 'vue' //相当于es5 var Vue = require('vue')
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import VuePreview from 'vue-preview'

var moment = require('moment');

// 导入基于Vue的第三方包
import MintUI from 'mint-ui'

// 使用基于Vue的第三方包
Vue.use(MintUI)
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(VuePreview)

// 统一导入css的地方
// 导入mint-ui
import 'mint-ui/lib/style.min.css'
// 导入mui
import '../statics/mui/css/mui.min.css'
import '../statics/mui/css/icons-extra.css'
import '../statics/js/mui.js'
// 导入自己的css
import '../statics/css/site.css'


//导入Vue项目中要渲染的第一个页面的文件
//vue-loader会帮我们自动把那个当文件组件导出
import App from './App.vue'

//全局过滤器
Vue.filter('dmtDate',(input,formatString)=>{
    const lastFormatString = formatString || 'YYYY-MM-DD HH:mm:ss'

    //在format中指定要把我们前面的时间按照什么样的格式输出
    // 参数1：格式化的原始时间
    // 参数2：把原始时间，最终要格式化的字符串
    // 参考:http://momentjs.cn/docs/
    return moment(input).format(lastFormatString)
})

// 路由的设置
// 导入组件
import home from './components/home/home.vue'
import message from './components/message/message.vue' 
import shopcart from './components/shopcart/shopcart.vue' 
import settings from './components/settings/settings.vue' 
import newslist from './components/news/newslist.vue'
import newsdetail from './components/news/newsdetail.vue'
import photolist from './components/photo/photolist.vue'
import photoinfo from './components/photo/photoinfo.vue'

// 创建并且设置路由
const router = new VueRouter({
    routes:[
        {path:'/',redirect:'/home'},
        {path:'/home',component:home},
        {path:'/message',component:message},
        {path:'/shopcart',component:shopcart},
        {path:'/settings',component:settings},
        {path:'/news/newslist',component:newslist},
        {path:'/news/newsdetail/:newsId',component:newsdetail},
        {path:'/photo/photolist',component:photolist},
        {path:'/photo/photoinfo/:photoId',component:photoinfo}
    ],
    linkActiveClass:'mui-active'
})

//根实例（绑定了App.vue）
new Vue({
    el:'#app',
    router, //相当于 router:router
    render:function(createElement){
        //这里的写法有很多，如果我们是直接导入单文件组件，就像下面这样写
        return createElement(App)
    }
})