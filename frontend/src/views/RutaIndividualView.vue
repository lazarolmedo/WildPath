<template>
  <main class="container-fluid p-4">
    <!-- Encabezado superior -->
    <header class="d-flex align-items-center mb-3">
      <router-link to="/" class="btn btn-outline-secondary" aria-label="Volver a inicio">←</router-link>
      <div class="ms-3">
        <h1 class="mb-0">{{ ruta.nombre }}</h1>
        <p class="text-muted mb-0">{{ ruta.ubicacion }}</p>
      </div>
    </header>

    <!-- Sección del mapa -->
    <section class="mb-4">
      <img src="/mapa.png" alt="Mapa de la ruta {{ ruta.nombre }}" class="w-100 rounded shadow-sm" style="max-height: 300px; object-fit: cover;">
    </section>

    <!-- Sección de detalles -->
    <section class="mb-4 p-3 bg-light rounded shadow-sm">
      <h2 class="h4 mb-3">Detalles de la ruta</h2>
      <p><strong>Distancia:</strong> {{ ruta.distancia }} km</p>
      <p><strong>Duración estimada:</strong> {{ ruta.duracion }}</p>
      <p><strong>Dificultad:</strong> {{ ruta.dificultad }}</p>
      <p><strong>Descripción:</strong> {{ ruta.descripcion }}</p>
    </section>

    <!-- Sección de comentarios -->
    <section>
      <h2 class="h4 mb-3">Comentarios</h2>
      <article v-for="comentario in comentarios" :key="comentario.id" class="p-3 mb-2 bg-white border rounded shadow-sm">
        <h3 class="h6 mb-1">{{ comentario.usuario }}</h3>
        <p class="mb-0 text-muted">{{ comentario.texto }}</p>
      </article>
    </section>
  </main>
</template>


<script>
export default {
  name: 'RutaIndividualView',
  data() {
    return {
      ruta: {
        nombre: "Carretera de Mula",
        ubicacion: "Calasparra, Murcia",
        distancia: 8.4,
        duracion: "2 horas 45 min",
        dificultad: "Media",
        descripcion: "Una espectacular ruta circular que comienza en el área recreativa de Las Cuevas del Puerto, sube por un sendero de media montaña entre pinares y ofrece vistas panorámicas del valle del Segura."
      },
      comentarios: [
        { id: 1, usuario: "Jenny Wilson", texto: "¡Ruta espectacular!" },
        { id: 2, usuario: "Darlene Robertson", texto: "Muy recomendable para hacer en familia." }
      ]
    };
  },
  mounted() {
    const rutaId = this.$route.params.id;
    console.log('Ruta seleccionada ID:', rutaId);
  }
};
</script>
