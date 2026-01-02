export const $api = (url: string, options: any = {}) => {
  const { token } = useAuth()
  
  return $fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      // Automatically attach the token if it exists
      ...(token.value ? { Authorization: token.value } : {})
    }
  })
}
