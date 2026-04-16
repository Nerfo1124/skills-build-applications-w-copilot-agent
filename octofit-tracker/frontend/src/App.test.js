import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('renders the main navigation', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  expect(screen.getByText(/octofit tracker/i)).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /users/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /teams/i })).toBeInTheDocument();
});
