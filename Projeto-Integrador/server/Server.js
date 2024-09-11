const express = require('express');
const mqtt = require('mqtt');
const WebSocket = require('ws');

const app = express();
const port = 3000;

//Para iniciar: noe Server.js

// Configuração para servir arquivos estáticos
app.use(express.static('public'));

// Inicia o servidor Express
const server = app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

const wss = new WebSocket.Server({ server });

// Configuração do cliente MQTT
const mqttClient = mqtt.connect('mqtt://test.mosquitto.org');  // Conectando ao broker HiveMQ

mqttClient.on('connect', () => {
    console.log('Conectado ao broker MQTT');
});

// Evento WebSocket para novas conexões
wss.on('connection', (ws) => {
    console.log('Cliente WebSocket conectado');

    // Assinando tópicos MQTT
    mqttClient.subscribe('bloco/1/sala/1/rfid');

    // Envio de mensagens MQTT para o cliente WebSocket
    mqttClient.on('message', (topic, message) => {
        console.log(`Mensagem recebida do MQTT: ${message.toString()}`);
        ws.send(message.toString());
    });

    // Recebendo mensagens do cliente WebSocket e publicando no tópico MQTT
    ws.on('message', (message) => {
        console.log(`Mensagem recebida do WebSocket: ${message}`);
        mqttClient.publish('bloco/1/sala/1/rfid', message.toString());
    });

    // Desconectando o cliente MQTT quando o WebSocket se desconectar
    ws.on('close', () => {
        console.log('Cliente WebSocket desconectado');
    });
});
