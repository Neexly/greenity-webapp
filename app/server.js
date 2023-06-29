const WebSocket = require("ws");

let imageUrl = "";

const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    imageUrl = message; // Mettre à jour la variable imageUrl avec le message reçu
    console.log(imageUrl);

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message); // Envoyer le message lui-même à tous les clients connectés
      }
    });
  });
});
