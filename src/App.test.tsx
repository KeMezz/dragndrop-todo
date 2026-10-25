import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';
import { darkTheme } from './theme';

test('renders Just Drag And Drop title', () => {
  render(
    <RecoilRoot>
      <ThemeProvider theme={darkTheme}>
        <App />
      </ThemeProvider>
    </RecoilRoot>
  );
  const titleElement = screen.getByText(/Just Drag And Drop!/i);
  expect(titleElement).toBeInTheDocument();
});
