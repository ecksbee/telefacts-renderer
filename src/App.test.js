import { render } from '@testing-library/react';
import App from './App';

test('renders the app with no errors or failures', () => {
  expect(() => render(<App />)).not.toThrow();
});
