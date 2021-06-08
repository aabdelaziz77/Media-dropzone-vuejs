import Installation from './pages/Installation.vue';
import Props from './pages/Props.vue';
import demo from './pages/demo.vue';
import events from './pages/Events.vue'
import Solts from './pages/Solts.vue'

export default [
  { path: '/installation', component: Installation },
  { path: '/props', component: Props},
  { path: '/events', component: events },
  { path: '/solts', component: Solts },
  { path: '/demo', component: demo },
  { path: '*', redirect: '/installation' }
]