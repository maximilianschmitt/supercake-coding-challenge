import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../src/app/page'; // Adjust the path as needed
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

describe('App Component', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  test('renders search input and pets filter button', () => {
    render(<App />);
    expect(screen.getByPlaceholderText(/Search by ID, name, email or phone/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Pets/i)[0]).toBeInTheDocument();
  });

  test('handles API abort correctly', async () => {
    fetchMock.mockAbortOnce();
    render(<App />);

    fireEvent.change(screen.getByPlaceholderText(/Search by ID, name, email or phone/i), {
      target: { value: 'query' },
    });

    await waitFor(() => expect(fetchMock).toHaveBeenCalled());
    expect(fetchMock.mock.calls.length).toBe(1);
  });
});
