<template>
  <main class="container-fluid p-4">
    <!-- Encabezado superior -->
    <header class="d-flex align-items-center mb-4">
      <router-link
        :to="$route.query.from === 'perfil' ? '/perfil' : '/'"
        class="btn btn-outline-success rounded-pill px-3"
      >
        <i class="bi bi-arrow-left"></i>
      </router-link>

      <div class="ms-3">
        <h1 class="mb-0 text-success">{{ ruta.nombre }}</h1>
        <p class="text-muted mb-0">{{ ruta.ubicacion }}</p>
      </div>
    </header>

    <!-- Mapa -->
    <section class="mb-5">
      <div ref="mapa" class="w-100 rounded shadow-sm" style="height: 400px; border-radius: 0.75rem;"></div>
    </section>

    <!-- Detalles -->
    <section class="mb-5 p-4 bg-white border rounded shadow-sm">
      <h2 class="h5 text-success mb-3">Detalles de la ruta</h2>
      <p><i class="bi bi-signpost me-2 text-success"></i><strong>Distancia:</strong> {{ ruta.distanciaKm }} km</p>
      <p><i class="bi bi-clock me-2 text-success"></i><strong>Duración estimada:</strong> {{ ruta.duracionEstimada }} h</p>
      <p><i class="bi bi-bar-chart-line me-2 text-success"></i><strong>Dificultad:</strong> {{ ruta.dificultad }}</p>
      <p><i class="bi bi-arrow-up me-2 text-success"></i><strong>Altitud:</strong> {{ ruta.altitud }} m</p>
      <p><i class="bi bi-info-circle me-2 text-success"></i><strong>Descripción:</strong> {{ ruta.descripcion }}</p>
      <p><i class="bi bi-geo-alt me-2 text-success"></i><strong>Modo de viaje:</strong> {{ tipoRuta }}</p>
    </section>

    <!-- Comentarios -->
    <hr class="my-4 mx-auto" style="width: 80px; border-top: 3px solid var(--everglade-400); border-radius: 2px;" />
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

      <!-- Formulario si autenticado -->
      <div class="bg-white border rounded p-4 mt-4 shadow-sm" v-if="usuarioAutenticado">
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

      <!-- Aviso si no autenticado -->
      <div class="alert alert-warning mt-4" v-else>
        <strong>Inicia sesión</strong> para dejar un comentario.
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
        comentarios: [],
        recorrido: []
      },
      nuevoComentario: '',
      modoViaje: '',
      rutaDibujada: null,
      marcadorInicio: null,
      marcadorFin: null,
      usuarioAutenticado: null // ← NUEVO
    };
  },
  methods: {
    async enviarComentario() {
      if (!this.nuevoComentario.trim()) return;
      try {
        const rutaId = this.$route.params.id;
        await axios.post(`http://localhost:3000/api/rutas/${rutaId}/comentarios`, {
          texto: this.nuevoComentario
        }, {
          withCredentials: true
        });
        this.nuevoComentario = '';
        await this.obtenerRuta();
      } catch (error) {
        console.error('Error al enviar comentario:', error);
        alert('No se pudo enviar el comentario');
      }
    },
    async comprobarSesion() {
      try {
        const res = await axios.get('http://localhost:3000/auth/yo', { withCredentials: true });
        this.usuarioAutenticado = res.data;
      } catch {
        this.usuarioAutenticado = null;
      }
    },
    async obtenerRuta() {
      const rutaId = this.$route.params.id;
      try {
        const res = await axios.get(`http://localhost:3000/api/rutas/${rutaId}`);
        this.ruta = res.data;
        this.modoViaje = this.ruta.travelMode || 'walking';
        this.$nextTick(() => {
          if (window.google?.maps && this.ruta.recorrido?.length >= 2) {
            this.initMap();
          }
        });
      } catch (error) {
        console.error('Error al cargar la ruta:', error);
      }
    },
    formatFecha(fechaISO) {
      const fecha = new Date(fechaISO);
      return fecha.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });
    },
    cambiarModo(nuevoModo) {
      if (nuevoModo !== this.modoViaje) {
        this.modoViaje = nuevoModo;
        const puntos = this.ruta.recorrido.map(p => ({ lat: +p.lat, lng: +p.lng }));
        if (puntos.length >= 2) this.trazarRuta(puntos[0], puntos[puntos.length - 1]);
      }
    },
    modoViajeMaps() {
      return this.ruta.travelMode === 'bicycling' ? 'BICYCLE' : 'WALK';
    },
    initMap() {
      const puntos = this.ruta.recorrido.map(p => ({ lat: +p.lat, lng: +p.lng }));
      if (puntos.length < 2) return;
      this.mapa = new google.maps.Map(this.$refs.mapa, {
        center: puntos[0],
        zoom: 14,
        mapTypeId: 'satellite',
        streetViewControl: false,
        mapTypeControl: false
      });
      this.trazarRuta(puntos[0], puntos[puntos.length - 1]);
    },
    async trazarRuta(origen, destino) {
      const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
      if (!API_KEY) return console.error('Falta la API KEY');
      const body = {
        origin: { location: { latLng: { latitude: origen.lat, longitude: origen.lng } } },
        destination: { location: { latLng: { latitude: destino.lat, longitude: destino.lng } } },
        travelMode: this.modoViajeMaps()
      };
      try {
        const res = await axios.post(
          `https://routes.googleapis.com/directions/v2:computeRoutes?key=${API_KEY}`,
          body,
          {
            headers: {
              'Content-Type': 'application/json',
              'X-Goog-FieldMask': 'routes.polyline.encodedPolyline'
            }
          }
        );
        const encoded = res?.data?.routes?.[0]?.polyline?.encodedPolyline;
        if (!encoded) return console.warn('No se pudo generar la ruta');
        const decoded = this.decodePolyline(encoded);
        if (this.rutaDibujada) this.rutaDibujada.setMap(null);
        this.rutaDibujada = new google.maps.Polyline({
          path: decoded,
          map: this.mapa,
          strokeColor: '#1a73e8',
          strokeOpacity: 0.9,
          strokeWeight: 5
        });
        if (this.marcadorInicio) this.marcadorInicio.setMap(null);
        if (this.marcadorFin) this.marcadorFin.setMap(null);
        this.marcadorInicio = new google.maps.Marker({ position: origen, map: this.mapa, label: 'A' });
        this.marcadorFin = new google.maps.Marker({ position: destino, map: this.mapa, label: 'B' });
        const bounds = new google.maps.LatLngBounds();
        decoded.forEach(p => bounds.extend(p));
        this.mapa.fitBounds(bounds);
      } catch (err) {
        console.error('Error trazando ruta con axios:', err);
      }
    },
    decodePolyline(encoded) {
      let points = [], index = 0, lat = 0, lng = 0;
      while (index < encoded.length) {
        let b, shift = 0, result = 0;
        do {
          b = encoded.charCodeAt(index++) - 63;
          result |= (b & 0x1f) << shift;
          shift += 5;
        } while (b >= 0x20);
        const deltaLat = (result & 1) ? ~(result >> 1) : (result >> 1);
        lat += deltaLat;
        shift = result = 0;
        do {
          b = encoded.charCodeAt(index++) - 63;
          result |= (b & 0x1f) << shift;
          shift += 5;
        } while (b >= 0x20);
        const deltaLng = (result & 1) ? ~(result >> 1) : (result >> 1);
        lng += deltaLng;
        points.push({ lat: lat / 1e5, lng: lng / 1e5 });
      }
      return points;
    }
  },
  computed: {
    tipoRuta() {
      return this.ruta.travelMode === 'walking' ? 'Senderismo' : 'Ciclismo';
    }
  },
  mounted() {
    this.obtenerRuta();
    this.comprobarSesion(); // ← NUEVO
  }
};
</script>
