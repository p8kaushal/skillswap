<script setup lang="ts">
const { data, signOut } = useAuth()

// Explicitly protect this route if globalAppMiddleware is off
//@to-do ideally should redirect to the login page if the user is not authenticated
definePageMeta({ auth: true })

async function callProtected() {
  try {
    const res = await $api('/api/protected', {
      method: 'GET',
    })
    console.log('Protected data:', res)
  } catch (error) {
    console.error('Error fetching protected data:', error)
  }
}
</script>

<template>
  <div>
    <h1>Dashboard</h1>
    <p v-if="(data as any)?.user">Welcome back, {{ (data as any).user?.name || (data as any).user }}!</p>
    <button @click="signOut({ callbackUrl: '/login' })">Logout</button>
    <button @click="callProtected()">Protected info</button>
  </div>
</template>
