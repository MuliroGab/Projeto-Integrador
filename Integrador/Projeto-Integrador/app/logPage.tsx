import React, { useEffect, useState } from "react";
import { StatusBar, Text, View, FlatList, Button } from "react-native";
import { styles } from "@/styles/styles";

export default function Page2() {
  const [logs, setLogs] = useState([]);

  // Função para buscar os logs do backend
  const fetchLogs = async () => {
    try {
      const response = await fetch('http://localhost:4000/logs');  // Substitua pelo URL correto do seu backend
      const data = await response.json();

      // Ordenar logs do mais recente para o mais antigo e pegar os 10 primeiros
      const sortedLogs = data.sort((a, b) => new Date(b.horario) - new Date(a.horario)).slice(0, 10);
      setLogs(sortedLogs);  // Atualiza o estado com os logs ordenados e limitados
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
      {/* Exibe a data e hora formatadas */}
      <Text style={styles.cell}>{new Date(item.horario).toLocaleDateString()} {new Date(item.horario).toLocaleTimeString()}</Text>
      <Text style={styles.cell}>{item.door}</Text>  {/* Porta */}
      <Text style={styles.cell}>{item.user}</Text>  {/* Usuário */}
      <Text style={styles.cell}>{item.action}</Text> {/* Ação */}
    </View>
  );

  return (
    <View style={styles.containerLog}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Data e Horário</Text>
        <Text style={styles.headerText}>Porta</Text>
        <Text style={styles.headerText}>Usuário</Text>
        <Text style={styles.headerText}>Ação</Text>
      </View>

      <FlatList
        data={logs}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}  // Certifique-se que o item._id está presente nos dados
      />

      <Button title="Atualizar" onPress={fetchLogs} />

      <StatusBar barStyle={'dark-content'} />
    </View>
  );
}
