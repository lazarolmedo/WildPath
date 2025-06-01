<template>
  <main class="container-fluid p-4">
    <!-- Formulario para guardar la ruta (arriba del mapa) -->
    <section v-if="mostrarFormulario" class="mb-4 p-4 bg-light rounded shadow">
      <h2 class="h4 mb-3">Guardar ruta</h2>

      <form @submit.prevent="guardarRuta">
        <div class="mb-3">
          <label for="nombre" class="form-label">Nombre de la ruta</label>
          <input type="text" id="nombre" v-model="ruta.nombre" class="form-control" required>
        </div>

        <div class="mb-3">
          <label for="ubicacion" class="form-label">Ubicación</label>
          <input type="text" id="ubicacion" v-model="ruta.ubicacion" class="form-control" required>
        </div>

        <div class="mb-3">
          <label for="descripcion" class="form-label">Descripción</label>
          <textarea id="descripcion" v-model="ruta.descripcion" class="form-control" rows="3"></textarea>
        </div>

        <div class="d-flex justify-content-between">
          <button type="button" class="btn btn-secondary" @click="cancelar">
            Cancelar
          </button>
          <button type="submit" class="btn btn-success">
            Guardar
          </button>
        </div>
      </form>
    </section>

    <!-- Mapa ancho completo -->
    <section class="position-relative mb-4">
      <img src="/mapa.png" alt="Mapa en vivo" class="w-100 rounded" style="height: 75vh; object-fit: cover;">

      <!-- Botón cuadrado para detener -->
      <button 
        v-if="!mostrarFormulario" 
        class="btn btn-danger btn-lg rounded-circle position-absolute bottom-0 start-50 translate-middle-x mb-3"
        style="width: 60px; height: 60px; font-size: 24px; padding: 0;"
        @click="detenerGrabacion"
        aria-label="Detener grabación"
      >
        ■
      </button>
    </section>
  </main>
</template>

<script>
export default {
  name: 'GrabarRutaView',
  data() {
    return {
      mostrarFormulario: false,
      ruta: {
        nombre: '',
        ubicacion: '',
        descripcion: ''
      }
    };
  },
  methods: {
    detenerGrabacion() {
      this.mostrarFormulario = true;
    },
    guardarRuta() {
      console.log('Ruta guardada:', this.ruta);
      this.$router.push('/'); // Redirigir al home después de guardar
    },
    cancelar() {
      this.mostrarFormulario = false;
      this.ruta = { nombre: '', ubicacion: '', descripcion: '' };
    }
  }
};
</script>
