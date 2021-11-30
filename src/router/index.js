import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Public/Login.vue';
import PanelDeControl from '../components/Admin/PanelDeControl';
import AdminSolicitudes from '../components/Admin/AdminSolicitudes';
import DetalleSolicitud from '../components/Admin/DetalleSolicitud';
import AsignarSolicitud from '../components/Admin/AsignarSolicitud';
import AdminOpiniones from '../components/Admin/AdminOpiniones';
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  //Administrador RVOES
  {
    path: '/PanelDeControl',
    name: 'AdminPanel',
    component: PanelDeControl,
    children:[{
    path: '/AdminSolicitudes',
    name: 'AdminSolicitudes',
    component: AdminSolicitudes,
    },
    {
    path: '/DetalleSolicitud/:id',
    name: 'DetalleSolicitud',
    component: DetalleSolicitud,
    },
    {
      path: '/AsignarArea/:id',
      name: 'AsignarArea',
      component: AsignarSolicitud,
    },
    {
      path:'/AdminOpiniones/:id',
      name: 'AdminOpiniones',
      component: AdminOpiniones
    }
  ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
