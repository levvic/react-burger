export const socketMiddleware = (wsUrl, wsActions) => (store) => {
    let socket = null;

  return (next) => (action) => {
    const { dispatch } = store;
    const { type, payload } = action;
    const {
      wsInit, onOpen, onClose, onError, onMessage, wsInitWithToken
    } = wsActions;
    if (type === wsInit) {
      // объект класса WebSocket
      socket = new WebSocket(wsUrl);
    }

    if (type === wsInitWithToken) {
      socket = new WebSocket(payload);
    }

    if (type === onClose) {
        socket.close(1000, 'CLOSE_DONE');
      }

    // функция, которая вызывается при открытии сокета
    if (socket) {
      socket.onopen = (event) => {
        dispatch({ type: onOpen, payload: event });
      };
      // функция, которая вызывается при ошибке соединения
      socket.onerror = (event) => {
        dispatch({ type: onError, payload: event });
      };
      // функция, которая вызывается при получении события от сервера. Само сообщение находится в свойстве data объекта event
      socket.onmessage = (event) => {
        const { data } = event;
        const parsedData = JSON.parse(data);
        const { success, ...restParsedData } = parsedData;

        dispatch({ type: onMessage, payload: restParsedData });
      };
      // функция, которая вызывается при закрытии соединения
      socket.onclose = (event) => {
        dispatch({ type: onClose, payload: event });
      };
    }

    next(action);
  };
};