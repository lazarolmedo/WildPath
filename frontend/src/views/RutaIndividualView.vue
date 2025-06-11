<template>
  <main class="container-fluid p-4">
    <!-- Encabezado superior -->
    <header class="d-flex align-items-center mb-4">
      <router-link to="/" class="btn btn-outline-success rounded-pill px-3">
        <i class="bi bi-arrow-left"></i>
      </router-link>
      <div class="ms-3">
        <h1 class="mb-0 text-success">{{ ruta.nombre }}</h1>
        <p class="text-muted mb-0">{{ ruta.ubicacion }}</p>
      </div>
    </header>

    <!-- Mapa -->
    <section class="mb-5">
      <img
        src="/mapa.png"
        :alt="`Mapa de la ruta ${ruta.nombre}`"
        class="w-100 rounded shadow-sm"
        style="max-height: 350px; object-fit: cover;"
      />
    </section>

    <!-- Detalles -->
    <section class="mb-5 p-4 bg-white border rounded shadow-sm">
      <h2 class="h5 text-success mb-3">Detalles de la ruta</h2>
      <p><i class="bi bi-signpost me-2 text-success"></i><strong>Distancia:</strong> {{ ruta.distanciaKm }} km</p>
      <p><i class="bi bi-clock me-2 text-success"></i><strong>Duración estimada:</strong> {{ ruta.duracionEstimada }} h</p>
      <p><i class="bi bi-bar-chart-line me-2 text-success"></i><strong>Dificultad:</strong> {{ ruta.dificultad }}</p>
      <p><i class="bi bi-arrow-up me-2 text-success"></i><strong>Altitud:</strong> {{ ruta.altitud }} m</p>
      <p><i class="bi bi-info-circle me-2 text-success"></i><strong>Descripción:</strong> {{ ruta.descripcion }}</p>
    </section>

    <!-- Separador -->
    <hr class="my-4 mx-auto" style="width: 80px; border-top: 3px solid var(--everglade-400); border-radius: 2px;" />

    <!-- Comentarios -->
    <section>
      <h2 class="h5 text-success mb-4">Comentarios</h2>

      <!-- Lista de comentarios -->
      <article
        v-for="(comentario, index) in ruta.comentarios"
        :key="index"
        class="p-3 mb-3 bg-light border-start border-success border-3 rounded shadow-sm"
      >
        <p class="mb-1 fw-semibold text-success">
          {{ comentario.usuarioId?.nombre || 'Usuario desconocido' }}
          <small class="text-muted ms-2">({{ formatFecha(comentario.fecha) }})</small>
        </p>
        <p class="mb-0 text-muted">{{ comentario.texto }}</p>
      </article>

      <!-- Formulario para nuevo comentario -->
      <div class="bg-white border rounded p-4 mt-4 shadow-sm">
        <form @submit.prevent="enviarComentario">
          <div class="mb-3">
            <label for="comentarioTexto" class="form-label">Deja tu comentario</label>
            <textarea
              id="comentarioTexto"
              v-model="nuevoComentario"
              class="form-control"
              rows="3"
              required
            ></textarea>
          </div>
          <button type="submit" class="btn btn-success">Enviar comentario</button>
        </form>
      </div>
    </section>
  </main>
</template>

<script>
import axios from 'axios';

export default {
  name: 'RutaIndividualView',
  data() {
    return {
      ruta: {
        nombre: '',
        ubicacion: '',
        distanciaKm: 0,
        duracionEstimada: '',
        dificultad: '',
        altitud: 0,
        descripcion: '',
        comentarios: []
      },
      nuevoComentario: ''
    };
  },
  methods: {
    async enviarComentario() {
      if (!this.nuevoComentario.trim()) return;
      try {
        // Aún por completar
      } catch (error) {
        console.error('Error al enviar comentario:', error);
      }
    },
    formatFecha(fechaISO) {
      const fecha = new Date(fechaISO);
      return fecha.toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    },
    async obtenerRuta() {
      const rutaId = this.$route.params.id;
      try {
        const res = await axios.get(`http://localhost:3000/api/rutas/${rutaId}`);
        this.ruta = res.data;
      } catch (error) {
        console.error('Error al cargar la ruta:', error);
      }
    }
  },
  mounted() {
    this.obtenerRuta();
  }
};
</script>
