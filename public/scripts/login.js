const px = (text) => text + 'px';

const onSuccessfullLogin = () => {
  const url = '/guest-book';
  window.location.href = url;
};

const onLoginFailure = () => {
  const status = document.createElement('div');
  status.innerText = 'Please Register to Login';
  status.style.color = 'blue';
  status.style.fontSize = px(28);
  const pageWrapper = document.querySelector('#page-wrapper');
  pageWrapper.appendChild(status);
};

const validateLogin = () => {
  const url = '/login';
  const body = readFormData('#login-form');
  xhrPost(url, onSuccessfullLogin, onLoginFailure, body.toString(), 'form');
}
