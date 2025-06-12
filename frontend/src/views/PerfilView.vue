<template>
  <main class="container-fluid p-4">
    <!-- Vista cuando NO se ha iniciado sesión -->
    <section v-if="!logueado" class="text-center">
      <img src="/user-icon.png" alt="Icono de usuario no autenticado" width="80" class="mb-3 rounded-circle">
      <h1 class="h3">Perfil</h1>
      <!-- Botón que inicia el flujo de autenticación con Google -->
      <a href="http://localhost:3000/auth/google" class="btn btn-outline-success mt-2">
        Inicia sesión con Google
      </a>
    </section>

    <!-- Vista cuando el usuario ya ha iniciado sesión -->
    <section v-else>
      <header class="d-flex justify-content-between align-items-center mb-4">
        <h1>Perfil</h1>
        <div>
          <button class="btn btn-link" @click="modoEdicion = !modoEdicion" aria-label="Editar perfil">
            Editar
          </button>
          <!-- Cierra la sesión y vuelve al inicio -->
          <button class="btn btn-outline-danger ms-2" @click="cerrarSesion">
            Cerrar sesión
          </button>
        </div>
      </header>

      <!-- Datos básicos del usuario autenticado -->
      <section class="text-center mb-4">
        <figure>
          <img src="/user-icon.png" alt="Imagen de perfil" width="100" class="rounded-circle mb-2">
          <figcaption>
            <h2 class="h4 mb-1">{{ usuario.nombre }}</h2>
            <p class="text-muted">{{ usuario.email }}</p>
          </figcaption>
        </figure>
      </section>

      <!-- Logros -->
      <section class="mb-5 text-center">
        <h2 class="h5 mb-3">Logros</h2>
        <div>
          <img src="/user-icon.png" alt="Logro 1" class="me-2" width="40">
          <img src="/user-icon.png" alt="Logro 2" class="me-2" width="40">
          <img src="/user-icon.png" alt="Logro 3" class="me-2" width="40">
        </div>
      </section>

      <!-- Edición de perfil -->
      <section v-if="modoEdicion">
        <h2 class="h5 mb-3">Editar perfil</h2>
        <form @submit.prevent="guardarCambios">
          <div class="mb-3">
            <label for="nombre" class="form-label">Nombre</label>
            <input v-model="usuario.nombre" id="nombre" type="text" class="form-control" required>
          </div>
          <div class="mb-3">
            <label for="apellido" class="form-label">Apellido</label>
            <input v-model="usuario.apellido" id="apellido" type="text" class="form-control">
          </div>
          <div class="mb-3">
            <label for="ciudad" class="form-label">Ciudad</label>
            <input v-model="usuario.ciudad" id="ciudad" type="text" class="form-control">
          </div>
          <button type="submit" class="btn btn-primary">Guardar</button>
          <button type="button" class="btn btn-secondary ms-2" @click="modoEdicion = false">Cancelar</button>
        </form>
      </section>
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
        apellido: '',
        ciudad: '',
        email: ''
      }
    };
  },
  mounted() {
    // Al cargar la vista, se comprueba si el usuario tiene una sesión activa
    this.checkSesion();
  },
  methods: {
    async checkSesion() {
      try {
        // Petición al backend para obtener el usuario actual basado en la sesión (cookie)
        const res = await axios.get('http://localhost:3000/api/usuarios/yo', {
          withCredentials: true // Esto asegura que la cookie de sesión se envíe
        });
        this.usuario = res.data;
        this.logueado = true;
      } catch (error) {
        this.logueado = false;
      }
    },
    async guardarCambios() {
      try {
        // Se envían los datos modificados del usuario autenticado
        await axios.put('http://localhost:3000/api/usuarios/yo', this.usuario, {
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
        // Llama a la ruta que destruye la sesión en el backend y borra la cookie
        await axios.get('http://localhost:3000/auth/logout', {
          withCredentials: true
        });
        this.usuario = {};
        this.logueado = false;
        this.modoEdicion = false;
        this.$router.push('/'); // Vuelve a la página principal tras cerrar sesión
      } catch (err) {
        console.error('Error al cerrar sesión', err);
      }
    }
  }
};
</script>
