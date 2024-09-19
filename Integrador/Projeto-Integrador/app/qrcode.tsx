import React, { useState } from 'react';
import { View, Text, Button, StatusBar } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { styles } from '@/styles/styles';

// Função para gerar um token aleatório
const generateRandomToken = () => {
  return Math.random().toString(36).substr(2, 10); // Gera um string aleatório de 10 caracteres
};

const generateQRCodeData = () => {
  const token = generateRandomToken(); // Gera um token único
  const createdAt = new Date().toISOString();
  const validFor = 600; // 10 minutos em segundos

  const qrData = {
    token,
    createdAt,
    validFor,
  };

  return JSON.stringify(qrData);
};

const QRCodeGenerator = () => {
  // Define o estado para armazenar os dados do QR code
  const [qrData, setQrData] = useState(generateQRCodeData());

  // Função para gerar um novo QR code
  const handleGenerateNewQRCode = () => {
    const newQRCodeData = generateQRCodeData();
    setQrData(newQRCodeData); // Atualiza o estado com novos dados
  };

  return (
    <View style={styles.container}>
      <Text>Escaneie o QR Code aproximando-o para a câmera</Text>
      <QRCode value={qrData} />
      <View style={styles.btnCode}><Button title="Gerar novo Qr Code" onPress={handleGenerateNewQRCode} /></View>
      <StatusBar barStyle={'dark-content'} />
    </View>
  );
};

export default QRCodeGenerator;
