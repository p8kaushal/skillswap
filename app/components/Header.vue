<template>
  <nav>
    <div class="left">
      <NuxtLink to="/"> Home </NuxtLink>
      <NuxtLink to="/person">Person</NuxtLink>      
      <NuxtLink to="/trait">Trait</NuxtLink>
    </div>
    <div class="right">
      <NuxtLink to="/signup">Signup</NuxtLink>
    </div>
  </nav>
</template>

<script setup>
</script>

<style scoped>
  nav {
    display: flex;
    padding: 2rem;
    align-items: center;
  }

  .bold {
    font-weight: bold;
  }

  a {
    text-decoration: none;
    color: #000;
    display: inline-block;
  }

  .left a[data-active='true'] {
    color: gray;
  }

  a + a {
    margin-left: 1rem;
  }

  .right {
    margin-left: auto;
  }

  .right a {
    border: 1px solid black;
    padding: 0.5rem 1rem;
    border-radius: 3px;
  }
</style>
