const isLoggedIn = ref(false)

export function useAuth() {
  function login() {
    isLoggedIn.value = true
  }

  function logout() {
    isLoggedIn.value = false
  }

  function toggle() {
    isLoggedIn.value = !isLoggedIn.value
  }

  return {
    isLoggedIn: readonly(isLoggedIn),
    login,
    logout,
    toggle,
  }
}
