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

  test.skip('loader displays while fetching and stops displaying when finished', async () => {
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
    expect(container.getElementsByClassName('loader').length).toBe(0);
    
    global.fetch.mockRestore();
  });

  test.skip('correct tab is selected', async () => {
    const testUuid = 'testUuid';
    const testHash = 'testHash';
    const waitForMe = Promise.resolve({ json: () => {Promise.resolve({testRenderables})} })
    jest.spyOn(global, 'fetch')
      .mockImplementation(() => waitForMe)
    act(() => {
      render(<ConceptNetworkViewer uuidFromQuery={testUuid} renderablesHash={testHash}/>)
      }
    )
    await waitForElementToBeRemoved(document.querySelector('.loader'));
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