import { act, render } from '@testing-library/react';
import App from './App';
import renderablesCatalog from './testRenderablesCatalog';

test('renders the app with no errors or failures', () => {
  expect(() => {
    jest.spyOn(URLSearchParams.prototype, 'get').mockImplementation((key) => {
      if (key === 'uuid') {
        return 'abc';
      }
      return null;
    });
    render(<App />)
  }).not.toThrow();
});

test('renders the app with a given query string of uuid and successfully calls fetch', async () => {
  const testUuid = 'testUuid';
  jest.spyOn(URLSearchParams.prototype, 'get').mockImplementation((key) => {
    if (key === 'uuid') {
      return testUuid;
    }
    return null;
  });
  const waitForMe = Promise.resolve({
    json: () => Promise.resolve(renderablesCatalog),
  });
  global.fetch = jest.fn(() =>
    waitForMe
  );
  await act(() => render(<App />));
  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledWith('/projects/' + testUuid + '/renderables');
});