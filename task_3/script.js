const wsUri = "wss://echo-ws-service.herokuapp.com/";

const output = document.getElementById("output");
const btnOpen = document.querySelector('.j-btn-open');
const btnClose = document.querySelector('.j-btn-close');
const btnSend = document.querySelector('.j-btn-send');

const mapLink = document.querySelector('#map-link');
const btnGeo = document.querySelector('.j-btn-geo');

let websocket;

//Создаем соединение
websocket = new WebSocket(wsUri);

//Обработчик событий на получение сообщений от сервера
websocket.onmessage = function(evt) {
    writeToScreen(
        '<span style="color: blue;">RESPONSE: ' + evt.data+'</span>'
    );
};

//Обработчик ошибок
websocket.onerror = function(evt) {
    writeToScreen(
        '<span style="color: red;">ERROR:</span> ' + evt.data
    );
};
//---------------------------------------------------------

function writeToScreen(message) {
    let pre = document.createElement("p");
    pre.style.wordWrap = "break-word";
    pre.innerHTML = message;
    output.appendChild(pre);
};

//Обработчик клика по кнопке "Отправить"
btnSend.addEventListener('click', () => {
    const message = document.getElementById("message");
    writeToScreen("SENT: " + message.value);
    websocket.send(message.value);
});

//---Geolocation---

// Функция, выводящая текст об ошибке
const error = () => {
    status.textContent = 'Невозможно получить ваше местоположение';
}

// Функция, срабатывающая при успешном получении геолокации
const success = (position) => {
    console.log('position', position);
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;

    status.textContent = `Широта: ${latitude} °, Долгота: ${longitude} °`;
    mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    mapLink.textContent = 'Геолокация';
}

//Обработчик клика по кнопке "Геолокация"
btnGeo.addEventListener('click', () => {
    mapLink.href = '';
    mapLink.textContent = '';
    
    if (!navigator.geolocation) {
        status.textContent = 'Geolocation не поддерживается вашим браузером';
        } else {
        status.textContent = 'Определение местоположения…';
        navigator.geolocation.getCurrentPosition(success, error);
    }
});