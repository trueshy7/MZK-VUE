// 引入路由
import { createRouter, createWebHashHistory } from "vue-router";

// 路由配置
const routes = [
    {
        path: "/", // 路由路径
        name: "login", // 路由名称
        component: () => import("../pages/login.vue"),
    },
    {
        path: "/home",
        name: "home",
        component: () => import("../pages/home.vue"),
        children:[
            {
                path: "/user",
                name: "user",
                component: () => import("../pages/homechildren/UserManage.vue"),
            },
            {
                path: "/music",
                name: "music",
                component: () => import("../pages/homechildren/MusicManage.vue"),
            },
            {
                path: "/played",
                name: "played",
                component: () => import("../pages/homechildren/PlayedManage.vue"),
            },
            {
                path: "/liked",
                name: "liked",
                component: () => import("../pages/homechildren/LikedManage.vue"),
            },
            {
                path: "/favorite",
                name: "favorite",
                component: () => import("../pages/homechildren/FavoriteManage.vue"),
            }
        ]

    },
];
// 创建路由
const router = createRouter({
    history: createWebHashHistory(),
    routes, // 路由配置简写形式，同 routes: routes
    linkActiveClass: "active",
});
// 导出 router
export default router;