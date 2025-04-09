// Функции для валидации

import { updateProgressBar, showProgressBar, hideProgressBar  } from "./animationHandlers";

export function validateForm() {
  const file = this.fileInput.files[0];
  const name = this.nameInput.value.trim();

  if (file && !validateFile(file)) {
    this.fileInput.value = ""; // Сбрасываем файл, если он невалидный
  }

  if (name) {
    this.fileInput.disabled = false;
    this.uploadBtn.disabled = !(file && validateFile(file));
    this.headerText.textContent = "Перенесите ваш файл в область ниже";
  } else {
    this.fileInput.disabled = true;
    this.uploadBtn.disabled = true;
    this.headerText.textContent = "Перед загрузкой дайте имя файлу";
  }

  if (file && validateFile(file)) {
    this.headerText.textContent = "Загрузите ваш файл";
    showProgressBar(this.shadowRoot);

    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      updateProgressBar(this.shadowRoot, progress);
      this.shadowRoot.querySelector(".file-progress").textContent = `${progress}%`;

      if (progress >= 100) {
        clearInterval(interval);
        hideProgressBar(this.shadowRoot);
        this.shadowRoot.querySelector(".file-progress").classList.add("increase-font");
        this.shadowRoot.querySelector(".file-name").classList.add("increase-font");

        // После успешной загрузки отключаем возможность загрузки нового файла
        this.fileInput.disabled = true;
        this.uploadBtn.disabled = false;
        this.uploadArea.classList.add("disabled"); // Добавляем стиль, чтобы визуально обозначить блокировку
      }
    }, 100);

    this.shadowRoot.querySelector(".file-name").textContent = this.nameInput.value.trim();
  }
}

export function validateFile(file) {
  const allowedTypes = ["text/plain", "application/json", "text/csv"];
  if (!allowedTypes.includes(file.type)) {
    alert("Ошибка: Недопустимый формат файла"); 
    return false;
  }
  if (file.size > 1024) {
    alert("Ошибка: Файл превышает 1 KB");
    return false;
  }
  return true;
}