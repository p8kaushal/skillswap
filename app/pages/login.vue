<script setup lang="ts">
const { signIn } = useAuth()
const form = reactive({ email: 'user@example.com', password: 'password123' })

const handleLogin = async () => {
  try {
    await signIn(form, { callbackUrl: '/dashboard' })
  } catch (error) {
    console.error('Login failed', error)
  }
}

definePageMeta({ auth: { unauthenticatedOnly: true } })
</script>

<template>
  <form @submit.prevent="handleLogin">
    <input v-model="form.email" type="email" placeholder="Email" />
    <input v-model="form.password" type="password" placeholder="Password" />
    <button type="submit">Sign In</button>
  </form>
</template>
