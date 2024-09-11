import React, { useEffect, useState } from "react";
import { StatusBar, Text, View, FlatList, Button } from "react-native";
import { styles } from "@/styles/styles";
import { Link } from "expo-router";

export default function Page2() {
  const [logs, setLogs] = useState([]);

  // Função para buscar os logs do backend
  const fetchLogs = async () => {
    try {
      const response = await fetch('http://localhost:4000/logs');  // Substitua pelo URL correto do seu backend
      const data = await response.json();
      setLogs(data);  // Atualiza o estado com os logs recebidos
    } catch (error) {
      console.error('Erro ao buscar logs:', error);
    }
  };

  // Usa useEffect para buscar os logs quando o componente for montado
  useEffect(() => {
    fetchLogs();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{new Date(item.horario).toLocaleTimeString()}</Text> {/* Horário formatado */}
      <Text style={styles.cell}>{item.door}</Text>  {/* Porta */}
      <Text style={styles.cell}>{item.user}</Text>  {/* Usuário */}
      <Text style={styles.cell}>{item.action}</Text> {/* Ação */}
    </View>
  );

  return (
    <View style={styles.containerLog}>
      <Text>Log de Atividades</Text>

      <View style={styles.header}>
        <Text style={styles.headerText}>Horário</Text>
        <Text style={styles.headerText}>Porta</Text>
        <Text style={styles.headerText}>Usuário</Text>
        <Text style={styles.headerText}>Ação</Text> {/* Nova coluna para Ação */}
      </View>

      <FlatList
        data={logs}
        renderItem={renderItem}
        keyExtractor={(item) => item._id} 
      />
      <Link href={'/home'}>
        <Button title="Atualizar" />
      </Link>

      <StatusBar barStyle={'dark-content'} />
    </View>
  );
}
