import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GrabarRutaView from '../views/GrabarRutaView.vue'
import PerfilView from '../views/PerfilView.vue'
import RutaIndividualView from '../views/RutaIndividualView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/grabar', name: 'grabar', component: GrabarRutaView },
  { path: '/perfil', name: 'perfil', component: PerfilView },
  { path: '/ruta/:id', name: 'rutaIndividual', component: RutaIndividualView }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
