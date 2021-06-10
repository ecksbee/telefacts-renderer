import { act, render, screen, waitFor } from '@testing-library/react';
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
  const waitForMe = Promise.resolve({ json: () => Promise.resolve(renderablesCatalog) })
  const fetchMock = jest
    .spyOn(global, 'fetch')
    .mockImplementation(() => waitForMe)
  await act(
    async () => {
      render(<App />)
      await waitForMe
    }
  )
  expect(fetchMock).toHaveBeenCalledTimes(1);
  expect(fetchMock).toHaveBeenCalledWith('/projects/' + testUuid + '/renderables');
  global.fetch.mockRestore();
});

test('first item in dropdown is selected by default', async () => {
  const testUuid = 'testUuid';
  jest.spyOn(URLSearchParams.prototype, 'get').mockImplementation((key) => {
    if (key === 'uuid') {
      return testUuid;
    }
    return null;
  });
  const waitForMe = Promise.resolve({ json: () => Promise.resolve(renderablesCatalog) })
  jest.spyOn(global, 'fetch')
    .mockImplementation(() => waitForMe)
  await act(
    async () => {
      render(<App />)
      await waitForMe
    }
  )
  expect(() => screen.getByText(renderablesCatalog.Subjects[0].Name)).not.toThrow();
  expect(() => screen.getByText(renderablesCatalog.RelationshipSets[0].Title)).not.toThrow();
  global.fetch.mockRestore();
});