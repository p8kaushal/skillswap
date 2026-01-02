export default defineNuxtRouteMiddleware(async (to, from) => {
  const { data: session, status } = useAuth()
  
  if (status.value !== 'authenticated') {
    // Already handled by auth: true, but safe
    return navigateTo('/login')
  }
  const roles = (session.value as any)?.user?.roles
  console.log('User Roles:', roles)

  const isAdmin = Array.isArray(roles)
    ? roles.some((r) => String(r).toUpperCase() === 'ADMIN')
    : typeof roles === 'string'
    ? roles.toUpperCase().includes('ADMIN')
    : false

  if (!isAdmin) {
    // Redirect non-admins
    return navigateTo('/unauthorized?reason=admin-required')
  }
})
