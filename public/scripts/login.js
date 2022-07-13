const onSuccessfullLogin = () => {
  const url = '/guest-book';
  window.location.href = url;
};

const onLoginFailure = () => {
  const status = document.createElement('div');
  status.innerText = 'User credentials are invalid';
  const pageWrapper = document.querySelector('#page-wrapper');
  pageWrapper.appendChild(status);
};

const validateLogin = () => {
  const url = '/login';
  const body = readFormData('#login-form');
  xhrPost(url, onSuccessfullLogin, onLoginFailure, body.toString());
}
