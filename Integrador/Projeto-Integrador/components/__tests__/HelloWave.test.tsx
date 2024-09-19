import React from 'react';
import { render } from '@testing-library/react-native';
import HelloWave from '@/components/cenárioteste/cenarioHelloWave';

describe('HelloWave Component', () => {
  it('renderiza HelloWave corretamente', () => {
    const { getByText } = render(<HelloWave />);
    // Verifica se o componente renderiza o texto "👋"
    expect(getByText('👋')).toBeTruthy();
  });

  it('aplicar animaçao', () => {
    const { getByTestId } = render(<HelloWave />);
    // Verifica se o componente Animated.View tem a animação aplicada
    const animatedView = getByTestId('animated-view');
    expect(animatedView).toBeTruthy();
  });
});
