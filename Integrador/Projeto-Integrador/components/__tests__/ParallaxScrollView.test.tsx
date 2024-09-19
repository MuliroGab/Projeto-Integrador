import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Image, Text, View } from 'react-native'; 
import ParallaxScrollView from '../cenárioteste/testeParallaxScrollView';

test('renderiza corretamente com imagem do header  e children', () => {
  const { getByTestId } = render(
    <ParallaxScrollView
      headerImage={<Image testID="header-image" source={{ uri: 'image-url' }} />}
      headerBackgroundColor={{ light: '#fff', dark: '#000' }}>
      <Text>Content goes here</Text>
    </ParallaxScrollView>
  );

  expect(getByTestId('header-image')).toBeTruthy();
});

test('header se move com efeito parallax', () => {
  const { getByTestId } = render(
    <ParallaxScrollView
      headerImage={<Image testID="header-image" source={{ uri: 'image-url' }} />}
      headerBackgroundColor={{ light: '#fff', dark: '#000' }}>
      <Text>Content goes here</Text>
    </ParallaxScrollView>
  );

  const animatedView = getByTestId('animated-header-view'); // Ensure to add this testID in the component

  // simular scroll
  const scrollView = getByTestId('scroll-view');
  fireEvent.scroll(scrollView, { nativeEvent: { contentOffset: { y: 100 } } });

  // checar aplicação dos estilos
  const headerImage = getByTestId('header-image');
  // checar a aplicação dos estilos em Animated.View
  expect(animatedView.props.style.transform).toBeDefined();
});
