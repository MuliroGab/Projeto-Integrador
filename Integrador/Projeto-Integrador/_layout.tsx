import { Tabs } from "expo-router";

export default function RootLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{title: 'SafeDoor'}} />
      <Tabs.Screen name="qrcode" options={{title: 'SafeDoor'}} />
      <Tabs.Screen name="home" options={{title: 'SafeDoor'}} />
      <Tabs.Screen name="logPage" options={{title: 'SafeDoor'}} />
      <Tabs.Screen name="configs" options={{title: 'SafeDoor'}} />
    </Tabs>
  );
}
