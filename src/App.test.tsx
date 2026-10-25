import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import App from './App';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';
import { darkTheme } from './theme';

const renderApp = () =>
  render(
    <RecoilRoot>
      <ThemeProvider theme={darkTheme}>
        <App />
      </ThemeProvider>
    </RecoilRoot>
  );

beforeEach(() => localStorage.clear());

test('renders Just Drag And Drop title and the three boards', () => {
  renderApp();
  expect(screen.getByText(/Just Drag And Drop!/i)).toBeInTheDocument();
  for (const board of ['SCHEDULED', 'DOING', 'DONE']) {
    expect(screen.getByRole('heading', { name: board })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(`Add Task On ${board}`)).toBeInTheDocument();
  }
});

test('adds a task to a board through the form and persists it', async () => {
  renderApp();
  userEvent.type(screen.getByPlaceholderText('Add Task On DOING'), 'write regression test');
  userEvent.click(screen.getAllByRole('button', { name: 'Add' })[1]);
  expect(await screen.findByText('write regression test')).toBeInTheDocument();
  await waitFor(() =>
    expect(JSON.parse(localStorage.getItem('toDos') as string).DOING.map((t: { text: string }) => t.text)).toEqual(['write regression test'])
  );
});
