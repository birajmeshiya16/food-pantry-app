import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import NotFound from '@/components/NotFound.vue'
import VolunteerRegistration from '@/views/VolunteerRegistration.vue'
import VolunteersPage from '@/views/VolunteersPage.vue'
import { config } from '@/config'
import { useAuthUserStore } from '@/stores/authUser'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/terms',
    name: 'Terms',
    component: () => import('../views/TermsPage.vue'),
  },
  {
    path: '/privacy-policy',
    name: 'Privacy',
    component: () => import('../views/PrivacyPage.vue'),
  },
  {
    path: '/pending',
    name: 'Pending',
    component: () => import ('../views/Pending.vue'),
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: () => import('../views/ForgotPassword.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: VolunteerRegistration,
  },
  {
    path: '/volunteers',
    name: 'Volunteers',
    component: VolunteersPage,
    meta: { admin: true}
  },
  {
    path: '/schedule',
    name: 'Schedule',
    component: () => import ('@/views/SchedulePage.vue'),
    meta: { admin: true}
  },
  {
    path: '/schedule-window/:date?',
    name: 'ScheduleWindow',
    props: true,
    component: () => import ('@/views/ScheduleWindowPage.vue'),
    meta: { admin: true}
  },
  {
    path: '/schedule-window/id/:id',
    name: 'ScheduleWindowById',
    props: true,
    component: () => import ('@/views/ScheduleWindowPage.vue'),
    meta: { admin: true}
  },
  {
    path: '/volunteerwindow/:id',
    name: 'VolWindow',
    props: true,
    component: () => import ('@/views/VolunteerWindow.vue'),
  },
  {
    path: '/profile/:uid?',
    name: 'Profile',
    props: true,
    component: () => import ('@/views/ProfilePage.vue'),
  },
  {
    path: '/location/:id?',
    name: 'Location',
    props: true,
    component: () => import('@/views/LocationPage.vue'),
    meta: { admin: true},
  },
  {
    path: '/locations',
    name: 'LocationsList',
    component: () => import('@/views/LocationsListPage.vue'),
    meta: { admin: true},
  },
  {
    path: '/tasktype/:id?',
    name: 'TaskType',
    props: true,
    component: () => import('@/views/TaskTypePage.vue'),
    meta: { admin: true},
  },
  {
    path: '/tasktypes',
    name: 'TaskTypesList',
    component: () => import('@/views/TaskTypesListPage.vue'),
    meta: { admin: true},
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('../views/ContactPage.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
  }
]

const router = new createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// This callback runs before every route change, including on page load.
router.beforeEach( (to, from) => {
  const user = useAuthUserStore()
  if (!user || !(user.isLoggedIn === true) || (user.isAdmin !== true) && (user.isVolunteer !== true)) {
    if (user && user.isPending === true && to.name !== 'Pending' && to.name !== 'Contact' && to.name !== 'Terms' && to.name !== 'Privacy') {
      console.log('redirect to pending to.name='+to.name+' user.isLoggedIn='+user.isLoggedIn + ' isPending=' + user.isPending)
      return { name: 'Pending'}
    } else if (to.path !== '/login' && to.path !== '/register' && to.path !== '/forgot-password' &&
               to.path !== '/contact' && to.path !== '/pending' &&
               to.path !== '/terms' && to.path !== '/privacy-policy'
              ) {
      return { name: 'Login' }
    }
  }
  if (to.meta.admin === true && !user.isAdmin) {
    return from
  }
})

export default router
