import { StatusBar, Text, View, Button } from "react-native";
import { styles } from "@/styles/styles";
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SERVER_URL = 'ws://localhost:3000'; 
const API_URL = 'http://localhost:4000';  // Substitua pelo URL do seu backend

export default function Index() {
  const [ws, setWs] = useState(null);
  const [message, setMessage] = useState('');
  const [user, setUser] = useState('');
  const [doors, setDoors] = useState([
    { id: 1, name: 'Porta 1', isOpen: false },
    { id: 2, name: 'Porta 2', isOpen: false },
    { id: 3, name: 'Porta 3', isOpen: false },
  ]);

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

  useEffect(() => {
    const getUser = async () => {
      try {
        const loggedUser = await AsyncStorage.getItem('loggedUser'); // Recupera o usuário logado
        if (loggedUser !== null) {
          setUser(loggedUser); // Armazena o usuário logado no estado
        }
      } catch (e) {
        console.error('Erro ao recuperar o usuário logado', e);
      }
    };

    getUser();
  }, []);

  // Função para enviar logs ao backend
  const enviarLog = async (action, doorName) => {
    const log = {
      action: action,
      user: user || 'Usuário Desconhecido',  
      door: doorName,  // Enviar o nome da porta correta
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

  // Função para abrir a porta
  const enviarLiberado = (doorId, doorName) => {
    if (ws) {
      ws.send('Liberado'); // Envia a mensagem ao WebSocket
      enviarLog('Abrir', doorName);  // Registra o log no backend
      toggleDoor(doorId, 'open');  // Atualiza o estado da porta
    }
  };

  // Função para fechar a porta
  const enviarBloqueado = (doorId, doorName) => {
    if (ws) {
      ws.send('Bloqueado'); // Envia a mensagem ao WebSocket
      enviarLog('Fechar', doorName);  // Registra o log no backend
      toggleDoor(doorId, 'close');  // Atualiza o estado da porta
    }
  };

  // Função para alternar o estado da porta (abrir/fechar)
  const toggleDoor = (doorId, action) => {
    setDoors((prevDoors) =>
      prevDoors.map((door) =>
        door.id === doorId ? { ...door, isOpen: action === 'open' } : door
      )
    );
  };

  return (
    <View style={styles.containerDoor}>
      {/* Mapeia as portas para exibir na tela */}
      {doors.map((door) => (
        <View key={door.id} style={styles.doorContainer}>
          <Text style={styles.doorText}>{door.name}</Text>

          {/* Botão verde para abrir (desabilitado se já estiver aberta) */}
          <Button
            title="Abrir"
            color="green"
            onPress={() => enviarLiberado(door.id, door.name)}
            disabled={door.isOpen}
          />

          {/* Botão vermelho para fechar (desabilitado se já estiver fechada) */}
          <Button
            title="Fechar"
            color="red"
            onPress={() => enviarBloqueado(door.id, door.name)}
            disabled={!door.isOpen}
          />
        </View>
      ))}

      <StatusBar barStyle={'dark-content'} />
    </View>
  );
}

