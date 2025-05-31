<template>
  <div>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/grabar">Grabar Ruta</router-link> |
      <router-link to="/perfil">Perfil</router-link>
    </nav>
    <router-view />
  </div>
</template>

<style>
nav {
  padding: 1rem;
  background-color: #f0f0f0;
}
nav a {
  margin: 0 1rem;
  text-decoration: none;
  color: #333;
}
</style>

<script setup>
</script>
