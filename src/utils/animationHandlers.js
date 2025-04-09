// Анимации

export function showProgressBar(shadowRoot) {
  const progressContainer = shadowRoot.querySelector('.progress-container');
  const uploadBox = shadowRoot.querySelector('.upload-box');
  const inputContainer = shadowRoot.querySelector('.input-container');

  // Скрываем inputContainer сразу, без анимации
  inputContainer.style.display = 'none';
  progressContainer.style.display = 'flex';

  // Устанавливаем начальную позицию uploadBox ниже его исходного положения
  uploadBox.style.transform = 'translateY(50px)'; 

  // Применяем анимацию через @keyframes, чтобы переместить uploadBox наверх
  uploadBox.style.animation = 'moveUp 1s ease forwards'; // Анимация с движением вверх
}

export function updateProgressBar(shadowRoot, progress) {
  const progressBar = shadowRoot.querySelector('.progress-bar');
  requestAnimationFrame(() => {
    progressBar.style.width = `${progress}%`;
  });
}

export function hideProgressBar(shadowRoot) {
  setTimeout(() => {
    shadowRoot.querySelector('.progress-bar').style.display = 'none';
  }, 500);
}
