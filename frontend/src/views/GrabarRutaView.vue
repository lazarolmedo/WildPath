<template>
  <main class="container-fluid p-4">
    <!-- Mapa ancho completo -->
    <section class="position-relative mb-4">
      <!-- <img src="/mapa.png" alt="Mapa en vivo" class="w-100 rounded" style="height: 75vh; object-fit: cover;"> -->
      <div id="map" class="w-100 rounded shadow-sm" style="height: 400px; border-radius: 0.75rem;"></div>

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
          altitud: 0,
          duracionEstimada: 0,
          travelMode: 'walking',
        },
        coordenadas: [], // Para almacenar las coordenadas de la ruta
        mapa: null, // Para almacenar la instancia del mapa
        polyline: null, // Para almacenar la instancia de la polilínea
        watchId: null, // Para almacenar el ID del watchPosition
        marcadorInicio: null, 
        marcadorFin: null,
      };
    },
    methods: {
      initMap() {
        // Verificar si Google Maps está disponible
        if (typeof google === 'undefined' || !google.maps) {
          console.error('Google Maps no está disponible');
          return;
        }

        // Inicializar el mapa si no está ya inicializado
        if (!this.mapa) {
          this.mapa = new google.maps.Map(document.getElementById("map"), {
            zoom: 19,
            center: { lat: 40.4168, lng: -3.7038 }, // o cualquier valor inicial por defecto
            mapTypeId: 'hybrid',
            streetViewControl: false,
            mapTypeControl: false
          });
          // Crear la polilínea para dibujar la ruta
          this.polyline = new google.maps.Polyline({
            map: this.mapa,
            path: [],
            strokeColor: "#FF0000",
            strokeOpacity: 1.0,
            strokeWeight: 4
          });
        }
      },
      iniciarGrabacion() {

        this.grabando = true; // Cambiar estado a grabando
        // Mostrar el formulario para guardar la ruta
        this.watchId = navigator.geolocation.watchPosition(
          (position) => {
            const latLng = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            //guardar el primer punto como inicio
            if (this.coordenadas.length === 0) {
              // Guardar el primer punto
              this.marcadorInicio = new google.maps.Marker({
                position: latLng,
                map: this.mapa,
                label: 'Inicio',
                icon: {
                  path: google.maps.SymbolPath.CIRCLE,
                  scale: 20,
                  fillColor: '#28a745',
                  fillOpacity: 1,
                  strokeColor: '#1c7430',
                  strokeWeight: 2
                }
              });
            }
            this.coordenadas.push(latLng);

            // crear objeto LatLng válido para la Polyline
            const punto = new google.maps.LatLng(latLng.lat, latLng.lng);
            this.polyline.getPath().push(punto);

            this.mapa.setCenter(latLng);

          },
          (error) => {
            console.error("Error obteniendo ubicación:", error);
          },
          { enableHighAccuracy: true, maximumAge: 0, timeout: 10000  }
        );

      },
      detenerGrabacion() {
        if (!this.grabando) return;
        this.grabando = false;

        // Detener seguimiento de ubicación
        if (this.watchId !== null) {
          navigator.geolocation.clearWatch(this.watchId);
          this.watchId = null;
        }

        // Guardar y normalizar coordenadas
         this.ruta.coordenadas = this.coordenadas.map(p => {
            return {
              lat: typeof p.lat === 'function' ? p.lat() : Number(p.lat),
              lng: typeof p.lng === 'function' ? p.lng() : Number(p.lng)
            };
          });

        // Calcular distancia total
        if (this.ruta.coordenadas.length >= 2 && google.maps.geometry) {
          const path = this.ruta.coordenadas.map(p => new google.maps.LatLng(p.lat, p.lng));
          const distanciaMetros = google.maps.geometry.spherical.computeLength(path);
          this.ruta.distanciaKm = (distanciaMetros / 1000).toFixed(2);

          // Estimar duración (velocidad promedio)
          const velocidadKmH = this.ruta.travelMode === 'walking' ? 5 : 15;
          this.ruta.duracionEstimada = (this.ruta.distanciaKm / velocidadKmH).toFixed(2);
        }

        // Obtener ubicación de inicio y final con geocodificación inversa
          const geocoder = new google.maps.Geocoder();
          const puntoInicio = this.ruta.coordenadas[0];
          const puntoFinal = this.ruta.coordenadas[this.ruta.coordenadas.length - 1];

          geocoder.geocode({ location: puntoInicio }, (resultsInicio, statusInicio) => {
            if (statusInicio === "OK" && resultsInicio.length) {
              const puebloInicio = this.extraerPueblo(resultsInicio);

              geocoder.geocode({ location: puntoFinal }, (resultsFin, statusFin) => {
                if (statusFin === "OK" && resultsFin.length) {
                  const puebloFin = this.extraerPueblo(resultsFin);

                  // Si ambos pueblos son iguales, muestra solo uno
                  this.ruta.ubicacion = (puebloInicio === puebloFin)
                    ? puebloInicio
                    : `${puebloInicio} – ${puebloFin}`;

                  this.mostrarFormulario = true;
                } else {
                  console.error("Error obteniendo dirección final");
                  this.ruta.ubicacion = puebloInicio;
                  this.mostrarFormulario = true;
                }
              });

            } else {
              console.error("Error obteniendo dirección inicial");
              this.ruta.ubicacion = "Ubicación desconocida";
              this.mostrarFormulario = true;
            }
        });
      },
      extraerPueblo(resultados) {
        if (!resultados || resultados.length === 0) return "Desconocido";

        const componentes = resultados[0].address_components;

        const prioridad = [ "sublocality","locality", "administrative_area_level_2"];

        for (const tipo of prioridad) {
          const componente = componentes.find(c => c.types.includes(tipo));
          if (componente) return componente.long_name;
        }

        return "Desconocido";
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
          altitud: 0,
          coordenadas: []
         };
         if (confirm("¿Estás seguro de que quieres cancelar y recargar la página? Se perderán los datos no guardados.")) {
            location.reload();
          }
      }
    },mounted() {
      this.initMap(); // Inicializar el mapa al montar el componente
    }
  };
</script>
