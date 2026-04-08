const isDark = ref(true)

export function useTheme() {
  function toggleTheme() {
    isDark.value = !isDark.value
    applyTheme()
  }

  function applyTheme() {
    if (!import.meta.client) return
    const root = document.documentElement
    if (isDark.value) {
      root.style.setProperty('--background', '#000000')
      root.style.setProperty('--foreground', '#ffffff')
      root.style.setProperty('--muted', '#1a1a1a')
      root.style.setProperty('--muted-foreground', '#a3a3a3')
      root.style.setProperty('--border', '#2a2a2a')
      root.style.setProperty('--sidebar', '#000000')
      root.style.setProperty('--sidebar-foreground', '#ffffff')
      root.style.setProperty('--card', '#000000')
      root.style.setProperty('--card-foreground', '#ffffff')
      root.style.setProperty('--secondary', '#1a1a1a')
      root.style.setProperty('--secondary-foreground', '#ffffff')
      document.body.classList.remove('light-mode')
      document.body.classList.add('dark-mode')
    } else {
      root.style.setProperty('--background', '#ffffff')
      root.style.setProperty('--foreground', '#0b0b0c')
      root.style.setProperty('--muted', '#f0f0f5')
      root.style.setProperty('--muted-foreground', '#71717f')
      root.style.setProperty('--border', '#e4e4e7')
      root.style.setProperty('--sidebar', '#f7f8fa')
      root.style.setProperty('--sidebar-foreground', '#0b0b0c')
      root.style.setProperty('--card', '#ffffff')
      root.style.setProperty('--card-foreground', '#0b0b0c')
      root.style.setProperty('--secondary', '#f4f4f5')
      root.style.setProperty('--secondary-foreground', '#0b0b0c')
      document.body.classList.remove('dark-mode')
      document.body.classList.add('light-mode')
    }
  }

  return {
    isDark: readonly(isDark),
    toggleTheme,
    applyTheme,
  }
}
