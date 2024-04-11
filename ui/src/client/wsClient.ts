declare global {
  interface Window {
    mySocket: WebSocket;
    socketListeners: ((message: any) => void)[];
  }
}

export default class WSClient {
  constructor() {
    if (window.mySocket) {
      return;
    }

    window.mySocket = new WebSocket("ws://localhost:3000");

    window.mySocket.onopen = () => {
      console.log("WebSocket Client Connected");
    };

    window.mySocket.onmessage = (message) => {
      console.log("Received: ", message.data);
      if (!window.socketListeners) {
        window.socketListeners = [];
      }

      window.socketListeners.forEach((callback) => {
        callback(message.data);
      });
    };

    window.mySocket.onclose = () => {
      console.log("WebSocket Client Disconnected");
    };

    window.mySocket.onerror = (error) => {
      console.error("WebSocket error: ", error);
    };
  }

  sendMessage(message: string) {
    window.mySocket.send(message);
  }

  onListenSocket(callback: any) {
    if (!window.socketListeners) {
      window.socketListeners = [];
    }
    window.socketListeners.push(callback);
  }
}
