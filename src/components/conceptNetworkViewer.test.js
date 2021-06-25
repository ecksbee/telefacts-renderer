import { act, render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import ConceptNetworkViewer from './conceptNetworkViewer';
import testRenderables from './testRenderables';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve,ms));
}

test('tabs are rendered', () => {
    render(<ConceptNetworkViewer />);
    expect(screen.getByText("Presentation")).toBeTruthy();
    expect(screen.getByText("Definition")).toBeTruthy();
    expect(screen.getByText("Calculation")).toBeTruthy();
  });

  test('loader displays while fetching and stops displaying when finished', async () => {
    const testUuid = 'testUuid';
    const testHash = 'testHash';
    let container;
    const waitForMe = Promise.resolve({ json: () => {Promise.resolve({testRenderables})} })
    jest.spyOn(global, 'fetch')
      .mockImplementation(() => waitForMe)
    act(() => {
      const { container: localContainer } = render(<ConceptNetworkViewer uuidFromQuery={testUuid} renderablesHash={testHash}/>)
      container = localContainer;
      }
    )
    expect(container.getElementsByClassName('loader').length).toBe(1);
    await waitForElementToBeRemoved(document.querySelector('.loader'));
    global.fetch.mockRestore();
  });