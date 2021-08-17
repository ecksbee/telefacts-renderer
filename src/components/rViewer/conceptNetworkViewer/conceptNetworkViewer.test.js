import { act, render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import ConceptNetworkViewer from './conceptNetworkViewer';
import testRenderables from './testRenderables';

test('tabs are rendered', () => {
    render(<ConceptNetworkViewer />);
    expect(screen.getByText("Presentation")).toBeTruthy();
    expect(screen.getByText("Definition")).toBeTruthy();
    expect(screen.getByText("Calculation")).toBeTruthy();
});

test('loader displays while fetching and stops displaying when finished', async () => {
    const testId = 'testID';
    const testHash = 'testHash';
    let container;
    const waitForMe = Promise.resolve({ json: () => {Promise.resolve({testRenderables})} })
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
        const { container: localContainer } = render(<ConceptNetworkViewer idFromQuery={testId} renderablesHash={testHash}/>);
        expect(localContainer.getElementsByClassName('loader').length).toBe(1);
        container = localContainer;
        await waitForElementToBeRemoved(document.querySelector('.loader'));
      }
    )
    expect(container.getElementsByClassName('loader').length).toBe(0);
    expect(urlMap['/folders/' + testId + '/' + testHash]).toEqual(1);
    expect(fetchMock).toHaveBeenCalledWith('/folders/' + testId + '/' + testHash);
    global.fetch.mockRestore();
});

test('correct tab is selected', async () => {
    const testId = 'testID';
    const testHash = 'testHash';
    const waitForMe = Promise.resolve({ json: () => {Promise.resolve({testRenderables})} })
    jest.spyOn(global, 'fetch')
      .mockImplementation(() => waitForMe)
    await act(
      async () => {
        render(<ConceptNetworkViewer idFromQuery={testId} renderablesHash={testHash}/>);
        await waitForElementToBeRemoved(document.querySelector('.loader'));
      }
    )
    
    expect(screen.getByText("Presentation")).toHaveClass('tab-selected');
    expect(screen.getByText("Definition")).not.toHaveClass('tab-selected');
    expect(screen.getByText("Calculation")).not.toHaveClass('tab-selected');

    userEvent.hover(screen.getByText('Definition'));
    userEvent.click(screen.getByText('Definition'));
    expect(screen.getByText("Presentation")).not.toHaveClass('tab-selected');
    expect(screen.getByText("Definition")).toHaveClass('tab-selected');
    expect(screen.getByText("Calculation")).not.toHaveClass('tab-selected');

    userEvent.hover(screen.getByText('Calculation'));
    userEvent.click(screen.getByText('Calculation'));
    expect(screen.getByText("Presentation")).not.toHaveClass('tab-selected');
    expect(screen.getByText("Definition")).not.toHaveClass('tab-selected');
    expect(screen.getByText("Calculation")).toHaveClass('tab-selected');

    userEvent.hover(screen.getByText('Presentation'));
    userEvent.click(screen.getByText('Presentation'));
    expect(screen.getByText("Presentation")).toHaveClass('tab-selected');
    expect(screen.getByText("Definition")).not.toHaveClass('tab-selected');
    expect(screen.getByText("Calculation")).not.toHaveClass('tab-selected');

    global.fetch.mockRestore();
});