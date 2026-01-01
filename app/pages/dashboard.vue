<script setup lang="ts">
const { data, signOut } = useAuth()

// Explicitly protect this route if globalAppMiddleware is off
//@to-do ideally should redirect to the login page if the user is not authenticated
definePageMeta({ auth: true })
</script>

<template>
  <div>
    <h1>Dashboard</h1>
    <p v-if="data?.user">Welcome back, {{ data }}!</p>
    <button @click="signOut({ callbackUrl: '/login' })">Logout</button>
  </div>
</template>
