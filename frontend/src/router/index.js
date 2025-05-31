import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GrabarRutaView from '../views/GrabarRutaView.vue'
import PerfilView from '../views/PerfilView.vue'
import RutaIndividualView from '../views/RutaIndividualView.vue'

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/grabar', name: 'GrabarRuta', component: GrabarRutaView },
  { path: '/perfil', name: 'Perfil', component: PerfilView },
  { path: '/ruta/:id', name: 'RutaIndividual', component: RutaIndividualView }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router


