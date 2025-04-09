import uploaderStyles from './uploader.css?inline';
import { uploaderTemplate } from "./template.js";
import { validateFile, validateForm } from '../utils/validation.js';
import { uploadFile } from '../utils/fileHandlers.js';

class FileUploader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    // Создаём стиль и применяем его
    const styleSheet = new CSSStyleSheet();
    styleSheet.replaceSync(uploaderStyles);
    this.shadowRoot.adoptedStyleSheets = [styleSheet];

    // Вставляем шаблон
    this.shadowRoot.innerHTML = uploaderTemplate;

    this.nameInput = this.shadowRoot.querySelector('#name');
    this.fileInput = this.shadowRoot.querySelector('#file');
    this.uploadBtn = this.shadowRoot.querySelector('#uploadBtn');
    this.message = this.shadowRoot.querySelector('#message');
    this.uploadArea = this.shadowRoot.querySelector('#uploadArea');
    this.closeIcon = this.shadowRoot.querySelector('.close-icon');
    this.headerTextMain = this.shadowRoot.querySelector('#headerTextMain'); 
    this.headerText = this.shadowRoot.querySelector('#headerText');  
    this.clearIcon = this.shadowRoot.querySelector(".clear-icon");

    this.nameInput.addEventListener('input', validateForm.bind(this));
    this.fileInput.addEventListener('change', validateForm.bind(this));
    this.uploadBtn.addEventListener('click', uploadFile.bind(this, this));
    this.clearIcon.addEventListener('click', this.resetUI.bind(this));
    this.closeIcon.addEventListener('click', this.resetUI.bind(this));

    this.toggleCloseButtonHandler('closeUploader');

    this.shadowRoot.querySelector('.close-button').addEventListener('click', () => {
      // Снимаем класс 'open' с контейнера перед его скрытием
      const uploaderContainer = this.shadowRoot.querySelector('.uploader__container');
      uploaderContainer.classList.remove('open');

      // После завершения анимации можно вызвать resetUI, чтобы скрыть все
      setTimeout(() => {
        this.resetUI();
      }, 1000); 
    });


    this.fileInput.disabled = true;

    this.uploadArea.addEventListener('dragover', this.handleDragOver.bind(this));
    this.uploadArea.addEventListener('drop', this.handleDrop.bind(this));

  }

  closeUploader() {

    this.classList.add('closing');

    // После завершения анимации скрываем элемент
    setTimeout(() => {
      this.style.display = 'none';
      this.classList.remove('closing'); 
    }, 500); 
  }



  toggleCloseButtonHandler(handlerName) {
    const closeButton = this.shadowRoot.querySelector('.close-button');

    // Удаляем все обработчики (чтобы не дублировались)
    closeButton.replaceWith(closeButton.cloneNode(true));
    const newCloseButton = this.shadowRoot.querySelector('.close-button');

    // Добавляем нужный обработчик
    if (handlerName === 'resetUI') {
      newCloseButton.addEventListener('click', this.resetUI.bind(this));
    } else {
      newCloseButton.addEventListener('click', this.closeUploader.bind(this));
    }
  }


  // Обработка перетаскивания файлов
  handleDragOver(event) {
    event.preventDefault();
    event.stopPropagation();
    this.uploadArea.classList.add("drag-over");
  }

  handleDrop(event) {
    event.preventDefault();
    event.stopPropagation();

    // Если файл уже был загружен, блокируем дроп
    if (this.fileInput.disabled) {
      return;
    }

    this.uploadArea.classList.remove("drag-over");

    const files = event.dataTransfer.files;
    if (files.length) {
      const file = files[0];
      if (validateFile(file)) {
        this.fileInput.files = files;
        validateForm.call(this);
      }
    }
  }


  showMessage(msg, type) {
    console.error(msg);
  }


  resetUI() {
    const inputContainer = this.shadowRoot.querySelector('.input-container');
    const uploadBox = this.shadowRoot.querySelector('.upload-box');
    const progressContainer = this.shadowRoot.querySelector('.progress-container');
    const uploaderContainer = this.shadowRoot.querySelector('.uploader__container');

    // Включаем элементы снова, без анимации
    inputContainer.style.display = 'flex';
    uploadBox.style.display = 'block';
    progressContainer.style.display = 'none';
    this.shadowRoot.querySelector('#uploadBtn').style.display = 'inline-block';

    // Сброс всех анимаций
    inputContainer.classList.remove('collapsing');
    uploadBox.classList.remove('collapsing');
    progressContainer.classList.remove('collapsing');

    // Убираем старое сообщение об ошибке или успешной загрузке
    const messageElement = this.shadowRoot.querySelector('.response-text');
    if (messageElement) {
      messageElement.style.display = 'none';
    }

    // Сброс анимаций при возврате в исходное состояние
    inputContainer.classList.remove('expanding');
    uploadBox.classList.remove('expanding');
    progressContainer.classList.remove('expanding');

    // Сброс начальных состояний UI
    this.uploadBtn.disabled = true;
    this.fileInput.value = '';
    this.fileInput.disabled = true;
    this.uploadBtn.disabled = true;
    this.headerTextMain.textContent = 'Загрузочное окно';
    this.headerText.textContent = 'Перед загрузкой дайте имя файлу';
    this.shadowRoot.querySelector('.uploader__container').style.background = '';

    // Очищаем input name
    this.nameInput.value = '';

    // Очищаем анимацию с uploadBox
    uploadBox.style.animation = 'none'; // Сбрасываем анимацию
    uploadBox.style.transform = ''; //

    // Обновляем видимость h2 (если оно было скрыто)
    this.headerText.style.display = 'block';

    // Добавляем анимацию раскрытия
    uploaderContainer.classList.add('open');

    this.toggleCloseButtonHandler('closeUploader'); // Меняем обработчик

  }


}

customElements.define('file-uploader', FileUploader);
