import userMiddleware from "../middlewares/userMiddleware";
import Home from '../views/Home';

export default {
    path: "/",
    component: Home,
    children: [{
            path: '/',
            name: 'Stats',
            component: () =>
                import ('../views/Stats'),
            beforeEnter: userMiddleware
        },
        {
            path: '/usuarios',
            name: 'Users',
            component: () =>
                import ('../views/Users'),
            beforeEnter: userMiddleware
        },
        {
            path: '/aulas',
            name: 'Classrooms',
            component: () =>
                import ('../views/Classrooms'),
            beforeEnter: userMiddleware
        },
        {
            path: '/aulas/:aulaId',
            name: 'Classroom',
            component: () =>
                import ('../views/Classroom'),
            beforeEnter: userMiddleware
        },
        {
            path: '/aulas/:aulaId/:cursoId',
            name: 'Classroom-course',
            component: () =>
                import ('../views/Course'),
            beforeEnter: userMiddleware,
            children: [{
                path: '/aulas/:aulaId/:cursoId/:tareaId',
                name: 'Classroom-course-task',
                component: () =>
                    import ('../views/ResumeTask'),
                beforeEnter: userMiddleware
            }, ]
        },
        {
            path: '/grados',
            name: 'Degrees',
            component: () =>
                import ('../views/Degrees'),
            beforeEnter: userMiddleware
        },
        {
            path: '/cursos',
            name: 'Courses',
            component: () =>
                import ('../views/Courses'),
            beforeEnter: userMiddleware
        },
        {
            path: '/perfil',
            name: 'Profile',
            component: () =>
                import ('../views/Profile'),
            beforeEnter: userMiddleware
        },
    ],
    meta: {
        autenticate: true
    },

}