import React from 'react';
import { View, Text, Button, StatusBar } from 'react-native';
import { Link } from 'expo-router';
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
  const qrData = generateQRCodeData();

  return (
    <View style={styles.container}>
        <Text>Escaneie o QR Code aproximando-o para a câmera</Text>
        <QRCode value={qrData} />

        <Link href={'/home'}>
            <Button title="Voltar" />
        </Link>

      <StatusBar barStyle={'dark-content'} />
    </View>
  );
};

export default QRCodeGenerator;

