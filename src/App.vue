<template>
    <!--必须要有唯一的根元素-->
    <div>
        <!--顶部 mint-ui -->
        <!--<mt-header fixed title="Vue项目"></mt-header>-->

        <!--中间的路由占位符-->
        <router-view></router-view>

        <!--底部的TabBar-->
        <nav class="mui-bar mui-bar-tab">
			<router-link to="/home" class="mui-tab-item">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link to="/message" class="mui-tab-item">
				<span class="mui-icon mui-icon-email"><span class="mui-badge">9</span></span>
				<span class="mui-tab-label">消息</span>
			</router-link>
			<router-link to="/shopcart" class="mui-tab-item">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">通讯录</span>
			</router-link>
			<router-link to="/settings" class="mui-tab-item">
				<span class="mui-icon mui-icon-gear"></span>
				<span class="mui-tab-label">设置</span>
			</router-link>
		</nav>
    </div>
</template>

<style>
    /* 更改mint-ui的样式 */
    /*.mint-header {
        background-color: green;
    }*/
</style>