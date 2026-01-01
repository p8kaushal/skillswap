<script setup>
const { data: session } = await useFetch('/api/auth/me')
</script>

<template>
  <div v-if="session.data?.user">
    Welcome {{ session.data.user.email }}
    <UButton @click="signOut()">Logout</UButton>
  </div>
  <div v-else>
    Not logged in
  </div>
</template>
