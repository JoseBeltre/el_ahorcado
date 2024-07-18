export const theme = {
  set() {
    const storedTheme = window.localStorage.getItem('theme');
    const darkMode = window.matchMedia('(prefers-color-scheme: dark)')
    const htmlLabel = document.querySelector('html')
    if ((!storedTheme && darkMode.matches) || storedTheme === 'dark') {
      htmlLabel.classList.add('dark')
      if (!storedTheme) {
        window.localStorage.setItem('theme', 'dark')
      }
    } else if((!storedTheme && !darkMode.matches) || storedTheme === 'light') {
      htmlLabel.classList.remove('dark')
      if (!storedTheme) {
        window.localStorage.setItem('theme', 'light')
      }
    }
  },
  toggle() {
    const storedTheme = window.localStorage.getItem('theme');
    const htmlLabel = document.querySelector('html')
    if (storedTheme === 'dark') {
      window.localStorage.setItem('theme', 'light')
    } else if (storedTheme === 'light') {
      window.localStorage.setItem('theme', 'dark')
    }
    this.set()
  }
}

