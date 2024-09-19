import { StatusBar, Text, View, Image, Button } from "react-native";
import { styles } from "@/styles/styles";

export default function Home() {
  return (
  <View style={styles.container}>

    <View style={styles.row}>
      <Text>SafeDoor</Text>
      <Image style={styles.img} source={require('@/assets/images/escudo.png')}/>

    </View> 

    <StatusBar barStyle={'dark-content'} />
  </View>
  );
}
