import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/components/templates/Welcome'
import Board from '@/components/templates/Board'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Welcome',
            component: Welcome
        },
        {
            path: '/level-:level',
            name: 'Board',
            component: Board
        }
    ]
})
