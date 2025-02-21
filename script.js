if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => console.log('Service Worker зарегистрирован'))
      .catch(error => console.error('Ошибка регистрации Service Worker:', error));
}


import menu from "./menu.js"
menu.letsGo()
