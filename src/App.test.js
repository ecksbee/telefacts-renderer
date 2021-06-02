import { render } from '@testing-library/react';
import App from './App';

test('renders the app with no errors or failures', () => {  expect(() => {
  jest.spyOn(URLSearchParams.prototype, 'get').mockImplementation((key) => {
      if (key === 'uuid') {
        return 'abc';
      }
      return null;
    });
    render(<App />)
  }).not.toThrow();
});
