<template>
  <main class="container-fluid p-4">
    <header class="d-flex justify-content-between align-items-center mb-4">
      <h1>WildPath</h1>
      <router-link to="/perfil" aria-label="Ir al perfil">
        <img src="/user-icon.png" alt="Icono Usuario" width="40" style="cursor: pointer;">
      </router-link>
    </header>

    <section class="mb-4">
      <input type="search" class="form-control w-50 mx-auto" placeholder="Buscar rutas o ciudad" aria-label="Buscar rutas o ciudad">
    </section>

    <section>
      <h2 class="mb-3">Rutas disponibles</h2>

      <article 
        v-for="ruta in rutas" 
        :key="ruta._id" 
        class="card mb-4 p-3 shadow-sm route-card"
        @click="verRuta(ruta._id)"
        style="cursor: pointer;"
      >
        <div class="d-flex align-items-center">
          <img :src="ruta.imagen" :alt="`Imagen de ${ruta.nombre}`" class="me-3 rounded" width="100" height="100" style="object-fit: cover;">
          <div>
            <h3 class="mb-1">{{ ruta.nombre }}</h3>
            <p class="mb-0 text-muted">{{ ruta.ubicacion }}</p>
          </div>
          <div class="ms-auto">
            <button class="btn btn-outline-primary btn-sm" aria-label="Ver detalles de {{ ruta.nombre }}">→</button>
          </div>
        </div>
      </article>
    </section>
  </main>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      rutas: []
    };
  },
  methods: {
    verRuta(id) {
      this.$router.push(`/ruta/${id}`);
    }
  },
  async created() {
    try {
      const res = await axios.get('http://localhost:3000/api/rutas');
      this.rutas = res.data;
    } catch (error) {
      console.error('❌ Error al cargar rutas:', error);
    }
  }
};
</script>
