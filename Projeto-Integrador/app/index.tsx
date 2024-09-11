import { StatusBar, Text, View, Image, Button } from "react-native";
import { styles } from "@/styles/styles";
import React, { useEffect, useState } from 'react';

const SERVER_URL = 'ws://localhost:3000'; 
const API_URL = 'http://localhost:4000';  // Substitua pelo URL do seu backend

export default function Index() {

  const [ws, setWs] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Conecta ao WebSocket do servidor
    const socket = new WebSocket(SERVER_URL);

    socket.onopen = () => {
      console.log('Conectado ao WebSocket do servidor');
    };

    socket.onmessage = (event) => {
      console.log('Mensagem recebida do servidor:', event.data);
      setMessage(event.data); // Armazena a mensagem recebida para exibição
    };

    socket.onerror = (error) => {
      console.error('Erro no WebSocket:', error.message);
    };

    socket.onclose = (event) => {
      console.log('WebSocket desconectado:', event);
    };

    setWs(socket);

    // Limpa a conexão WebSocket ao desmontar o componente
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, []);

  // Função para enviar logs ao backend
  const enviarLog = async (action) => {
    const log = {
      action: action,
      user: 'Usuário',  // Aqui você pode dinamicamente pegar o usuário logado
      door: 'Porta1',          // Porta específica
    };

    try {
      await fetch(`${API_URL}/add-log`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(log),
      });
    } catch (error) {
      console.error('Erro ao registrar log:', error);
    }
  };

  const enviarLiberado = () => {
    if (ws) {
      ws.send('Liberado');
      enviarLog('Abrir');  // Registra o log no backend
    }
  };

  const enviarBloqueado = () => {
    if (ws) {
      ws.send('Bloqueado');
      enviarLog('Fechar');  // Registra o log no backend
    }
  };

  return (
    <View style={styles.container}>

      <View style={styles.row}>
        <Text>SafeDoor</Text>
        <Image style={styles.img} source={require('@/assets/images/escudo.png')}/>
      </View>

      <View style={styles.row}>
        <Button title="Liberar" onPress={enviarLiberado}/>
        <Button title="Bloquear" onPress={enviarBloqueado}/>
      </View>

      <StatusBar barStyle={'dark-content'} />
    </View>
  );
}
