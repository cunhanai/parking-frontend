<script setup>
  import { RouterLink } from 'vue-router'
</script>

<template>
  <header>
    <BNavbar
      toggleable="lg"
      variant="secondary"
      v-b-color-mode="'dark'"
    >
      <BNavbarBrand href="#">Estacionamento</BNavbarBrand>
      <BNavbarToggle target="nav-collapse" />
      <BCollapse
        id="nav-collapse"
        is-nav
      >
        <BNavbarNav>
          <BNavItem>
            <RouterLink to="/">Veículos</RouterLink>
          </BNavItem>
          <BNavItem>
            <RouterLink to="/pricing">Precificação</RouterLink>
          </BNavItem>
        </BNavbarNav>
        <!-- Right aligned nav items -->
        <BNavbarNav class="ms-auto mb-2 mb-lg-0"> </BNavbarNav>
        <BNavForm class="d-flex">
          <BFormInput
            class="me-2"
            placeholder="Buscar veículo"
          />
          <BButton
            type="submit"
            variant="outline-info"
            >Buscar</BButton
          >
        </BNavForm>
      </BCollapse>
    </BNavbar>
  </header>
</template>

<style scoped>
  a {
    text-decoration: none;
    color: white;
  }

  header {
    margin-bottom: 2rem;
  }
</style>
