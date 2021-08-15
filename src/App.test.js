import { act, render, screen } from '@testing-library/react';
import App from './App';
import renderablesCatalog from './testRenderablesCatalog';

test('renders the app with no errors or failures', () => {
  expect(() => {
    jest.spyOn(URLSearchParams.prototype, 'get').mockImplementation((key) => {
      if (key === 'id') {
        return 'abc';
      }
      return null;
    });
    render(<App />)
  }).not.toThrow();
});

test('renders the app with a given query string of id and successfully calls fetch', async () => {
  const testId = 'testId';
  jest.spyOn(URLSearchParams.prototype, 'get').mockImplementation((key) => {
    if (key === 'id') {
      return testId;
    }
    return null;
  });
  const waitForMe = Promise.resolve({ json: () => Promise.resolve(renderablesCatalog) })
  const urlMap = {};
  const fetchMock = jest
    .spyOn(global, 'fetch')
    .mockImplementation((url) => {
      let acc = urlMap[url];
      if (!acc) {
        acc = 0;
      }
      acc++
      urlMap[url] = acc;
      return waitForMe
    })
  await act(
    async () => {
      render(<App />)
      await waitForMe
    }
  )
  expect(urlMap['/folders/' + testId]).toEqual(1);
  expect(fetchMock).toHaveBeenCalledWith('/folders/' + testId);
  global.fetch.mockRestore();
});

test('first item in dropdown is selected by default', async () => {
  const testId = 'testId';
  jest.spyOn(URLSearchParams.prototype, 'get').mockImplementation((key) => {
    if (key === 'id') {
      return testId;
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
  expect(() => screen.getByText(renderablesCatalog.RelationshipSets[0].RoleURI)).not.toThrow();
  global.fetch.mockRestore();
});