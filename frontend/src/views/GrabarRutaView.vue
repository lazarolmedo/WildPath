<template>
  <main class="container-fluid p-4">
    <!-- Mapa ancho completo -->
    <section class="position-relative mb-4">
      <img src="/mapa.png" alt="Mapa en vivo" class="w-100 rounded" style="height: 75vh; object-fit: cover;">

      <!-- Botón cuadrado para grabar -->
      <button 
        v-if="!mostrarFormulario && !grabando" 
        class="btn btn-success btn-lg rounded-circle position-absolute bottom-0 start-50 translate-middle-x mb-3"
        style="width: 60px; height: 60px; font-size: 24px; padding: 0;"
        @click="iniciarGrabacion"
        aria-label="Iniciar grabación"
      >
        ▶
      </button>

      <!-- Botón cuadrado para detener -->
      <button 
        v-if="!mostrarFormulario && grabando" 
        class="btn btn-danger btn-lg rounded-circle position-absolute bottom-0 start-50 translate-middle-x mb-3"
        style="width: 60px; height: 60px; font-size: 24px; padding: 0;"
        @click="detenerGrabacion"
        aria-label="Detener grabación"
      >
        ■
      </button>
    </section>

    <!-- Formulario para guardar la ruta (arriba del mapa) -->
    <section v-if="mostrarFormulario" class="mb-4 p-4 bg-light rounded shadow">
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

        <div class="mb-3">
          <label for="dificultad" class="form-label">Dificultad</label>
          <select id="dificultad" v-model="ruta.dificultad" class="form-select" required>
            <option value="">Selecciona...</option>
            <option value="facil">baja</option>
            <option value="media">media</option>
            <option value="dificil">Dificil</option>
          </select>
        </div>
        <div class="mb-3">
          <label for="distancia" class="form-label">Distancia (km)</label>
          <input type="number" id="distancia" v-model="ruta.distanciaKm" class="form-control" step="0.01" required>
        </div>

        <div class="mb-3">
          <label for="duracion" class="form-label">Duración Estimada (h)</label>
          <input type="number" id="duracion" v-model="ruta.duracionEstimada" class="form-control" step="0.1" required>
        </div>

        <div class="mb-3">
          <label for="travelMode" class="form-label">Modalidad de viaje</label>
          <select v-model="ruta.travelMode" class="form-select" required>
            <option value="walking">Senderismo</option>
            <option value="biking">Ciclismo</option>
          </select>
        </div>

        <div class="mb-3">
          <label for="altitud" class="form-label">Altitud (m)</label>
          <input type="number" id="altitud" v-model="ruta.altitud" class="form-control" required>
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
  </main>
</template>

<script>
  export default {
    name: 'GrabarRutaView',
    data() {
      return {
        mostrarFormulario: false,
        grabando: false, // Para controlar si se está grabando o no
        ruta: {
          nombre: '',
          ubicacion: '',
          descripcion: '',
          dificultad: '',
          distanciaKm: 0,
          duracionEstimada: 0,
          travelMode: 'walking',
          altitud: 0
        }
      };
    },
    methods: {
      iniciarGrabacion() {
        this.grabando = true;
      },
      detenerGrabacion() {
        this.mostrarFormulario = true;
      },
      guardarRuta() {
        console.log('Ruta guardada:', this.ruta);
        this.$router.push('/'); // Redirigir al home después de guardar
      },
      cancelar() {
        this.mostrarFormulario = false;
        this.grabando = false; // Detener grabación si se cancela
        this.ruta = { 
          nombre: '',
           ubicacion: '',
           descripcion: '',
           dificultad: '',
           distanciaKm: 0,
           duracionEstimada: 0,
           travelMode: 'walking',
           altitud: 0
         };
      }
    }
  };
</script>
