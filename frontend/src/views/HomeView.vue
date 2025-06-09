<template>
  <div class="d-flex flex-column min-vh-100">
    <!-- Contenido principal -->
    <main class="container-fluid p-0 flex-grow-1">
      <!-- Sección de presentación -->
      <section class="text-center welcome-section">
        <h1 class="display-5 fw-bold text-success">Explora sin límites</h1>
        <p class="lead">Graba, comparte y descubre rutas inolvidables por la naturaleza.</p>
      </section>
    <!-- Carrusel automático sin botones, adaptado correctamente -->
    <section class="mb-5 px-4">
      <div
        id="wildpathCarousel"
        class="carousel slide carousel-fade"
        data-bs-ride="carousel"
        data-bs-interval="4000"
      >
        <div class="carousel-inner rounded overflow-hidden shadow fixed-ratio">
          <!-- Slide 1 -->
          <div class="carousel-item active">
            <img
              src="/img/montaña.jpg"
              class="d-block w-100"
              alt="Ruta de montaña"
              style="width: 100%; height: auto; max-height: 400px; object-fit: cover;"
            />
            <div class="carousel-caption d-block caption-clean">
              <p>Desafía tus límites y conquista nuevas alturas.</p>
            </div>
          </div>

          <!-- Slide 2 -->
          <div class="carousel-item">
            <img
              src="/img/bosque.jpg"
              class="d-block w-100"
              alt="Sendero en el bosque"
              style="width: 100%; height: auto; max-height: 400px; object-fit: cover;"
            />
            <div class="carousel-caption d-block caption-clean">
              <p>Sumérgete en la tranquilidad de los senderos naturales.</p>
            </div>
          </div>

          <!-- Slide 3 -->
          <div class="carousel-item">
            <img
              src="/img/costa.jpg"
              class="d-block w-100"
              alt="Ruta costera"
              style="width: 100%; height: auto; max-height: 400px; object-fit: cover;"
            />
            <div class="carousel-caption d-block caption-clean">
              <p>Explora rutas únicas junto al mar, el bosque o la montaña.</p>
            </div>
          </div>

        </div>
      </div>
    </section>

    <hr class="my-4 mx-auto" style="width: 80px; border-top: 3px solid var(--everglade-400); border-radius: 2px;" />

      <!-- Rutas -->
      <section class="px-4">
        <h2 class="mb-3">Explora las rutas disponibles</h2>

      <!-- Buscador -->
      <div class="mb-4 px-4">
        <input
          type="search"
          class="form-control w-50 mx-auto"
          placeholder="Buscar rutas o ciudad"
          aria-label="Buscar rutas o ciudad"
          v-model="busqueda"
        />
      </div>

        <div v-if="rutasFiltradas.length > 0" class="row">
          <div
            v-for="ruta in rutasFiltradas"
            :key="ruta._id"
            class="col-12 col-md-6 mb-4"
          >
            <article
              class="card p-3 shadow-sm route-card h-100"
              @click="verRuta(ruta._id)"
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

        <div v-else class="text-center text-muted py-5">
          <p>No hay rutas disponibles.</p>
        </div>

        <!-- Controles de paginación -->
        <div v-if="totalPaginas > 1" class="text-center my-4">
          <button @click="currentPage--" :disabled="currentPage === 1" class="btn btn-outline-success me-2">
            Anterior
          </button>
          <span>Página {{ currentPage }} de {{ totalPaginas }}</span>
          <button @click="currentPage++" :disabled="currentPage === totalPaginas" class="btn btn-outline-success ms-2">
            Siguiente
          </button>
        </div>
      </section>
    </main>

    <!-- SVG decorativo montaña -->
    <div class="svg-decor">
      <svg viewBox="0 0 1440 160" preserveAspectRatio="none" class="w-100">
        <path fill="var(--everglade-700)" fill-opacity="1"
          d="M0,144L40,136C80,128,160,112,240,112C320,112,400,128,480,120C560,112,640,80,720,72C800,64,880,76,960,88C1040,100,1120,112,1200,112C1280,112,1360,96,1400,88L1440,80L1440,160L0,160Z">
        </path>
      </svg>
    </div>

    <!-- Footer -->
    <footer class="footer-custom text-white text-center py-4 mt-auto">
      <p class="mb-0">&copy; 2025 WildPath. Todos los derechos reservados.</p>
    </footer>
  </div>
</template>

<style scoped>
.welcome-section {
  color: var(--everglade-900);
  padding: 3rem 1rem;
  border-radius: 1rem;
}

.route-card {
  transition: background-color 0.3s ease;
}

.route-card:hover {
  background-color: var(--everglade-200);
}

.footer-custom {
  background-color: var(--everglade-700);
  color: white;
}

.svg-decor {
  line-height: 0;
  margin-bottom: -5px;
}

.caption-clean {
  bottom: 0;
  text-align: center;
  left: 0;
  right: 0;
  padding: 1rem;
  position: absolute;
  color: white;
  font-weight: 500;
  text-shadow: 0 0 5px rgba(0, 0, 0, 1); 
}

.carrusel-img {
  object-fit: cover;
  object-position: center top;
}
</style>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      rutas: [],
      busqueda: '',
      currentPage: 1,
      rutasPorPagina: 6
    };
  },
  computed: {
    rutasFiltradas() {
      const filtro = this.busqueda.trim().toLowerCase();
      const filtradas = this.rutas.filter(r =>
        r.nombre.toLowerCase().includes(filtro) || r.ubicacion.toLowerCase().includes(filtro)
      );

      const inicio = (this.currentPage - 1) * this.rutasPorPagina;
      return filtradas.slice(inicio, inicio + this.rutasPorPagina);
    },
    totalPaginas() {
      const filtro = this.busqueda.trim().toLowerCase();
      const total = this.rutas.filter(r =>
        r.nombre.toLowerCase().includes(filtro) || r.ubicacion.toLowerCase().includes(filtro)
      );
      return Math.ceil(total.length / this.rutasPorPagina);
    }
  },
  methods: {
    verRuta(id) {
      this.$router.push(`/ruta/${id}`);
    }
  },
  watch: {
    busqueda() {
      this.currentPage = 1;
    }
  },
  async created() {
    try {
      const res = await axios.get('http://localhost:3000/api/rutas');
      this.rutas = res.data;
    } catch (error) {
      console.error('Error al cargar rutas:', error);
    }
  }
};
</script>
