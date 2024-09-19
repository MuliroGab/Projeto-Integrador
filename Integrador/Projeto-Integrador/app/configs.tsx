import { StatusBar, Text, View, Button, Image, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { styles } from "@/styles/styles";

export default function Configs() {
  return (
  <View style={styles.container}>

    <View style={styles.row}>
      <Text>SafeDoor</Text>
      <Image style={styles.img} source={require('@/assets/images/escudo.png')}/>
    </View>

    <View style={styles.row}>
      <Text>Versão 0.0.1</Text>
    </View>

    <View style={styles.row}>
      <Text>Gerenciar Dispositivos</Text>
    </View>

    <View style={styles.row}>
      <Text>Feedback</Text>
    </View>

    <View style={styles.row}>
      <Text>Sobre</Text>
    </View>


    <StatusBar barStyle={'dark-content'} />
  </View>
  );
}
