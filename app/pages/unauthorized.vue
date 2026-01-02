<script setup>
const route = useRoute()
const reason = route.query.reason || 'Access denied'
</script>

<template>
  <div class="unauthorized">
    <h1>Unauthorized</h1>
    <p>{{ reason }}</p>
    <UButton to="/dashboard">Go Home</UButton>
  </div>
</template>
