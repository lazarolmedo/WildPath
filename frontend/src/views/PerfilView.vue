<template>
  <main class="container py-5">
    <!-- Vista cuando NO se ha iniciado sesión -->
    <section v-if="!logueado" class="text-center">
      <img src="/user-icon.png" alt="Icono de usuario no autenticado" width="100" class="mb-3 rounded-circle border shadow-sm">
      <h1 class="h3">Perfil</h1>
      <p class="text-muted">Inicia sesión para ver y editar tu perfil.</p>
      <a href="http://localhost:3000/auth/google" class="btn btn-success mt-3">
        <i class="bi bi-google me-2"></i>Inicia sesión con Google
      </a>
    </section>

    <!-- Vista cuando el usuario ya ha iniciado sesión -->
    <section v-else>
      <!-- Card de perfil -->
      <div class="card mx-auto shadow-sm bg-white" style="max-width: 600px; border: 1px solid #e0e0e0;">
        <div class="card-body text-center">
          <img src="/user-icon-logueado.png" alt="Icono de perfil" width="140" class="mb-3 rounded-circle border border-3 shadow-sm">
          <h2 class="h4 mb-0">{{ usuario.nombre }}</h2>
          <p class="text-muted mb-3">{{ usuario.email }}</p>

          <div class="d-flex justify-content-center gap-3 mb-3">
            <button class="btn btn-outline-primary" @click="modoEdicion = !modoEdicion">
              <i class="bi bi-pencil-square me-1"></i>Editar
            </button>
            <button class="btn btn-outline-danger" @click="cerrarSesion">
              <i class="bi bi-box-arrow-right me-1"></i>Cerrar sesión
            </button>
          </div>

          <!-- Estadísticas -->
          <div class="mb-4">
            <h5 class="text-start">Estadísticas</h5>
            <div class="row text-center">
              <div class="col">
                <strong>{{ usuario.estadisticas?.distanciaTotal || 0 }}</strong><br>
                <small>km recorridos</small>
              </div>
              <div class="col">
                <strong>{{ usuario.estadisticas?.rutasCompletadas || 0 }}</strong><br>
                <small>rutas completadas</small>
              </div>
            </div>
          </div>

          <!-- Logros -->
          <div class="mb-4">
            <h5 class="text-start">Logros</h5>
            <div class="d-flex justify-content-center align-items-center gap-3">
              <img v-if="usuario.logros.includes('explorador')" src="/logros/explorador.svg" alt="Explorador" width="40">
              <img v-if="usuario.logros.includes('veterano')" src="/logros/veterano.svg" alt="Veterano" width="40">
              <img v-if="usuario.logros.includes('legendario')" src="/logros/legendario.svg" alt="Legendario" width="40">
            </div>
          </div>

          <!-- Edición de nombre -->
          <transition name="fade">
            <div v-if="modoEdicion" class="text-start">
              <h5>Editar perfil</h5>
              <form @submit.prevent="guardarCambios">
                <div class="mb-3">
                  <label for="nombre" class="form-label">Nombre</label>
                  <input v-model="usuario.nombre" id="nombre" type="text" class="form-control" required>
                </div>
                <button type="submit" class="btn btn-primary">Guardar</button>
                <button type="button" class="btn btn-secondary ms-2" @click="modoEdicion = false">Cancelar</button>
              </form>
            </div>
          </transition>
        </div>
      </div>

      <!-- Rutas creadas -->
      <div class="mt-5">
        <hr class="my-5" />
        <h3 class="mb-4">Rutas creadas</h3>

        <div v-if="usuario.rutasCreadas.length" class="row">
          <div v-for="ruta in usuario.rutasCreadas" :key="ruta._id" class="col-12 col-md-6 mb-4">
            <article
              class="card p-3 shadow-sm route-card h-100"
              @click="$router.push({ path: `/ruta/${ruta._id}`, query: { from: 'perfil' } })"
              style="cursor: pointer;"
            >
              <div class="d-flex align-items-center">
                <img
                  :src="ruta.imagen"
                  :alt="`Imagen de ${ruta.nombre}`"
                  class="me-3 rounded"
                  width="100"
                  height="100"
                  style="object-fit: cover;"
                />
                <div>
                  <h3 class="mb-1">{{ ruta.nombre }}</h3>
                  <p class="mb-0 text-muted">{{ ruta.ubicacion }}</p>
                </div>
              </div>
            </article>
          </div>
        </div>

        <p v-else class="text-muted text-center">Aún no has creado ninguna ruta.</p>
      </div>
    </section>
  </main>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      logueado: false,
      modoEdicion: false,
      usuario: {
        nombre: '',
        email: '',
        estadisticas: {},
        rutasCreadas: []
      }
    };
  },
  mounted() {
    this.checkSesion();
  },
  methods: {
    async checkSesion() {
      try {
        const res = await axios.get('http://localhost:3000/auth/yo', {
          withCredentials: true
        });
        this.usuario = res.data;
        this.logueado = true;
      } catch (error) {
        this.logueado = false;
      }
    },
    async guardarCambios() {
      try {
        await axios.patch('http://localhost:3000/auth/yo', { nombre: this.usuario.nombre }, {
          withCredentials: true
        });
        this.modoEdicion = false;
        alert("Cambios guardados");
      } catch (error) {
        alert("Hubo un error al guardar los cambios");
      }
    },
    async cerrarSesion() {
      try {
        await axios.get('http://localhost:3000/auth/logout', {
          withCredentials: true
        });
        window.location.href = '/perfil';
      } catch (err) {
        console.error('Error al cerrar sesión', err);
      }
    }
  }
};
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.route-card:hover {
  background-color: var(--everglade-200);
}
</style>
