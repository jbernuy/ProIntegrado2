import Vue from "vue";
import VueRouter from "vue-router";
import P404 from '../views/P404';
import tokenMiddleware from '../middlewares/tokenMiddleware';
import userMiddleware from "../middlewares/userMiddleware";
import userRoutes from "./userRoutes";
import loginRoutes from "./loginRoutes";

Vue.use(VueRouter);

const routes = [{
        path: "*",
        name: "P404",
        component: P404,
        meta: {
            autenticate: false
        }
    },
    loginRoutes,
    userRoutes,
    {
        path: "/viewer/:aulaId/:cursoId/:tareaId",
        component: () =>
            import ('../views/ViewerCourse'),
        children: [{
            path: '/viewer/:aulaId/:cursoId/:tareaId',
            name: 'Tarea',
            component: () =>
                import ('../views/Task'),
            beforeEnter: userMiddleware
        }, ],
        meta: {
            autenticate: true
        },
    },
];

const router = new VueRouter({
    mode: "history",
    linkActiveClass: 'active',
    base: process.env.BASE_URL,
    routes
});

router.beforeEach(tokenMiddleware);

export default router;