import { render, screen } from '@testing-library/react';
import RViewer from './rViewer';

  test('title for RViewer is rendered', () => {
    const testRSet = {
        title: "I am the test title"
    }
    render(<RViewer rSetSelected={testRSet}/>);
    expect(screen.getByText(testRSet.title)).toBeTruthy();
  });