const xhrGet = (path, onSucces, onFailure, body = '') => {
  const xhr = new XMLHttpRequest();
  xhr.onload = () => {
    if (xhr.status >= 200 && xhr.status <= 299) {
      onSucces(xhr);
      return;
    }
    onFailure(xhr);
  }

  xhr.open('GET', path);
  xhr.send(body);
};

const xhrPost = (path, onSuccess, onFailure, body = '') => {
  const xhr = new XMLHttpRequest();
  xhr.onload = () => {
    console.log('xhr status', xhr.status);
    if (xhr.status >= 200 && xhr.status <= 299) {
      onSuccess(xhr);
      return;
    }
    onFailure(xhr);
  }

  xhr.open('POST', path);
  xhr.send(body);
};
