export const uploaderTemplate = `
  <div class="uploader__container">
      <div class="close-button">
          <svg width="20" height="20" viewBox="0 0 16 17" fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.07102 15.5711C0.408315 14.9084 0.408313 13.8339 1.07102 13.1712L12.8133 1.42898C13.476 0.766269 14.5504 0.76627 15.2132 1.42898C15.8759 2.09169 15.8759 3.16615 15.2132 3.82885L3.4709 15.5711C2.80819 16.2338 1.73373 16.2338 1.07102 15.5711ZM1.07102 3.82886C0.408314 3.16615 0.408314 2.09169 1.07102 1.42898C1.73373 0.76627 2.80819 0.76627 3.4709 1.42898L15.2132 13.1712C15.8759 13.8339 15.8759 14.9084 15.2132 15.5711C14.5504 16.2338 13.476 16.2338 12.8133 15.5711L1.07102 3.82886Z" fill="white"/>
          </svg>
      </div>
      <h1 id="headerTextMain">Загрузочное окно</h1>
      <h2 id="headerText">Перед загрузкой дайте имя файлу</h2>
      <div class="input-container">
          <input type="text" id="name" class="name-input" placeholder="Название файла" required autocomplete="off"/>
          <svg class="close-icon" width="17" height="17" viewBox="0 0 16 17" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.07102 15.5711C0.408315 14.9084 0.408313 13.8339 1.07102 13.1712L12.8133 1.42898C13.476 0.766269 14.5504 0.76627 15.2132 1.42898C15.8759 2.09169 15.8759 3.16615 15.2132 3.82885L3.4709 15.5711C2.80819 16.2338 1.73373 16.2338 1.07102 15.5711ZM1.07102 3.82886C0.408314 3.16615 0.408314 2.09169 1.07102 1.42898C1.73373 0.76627 2.80819 0.76627 3.4709 1.42898L15.2132 13.1712C15.8759 13.8339 15.8759 14.9084 15.2132 15.5711C14.5504 16.2338 13.476 16.2338 12.8133 15.5711L1.07102 3.82886Z"/>
          </svg>
      </div>
      <div class="upload-box" id="uploadArea">
          <div class="upload-wrapper">
              <div class="input-wrapper">
                  <input class="input-upload" type="file" id="file" accept=".txt,.json,.csv">
                  <label for="file">Перенесите ваш файл в область ниже</label>
              </div>
<img src="/images/docs_img.png" alt="Папка" class="layer folder">
<img src="/images/file_img.png" alt="Файл 1" class="layer file file-1">
<img src="/images/file_img2.png" alt="Файл 2" class="layer file file-2">
              <div class="blur-overlay"></div>
          </div>
      </div>
      <div class="progress-container">
          <div class="progress-square"></div>
          <div class="progress-wrapper">
              <div class="progress-info">
                  <div class="file-name" id="fileNameDisplay"></div>
                  <div class="file-progress"></div>
              </div>
              <div class="progress-bar"></div>
          </div>
            <svg class="clear-icon" width="15" height="15" viewBox="0 0 16 17" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.07102 15.5711C0.408315 14.9084 0.408313 13.8339 1.07102 13.1712L12.8133 1.42898C13.476 0.766269 14.5504 0.76627 15.2132 1.42898C15.8759 2.09169 15.8759 3.16615 15.2132 3.82885L3.4709 15.5711C2.80819 16.2338 1.73373 16.2338 1.07102 15.5711ZM1.07102 3.82886C0.408314 3.16615 0.408314 2.09169 1.07102 1.42898C1.73373 0.76627 2.80819 0.76627 3.4709 1.42898L15.2132 13.1712C15.8759 13.8339 15.8759 14.9084 15.2132 15.5711C14.5504 16.2338 13.476 16.2338 12.8133 15.5711L1.07102 3.82886Z"/>
          </svg>
      </div>                   
      <button id="uploadBtn" disabled>Загрузить</button>
  </div>
`;
