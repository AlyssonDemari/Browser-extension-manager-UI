const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

function applyTheme(theme) {
  body.classList.remove('dark-mode'); // Limpa a classe existente
  if (theme === 'dark') {
    body.classList.add('dark-mode');
  }
  localStorage.setItem('theme', theme);
  updateButtonText(theme);
}

// Função para atualizar o icon do botão
function updateButtonText(theme) {
    themeToggle.src = theme === 'dark' ? 'assets/images/icon-sun.svg' : 'assets/images/icon-moon.svg';
}

// Evento de clique no botão
themeToggle.addEventListener('click', () => {
  const currentTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  applyTheme(newTheme);

  // Atualizar o logo do tema
  const logoTheme = document.querySelector('.header-theme__logo');
  logoTheme.src = newTheme === 'dark' ? 'assets/images/logo-ligth.png' : 'assets/images/logo.svg';
});

// Carregar o tema salvo ao iniciar a página
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
        applyTheme(savedTheme);
    } else if (systemPrefersDark) {
        applyTheme('dark');
    } else {
        applyTheme('light');
    }
});