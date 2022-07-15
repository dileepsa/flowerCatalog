const px = (text) => text + 'px';

const onSuccessFullRegister = () => {
  const status = document.createElement('div');
  status.id = 'status';
  status.innerText = 'Your Registration is succesfull';
  status.style.color = 'green';
  status.style.fontSize = px(28);

  const pageWrapper = document.querySelector('#page-wrapper');
  pageWrapper.appendChild(status);

  setTimeout(() => {
    const url = '/login.html';
    window.location.href = url;
    const statusElement = document.querySelector('#status');
    pageWrapper.removeChild(statusElement);
  }, 2000)
};

const onRegisterFailure = () => {
  const status = document.createElement('div');
  status.id = 'status';
  status.innerText = 'Registration faliure';
  const pageWrapper = document.querySelector('#page-wrapper');
  pageWrapper.appendChild(status);
};

const registerUser = () => {
  const url = '/signup';
  const body = readFormData('#signup-form');
  xhrPost(url, onSuccessFullRegister, onRegisterFailure, body.toString());
};
