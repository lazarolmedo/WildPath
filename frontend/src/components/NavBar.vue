<template>
  <nav class="navbar my-2 px-3 py-2">
    <div class="d-flex align-items-end justify-content-between w-100">
      <!-- IZQUIERDA: Logo + enlaces -->
      <div class="d-flex align-items-end gap-3">
        <router-link to="/" class="d-flex align-items-end text-decoration-none">
          <img src="/logo-wildpath.png" alt="Logo WildPath" class="logo-wildpath" />
        </router-link>
        <router-link to="/" class="nav-link custom-nav-link" active-class="active">Home</router-link>
        <router-link to="/grabar" class="nav-link custom-nav-link" active-class="active">Grabar Ruta</router-link>
      </div>

      <!-- DERECHA: Icono perfil -->
      <router-link to="/perfil" class="ms-auto">
        <img src="/user-icon.png" alt="Icono Usuario" width="54" style="cursor: pointer;">
      </router-link>
    </div>
  </nav>
</template>

<style scoped>
.logo-wildpath {
  height: 54px;
  width: auto;
  object-fit: contain;
}

.navbar {
  background-color: var(--everglade-100); 
  border-bottom: 1px solid rgba(0, 0, 0, 0.05); 
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.03);
}

.custom-nav-link {
  font-weight: 500;
  font-size: 1rem;
  color: var(--primary-color);
  padding: 0.4rem 0.75rem;
  text-decoration: none;
  transition: all 0.2s ease;
}

.custom-nav-link.active,
.custom-nav-link:hover {
  color: var(--primary-color-dark);
  text-decoration: underline;
}
</style>
