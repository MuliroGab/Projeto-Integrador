import { render } from '@testing-library/react-native';
import { ThemedView } from '../ThemedView';
import * as React from 'react';

jest.mock('@/hooks/useThemeColor', () => ({
  useThemeColor: jest.fn()
}));

const mockUseThemeColor = require('@/hooks/useThemeColor').useThemeColor;

describe('ThemedView Component', () => {
  it('deve aplicar corretamente a cor do background do tema claro', () => {
    mockUseThemeColor.mockReturnValue('lightBackgroundColor');

    const { getByTestId } = render(
      <ThemedView testID="themed-view" lightColor="lightBackgroundColor" />
    );

    const view = getByTestId('themed-view');
    expect(view.props.style).toContainEqual({ backgroundColor: 'lightBackgroundColor' });
  });

  it('deve aplicar corretamente a cor do background do tema escuro', () => {
    mockUseThemeColor.mockReturnValue('darkBackgroundColor');

    const { getByTestId } = render(
      <ThemedView testID="themed-view" darkColor="darkBackgroundColor" />
    );

    const view = getByTestId('themed-view');
    expect(view.props.style).toContainEqual({ backgroundColor: 'darkBackgroundColor' });
  });

  it('deve combinar a cor do background com estilos adicionais', () => {
    mockUseThemeColor.mockReturnValue('backgroundColor');

    const { getByTestId } = render(
      <ThemedView testID="themed-view" lightColor="lightColor" style={{ borderColor: 'red' }} />
    );

    const view = getByTestId('themed-view');
    expect(view.props.style).toContainEqual({ backgroundColor: 'backgroundColor' });
    expect(view.props.style).toContainEqual({ borderColor: 'red' });
  });

  it('deve passar outros adereços para o componente View', () => {
    mockUseThemeColor.mockReturnValue('backgroundColor');

    const { getByTestId } = render(
      <ThemedView testID="themed-view" accessibilityLabel="Test Label" />
    );

    const view = getByTestId('themed-view');
    expect(view.props.accessibilityLabel).toBe('Test Label');
  });
});
