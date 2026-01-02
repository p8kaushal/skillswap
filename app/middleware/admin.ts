export default defineNuxtRouteMiddleware(async (to, from) => {
  const { data: session, status } = useAuth()
  
  if (status.value !== 'authenticated') {
    // Already handled by auth: true, but safe
    return navigateTo('/login')
  }
  console.log('User Roles:', session.value?.user?.roles)
  if (!session.value?.user?.roles?.toUpperCase().includes('ADMIN')) {
    // Redirect non-admins
    return navigateTo('/unauthorized?reason=admin-required')
      // or abortNavigation() to stay + show error
  }
})
