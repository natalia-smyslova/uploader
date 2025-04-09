// Функции для работы с файлами
import { updateProgressBar } from "./animationHandlers";

export async function uploadFile(component) {
    const file = component.fileInput.files[0];
    const name = component.nameInput.value.trim();

    if (!file || !name) return;


    component.shadowRoot.querySelector('.input-container').style.display = 'none';
    component.uploadBtn.disabled = true;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', name);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://file-upload-server-mc26.onrender.com/api/v1/upload', true);

    xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
            const progress = (event.loaded / event.total) * 100;
            updateProgressBar(component.shadowRoot, progress);
            component.shadowRoot.querySelector('.file-progress').textContent = `${Math.round(progress)}%`;
        }
    };

    xhr.onload = () => {
        if (xhr.status === 200) {
            const result = JSON.parse(xhr.responseText);
            updateUIAfterUpload(component, 'success', result); 
        } else {
            updateUIAfterUpload(component, 'error', { message: 'Ошибка загрузки' });
        }
        component.uploadBtn.disabled = false;
    };

    xhr.onerror = () => {
        updateUIAfterUpload(component, 'error', { message: 'Ошибка соединения с сервером' });
    };

    xhr.send(formData);
}

export function updateUIAfterUpload(component, status, fileInfo = {}) {
    const inputContainer = component.shadowRoot.querySelector('.input-container');
    const uploadBox = component.shadowRoot.querySelector('.upload-box');
    const progressContainer = component.shadowRoot.querySelector('.progress-container');
    const uploaderContainer = component.shadowRoot.querySelector('.uploader__container');

    // Применяем анимацию для :host
    const host = component.shadowRoot.host;

    // Добавляем анимацию схлопывания для :host
    host.classList.add('collapsing');

    // После сжатия меняем контент
    setTimeout(() => {
        // Скрываем кнопку загрузки
        component.shadowRoot.querySelector('#uploadBtn').style.display = 'none';

        // Меняем фон контейнера в зависимости от статуса загрузки
        if (status === 'success') {
            uploaderContainer.style.background = 'linear-gradient(135deg, rgba(95, 92, 240, 1) 0%, rgba(143, 141, 244, 1) 100%)';
        } else {
            uploaderContainer.style.background = 'linear-gradient(135deg, rgba(240, 92, 92, 1) 0%, rgba(143, 141, 244, 1) 100%)';
        }

        // Создаём новый контент для успешной или неудачной загрузки
        const headerText = component.shadowRoot.querySelector('#headerText');
        const messageElement = document.createElement('p');
        messageElement.classList.add('response-text');

        if (status === 'success') {
            messageElement.innerHTML = `
              name: ${fileInfo.name} <br>
              filename: ${fileInfo.filename} <br>
              timestamp: ${fileInfo.timestamp} <br>
              message: ${fileInfo.message}
            `;
            component.headerTextMain.textContent = 'Файл загружен';
        } else {
            messageElement.innerHTML = `Error: ${fileInfo.message}`;
            component.headerTextMain.textContent = 'Ошибка в загрузке файла';
        }

        // Заменяем старое содержимое новым
        headerText.replaceWith(messageElement);

        // Применяем анимацию раскрытия для новых элементов
        messageElement.classList.add('expanding'); 
        component.headerTextMain.classList.add('expanding'); 

        // Ожидаем завершения анимации скрытия элементов
        inputContainer.style.display = 'none';
        uploadBox.style.display = 'none';
        progressContainer.style.display = 'none';
        
        // Теперь меняем обработчик на resetUI
        component.toggleCloseButtonHandler('resetUI'); // Меняем обработчик
        
        // После завершения анимации схлопывания удаляем класс и добавляем для раскрытия
        host.classList.remove('collapsing');
        host.classList.add('expanding');
    }, 500); 
}
