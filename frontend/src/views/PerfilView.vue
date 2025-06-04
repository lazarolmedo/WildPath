<template>
  <main class="container-fluid p-4">
    <!-- No autenticado -->
    <section v-if="!logueado" class="text-center">
      <img src="/user-icon.png" alt="Icono de usuario no autenticado" width="80" class="mb-3 rounded-circle">
      <h1 class="h3">Perfil</h1>
      <button class="btn btn-outline-primary mt-2">Inicia sesión con Google</button>
    </section>

    <!-- Perfil autenticado -->
    <section v-else>
      <header class="d-flex justify-content-between align-items-center mb-4">
        <h1 class="h3 mb-0">Perfil</h1>
        <button class="btn btn-link" @click="modoEdicion = !modoEdicion" aria-label="Editar perfil">
          Editar
        </button>
      </header>

      <section class="text-center mb-4">
        <figure>
          <img src="/user-icon.png" alt="Imagen de perfil" width="100" class="rounded-circle mb-2">
          <figcaption>
            <h2 class="h4 mb-1">{{ usuario.nombre }}</h2>
            <p class="text-muted">{{ usuario.email }}</p>
          </figcaption>
        </figure>
      </section>

      <section class="mb-5 text-center">
        <h2 class="h5 mb-3">Logros</h2>
        <div>
          <img src="/user-icon.png" alt="Logro 1" class="me-2" width="40">
          <img src="/user-icon.png" alt="Logro 2" class="me-2" width="40">
          <img src="/user-icon.png" alt="Logro 3" class="me-2" width="40">
        </div>
      </section>

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
export default {
  data() {
    return {
      logueado: true, // Cambia a false si quieres mostrar la vista no autenticada
      modoEdicion: false,
      usuario: {
        nombre: "Klever",
        apellido: "Chipantashi",
        ciudad: "Caravaca de la Cruz",
        email: "klever@gmail.com"
      }
    };
  },
  methods: {
    guardarCambios() {
      this.modoEdicion = false;
      alert("Cambios guardados");
    }
  }
};
</script>
