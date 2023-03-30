const URL = 'https://28.javascript.pages.academy/kekstagram';

import { closePictureEditor, setOnFormSubmit } from './load-picture-editor.js';
import { showErrorMessage, showSuccessMessage } from './message.js';
import { showAlert } from './utils.js';

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};
const Method = {
  GET: 'GET',
  POST: 'POST',
};
const ErrorMessage = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз'
};

const load = (route, errorMessage, method = Method.GET, body = null) =>
  fetch(`${URL}${route}`, { method, body })
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch(() => {
      throw new Error(errorMessage);
    });

const getData = () => load(Route.GET_DATA, ErrorMessage.GET_DATA);

const sendData = (body) => load(Route.SEND_DATA, ErrorMessage.SEND_DATA, Method.POST, body);

const getDefaultData = async () => {
  try {
    const data = await getData();
    return data;
  } catch (err) {
    showAlert(err.message);
  }
};

setOnFormSubmit(async (pictures) => {
  try {
    await sendData(pictures);
    closePictureEditor();
    showSuccessMessage();
  } catch {
    showErrorMessage();
  }
});

export { getData, sendData, getDefaultData };

