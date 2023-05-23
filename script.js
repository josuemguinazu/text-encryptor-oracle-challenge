const input = document.querySelector('#input');
const encryptBtn = document.querySelector('#encrypt');
const decryptBtn = document.querySelector('#decrypt');
const copyBtn = document.querySelector('#copy');
const noText = document.querySelector('.noText');
const showTxt = document.querySelector('.showTxt');
const resetBtn = document.querySelector('#reset');
const showOptionsBtn = document.querySelector('.copy-reset-btn');
const encryptedText = document.querySelector('#encryptedText');

// validar user input
const validateInput = (inputValue) => {
  const invalidCharacters = /[áéíóú|A-Z)]/g;
  //se reemplazo if
  return !invalidCharacters.test(inputValue);
};

// encriptar
const encrypt = () => {
  showOptionsBtn.style.visibility = 'visible';
  noText.style.display = 'none';
  const originalInput = input.value.toLowerCase();
  let encryptText = originalInput.replace(/[aeiou]/g, (letter) => {
    switch (letter) {
      case 'a':
        return 'ai';
      case 'e':
        return 'enter';
      case 'i':
        return 'imes';
      case 'o':
        return 'ober';
      case 'u':
        return 'ufat';
      default:
        return letter;
    }
  });
  // insertar texto encriptado en html
  console.log(encryptText);
  encryptedText.textContent = encryptText;
};

encryptBtn.addEventListener('click', () => {
  if (!validateInput(input.value)) {
    alert('Caracteres no válidos. Solo minúsculas y sin acentos :)');
    return (input.value = '');
  }
  if (input.value === '') {
    alert('Escribe un texto para que sea encriptado.');
  }
  encrypt();
});

//desencriptar
const decrypt = () => {
  let decryptedText = encryptedText.textContent.replace(/(ai|enter|imes|ober|ufat)/g, (letter) => {
    switch (letter) {
      case 'ai':
        return 'a';
      case 'enter':
        return 'e';
      case 'imes':
        return 'i';
      case 'ober':
        return 'o';
      case 'ufat':
        return 'u';
    }
  });
  encryptedText.textContent = decryptedText;
};

decryptBtn.addEventListener('click', () => {
  const encryptedText = document.querySelector('#encryptedText').textContent;
  console.log(encryptedText);
  if (!encryptedText) {
    alert('No se ha encriptado ningún texto.');
  } else {
    decrypt();
  }
});

//btn resetear
const reset = () => {
  showOptionsBtn.style.visibility = 'hidden';
  noText.style.display = 'block';
  input.value = '';
  encryptedText.textContent = '';
};
resetBtn.addEventListener('click', reset);

const copyText = async () => {
  const copiedText = document.querySelector('#copiedText');
  copiedText.textContent = 'texto copiado correctamente :) ';
  try {
    await navigator.clipboard.writeText(encryptedText.textContent);
    setTimeout(() => {
      copiedText.textContent = '';
    }, 3000);
  } catch (error) {
    alert('Algo salió mal :(');
  }
};

copyBtn.addEventListener('click', copyText);
