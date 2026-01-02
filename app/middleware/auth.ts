export default defineNuxtRouteMiddleware(async (to, from) => {
  const { data: session, status } = useAuth()
  
  if (status.value !== 'authenticated') {
    // Already handled by auth: true, but safe
    return navigateTo('/login')
  }
})
